import React, { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import { WeatherDetails } from './WeatherDetails';
import WeatherApp from './weather';

export const Container = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const handleLocationChange = (lat, lon) => {
    setLatitude(lat);
    setLongitude(lon);
  };
  return (
    <>
      <Flex
        sx={{
          backgroundColor: 'white',
          fontWeight: '500',
          borderRadius: '40px',
          height: '100%',
        }}
      >
        <WeatherApp
          latitude={latitude}
          longitude={longitude}
          onLocationChange={handleLocationChange}
        />
        {latitude !== null && longitude !== null && (
          <WeatherDetails latitude={latitude} longitude={longitude} />
        )}
      </Flex>
    </>
  );
};

export default Container;
