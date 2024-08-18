import { useEffect } from 'react';

import { useDispatch, useSelector } from './useRedux';

import { get } from '../utils';

import { PaperDetail } from '../types';

import {
  changePaperName,
  changePassageContent,
  changePassageTitle,
  changeQuestionType,
  createPassage,
  createQuestion,
  deletePassage,
  deleteQuestion,
  requestSavePaper,
  requestGeneratePaper,
  setPaper,
  stopProcessing,
  deletePassageContent, occurError,
} from '../redux/paperSlice';

export default function usePaperEdit(paperDetail?: PaperDetail) {
  const dispatch = useDispatch();

  const {
    id, name, type, grade, school, passages,
    processing, completion, error,
  } = useSelector(get('paper'));

  useEffect(() => {
    dispatch(stopProcessing());
  }, []);

  useEffect(() => {
    if (paperDetail) {
      const paper = paperDetail?.passages?.length >= 1 ? paperDetail : {
        ...paperDetail,
        passages: [
          {
            title: '지문 1',
            number: 1,
            questions: [],
          },
        ],
      };

      dispatch(setPaper({ paper }));
    }
  }, [paperDetail]);

  const clear = () => {
    dispatch(stopProcessing());
  };

  const changePaperNameField = (paperName: string) => {
    dispatch(changePaperName({ value: paperName }));
  };

  const addPassage = () => {
    dispatch(createPassage());
  };

  const removePassage = (number: number) => {
    dispatch(deletePassage({ number }));
  };

  const changePassageTitleField = ({ number, title }: {
    number: number;
    title: string;
  }) => {
    dispatch(changePassageTitle({
      number,
      title,
    }));
  };

  const changePassageContentField = ({ number, content }: {
    number: number;
    content: string;
  }) => {
    dispatch(changePassageContent({
      number,
      content,
    }));
  };

  const clearPassageContentField = ({ number }: {
    number: number;
  }) => {
    dispatch(deletePassageContent({ number }));
  };

  const addQuestion = ({ passageNumber }: { passageNumber: number; }) => {
    dispatch(createQuestion({ passageNumber }));
  };

  const changeQuestionTypeField = ({
    passageNumber, questionNumber, questionType,
  }: {
    passageNumber: number;
    questionNumber: number;
    questionType: string;
  }) => {
    dispatch(changeQuestionType({
      passageNumber,
      questionNumber,
      type: questionType,
    }));
  };

  const removeQuestion = ({
    passageNumber, questionNumber,
  }: {
    passageNumber: number;
    questionNumber: number;
  }) => {
    dispatch(deleteQuestion({
      passageNumber,
      questionNumber,
    }));
  };

  const save = () => {
    dispatch(requestSavePaper());
  };

  const generate = () => {
    dispatch(requestGeneratePaper());
  };

  const setError = (value: string) => {
    dispatch(occurError({ error: value }));
  };

  return {
    paperDetail: {
      id, name, type, grade, school, passages,
    } as PaperDetail,
    processing,
    completion,
    error,
    clear,
    addPassage,
    removePassage,
    deletePassage,
    changePaperNameField,
    changePassageTitleField,
    changePassageContentField,
    clearPassageContentField,
    addQuestion,
    changeQuestionTypeField,
    removeQuestion,
    save,
    generate,
    setError,
  };
}
