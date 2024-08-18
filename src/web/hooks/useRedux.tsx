import {
  TypedUseSelectorHook,
  useDispatch as originUseDispatch,
  useSelector as originUseSelector,
} from 'react-redux';

import type { Dispatch, RootState } from '../redux/store';

type UseDispatch = () => Dispatch
export const useDispatch: UseDispatch = originUseDispatch;

export const useSelector: TypedUseSelectorHook<RootState> = originUseSelector;
