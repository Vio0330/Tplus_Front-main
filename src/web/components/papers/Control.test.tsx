import { fireEvent, screen } from '@testing-library/react';

import { render } from '../../utils/test-helpers';

import Control from './Control';

const push = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    push,
  }),
}));

describe('Control', () => {
  const paperType = '전체';
  const handleSelect = jest.fn();
  const schools = [
    {
      name: '휘문고등학교',
      region: '서울',
    },
  ];

  it('renders test paper filters and create button', () => {
    render((
      <Control
        paperType={paperType}
        onSelect={handleSelect}
        schools={schools}
      />
    ));

    screen.getAllByText(/전체/);
    screen.getAllByText(/수능/);
    screen.getAllByText(/내신/);
    screen.getByText(/새로 생성/);
  });

  it('listens for create button click event', () => {
    render((
      <Control
        paperType={paperType}
        onSelect={handleSelect}
        schools={schools}
      />
    ));

    fireEvent.click(screen.getByText('새로 생성'));

    screen.getByText(/시험지 생성하기/);
  });
});
