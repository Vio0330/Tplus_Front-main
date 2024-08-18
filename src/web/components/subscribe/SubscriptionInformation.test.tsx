import { screen } from '@testing-library/react';

import { render } from '../../utils/test-helpers';

import SubscriptionInformation from './SubscriptionInformation';

const push = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    push,
  }),
}));

describe('SubscriptionInformation', () => {
  it('renders Inquiry Banner', () => {
    render((
      <SubscriptionInformation />
    ));

    screen.getByText(/티플 구독, 간편하게 가입하세요/);
    screen.getByText(/14일 무료 체험/);
  });

  it('renders subscription button', () => {
    render((
      <SubscriptionInformation />
    ));

    screen.getByText('14일 무료체험 후 결제하기');
  });
});
