import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import api from '../../apis';

export interface Location {
  name: string;
  lat: number;
  long: number;
  country: string;
  state: string;
}

export interface LocationsState {
  loading: boolean;
  error: any;
  // locations: Location[];
  locations: any;
}

const initialState: LocationsState = {
  loading: false,
  error: '',
  locations: [],
};

export const fetchLocationsAsync = createAsyncThunk('locations/fetchLocations', async (city: string) => {
  const response = await api.get('geo/1.0/direct', { params: { q: city, limit: 5 } });
  return response.data;
});

export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLocations: (state, action: PayloadAction<Location>) => {
      state.locations = [];
      state.locations = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLocationsAsync.pending, (state, action) => {
      state.loading = true;
      state.locations = [];
    });
    builder.addCase(fetchLocationsAsync.fulfilled, (state, action) => {
      state.loading = false;
      state.locations = action.payload;
    });
    builder.addCase(fetchLocationsAsync.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});
//

export const selectLocations = (state: RootState) => state.locations;

export const { setLoading, setError, setLocations } = locationsSlice.actions;

export default locationsSlice.reducer;
