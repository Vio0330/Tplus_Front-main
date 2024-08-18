import styled from 'styled-components';

import { useRouter } from 'next/router';
import Button from '../ui/Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.span`
  text-align: center;
  font-size: 5.2rem;
  font-weight: 700;
  margin-top: 15.6rem;
  line-height: 6rem;
  letter-spacing: -2.08px;

  strong {
    color: ${(props) => props.theme.colors.orange100};
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}) {
    font-size: 6.3vw;
    line-height: 1.25em;
    letter-spacing: -0.04em;
    margin-top: 15vw;
  }
`;

const Description = styled.span`
  font-size: 2.4rem;
  font-weight: 500;
  line-height: 3rem;
  letter-spacing: -0.96px;
  margin-block: 3.2rem 5rem;
  color: ${(props) => props.theme.colors.gray400};
  display: flex;
  text-align: center;

  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}) {
    font-size: 3.75vw;
    line-height: 1.34em;
    letter-spacing: -0.02em;
    margin-block: 2.5vw 10.09vw;
  }
`;

const InquiryButton = styled(Button)`
  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}) {
    font-size: 3.75vw;
    letter-spacing: -0.04em;
    width: 41.25vw;
    white-space: nowrap;
    line-height: normal;
    aspect-ratio: 132 / 32;
  }
`;

const Image = styled.img`
  width: 1080px;
  height: auto;
  margin: 0 auto;

  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}) {
    width: 85vw;
  }
`;

export default function Introduction() {
  const router = useRouter();

  return (
    <Container>
      <Title>
        선생님 수업에
        {' '}
        <strong>꼭 맞는 영어 문항</strong>
        을
        <br />
        편리하게 준비하세요!
      </Title>
      <Description>
        수능 / 내신 영어 강의를 위한
        <br />
        자동 문항 및 시험지 생성 서비스
      </Description>
      <InquiryButton
        type="button"
        onClick={() => router.push('/papers')}
      >
        서비스 이용하기
      </InquiryButton>
      <InquiryButton
        type="button"
        onClick={() => router.push('/gyu')}
      >
        규정 ㄱㄱ
      </InquiryButton>
      <Image src="/images/landing-service-image.png" alt="서비스 소개" />
    </Container>
  );
}
