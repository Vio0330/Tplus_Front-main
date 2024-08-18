import { combineReducers } from '@reduxjs/toolkit';

import creditReducer from './creditSlice';
import paperReducer from './paperSlice';

export default combineReducers({
  credit: creditReducer,
  paper: paperReducer,
});
