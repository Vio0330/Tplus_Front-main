import styled from 'styled-components';

import { Question, QuestionType } from '../../types';

import WhiteButton from '../ui/WhiteButton';
import GrayButton from '../ui/GrayButton';

import QuestionTypeSelectBox from './QuestionTypeSelectBox';

const AddQuestionButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 3.2rem;
`;

const AddQuestionButton = styled(WhiteButton)`
  width: 10.3rem;
  height: 3.2rem;
  padding: .6rem 1.6rem .6rem .8rem;
  white-space: nowrap;
  display: flex;

  img {
    filter: brightness(0) saturate(100%) invert(65%) sepia(27%) saturate(4694%) hue-rotate(342deg) brightness(98%) contrast(99%);
    margin-right: .2rem;
  }
`;

const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1.6rem;
  margin-block: 1.6rem;
  height: 20.65rem;
  overflow-y: auto;
`;

const QuestionItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

const QuestionTitle = styled.p`
  font-size: 2.4rem;
  font-weight: 500;
  letter-spacing: -0.96px;
`;

const QuestionControlWrapper = styled.div`
  display: flex;
  column-gap: .8rem;
`;

const DeleteButton = styled(GrayButton)`
  width: 6rem;
  height: 3.2rem;
  white-space: nowrap;
`;

type QuestionsEditorProps = {
  passageNumber: number;
  questions: Question[];
  questionType: QuestionType;
  onAddQuestion: ({ passageNumber }: { passageNumber: number; }) => void;
  onChangeType: ({ passageNumber, questionNumber, questionType }: {
    passageNumber: number;
    questionNumber: number;
    questionType: string;
  }) => void;
  onDeleteQuestion: ({ passageNumber, questionNumber }: {
    passageNumber: number;
    questionNumber: number;
  }) => void;
}

export default function QuestionsEditor({
  passageNumber, questions, questionType,
  onAddQuestion, onChangeType, onDeleteQuestion,
}: QuestionsEditorProps) {
  const questionTypeOptions = (questionType || []).map(({ name }) => name);

  const handleClickAddQuestion = () => {
    onAddQuestion({ passageNumber });
  };

  const handleClickDelete = (questionNumber: number) => {
    onDeleteQuestion({ passageNumber, questionNumber });
  };

  const handleSelectType = ({ questionNumber, value }: {
    questionNumber: number;
    value: string;
  }) => {
    onChangeType({
      passageNumber,
      questionNumber,
      questionType: value,
    });
  };

  return (
    <>
      <AddQuestionButtonWrapper>
        <AddQuestionButton
          type="button"
          onClick={handleClickAddQuestion}
        >
          <img src="/images/icons/add.svg" alt="" />
          문제 추가
        </AddQuestionButton>
      </AddQuestionButtonWrapper>
      <QuestionList>
        {questions.map((question: Question) => (
          <QuestionItem key={question.number}>
            <QuestionTitle>
              문제
              {' '}
              {question.number}
            </QuestionTitle>
            <QuestionControlWrapper>
              <QuestionTypeSelectBox
                options={questionTypeOptions || []}
                questionNumber={question.number}
                selectedType={question.type}
                onSelect={handleSelectType}
              />
              <DeleteButton
                type="button"
                onClick={() => handleClickDelete(question.number)}
                data-testid="delete"
              >
                삭제
              </DeleteButton>
            </QuestionControlWrapper>
          </QuestionItem>
        ))}
      </QuestionList>
    </>
  );
}
