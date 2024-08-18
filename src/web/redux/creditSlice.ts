import { createSlice } from '@reduxjs/toolkit';

import { ThunkAction } from './store';

import { CreditForm } from '../types';

import { postCredit } from '../services/apiService';

const initialState: CreditForm = {
  form: {
    school: '',
    grade: '',
    year: '',
    email: '',
  },
  processing: false,
  completion: false,
};

const { actions, reducer } = createSlice({
  name: 'credit',
  initialState,
  reducers: {
    clearFields: (state: CreditForm) => ({
      ...state,
      ...initialState,
    }),
    changeField: (state: CreditForm, {
      payload: { name, value },
    }) => ({
      ...state,
      form: {
        ...state.form,
        [name]: value,
      },
    }),
    startProcessing: (state: CreditForm) => ({
      ...state,
      processing: true,
      completion: false,
    }),
    stopProcessing: (state: CreditForm) => ({
      ...state,
      processing: false,
      completion: false,
    }),
    complete: (state: CreditForm) => ({
      ...state,
      processing: false,
      completion: true,
    }),
  },
});

export const {
  clearFields,
  changeField,
  startProcessing,
  stopProcessing,
  complete,
} = actions;

export function requestCredit(): ThunkAction<void> {
  return async (dispatch, getState) => {
    dispatch(startProcessing());

    const { credit } = getState();

    const {
      school, grade, year, email,
    } = credit.form;

    try {
      await postCredit({
        form: {
          school,
          grade,
          year,
          email,
        },
      });

      dispatch(complete());
    } catch (error) {
      dispatch(stopProcessing());
    }
  };
}

export default reducer;
