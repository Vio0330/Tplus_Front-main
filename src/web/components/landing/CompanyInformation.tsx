import styled from 'styled-components';

const Container = styled.div`
  display: inline-flex;
  padding: 13.2rem 62.7rem 6.4rem 18rem;
  align-items: flex-start;
  flex-shrink:0; 
  background: ${(props) => props.theme.colors.gray50};
  color: ${(props) => props.theme.colors.gray400};
  width: 100%;
  flex-direction: column;
  row-gap: .4rem;

  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}){
    padding: 22.5vw 5vw 7.5vw 7.5vw;
  }
`;

const DataTitle = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 2.1rem;
  letter-spacing: -0.32px;
  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}){
    font-size: 3.75vw;
    line-height: normal;
    letter-spacing: -0.02em;
  }
`;

const Data = styled.span`
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.1rem;
  letter-spacing: -0.32px;
  @media screen and (max-width: ${(props) => props.theme.breakpoint.maxWidth}){
    font-size: 3.75vw;
    line-height: normal;
    letter-spacing: -0.02em;
  }
  
  a {
    color: ${(props) => props.theme.colors.white}
  }
`;

export default function CompanyInformation() {
  return (
    <Container>
      <div>
        <DataTitle>
          상호명
          {' '}
        </DataTitle>
        <Data>
          헥사플러스 |
          {' '}
        </Data>
        <DataTitle>
          대표이사
          {' '}
        </DataTitle>
        <Data>
          이희완
        </Data>
      </div>
      <div>
        <DataTitle>
          사업자등록번호
          {' '}
        </DataTitle>
        <Data>
          895-87-02805
        </Data>
      </div>
      <div>
        <DataTitle>
          주소
          {' '}
        </DataTitle>
        <Data>
          서울시 강남구 영동대로 85길 34, 9층
        </Data>
      </div>
    </Container>
  );
}
