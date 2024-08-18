import styled from 'styled-components';

import { Passage, QuestionType } from '../../types';

import usePaperEdit from '../../hooks/usePaperEdit';

import PassagesEditor from './PassageEditor';
import QuestionsEditor from './QuestionsEditor';

const Container = styled.div`
  width: 72%;
  border-right: 1px solid ${(props) => props.theme.colors.gray100};
  padding-right: 2.4rem;
`;

type EditorProps = {
  selectedPassageNumber: number;
  questionType: QuestionType;
}
export default function Editor({
  selectedPassageNumber, questionType,
}: EditorProps) {
  const {
    paperDetail,
    changePassageTitleField,
    changePassageContentField, clearPassageContentField,
    addQuestion, changeQuestionTypeField, removeQuestion,
  } = usePaperEdit();

  const { passages } = paperDetail;

  if (!passages.length) {
    return null;
  }

  const selectedPassage = passages
    .find((passage: Passage) => passage.number === selectedPassageNumber)
    || paperDetail.passages[0];

  const { questions = [] } = selectedPassage;

  return (
    <Container>
      <PassagesEditor
        selectedPassage={selectedPassage}
        onChangeTitle={changePassageTitleField}
        onChangeContent={changePassageContentField}
        onClearPassageContent={clearPassageContentField}
      />
      <QuestionsEditor
        passageNumber={selectedPassage.number}
        questions={questions}
        onAddQuestion={addQuestion}
        onChangeType={changeQuestionTypeField}
        onDeleteQuestion={removeQuestion}
        questionType={questionType}
      />
    </Container>
  );
}
