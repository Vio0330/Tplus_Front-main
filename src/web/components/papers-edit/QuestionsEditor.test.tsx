import { fireEvent, screen } from '@testing-library/react';

import { render } from '../../utils/test-helpers';

import QuestionsEditor from './QuestionsEditor';

describe('QuestionsEditor', () => {
  const questions = [
    {
      number: 1,
      type: '문제 유형',
    },
    {
      number: 2,
      type: '문제 유형',
    },
  ];

  const questionType = [
    {
      name: '어법',
    },
  ];

  const addQuestion = jest.fn();
  const changeQuestionTypeField = jest.fn();
  const removeQuestion = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders QuestionsEditor', () => {
    render((
      <QuestionsEditor
        passageNumber={1}
        questions={questions}
        questionType={questionType}
        onAddQuestion={addQuestion}
        onChangeType={changeQuestionTypeField}
        onDeleteQuestion={removeQuestion}
      />
    ));

    screen.getByText(/문제 추가/);
  });

  it('listens for add question button click event', () => {
    render((
      <QuestionsEditor
        passageNumber={1}
        questions={questions}
        questionType={questionType}
        onAddQuestion={addQuestion}
        onChangeType={changeQuestionTypeField}
        onDeleteQuestion={removeQuestion}
      />
    ));

    fireEvent.click(screen.getByText('문제 추가'));

    expect(addQuestion).toBeCalled();
  });
});
