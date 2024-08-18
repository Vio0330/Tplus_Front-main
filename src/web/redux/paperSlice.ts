import { createSlice } from '@reduxjs/toolkit';

import { ThunkAction } from './store';

import {
  validatePassageContent, validateQuestion, validateQuestionType,
} from '../utils/validator';

import { generatePaper, savePaper } from '../services/apiService';

import {
  Passage, PaperDetail, Question,
} from '../types';

export type PaperEditForm = PaperDetail & {
  processing: boolean;
  completion: boolean;
  error: string;
}

const initialState: PaperEditForm = {
  id: 0,
  name: '',
  type: '',
  grade: '',
  school: '',
  passages: [],
  processing: false,
  completion: false,
  error: '',
};

function generateNumber(numbers: number[]) {
  if (numbers.length === 0) {
    return 1;
  }

  return Math.max(...numbers) + 1;
}

const { actions, reducer } = createSlice({
  name: 'paper',
  initialState,
  reducers: {
    setPaper: (state: PaperEditForm, { payload: { paper } }) => ({
      ...state,
      ...paper,
    }),
    occurError: (state: PaperEditForm, { payload: { error } }) => ({
      ...state,
      error,
    }),
    changePaperName: (state: PaperEditForm, {
      payload: { value },
    }) => ({
      ...state,
      name: value,
    }),
    createPassage: (state: PaperEditForm) => {
      const numbers = state.passages.map(({ number }) => number);
      const passageNumber = generateNumber(numbers);

      return {
        ...state,
        passages: [
          ...state.passages,
          {
            number: passageNumber,
            title: `지문 ${passageNumber}`,
            questions: [] as Question[],
          },
        ],
      };
    },
    changePassageTitle: (state: PaperEditForm, {
      payload: { number, title },
    }) => ({
      ...state,
      passages: state.passages.map((passage: Passage) => {
        if (passage.number === number) {
          return {
            ...passage,
            title,
          };
        }

        return passage;
      }),
    }),
    changePassageContent: (state: PaperEditForm, {
      payload: { number, content },
    }) => ({
      ...state,
      passages: state.passages.map((passage: Passage) => {
        if (passage.number === number) {
          return {
            ...passage,
            content,
          };
        }

        return passage;
      }),
    }),
    deletePassageContent: (state: PaperEditForm, {
      payload: { number },
    }) => ({
      ...state,
      passages: state.passages.map((passage: Passage) => {
        if (passage.number === number) {
          return {
            title: passage.title,
            number: passage.number,
            questions: passage.questions,
          };
        }

        return passage;
      }),
    }),
    deletePassage: (state: PaperEditForm, {
      payload: { number },
    }) => ({
      ...state,
      passages: state.passages.filter((passage: Passage) => passage.number !== number),
    }),
    createQuestion: (state: PaperEditForm, {
      payload: { passageNumber },
    }) => {
      const numbers = state.passages
        .find((passage: Passage) => passage.number === passageNumber)
        ?.questions.map((question: Question) => question.number);

      const questionNumber = generateNumber(numbers as number[]);

      return {
        ...state,
        passages: state.passages.map((passage: Passage) => {
          if (passage.number === passageNumber) {
            return {
              ...passage,
              questions: [
                ...passage.questions,
                {
                  number: questionNumber,
                  type: '',
                },
              ],
            };
          }

          return passage;
        }),
      };
    },
    changeQuestionType: (state: PaperEditForm, {
      payload: { passageNumber, questionNumber, type },
    }) => ({
      ...state,
      passages: state.passages.map((passage: Passage) => {
        if (passage.number === passageNumber) {
          const { questions } = passage;

          const updatedQuestions = questions.map((question: Question) => {
            if (question.number === questionNumber) {
              return {
                ...question,
                type,
              };
            }
            return question;
          });

          return {
            ...passage,
            questions: updatedQuestions,
          };
        }

        return passage;
      }),
    }),
    deleteQuestion: (state: PaperEditForm, {
      payload: { passageNumber, questionNumber },
    }) => ({
      ...state,
      passages: state.passages.map((passage: Passage) => {
        if (passage.number === passageNumber) {
          return {
            ...passage,
            questions: passage.questions
              .filter((question: Question) => question.number !== questionNumber),
          };
        }

        return passage;
      }),
    }),
    startProcessing: (state: PaperEditForm) => ({
      ...state,
      processing: true,
      completion: false,
    }),
    stopProcessing: (state: PaperEditForm) => ({
      ...state,
      processing: false,
      completion: false,
    }),
    complete: (state: PaperEditForm) => ({
      ...state,
      processing: false,
      completion: true,
    }),
  },
});

export const {
  setPaper,
  changePaperName,
  createPassage,
  changePassageTitle,
  changePassageContent,
  deletePassageContent,
  deletePassage,
  createQuestion,
  changeQuestionType,
  deleteQuestion,
  startProcessing,
  stopProcessing,
  complete,
  occurError,
} = actions;

export function requestSavePaper(): ThunkAction<void> {
  return async (dispatch, getState) => {
    const { paper } = getState();

    const {
      id, name, type, grade, school, passages,
    } = paper;

    try {
      dispatch(startProcessing());

      await savePaper({
        paper: {
          id, name, type, grade, school, passages,
        },
      });

      dispatch(complete());
    } catch (error) {
      dispatch(stopProcessing());
    }
  };
}

export function requestGeneratePaper(): ThunkAction<void> {
  return async (dispatch, getState) => {
    const { paper } = getState();

    const {
      id, passages,
    } = paper;

    const isPassageContentValid = passages
      .every((passage) => validatePassageContent(passage));

    const isQuestionValid = passages
      .every((passage) => validateQuestion(passage));

    const isQuestionTypeValid = passages
      .every((passage) => validateQuestionType(passage));

    try {
      if (!isPassageContentValid) {
        dispatch(occurError({ error: '본문이 비어있습니다.' }));
        return;
      }

      if (!isQuestionValid) {
        dispatch(occurError({ error: '문제가 비어있습니다.' }));
        return;
      }

      if (!isQuestionTypeValid) {
        dispatch(occurError({ error: '문제 유형이 비어있습니다.' }));
        return;
      }

      dispatch(startProcessing());

      await generatePaper({
        id, passages,
      });

      dispatch(complete());
    } catch (error) {
      dispatch(stopProcessing());
    }
  };
}

export default reducer;
