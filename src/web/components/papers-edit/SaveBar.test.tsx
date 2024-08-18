import { fireEvent, screen } from '@testing-library/react';

import { render } from '../../utils/test-helpers';

import SaveBar from './SaveBar';

const push = jest.fn();

jest.mock('next/router', () => ({
  useRouter: () => ({
    push,
  }),
}));

const onClickSave = jest.fn();
const onClickGenerate = jest.fn();

describe('QuestionsEditor', () => {
  it('renders QuestionsEditor', () => {
    render((
      <SaveBar
        isLoading={false}
        onClickSave={onClickSave}
        onClickGenerate={onClickGenerate}
      />
    ));

    screen.getByText(/저장/);
    screen.getAllByText(/시험지 생성/);
  });

  it('listens for save button click event', () => {
    render((
      <SaveBar
        isLoading={false}
        onClickSave={onClickSave}
        onClickGenerate={onClickGenerate}
      />
    ));

    fireEvent.click(screen.getByText('저장'));
  });

  it('listens for create button click event', () => {
    render((
      <SaveBar
        isLoading={false}
        onClickSave={onClickSave}
        onClickGenerate={onClickGenerate}
      />
    ));

    fireEvent.click(screen.getByText('시험지 생성'));
  });
});
