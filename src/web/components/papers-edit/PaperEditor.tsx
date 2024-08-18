import { useState } from 'react';

import styled from 'styled-components';

import PassageList from './PassageList';
import Editor from './Editor';
import { QuestionType } from '../../types';

const EditorContent = styled.div`
  display: flex;
  padding-inline: 15rem;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray100};
`;

export default function PaperEditor({ questionType }: {
  questionType: QuestionType
}) {
  const [selectedPassageNumber, selectPassage] = useState(0);

  const handleSelectPassage = (passageNumber: number) => {
    selectPassage(passageNumber);
  };
  return (
    <EditorContent>
      <Editor
        selectedPassageNumber={selectedPassageNumber}
        questionType={questionType}
      />
      <PassageList
        selectedPassageNumber={selectedPassageNumber}
        onSelectPassage={handleSelectPassage}
      />
    </EditorContent>
  );
}
