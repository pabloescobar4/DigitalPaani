import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './slices/weatherSlice';
import weatherDetailsReducer from './slices/weatherDetailsSlice'
const store = configureStore({
  reducer: {
    weather: weatherReducer,
	weatherDetails:weatherDetailsReducer
  },
});

export default store;
