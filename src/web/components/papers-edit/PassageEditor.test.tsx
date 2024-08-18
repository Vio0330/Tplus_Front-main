import {
  fireEvent, screen,
} from '@testing-library/react';

import { render } from '../../utils/test-helpers';

import { Passage } from '../../types';

import PassageEditor from './PassageEditor';

const context = describe;

describe('PassageEditor', () => {
  const selectedPassage: Passage = {
    title: '지문 1',
    content: '',
    number: 1,
    questions: [],
  };

  const handleChangeTitle = jest.fn();
  const handleChangeContent = jest.fn();
  const handleClearPassageContent = jest.fn();

  function renderPassageEditor(passage: Passage) {
    render((
      <PassageEditor
        selectedPassage={passage}
        onChangeTitle={handleChangeTitle}
        onChangeContent={handleChangeContent}
        onClearPassageContent={handleClearPassageContent}
      />
    ));
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders passage editor', () => {
    renderPassageEditor(selectedPassage);

    screen.getByText(/본문 직접 입력/);
    screen.getByText(/본문 자동 생성/);
  });

  it('listens for passage title change event', () => {
    renderPassageEditor(selectedPassage);

    fireEvent.change(screen.getByLabelText('지문 제목'), {
      target: {
        value: '변경된 지문 제목',
      },
    });

    expect(handleChangeTitle).toBeCalledWith({
      number: selectedPassage.number,
      title: '변경된 지문 제목',
    });
  });

  context('with passage content', () => {
    const value = '직접 입력한 본문';
    it('listens for content change event', () => {
      renderPassageEditor(selectedPassage);

      fireEvent.click(screen.getByText('본문 직접 입력'));

      fireEvent.change(screen.getByLabelText('지문 내용'), {
        target: {
          value,
        },
      });

      expect(handleChangeContent).toBeCalledWith({
        number: selectedPassage.number,
        content: value,
      });
    });
  });

  context('without content', () => {
    it('renders auto generate message', () => {
      renderPassageEditor(selectedPassage);

      fireEvent.click(screen.getByText('본문 자동 생성'));

      screen.getByText(/문제지 생성 시 AI로 본문이 함께 생성됩니다./);

      expect(handleClearPassageContent).toBeCalledWith({
        number: selectedPassage.number,
      });
    });
  });
});
