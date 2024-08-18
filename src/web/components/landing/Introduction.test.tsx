import { fireEvent, screen } from '@testing-library/react';

import { render } from '../../utils/test-helpers';

import Introduction from './Introduction';

const push = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    push,
  }),
}));

describe('Introduction', () => {
  it('renders introduction message', () => {
    render(<Introduction />);

    screen.getByText(/꼭 맞는 영어 문항/);
  });

  it('listens for inquiry button click event', () => {
    render(<Introduction />);

    fireEvent.click(screen.getByText('서비스 이용하기'));

    push('/papers');
  });
});
