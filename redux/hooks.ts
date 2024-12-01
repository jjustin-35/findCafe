import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import { RootState, AppDispatch } from '@/config/configureStore';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
