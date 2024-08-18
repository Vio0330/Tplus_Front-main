import { useEffect } from 'react';

import { GetServerSidePropsContext } from 'next';

import { useRouter } from 'next/router';

import styled from 'styled-components';

import { fetchData, isServiceAvailable } from '../web/utils';
import log from '../web/utils/log';

import { SubscriptionStatus } from '../web/types';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

export async function getServerSideProps({
  res, query,
}: GetServerSidePropsContext) {
  const { code } = query;

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const url = `${API_BASE_URL}/login?code=${code}&redirect_url=${BASE_URL}/oauth`;

  try {
    const { token, profile_image: profileImage } = await fetchData({ url });

    const { type, expired_at: expiredAt } = await fetchData({
      url: `${API_BASE_URL}/user`,
      options: {
        headers: {
          Authorization: token,
        },
      },
    });

    res.setHeader('Set-Cookie', [
      `token=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Strict;`,
      `profileImage=${encodeURIComponent(profileImage)}; Path=/; SameSite=Strict;`,
    ]);

    return {
      props: {
        type,
        expiredAt,
      },
    };
  } catch (error) {
    log('/oauth::', error);
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
}

type OauthPageProps = {
  type: string,
  expiredAt: string;
}
export default function OauthPage({ type, expiredAt }: OauthPageProps) {
  const router = useRouter();

  useEffect(() => {
    if (type === SubscriptionStatus.None || type === '') {
      router.push('/subscribe');
      return;
    }

    if (type === SubscriptionStatus.Promotion || type === SubscriptionStatus.Active) {
      router.push('/papers');
      return;
    }

    if (type === SubscriptionStatus.InActive) {
      const active = isServiceAvailable({ type, expiredAt });

      if (active) {
        router.push('/papers');
        return;
      }

      router.push('/my');
      return;
    }

    router.push('/');
  }, []);

  return (
    <Container>
      <p>로그인 중입니다...</p>
    </Container>
  );
}
