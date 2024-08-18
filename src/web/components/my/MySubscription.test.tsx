import { fireEvent, screen } from '@testing-library/react';

import { render } from '../../utils/test-helpers';

import MySubscription from './MySubscription';

import { SubscriptionStatus } from '../../types';

const nextPaymentAt = '2024-04-25T16:39:06.619564+09:00';

const billingLogs = [
  {
    id: 1,
    merchandise: '정기 결제',
    price: 9900,
    createdAt: '2024-04-12 00:00.00',
  },
  {
    id: 2,
    merchandise: '추가 결제',
    price: 700,
    createdAt: '2024-04-12 00:00.00',
  },
  {
    id: 3,
    merchandise: '정기 결제',
    price: 9900,
    createdAt: '2024-03-12 00:00.00',
  },
  {
    id: 4,
    merchandise: '추가 결제',
    price: 800,
    createdAt: '2024-03-12 00:00.00',
  },
];

const push = jest.fn();

const registerCreditCard = jest.fn();
const subscribe = jest.fn();
const unsubscribe = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    push,
  }),
}));

jest.mock('../../hooks/useSubscribe', () => () => ({
  registerCreditCard,
  subscribe,
  unsubscribe,
}));

describe('MySubscription', () => {
  const type = SubscriptionStatus.Active;
  const expiredAt = '2024-04-08 00:00.00';

  it('renders My Subscription', () => {
    render((
      <MySubscription
        type={type}
        expiredAt={expiredAt}
        nextPaymentAt={nextPaymentAt}
        billingLogs={billingLogs}
        username="username"
        contact="010-1234-5678"
      />
    ));

    screen.getByText(/구독권/);
    screen.getByText(/매달 9,900원 결제/);
  });

  it('listens for subscribe button click event', () => {
    render((
      <MySubscription
        type={type}
        expiredAt={expiredAt}
        nextPaymentAt={nextPaymentAt}
        billingLogs={billingLogs}
        username="username"
        contact="010-1234-5678"
      />
    ));

    fireEvent.click(screen.getByText(/구독해지/));

    expect(unsubscribe).toBeCalled();
  });

  it('listens for receipt button click event', () => {
    render((
      <MySubscription
        type={type}
        expiredAt={expiredAt}
        nextPaymentAt={nextPaymentAt}
        billingLogs={billingLogs}
        username="username"
        contact="010-1234-5678"
      />
    ));

    fireEvent.click(screen.getByText('이전 결제 내역'));
  });
});
