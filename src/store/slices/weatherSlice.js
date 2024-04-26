import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define initial state
const initialState = {
  data: null,
  locationImage: '',
  longitude:"",
  latitude:"",
  error: null,
};

export const fetchWeatherData = createAsyncThunk(
  'weather/fetchWeatherData',
  async (city, { rejectWithValue }) => {
    try {
      const API_KEY = 'd649bc4384a21303fc10b6111019f806';
      const UNSPLASH_API_KEY = 'M9296ZUUZFA7V_70zEGnycNaaR4WeeRQsIt3Yl-UZ34';

      const geoResponse = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
      );
      if (!geoResponse.data.length) {
        throw new Error('City not found');
      }
      const  latitude = geoResponse.data[0].lat;
      const  longitude = geoResponse.data[0].lon;

      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      );
      const weatherData = weatherResponse.data;
      const tempCelsius = Math.round(weatherData.main.temp - 273.15);
      console.log(weatherData, 'reduxx');
      weatherData.main.temp = tempCelsius;

      // const forecastResponse = await axios.get(
      //   `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&appid=${API_KEY}`
      // );

      const unsplashResponse = await axios.get(
        `https://api.unsplash.com/search/photos?query=${city}&client_id=${UNSPLASH_API_KEY}`
      );
      let locationImage = '';
      if (unsplashResponse.data.results.length > 0) {
        locationImage = unsplashResponse.data.results[0].urls.regular;
      }

      return { weatherData, locationImage, latitude, longitude};
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.data = action.payload.weatherData;
        state.locationImage = action.payload.locationImage;
        state.longitude = action.payload.longitude;
        state.latitude = action.payload.latitude;
   
        state.error = null;
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const weatherActions = weatherSlice.actions;
export default weatherSlice.reducer;
