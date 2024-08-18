import styled from 'styled-components';
import SelectBox from '../SelectBox';

const SelectBoxContainer = styled(SelectBox)`
  ul {
    max-height: 13.5rem;
    overflow-y: auto;
  }
`;

type QuestionTypeSelectBoxProps = {
  options: string[];
  questionNumber: number;
  selectedType: string;
  onSelect: ({ questionNumber, value }:{
    questionNumber: number;
    value: string;
  }) => void;
}

export default function QuestionTypeSelectBox({
  options, questionNumber, selectedType, onSelect,
}: QuestionTypeSelectBoxProps) {
  const handleClickOption = ({ value }: {
    value: string;
  }) => {
    onSelect({ questionNumber, value });
  };

  return (
    <SelectBoxContainer
      name="문제 유형"
      value={selectedType}
      options={options}
      onSelectOption={handleClickOption}
    />
  );
}
