import type { GetServerSidePropsContext } from 'next';

import {
  ERROR_MESSAGE,
  Paper,
  SubscriptionStatus,
  User,
} from '../../web/types';

import {
  fetchData, isServiceAvailable, toCamelCase, verifyToken,
} from '../../web/utils';

import log from '../../web/utils/log';

import Container from '../../web/components/ui/Container';

import Header from '../../web/components/common/Header';
import Control from '../../web/components/papers/Control';
import PaperList from '../../web/components/papers/PaperList';
import useFilterPaper from '../../web/hooks/useFilterPaper';

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  try {
    const { token, profileImage } = verifyToken(req);

    const options = {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    };

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const fetchUserUrl = `${API_BASE_URL}/user`;

    const { type, expired_at: expiredAt } = await fetchData({
      url: fetchUserUrl,
      options,
    });

    const isActiveUser = isServiceAvailable({ type, expiredAt });

    if (!isActiveUser) {
      if (type === SubscriptionStatus.None) {
        return {
          redirect: {
            destination: '/subscribe',
            permanent: false,
          },
        };
      }

      if (type === SubscriptionStatus.InActive) {
        return {
          redirect: {
            destination: '/my',
            permanent: false,
          },
        };
      }
    }

    const fetchPapersUrl = `${API_BASE_URL}/`;
    const data = await fetchData({
      url: fetchPapersUrl,
      options,
    });

    const {
      test_paper_list: testPapers,
      schools,
    } = data;

    const papers = testPapers.map(toCamelCase);

    return {
      props: {
        user: {
          loggedIn: !!token,
          type,
          profileImage,
        },
        papers,
        schools,
      },
    };
  } catch (error) {
    log('/papers::', error);
    if ((error as Error).message === ERROR_MESSAGE.Unauthorized) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    return {
      props: {
        notFound: true,
      },
    };
  }
}

type PaperListPageProps = {
  user: User;
  papers: Paper[];
  schools: {
    name: string;
    region: string;
  }[];
}

export default function PaperListPage({
  user, papers, schools,
}: PaperListPageProps) {
  const { paperType, selectPaperType } = useFilterPaper();

  const filteredPapers = paperType === '전체'
    ? papers
    : papers.filter((paper) => paper.type === paperType);

  return (
    <Container>
      <Header
        loggedIn={user.loggedIn}
        profileImage={user.profileImage}
      />
      <Control
        paperType={paperType}
        onSelect={selectPaperType}
        schools={schools}
      />
      <PaperList papers={filteredPapers} />
    </Container>
  );
}
