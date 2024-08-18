import styled from 'styled-components';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import {
  formatCurrency, sortDates, toDateKoreanFormat,
} from '../../utils';

import { BillingLog, SubscriptionStatus } from '../../types';

import useSubscribe from '../../hooks/useSubscribe';

import Button from '../ui/Button';
import OrangeButton from '../ui/OrangeButton';
import GrayButton from '../ui/GrayButton';
import { logout } from '../../services/apiService';
import log from '../../utils/log';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 45rem;

  > div:nth-child(2) {
    padding-bottom: 4.8rem;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray100};
  }

  > div:last-child {
    padding-bottom: 4.8rem;
    border-bottom: 1px solid ${(props) => props.theme.colors.gray100};
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray100};
`;

const Logout = styled.button`
  font-size: 1.6rem;
  font-weight: 500;
  padding-right: 15rem;
  color: ${(props) => props.theme.colors.gray400};
`;

const Title = styled.div`
  font-size: 2.8rem;
  font-weight: 700;
  padding-inline: 15rem;
  display: flex;
  align-items: center;
  height: 8.2rem;
  letter-spacing: -0.56px;
`;

const MyData = styled.div`
  padding-inline: 15rem;
  padding-top: 4.8rem;
  display: flex;
  width: 100%;
  align-items: flex-start;
`;

const ReceiptDataWrapper = styled.div`
  height: 45.6rem;
  overflow-y: auto;
`;

const MyReceiptData = styled.div`
  display: ${(props: { isVisible: boolean }) => (props.isVisible ? 'flex' : 'none')};
  align-items: flex-start;
  padding-inline: 15rem;
  padding-top: 4.8rem;
  width: 100%;
`;

const DataLabel = styled.div`
  font-size: 1.6rem;
  font-weight: 500;
  width: 17.3%;
  line-height: 2.2rem;
  letter-spacing: -0.64px;
  color: ${(props) => props.theme.colors.gray400};
`;

const DataWrapper = styled.div`
  display: flex;
  column-gap: 4.8rem;
`;

const DataContent = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: .8rem;
`;

const Data = styled.span`
  font-size: 2.4rem;
  font-weight: 700;
  letter-spacing: -0.48px;
`;

const DataDescription = styled.span`
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.2rem;
  letter-spacing: -0.64px;
`;

const PlusText = styled.span`
  font-size: 1.6rem;
  font-weight: 500;
  padding-left: 4.8rem;
  line-height: 2.2rem;
  letter-spacing: -0.64px;
`;

const SubscribeButton = styled(OrangeButton)`
  padding: 0.65rem 1.6rem;
`;

const UnsubscribeButton = styled(GrayButton)`
  padding: 0.65rem 1.6rem;
`;

const ButtonWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ReceiptButton = styled(Button)`
  font-size: 1.6rem;
  font-weight: 500;
  line-height: 2.2rem;
  letter-spacing: -0.64px;
  color: ${(props) => props.theme.colors.gray400};
  padding: 0;
  background: transparent;
  filter: brightness(0) saturate(100%) invert(70%) sepia(15%) saturate(130%) hue-rotate(169deg) brightness(91%) contrast(88%);
`;

type MySubscriptionProps = {
  type: string;
  expiredAt: string;
  nextPaymentAt: string,
  billingLogs: BillingLog[],
  username: string;
  contact: string;
}

export default function MySubscription({
  type,
  expiredAt,
  nextPaymentAt,
  billingLogs,
  username,
  contact,
}: MySubscriptionProps) {
  const router = useRouter();

  const [showAll, setShowAll] = useState(false);

  const {
    processing, registerCreditCard, subscribe, unsubscribe,
  } = useSubscribe({ username, contact });

  useEffect(() => {
    if (processing === 'completion') {
      router.push('/my');
    }
  }, [processing]);

  const expiredDate = new Date(expiredAt);
  const now = new Date();
  const isAvaliablePeriod = expiredDate >= now;

  const handleClickUnsubscribe = async () => {
    await unsubscribe();
  };

  const handleClickSubscribe = async () => {
    try {
      const isRegistered = await registerCreditCard();

      if (isRegistered) {
        await subscribe(1002);
      }

      router.push('/my');
    } catch (error) {
      log(error);
    }
  };

  const handleClickReceipt = () => {
    setShowAll(!showAll);
  };

  const handleClickLogout = async () => {
    await logout();

    router.push('/');
  };

  const arrangedBillingLogs = (billingLogs || [])
    .filter((log) => log.merchandise !== '1004')
    .map((log) => ({
      id: log.id,
      paymentDate: toDateKoreanFormat(log.createdAt),
      price: log.price,
      type: log.merchandise,
    }));

  const dateArray = arrangedBillingLogs.reduce((acc, cur) => {
    if (acc.includes(cur.paymentDate)) {
      return acc;
    }

    return [
      ...acc,
      cur.paymentDate,
    ];
  }, [] as string[]);

  const sortedDate = sortDates(dateArray);

  return (
    <Container>
      <Wrapper>
        <Title>
          마이페이지
        </Title>
        <Logout
          type="button"
          onClick={handleClickLogout}
        >
          로그아웃
        </Logout>
      </Wrapper>
      <MyData>
        <DataLabel>구독권</DataLabel>
        <DataWrapper>
          <DataContent>
            <Data>{type}</Data>
            {type === SubscriptionStatus.Active || type === SubscriptionStatus.Promotion ? (
              <DataDescription>
                {new Date(nextPaymentAt).getFullYear()}
                년
                {' '}
                {new Date(nextPaymentAt).getMonth() + 1}
                월
                {' '}
                {new Date(nextPaymentAt).getDate()}
                일
                {' '}
                결제 예정
              </DataDescription>
            ) : null}
            {type === SubscriptionStatus.InActive && isAvaliablePeriod ? (
              <DataDescription>
                {expiredDate.getFullYear()}
                년
                {' '}
                {expiredDate.getMonth() + 1}
                월
                {' '}
                {expiredDate.getDate()}
                일
                {' '}
                까지 사용 가능
              </DataDescription>
            ) : null}
            {type === SubscriptionStatus.InActive && !isAvaliablePeriod
              ? (
                <DataDescription>
                  지금 바로 결제해보세요!
                </DataDescription>
              ) : null}
          </DataContent>
        </DataWrapper>
        <ButtonWrapper>
          {type === SubscriptionStatus.InActive ? (
            <SubscribeButton
              type="button"
              onClick={handleClickSubscribe}
              disabled={processing === 'processing'}
            >
              구독시작
            </SubscribeButton>
          ) : null}
          {type === SubscriptionStatus.Active || type === SubscriptionStatus.Promotion ? (
            <UnsubscribeButton
              type="button"
              onClick={handleClickUnsubscribe}
              disabled={processing === 'processing'}
            >
              구독해지
            </UnsubscribeButton>
          ) : null}
        </ButtonWrapper>
      </MyData>
      <ReceiptDataWrapper>
        {sortedDate.map((date, index) => {
          const payments = arrangedBillingLogs
            .filter((log) => log.paymentDate === date);

          return (
            <MyReceiptData key={date} isVisible={showAll || index === 0}>
              <DataLabel>
                {date}
              </DataLabel>
              {payments.map((payment) => {
                if (payment.type === '정기 결제') {
                  return (
                    <DataWrapper key={payment.id}>
                      <DataContent>
                        <Data>
                          {formatCurrency(payment.price)}
                          원
                        </Data>
                        <DataDescription>기본 요금 과금</DataDescription>
                      </DataContent>
                    </DataWrapper>
                  );
                }

                if (payment.type === '추가 결제') {
                  return (
                    <DataWrapper key={payment.id}>
                      <PlusText>+</PlusText>
                      <DataContent>
                        <Data>
                          {formatCurrency(payment.price)}
                          원
                        </Data>
                        <DataDescription>사용량에 따른 과금</DataDescription>
                      </DataContent>
                    </DataWrapper>
                  );
                }

                return null;
              })}
              <ButtonWrapper>
                {index === 0 ? (
                  <ReceiptButton
                    type="button"
                    onClick={handleClickReceipt}
                  >
                    이전 결제 내역
                    <img alt="" src="/images/icons/expand-more.svg" />
                  </ReceiptButton>
                ) : ''}
              </ButtonWrapper>
            </MyReceiptData>
          );
        })}
      </ReceiptDataWrapper>
    </Container>
  );
}
