import {
  Action,
  configureStore,
  ThunkAction as originThunkAction,
} from '@reduxjs/toolkit';

import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type Dispatch = typeof store.dispatch
export type ThunkAction<R> = originThunkAction<R, RootState, unknown, Action>
