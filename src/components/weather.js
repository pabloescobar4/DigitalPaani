import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Flex, Icon, Text } from '@chakra-ui/react';
import { ReactComponent as Sunny } from '../assets/weather/sunny.svg';
import { ReactComponent as Cloudy } from '../assets/weather/cloudy.svg';
import { ReactComponent as Haze } from '../assets/weather/haze.svg';
import { ReactComponent as HeavyRain } from '../assets/weather/heavy-rain.svg';
import { ReactComponent as PartlyCloudy } from '../assets/weather/partly-cloudy.svg';
import { ReactComponent as Rain } from '../assets/weather/rain.svg';
import { ReactComponent as Snow } from '../assets/weather/snow.svg';
import { ReactComponent as Thunderstorm } from '../assets/weather/thunderstorm.svg';
import { ReactComponent as Windy } from '../assets/weather/windy.svg';
import { IoSearchOutline } from 'react-icons/io5';
import { MdLocationSearching } from 'react-icons/md';
import { Divider } from '@chakra-ui/react';
const WeatherApp = ({ latitude, longitude, onLocationChange }) => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [locationImage, setLocationImage] = useState('');
  const [error, setError] = useState(null);

  const [currentDateTime, setCurrentDateTime] = useState('');

  const API_KEY = '0c31f74bbe9ee72fecbc8d7eb51c24fa';
  const UNSPLASH_API_KEY = 'M9296ZUUZFA7V_70zEGnycNaaR4WeeRQsIt3Yl-UZ34';

  const getWeatherIcon = (weather) => {
    const x = weather.charAt(0).toUpperCase() + weather.slice(1).toLowerCase();
    if (x.includes('clouds')) {
      return <Icon as={Cloudy} boxSize="30" width="60%" height="60%" />;
    }
    if (x.includes('clear')) {
      return <Icon as={Sunny} boxSize="30" width="60%" height="60%" />;
    }
    switch (x) {
      case 'Clear':
        return <Icon as={Sunny} boxSize="30" width="60%" height="60%" />;
      case 'Clouds':
        return <Icon as={Cloudy} boxSize="30" width="60%" height="60%" />;
      case 'Haze':
        return <Icon as={Haze} boxSize="30" width="60%" height="60%" />;
      case 'Rain':
        return <Icon as={HeavyRain} boxSize="30" width="60%" height="60%" />;
      case 'Drizzle':
        return <Icon as={Rain} boxSize="30" width="60%" height="60%" />;
      case 'Snow':
        return <Icon as={Snow} boxSize="30" width="60%" height="60%" />;
      case 'Thunderstorm':
        return <Icon as={Thunderstorm} boxSize="30" width="60%" height="60%" />;
      case 'Wind':
        return <Icon as={Windy} boxSize="30" width="60%" height="60%" />;
      case 'Mist':
        return <Icon as={Haze} boxSize="30" width="60%" height="60%" />;
      default:
        return null;
    }
  };

  const fetchWeatherData = async () => {
    try {
      const geoResponse = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
      );
      if (!geoResponse.data.length) {
        throw new Error('City not found');
      }
      const { lat, lon } = geoResponse.data[0];
      onLocationChange(lat, lon);

      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
      );
      const weatherData = weatherResponse.data;
      const tempCelsius = Math.round(weatherData.main.temp - 273.15);
      weatherData.main.temp = tempCelsius;
      setWeatherData(weatherData);
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&appid=${API_KEY}`
      );

      const unsplashResponse = await axios.get(
        `https://api.unsplash.com/search/photos?query=${city}&client_id=${UNSPLASH_API_KEY}`
      );
      if (unsplashResponse.data.results.length > 0) {
        setLocationImage(unsplashResponse.data.results[0].urls.regular);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData(city);
  };
  const getCurrentDayAndTime = () => {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const currentDate = new Date();
    const dayOfWeek = days[currentDate.getDay()];
    const hour = currentDate.getHours().toString().padStart(2, '0');
    const minute = currentDate.getMinutes().toString().padStart(2, '0');
    return `${dayOfWeek} ${hour}:${minute}`;
  };
  console.log(weatherData, 'ddaas');
  return (
    <div style={{ width: '30%' }}>
      <form
        onSubmit={handleSubmit}
        style={{
          marginTop: '50px',
          alignItems: 'center',
          display: 'flex',
          margin: '40px 20px 20px 40px',
          gap: '5px',
          width: '100%',
        }}
      >
        <IoSearchOutline />
        <input
          type="text"
          style={{
            border: '0px white',
            outline: 'none',
            fontSize: '16px',
            color: 'black',
            '::placeholder': { color: 'black' },
          }}
          placeholder="Search the places..."
          value={city}
          onChange={(e) => {
            setCity(e.target.value);

            //  dispatch(fetchWeatherDetails({ latitude, longitude, }));
          }}
        />
        <MdLocationSearching />
      </form>
      {weatherData && (
        <div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'start',
              margin: '5% 10%',
            }}
          >
            {' '}
            {getWeatherIcon(weatherData.weather[0].description)}
          </div>
          <Flex sx={{ padding: '1% 10% 1% 10%', flexDirection: 'column' }}>
            <Text
              fontSize={['16', '24', '32', '48', '52', '60']}
              sx={{
                display: 'flex',
                m: '0px',
                gap: '4px',
                fontWeight: '300',
              }}
            >
              {weatherData.main.temp}
              <Text fontSize={['16', '24', '32', '48', '52', '60']}>°C</Text>
            </Text>

            <Flex
              sx={{
                alignItems: 'left',
                justifyContent: 'left',
                fontSize: '20px',
              }}
            >
              {' '}
              <div style={{ color: 'black', m: '0px' }}>
                {currentDateTime.day},{' '}
              </div>
              <div style={{ color: '#A9A9A9', marginLeft: '3px' }}>
                {' '}
                {currentDateTime.time}
              </div>
            </Flex>
          </Flex>
          <div
            style={{
              border: '0.5px solid lightgray',
              width: '60%',
              margin: '10% 20% 0% 20%',
            }}
          ></div>
          <Divider orientation="horizontal" type="gray" variant="solid" />
          <Flex
            sx={{
              flexDirection: 'column',
              justifyContent: 'start',
              alignItems: 'flex-start',
              m: '10px 30px 30px 35px',
            }}
          >
            <span>
              {weatherData.weather[0].description.includes(' ')
                ? weatherData.weather[0].description
                    .split(' ')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' ')
                : weatherData.weather[0].description.charAt(0).toUpperCase() +
                  weatherData.weather[0].description.slice(1)}
            </span>
            <p>Rain - 15%</p>
          </Flex>
          {locationImage && (
            <div
              style={{ position: 'relative', maxWidth: '100%', margin: '5%' }}
            >
              <img
                src={locationImage}
                alt="Location"
                style={{
                  borderRadius: '15px',
                  height: '4%',
                  width: '100%',
                }}
              />
              <Text
                fontSize={['10','14', '18', '24', '28']}
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  textAlign: 'center',
                  color: 'white',

                  fontWeight: 'bold',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                }}
              >
                {weatherData.name}, {weatherData.sys.country}
              </Text>
            </div>
          )}
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
};

export default WeatherApp;
