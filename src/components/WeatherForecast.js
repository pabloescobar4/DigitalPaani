import React, { useState, useEffect } from 'react';
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

const WeatherForecast = ({ forecastData, celcius }) => {
  const getWeatherIcon = (weather) => {
    switch (weather) {
      case 'Clear':
        return <Icon as={Sunny} boxSize="30" />;
      case 'Clouds':
        return <Icon as={Cloudy} boxSize="30" />;
      case 'Haze':
        return <Icon as={Haze} boxSize="30" />;
      case 'Rain':
        return <Icon as={HeavyRain} boxSize="30" />;
      case 'Drizzle':
        return <Icon as={Rain} boxSize="30" />;
      case 'Snow':
        return <Icon as={Snow} boxSize="30" />;
      case 'Thunderstorm':
        return <Icon as={Thunderstorm} boxSize="30" />;
      case 'Wind':
        return <Icon as={Windy} boxSize="30" />;
      case 'Mist':
        return <Icon as={Haze} boxSize="30" />;
      default:
        return null;
    }
  };

  return (
    <Flex sx={{ gap: '8px', color: 'black', flexWrap: 'wrap' }}>
      {forecastData &&
        forecastData.map((day, index) => (
          <Flex
            key={index}
            w={['60px', '80px', '100px', '100px', '100px']}
            sx={{
              height: '110px',
              backgroundColor: 'white',
              borderRadius: '15px',
              p: '3px',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text sx={{ m: 'auto' }}>
              {new Date(day.dt * 1000).toLocaleDateString('en-US', {
                weekday: 'short',
              })}
            </Text>
            {getWeatherIcon(day.weather[0].main)}
            <Text sx={{ fontSize: '12px', m: '2px' }}>
              {Math.floor(day.main.temp)}° <span></span> {celcius ? 'C' : 'F'}
            </Text>
            <Text sx={{ fontSize: '12px', m: 'auto' }}>
              {new Date(day.dt * 1000).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>
          </Flex>
        ))}
    </Flex>
  );
};

export default WeatherForecast;
