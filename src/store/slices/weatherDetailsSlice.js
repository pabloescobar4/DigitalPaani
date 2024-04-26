import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const initialState = {
  forecastData: null,
  uvIndex: null,
  windStatus: null,
  sunrise: null,
  sunset: null,
  humidity: null,
  visibility: null,
  airQuality: null,
  error: null,
};

export const fetchWeatherDetails = createAsyncThunk(
  'weather/fetchWeatherDetails',
  async ({ latitude, longitude, celcius }, { rejectWithValue }) => {
    console.log(latitude, longitude, 'dsd323');
    try {
      const API_KEY = 'd649bc4384a21303fc10b6111019f806';

      const response = await axios.get(
        `${BASE_URL}/forecast?lat=${latitude}&lon=${longitude}&exclude=current,minutely,hourly&${
          celcius ? 'units=metric' : ''
        }&appid=${API_KEY}`
      );
      console.log('Response from onecall endpoint:', response.data);
      const uvIndexResponse = await axios.get(
        `${BASE_URL}/uvi?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      );

      const weatherResponse = await axios.get(
        `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      );

      const windSpeed = Math.round(weatherResponse.data.wind.speed * 3.6);
      const windDirection = weatherResponse.data.wind.deg;

      const sunriseTime = new Date(response.data.city.sunrise * 1000);
      const sunsetTime = new Date(response.data.city.sunset * 1000);

      const airPollutionResponse = await axios.get(
        `http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      );

      return {
        forecastData: response.data.list.slice(1, 7),
        uvIndex: uvIndexResponse.data.value,
        windStatus: { speed: windSpeed, direction: windDirection },
        sunrise: sunriseTime.toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        }),
        sunset: sunsetTime.toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        }),
        humidity: response.data.list[0].main.humidity,
        visibility: weatherResponse.data.visibility / 1000,
        airQuality: {
          index: airPollutionResponse.data.list[0].main.aqi,
          description: airPollutionResponse.data.list[0].components,
        },
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const weatherDetailsSlice = createSlice({
  name: 'weatherDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherDetails.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchWeatherDetails.fulfilled, (state, action) => {
        const {
          forecastData,
          uvIndex,
          windStatus,
          sunrise,
          sunset,
          humidity,
          visibility,
          airQuality,
        } = action.payload;
        console.log(forecastData, 'slicee');
        state.forecastData = forecastData;
        state.uvIndex = uvIndex;
        state.windStatus = windStatus;
        state.sunrise = sunrise;
        state.sunset = sunset;
        state.humidity = humidity;
        state.visibility = visibility;
        state.airQuality = airQuality;
        state.error = null;
      })
      .addCase(fetchWeatherDetails.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const weatherDetailsActions = weatherDetailsSlice.actions;
export default weatherDetailsSlice.reducer;
