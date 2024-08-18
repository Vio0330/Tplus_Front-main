import { useEffect, useState } from 'react';

export default function useFilterPaper() {
  const [paperType, setPaperType] = useState('전체');

  useEffect(() => {
    setPaperType('전체');
  }, []);

  const selectPaperType = (selectedPaperType: string) => {
    setPaperType(selectedPaperType);
  };

  return {
    paperType,
    selectPaperType,
  };
}
