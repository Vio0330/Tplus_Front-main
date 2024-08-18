/* eslint-disable no-restricted-globals */
import type { GetServerSidePropsContext } from 'next';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { ParsedUrlQuery } from 'querystring';

import { fetchData, isServiceAvailable, verifyToken } from '../../../web/utils';
import log from '../../../web/utils/log';

import {
  ERROR_MESSAGE,
  PaperDetail, QuestionType, SubscriptionStatus, User,
} from '../../../web/types';

import usePaperEdit from '../../../web/hooks/usePaperEdit';
import useBlockRefresh from '../../../web/hooks/useBlockRefresh';

import Container from '../../../web/components/ui/Container';
import Header from '../../../web/components/common/Header';
import Sort from '../../../web/components/papers-edit/Sort';
import PaperEditor from '../../../web/components/papers-edit/PaperEditor';
import SaveBar from '../../../web/components/papers-edit/SaveBar';
import SaveTestPaperModal
  from '../../../web/components/papers-edit/SaveTestPaperModal';
import NotificationModal from '../../../web/components/NotificationModal';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Params extends ParsedUrlQuery {
  id: string;
}

export async function getServerSideProps({
  params, req,
}: GetServerSidePropsContext) {
  try {
    const { token, profileImage } = verifyToken(req);

    const { id } = params as Params;

    const options = {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    };

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

    const url = `${API_BASE_URL}/test-paper?test_paper_id=${id}`;

    const result = await fetchData({ url, options });

    const {
      test_paper_detail: paper,
      question_types: questionType,
    } = result;

    return {
      props: {
        user: {
          loggedIn: !!token,
          type,
          profileImage,
        },
        paper,
        questionType,
      },
    };
  } catch (error) {
    log('/edit::', error);
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

type PaperEditPageProps = {
  user: User;
  paper: PaperDetail;
  questionType: QuestionType;
}

export default function PaperEditPage({
  user, paper, questionType,
}: PaperEditPageProps) {
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const {
    paperDetail, processing, completion, error,
    clear, changePaperNameField, save, generate, setError,
  } = usePaperEdit(paper);

  const { isBlocked, setBlockNavigation } = useBlockRefresh(() => {
    openModal();
  });

  const {
    name, type, grade, school,
  } = paperDetail;

  useEffect(() => {
    if (completion) {
      setBlockNavigation(false);
    }

    if (completion && !isBlocked) {
      clear();
      router.push('/papers');
    }
  }, [completion, isBlocked]);

  const handleClickCloseNotification = () => {
    setError('');
  };

  return (
    <Container>
      <Header
        loggedIn={user.loggedIn}
        profileImage={user.profileImage}
      />
      <Sort
        name={name}
        type={type}
        grade={grade}
        school={school}
        onChangeName={changePaperNameField}
      />
      <PaperEditor questionType={questionType} />
      <SaveBar
        isLoading={processing}
        onClickSave={save}
        onClickGenerate={generate}
      />
      <SaveTestPaperModal
        show={isModalOpen}
        titleText="시험지 저장하기"
        buttonText="저장하기"
        onClickSave={save}
        onClickCloseModal={() => setIsModalOpen(false)}
      />
      <NotificationModal
        show={!!error}
        title="시험지 생성하기"
        message={error}
        onClose={handleClickCloseNotification}
        onClickOk={handleClickCloseNotification}
      />
    </Container>
  );
}
