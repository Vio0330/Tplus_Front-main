import styled from 'styled-components';

import { useRouter } from 'next/router';

import LogoText from '../ui/LogoText';
import LogoContainer from '../ui/LogoContainer';
import Link from '../Link';

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  max-width: ${(props) => props.theme.sizes.maxWidth};
  background: ${(props) => props.theme.colors.white};
  height: ${(props) => props.theme.sizes.headerHeight};
  padding-inline: 2.4rem;
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray100};
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 320px) {
    height: 6.4rem;
  }
`;

const HeaderLogoText = styled(LogoText)`
  font-size: 2rem;
  font-weight: 500;
  color: ${(props) => props.theme.colors.gray800};
`;

const Profile = styled.button`
  display: block;
  width: 3.2rem;
  height: 3.2rem;

  img {
    display: block;
    width: 100%;
    border-radius: 50%;
  }
`;

type HeaderProps = {
  loggedIn: boolean;
  profileImage: string;
}

const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const LOGIN_BASE_URL = 'https://kauth.kakao.com/oauth/authorize';
const REDIRECT_URL = `${BASE_URL}/oauth`;
const LOGIN_URL_QUERY = `client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URL}&response_type=code`;

export default function Header({
  loggedIn, profileImage,
}: HeaderProps) {
  const loginUrl = `${LOGIN_BASE_URL}?${LOGIN_URL_QUERY}`;

  const profileImageUrl = profileImage || '/images/profile.png';

  const router = useRouter();

  const handleClickLogo = () => {
    if (loggedIn) {
      router.push('/papers');
    }

    if (!loggedIn) {
      router.push('/');
    }
  };

  const handleClickProfile = () => {
    router.push('/my');
  };

  return (
    <HeaderContainer>
      <button
        type="button"
        onClick={handleClickLogo}
      >
        <LogoContainer>
          <img src="/images/logo.svg" alt="" />
          <HeaderLogoText>티플</HeaderLogoText>
        </LogoContainer>
      </button>
      {loggedIn ? (
        <Profile
          type="button"
          onClick={handleClickProfile}
          data-testid="profile"
        >
          <img
            src={profileImageUrl}
            alt="profile"
          />
        </Profile>
      ) : (
        <Link to={loginUrl}>
          <img
            alt=""
            src="/images/kakao-login-small.svg"
            data-testid="login"
          />
        </Link>
      )}
    </HeaderContainer>
  );
}
