import styled from 'styled-components';

import LogoContainer from '../ui/LogoContainer';
import LogoText from '../ui/LogoText';

import Link from '../Link';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: ${(props) => props.theme.sizes.headerHeight};
  height: 100vh;

  img {
    margin-top: 4.8rem;
  }
`;

const LoginPageLogoContainer = styled(LogoContainer)`
  column-gap: 1.6rem;

  img {
    width: 6.4rem;
    height: 6.4rem;
  }
`;

const LoginPageLogoText = styled(LogoText)`
  font-size: 5.2rem;
  font-weight: 500;
`;

const ServiceText = styled.span`
  color: ${(props) => props.theme.colors.gray400};
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.2rem;
  letter-spacing: -0.64px;
  margin-top: 1.6rem;
  text-align: center;
`;

const KakaoLoginButton = styled(Link)`
  img {
    width: 27.2rem;
    height: auto;
  }
`;

const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default function Login() {
  const redirectUrl = `${BASE_URL}/oauth`;
  const loginUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${redirectUrl}&response_type=code`;

  return (
    <Container>
      <LoginPageLogoContainer>
        <img alt="" src="/images/logo.svg" />
        <LoginPageLogoText>티플</LoginPageLogoText>
      </LoginPageLogoContainer>
      <ServiceText>
        영어 선생님들의 문제에
        <br />
        문항을 더하여 주는 Teacher Plus, 티플
      </ServiceText>
      <KakaoLoginButton to={loginUrl}>
        <img
          alt=""
          src="/images/kakao-login.png"
          data-testid="login"
        />
      </KakaoLoginButton>
    </Container>
  );
}
