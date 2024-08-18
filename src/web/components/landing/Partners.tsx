import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 17.2rem;

  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}) {
    margin-top: 22.59vw;
  }
`;

const Title = styled.p`
  font-size: 3.6rem;
  font-weight: 700;
  line-height: 4rem;
  letter-spacing: -1.44px;

  strong {
    color: ${(props) => props.theme.colors.orange100};
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}) {
    font-size: 5vw;
    line-height: 1.25em;
    letter-spacing: -0.04em;
  }
`;

const CompanyLogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4.8rem;
  row-gap: 2.8rem;
  align-items: center;

  img {
    display: block;
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}) {
    margin-top: 11.3vw;
    row-gap: 3.75vw;
  }
`;

const CompanyLogoContainerItems = styled.div`
  display: flex;
  column-gap: 2.4rem;
  align-items: center; 

  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}) {
    overflow-x: hidden;
    column-gap: 2.55vw;
  }
`;

const Chungshin = styled.img`
  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}) {
    width: 41vw;
    aspect-ratio: 131 / 25;
  }
`;

const Mirae = styled.img`
  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}) {
    width: 15.15vw;
    aspect-ratio: 48.5 / 25;
  }
`;

const Dawon = styled.img`
  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}) {
    width: 15.3vw;
    aspect-ratio: 49 / 25;
  }
`;

const Yesum = styled.img`
  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}) {
    width: 15.3vw;
    aspect-ratio: 49 / 25;
  }
`;

const YouAreFlower = styled.img`
  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}) {
    width: 28.4vw;
    aspect-ratio: 90.686 / 25;
  }
`;

const HelenEnglish = styled.img`
  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}) {
    width: 7.8vw;
    aspect-ratio: 25 / 25;
  }
`;

const Songwon = styled.img`
  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}) {
    width: 23.6vw;
    aspect-ratio: 75.532 / 25;
  }
`;

const CompanyLogoText = styled.span`
  font-family: "EsaManru";
  font-size: 2.4rem;
  font-weight: 500;
  line-height: normal;

  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}) {
    font-size: 3.8vw;
    white-space: nowrap;
  }
`;

const Banner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 17.2rem;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  background: url("images/banner-01.png") no-repeat 100%;
  color: ${(props) => props.theme.colors.white};
  text-align: center;

  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}) {
    margin-top: 22.5vw;
    aspect-ratio: 320 / 124;
    padding: 3.2rem 5.9rem;
  }
`;

const Description = styled.p`
  font-size: 3.6rem;
  font-weight: 700;
  padding-block: 13.2rem;
  line-height: 4rem;
  letter-spacing: -0.144rem;
  width: 73.7rem;
  
  strong {
    color: ${(props) => props.theme.colors.orange100};
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}) {
    font-size: 5vw;
    font-weight: 700;
    line-height: 1.25em;
    letter-spacing: -0.04em;
    padding-block: 0;
    word-break: keep-all;
  }
`;

export default function Partners() {
  return (
    <Container>
      <Title>
        <strong>티플</strong>
        과 함께하는 협력 기관 및 협력사
      </Title>
      <CompanyLogoContainer>
        <CompanyLogoContainerItems>
          <Chungshin src="/images/partner-logos/chungshin.png" alt="" />
          <Mirae src="/images/partner-logos/mirae.png" alt="" />
          <Dawon src="/images/partner-logos/dawon.png" alt="" />
          <Yesum src="/images/partner-logos/yesum.png" alt="" />
          <CompanyLogoText>션티 영어 연구소</CompanyLogoText>
          <CompanyLogoText>조정식 영어 연구소</CompanyLogoText>
        </CompanyLogoContainerItems>
        <CompanyLogoContainerItems>
          <YouAreFlower src="/images/partner-logos/you-are-flower.png" alt="" />
          <CompanyLogoText>광주 프레스티지 어학원</CompanyLogoText>
          <HelenEnglish src="/images/partner-logos/helen-english.png" alt="" />
          <Songwon src="/images/partner-logos/songwon.png" alt="" />
        </CompanyLogoContainerItems>
      </CompanyLogoContainer>
      <Banner>
        <Description>
          &quot;현직 수능 영어 사설 모의고사 집필진, 대치동 스타강사,
          그리고 학교 선생님들과
          {' '}
          <strong>함께 제작</strong>
          합니다&quot;
        </Description>
      </Banner>
    </Container>
  );
}
