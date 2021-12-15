import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import api from '../../apis';

export interface ForecastState {
  loading: boolean;
  error: any;
  forecast: any;
}

export interface IForecast {
  cod: string;
  message: number;
  cnt: number;
  list: Array<{
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    // rain: {
    //   3h: number;
    // };
    sys: {
      pod: string;
    };
    dt_txt: string;
  }>;
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    timezone: number;
  };
}

const initialState: ForecastState = {
  loading: false,
  error: '',
  forecast: {},
};

export const fetchForecastAsync = createAsyncThunk('forecast/fetchForecast', async (location: any) => {
  const { latitude, longitude, city, country } = location;
  const response = await api.get('data/2.5/onecall', {
    params: { lat: latitude, lon: longitude, units: 'metric', exclude: 'minutely' },
  });
  return { city: city, country: country, ...response.data };
});

export const forecastSlice = createSlice({
  name: 'forecast',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setForecast: (state, action: PayloadAction<IForecast>) => {
      state.forecast = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchForecastAsync.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchForecastAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.forecast = action.payload;
    });
    builder.addCase(fetchForecastAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const selectForecast = (state: RootState) => state.forecast;

export const { setLoading, setError, setForecast } = forecastSlice.actions;

export default forecastSlice.reducer;
