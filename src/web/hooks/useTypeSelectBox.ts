import { useState } from 'react';

export default function useTypeSelectBox() {
  const [questionType, setQuestionType] = useState('');

  const handleClickOption = ({ value }: {
    value: string;
  }) => {
    setQuestionType(value);
  };

  return { questionType, handleClickOption };
}
