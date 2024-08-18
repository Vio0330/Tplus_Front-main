import { fireEvent, screen } from '@testing-library/react';

import { render } from '../../utils/test-helpers';

import Header from './Header';

const push = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    push,
  }),
}));

const context = describe;

describe('Header', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders company name', () => {
    render((
      <Header
        loggedIn={false}
        profileImage=""
      />
    ));

    screen.getByText(/티플/);
  });

  it('listens for logo button click event', () => {
    render((
      <Header
        loggedIn={false}
        profileImage=""
      />
    ));

    fireEvent.click(screen.getByText('티플'));

    expect(push).toBeCalledWith('/');
  });

  context('without logged in user', () => {
    it('listens for login button click event', () => {
      render((
        <Header
          loggedIn={false}
          profileImage=""
        />
      ));

      fireEvent.click(screen.getByTestId('login'));
    });
  });

  context('with logged in user', () => {
    it('listens for profile button click event', () => {
      render((
        <Header
          loggedIn
          profileImage=""
        />
      ));

      fireEvent.click(screen.getByTestId('profile'));

      expect(push).toBeCalledWith('/my');
    });
  });
});
