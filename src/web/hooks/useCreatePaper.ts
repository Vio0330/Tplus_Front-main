import { useState } from 'react';

export default function useCreatePaper() {
  const [paper, setPaper] = useState<{
    type: string;
    grade: string;
    school?: string;
  }>({
    type: '',
    grade: '',
    school: '',
  });

  const isValid = () => {
    const { type, grade, school } = paper;

    if (type === '수능') {
      return !!grade;
    }

    if (type === '내신') {
      return !!grade && !!school;
    }

    return false;
  };

  const clear = () => {
    setPaper({
      ...paper,
      type: '',
      grade: '',
      school: '',
    });
  };

  const handleSelectOption = ({
    name, value,
  }: {
    name: string;
    value: string;
  }) => {
    if (name === 'type' && value === '수능') {
      setPaper({
        ...paper,
        school: '',
        [name]: value,
      });

      return;
    }
    setPaper({
      ...paper,
      [name]: value,
    });
  };

  return {
    paper,
    isValid,
    handleSelectOption,
    clear,
  };
}
