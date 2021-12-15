import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import locationsReducer from '../features/locations/locationSlice';
import forecastReducer from '../features/forecasts/forecastsSlice';

export const store = configureStore({
  reducer: {
    locations: locationsReducer,
    forecast: forecastReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
