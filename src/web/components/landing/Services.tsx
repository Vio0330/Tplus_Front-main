import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}){
    margin-top: 22.5vw;
  }
`;

const ServiceList = styled.ul`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}){
    row-gap: 28.15vw;
  }
`;

const Service = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-top: 17.2rem;
  width: 108rem;

  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}){
    justify-content: center;
    margin-top: 0;
  }

  img {
    display: block;
    width: 45.2rem;
    height: auto;

    @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}){
      display: none;
    }
  }
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  h3 {
    font-size: 3.6rem;
    font-weight: 700;
    display: block;
    margin-top: 3.2rem;
    text-align: flex-start;
    line-height: 4rem;
    letter-spacing: -.144rem;

    @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}){
      font-size: 5vw;
      line-height: 1.25em;
      letter-spacing: -0.04em;
      text-align: center;
      margin-top: 0;
    }

    strong {
      color: ${(props) => props.theme.colors.orange100};
    }
  }

  p {
    font-size: 2.4rem;
    font-weight: 500;
    margin-top: 1.6rem;
    line-height: 3rem;
    color: ${(props) => props.theme.colors.gray400};

    @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}){
      text-align: center;
      font-size: 3.75vw;
      line-height: 1.34em;
      letter-spacing: -0.02em;
    }
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}){
    display: flex;
    align-items: center;
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
  background: url("images/banner-02.png") no-repeat 100%;
  color: ${(props) => props.theme.colors.white};
  text-align: center;

  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}) {
    margin-top: 22.5vw;
    aspect-ratio: 320 / 104;
  }
`;

const Message = styled.p`
  font-size: 3.6rem;
  font-weight: 700;
  padding-block: 13.2rem;
  line-height: 4rem;
  letter-spacing: -.144rem;

  strong {
    color: ${(props) => props.theme.colors.orange100};
  }

  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}) {
    font-size: 5vw;
    font-weight: 700;
    line-height: 1.25em;
    letter-spacing: -0.04em;
    padding-block: 0;
  }
`;

export default function Services() {
  return (
    <Container>
      <ServiceList>
        <Service>
          <Description>
            <h3>
              품질 높은 수능형 영어 지문과 문항을
              <br />
              생성해서
              {' '}
              <strong>수업의 가치</strong>
              를 높이세요
            </h3>
            <p>
              현재 출제 경향을 반영한 지문과 문항을
              <br />
              인공지능이 편리하게 제작해줍니다
            </p>
          </Description>
          <img src="/images/service-guide-01.png" alt="" />
        </Service>
        <Service>
          <Description>
            <h3>
              학교 시험 유형에
              {' '}
              <strong>맞춘 문항</strong>
              들로
              <br />
              내신 영어 시험지를 만드세요
            </h3>
            <p>
              각 학교별로 특성화된 유형을 업데이트 해드립니다
            </p>
          </Description>
          <img src="/images/service-guide-02.png" alt="" />
        </Service>
        <Service>
          <Description>
            <h3>
              <strong>편집하기 쉬운</strong>
              {' '}
              워드프로세서 문서로
              <br />
              다운로드 받으세요
            </h3>
            <p>
              가장 편집이 용이한 hwp 문서로 다운로드 받아서
              <br />
              자유롭게 2차 디자인 및 가공하세요
            </p>
          </Description>
          <img src="/images/service-guide-03.png" alt="" />
        </Service>
      </ServiceList>
      <Banner>
        <Message>
          선생님이 수업과 학생에 더 집중할 수 있도록
          <br />
          <strong>티플</strong>
          이 함께 하겠습니다!
        </Message>
      </Banner>
    </Container>
  );
}
