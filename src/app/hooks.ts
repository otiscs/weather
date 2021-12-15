import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppNavigate: () => ReturnType<typeof useNavigate> = useNavigate;
export const useAppEffect: (effect: () => void, deps: Array<any>) => void = useEffect;
export const useAppCookies: () => ReturnType<typeof useCookies> = useCookies;
export const useAppLocation: () => ReturnType<typeof useLocation> = useLocation;
