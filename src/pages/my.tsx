import { GetServerSidePropsContext } from 'next';

import Container from '../web/components/ui/Container';

import MySubscription from '../web/components/my/MySubscription';
import Header from '../web/components/common/Header';

import {
  fetchData, verifyToken, toCamelCase,
} from '../web/utils';
import log from '../web/utils/log';

import {
  BillingLog,
  ERROR_MESSAGE,
  SubscriptionStatus,
  User,
} from '../web/types';

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

    const result = await fetchData({
      url: `${API_BASE_URL}/user`,
      options,
    });

    const {
      type, expired_at: expiredAt, username, contact,
    } = result;

    const nextPaymentAt = result.next_payment_at;

    if (type === SubscriptionStatus.None) {
      return {
        redirect: {
          destination: '/subscribe',
          permanent: false,
        },
      };
    }

    const data = await fetchData({
      url: `${API_BASE_URL}/billing/log?page=1&per_page=9999`,
      options,
    });

    const billingLogs = data.map(toCamelCase);
    return {
      props: {
        user: {
          loggedIn: !!token,
          type,
          profileImage,
        },
        expiredAt,
        nextPaymentAt,
        billingLogs,
        username,
        contact,
      },
    };
  } catch (error) {
    log('/my::', error);
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

type MyPageProps = {
  user: User;
  expiredAt: string;
  nextPaymentAt: string,
  billingLogs: BillingLog[],
  username: string;
  contact: string
}

export default function MyPage({
  user, expiredAt, nextPaymentAt, billingLogs, username, contact,
}: MyPageProps) {
  return (
    <Container>
      <Header
        loggedIn={user.loggedIn}
        profileImage={user.profileImage}
      />
      <MySubscription
        type={user.type}
        expiredAt={expiredAt}
        nextPaymentAt={nextPaymentAt}
        billingLogs={billingLogs}
        username={username}
        contact={contact}
      />
    </Container>
  );
}
