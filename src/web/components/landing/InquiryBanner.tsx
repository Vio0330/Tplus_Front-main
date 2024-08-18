import styled from 'styled-components';

import { useRouter } from 'next/router';
import Button from '../ui/Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 17.2rem;
  width: 100%;
  flex-shrink: 0;
  background: url("images/banner-03.png") no-repeat 100%;
  background-size: cover;
  aspect-ratio: 1440 / 570;
  color: ${(props) => props.theme.colors.white};
  padding-top: 12.4rem;
  padding-left: 18rem;

  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}){
    padding-top: 10vw;
    padding-left: 10vw;
    margin-top: 22.5vw;
    aspect-ratio: 320 / 236;
  }
`;

const Title = styled.h2`
  font-size: 3.6rem;
  font-weight: 700;
  line-height: 4rem;
  letter-spacing: -1.44px;

  strong {
    color: ${(props) => props.theme.colors.orange100};
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}){
    font-size: 5vw;
    line-height: 1.25em;
    letter-spacing: -0.04em;
  }
`;

const SubTitle = styled.p`
  font-size: 2.4rem;
  font-weight: 500;
  margin-top: 1.6rem;
  line-height: 3rem;
  letter-spacing: -0.96px;
  color: ${(props) => props.theme.colors.gray400};

  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}){
    font-size: 3.75vw;
    line-height: 1.34em;
    letter-spacing: -0.02em;
    margin-top: 2.5vw;
  }
`;

const InquiryButton = styled(Button)`
  margin-top: 4.8rem;

  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}) {
    font-size: 3.75vw;
    letter-spacing: -0.04em;
    margin-top: 7.5vw;
    width: 41.25vw;
    white-space: nowrap;
    line-height: normal;
    aspect-ratio: 132 / 32;
  }
`;

const ContactList = styled.div`
  margin-top: 3.2rem;
  display: flex;
  flex-direction: column;
  row-gap: .8rem;

  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}){
    margin-top: 5vw;
  }
`;

const Contact = styled.div`
  display: flex ;
  column-gap: 2.4rem;

  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}){
    column-gap: 5vw;
  }

  span:first-child {
    font-size: 2.4rem;
    font-weight: 500;
    line-height: 3rem;
    letter-spacing: -0.096rem;
    width: 8.1rem;

    @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}){
      font-size: 3.75vw;
      line-height: 1.34em;
      letter-spacing: -0.02em;
      width: 12.8vw;
    }
  }

  span:nth-child(2) {
    font-size: 2.4rem;
    font-weight: 700;
    line-height: 3rem;
    letter-spacing: -0.096rem;

    @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}){
      font-size: 3.75vw;
      line-height: 1.34em;
      letter-spacing: -0.02em;
    }

    a {
      color: ${(props) => props.theme.colors.white}
    }
  }
`;

export default function InquiryBanner() {
  const router = useRouter();

  return (
    <Container>
      <Title>
        <strong>티플</strong>
        과 함께 하고 싶으신가요?
        <br />
        언제든 이용 문의해주세요
      </Title>
      <SubTitle>
        어떤 내용이든지 문의해주시면 친절한 답변 드립니다
      </SubTitle>
      <ContactList>
        <Contact>
          <span>이메일</span>
          <span>juanwan@hexaplus.io</span>
        </Contact>
        <Contact>
          <span>전화번호</span>
          <span>010-2456-0802</span>
        </Contact>
      </ContactList>
      <InquiryButton
        type="button"
        onClick={() => router.push('/papers')}
      >
        서비스 이용하기
      </InquiryButton>
    </Container>
  );
}
