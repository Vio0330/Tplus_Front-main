import { GetServerSidePropsContext } from 'next';

import Container from '../web/components/ui/Container';

import Header from '../web/components/common/Header';

import SubscriptionInformation
  from '../web/components/subscribe/SubscriptionInformation';

import { fetchData, verifyToken } from '../web/utils';
import log from '../web/utils/log';

import { ERROR_MESSAGE, SubscriptionStatus, User } from '../web/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  try {
    const { token, profileImage } = verifyToken(req);

    const options = {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    };

    const url = `${API_BASE_URL}/user`;

    const { type } = await fetchData({ url, options });

    if (type !== SubscriptionStatus.None) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    return {
      props: {
        user: {
          loggedIn: !!token,
          type,
          profileImage,
        },
      },
    };
  } catch (error) {
    log('/subscribe::', error);
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

type SubscriptionInformationPageProps = {
  user: User;
}

export default function SubscriptionInformationPage({
  user,
}: SubscriptionInformationPageProps) {
  return (
    <Container>
      <Header
        loggedIn={user.loggedIn}
        profileImage={user.profileImage}
      />
      <SubscriptionInformation />
    </Container>
  );
}
