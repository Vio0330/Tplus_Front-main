import { fireEvent, screen } from '@testing-library/react';

import { render } from '../../utils/test-helpers';

import Login from './Login';

const push = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    push,
  }),
}));

describe('Login', () => {
  it('renders login page', () => {
    render(<Login />);

    screen.getByText(/Teacher Plus/);
  });

  it('listens for kakao login button click event', () => {
    render(<Login />);

    fireEvent.click(screen.getByTestId('login'));

    // TODO: 로그인 버튼 클릭 테스트
  });
});
