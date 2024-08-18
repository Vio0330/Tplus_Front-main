import styled from 'styled-components';

import { useRouter } from 'next/router';

import Button from '../ui/Button';
import useSubscribe from '../../hooks/useSubscribe';
import log from '../../utils/log';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin-top: 19rem;
  font-size: 4rem;
  font-weight: 700;
  letter-spacing: -0.8px;

  strong {
    color: ${(props) => props.theme.colors.orange100};
  }
`;

const Description = styled.h3`
  font-size: 2rem;
  font-weight: 500;
  line-height: 2.2rem;
  letter-spacing: -0.8px;
  color: ${(props) => props.theme.colors.gray400};
  margin-top: .8rem;
`;

const InformationBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: .4rem;
  border: 1px solid ${(props) => props.theme.colors.orange100};
  margin-top: 3.2rem;
  position: relative;

  > span:first-child {
    font-size: 2.4rem;
    font-weight: 700;
    letter-spacing: -0.48px;
    padding: 3.2rem 11.7rem;
    white-space: nowrap;
  }

  > span:nth-child(4) {
    font-size: 2rem;
    font-weight: 500;
    letter-spacing: -0.4px;
    margin-top: 4.6rem;
  }

  > span:nth-child(5) {
    font-size: 2.4rem;
    font-weight: 700;
    letter-spacing: -0.48px;
    margin-top: .4rem;
  }

  > span:nth-child(6) {
    color: ${(props) => props.theme.colors.gray400};
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 2.2rem;
    letter-spacing: -0.64px;
    margin-top: 1.6rem;
    margin-bottom: 3.1rem;
  }
`;

const Divider = styled.hr`
  width: 100%;
  border-top: 0.05px solid ${(props) => props.theme.colors.gray400};
`;

const More = styled.img`
  background: ${(props) => props.theme.colors.orange100};
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 4rem;
  position: absolute;
  top: 7.9rem;
  left: 17.6rem;
`;

const PayButton = styled(Button)`
  width: 37.3rem;
  height: 5.4rem;
  margin-top: 4.8rem;
  margin-bottom: 29.3rem;
`;

export default function SubscriptionInformation() {
  const router = useRouter();

  const { registerCreditCard, subscribe } = useSubscribe();

  const handleClickPay = async () => {
    try {
      const isRegistered = await registerCreditCard();

      if (isRegistered) {
        await subscribe(1002);
      }

      router.push('/papers');
    } catch (error) {
      log(error);
    }
  };

  const now = new Date();
  const twoWeeksLater = new Date(now.setDate(now.getDate() + 14));

  const billDueYear = twoWeeksLater.getFullYear();
  const billDueMonth = twoWeeksLater.getMonth() + 1;
  const billDueDate = twoWeeksLater.getDate();

  return (
    <Container>
      <Title>
        14일은
        {' '}
        <strong>무료</strong>
        예요!
      </Title>
      <Description>
        티플 구독, 간편하게 가입하세요
      </Description>
      <InformationBox>
        <span>14일 무료 체험</span>
        <Divider />
        <More src="/images/icons/expand-more.svg" alt="" />
        <span>
          {billDueYear}
          년
          {' '}
          {billDueMonth}
          월
          {' '}
          {billDueDate}
          일
          부터
        </span>
        <span>매달 9,900원 결제</span>
        <span>추가 요금 시험지 1건당 100원 추가</span>
      </InformationBox>
      <PayButton
        type="button"
        onClick={handleClickPay}
      >
        14일 무료체험 후 결제하기
      </PayButton>
    </Container>
  );
}
