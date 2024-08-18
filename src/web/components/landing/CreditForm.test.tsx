import { fireEvent, screen } from '@testing-library/react';

import { render } from '../../utils/test-helpers';

import CreditForm from './CreditForm';

const push = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    push,
  }),
}));

describe('CreditForm', () => {
  it('renders form message', () => {
    render(<CreditForm />);

    screen.getByText(/학교별 시험지/);
  });

  it('listens for submit button click event', () => {
    render(<CreditForm />);

    fireEvent.click(screen.getByText('제출하기'));
  });
});
