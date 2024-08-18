import styled from 'styled-components';

import { useRouter } from 'next/router';

import Button from '../ui/Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 17.2rem;

  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}) {
    margin-top: 22.5vw;
  }
`;

const Title = styled.h2`
  font-size: 3.6rem;
  font-weight: 700;
  line-height: 4rem;
  letter-spacing: -1.44px;
  text-align: center;

  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}) {
    font-size: 5vw;
    line-height: 1.25em;
    letter-spacing: -0.04em;
  }

  strong {
    color: ${(props) => props.theme.colors.orange100};
  }
`;

const SubmissionButton = styled(Button)`
  margin-top: 4.8rem;
  width: 14.7rem;

  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}) {
    font-size: 3.75vw;
    letter-spacing: -0.04em;
    margin-top: 10vw;
    width: 41.25vw;
    white-space: nowrap;
    line-height: normal;
    aspect-ratio: 132 / 32;
  }
`;

export default function CreditForm() {
  const router = useRouter();

  return (
    <Container>
      <Title>
        <strong>티플</strong>
        에 학교별 시험지를 제출하면
        <br />
        이를 기반으로 크레딧을 제공해드려요
      </Title>
      <SubmissionButton
        type="submit"
        onClick={() => router.push('https://docs.google.com/forms/d/e/1FAIpQLSfCBPJmSTEz0R2bKFGfe9seIDBOuor8zxw-caVQQneiWt_P6A/viewform?usp=sf_link')}
      >
        제출하기
      </SubmissionButton>
    </Container>
  );
}
