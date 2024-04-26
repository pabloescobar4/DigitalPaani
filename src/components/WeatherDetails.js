import React, { useEffect, useState } from 'react';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import WeatherForecast from './WeatherForecast';
import axios from 'axios';
import {
  MdEast,
  MdNorth,
  MdNorthEast,
  MdNorthWest,
  MdSouth,
  MdSouthEast,
  MdSouthWest,
  MdWest,
} from 'react-icons/md';
import { BsFillSunsetFill, BsFillSunriseFill } from 'react-icons/bs';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWeatherDetails } from '../store/slices/weatherDetailsSlice';
export const WeatherDetails = ({ longitude, latitude }) => {
  const dispatch = useDispatch();
  const [celcius, setCelcius] = useState(true);

  const getDirectionIcon = (degree) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round((degree % 360) / 45);
    const direction = directions[index % 8];

    switch (direction) {
      case 'N':
        return <MdNorth />;
      case 'NE':
        return <MdNorthEast />;
      case 'E':
        return <MdEast />;
      case 'SE':
        return <MdSouthEast />;
      case 'S':
        return <MdSouth />;
      case 'SW':
        return <MdSouthWest />;
      case 'W':
        return <MdWest />;
      case 'NW':
        return <MdNorthWest />;
      default:
        return null;
    }
  };

  const getDirectionText = (degree) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round((degree % 360) / 45);
    const direction = directions[index % 8];

    switch (direction) {
      case 'N':
        return 'North';
      case 'NE':
        return 'Northeast';
      case 'E':
        return 'East';
      case 'SE':
        return 'Southeast';
      case 'S':
        return 'South';
      case 'SW':
        return 'Southwest';
      case 'W':
        return 'West';
      case 'NW':
        return 'Northwest';
      default:
        return '';
    }
  };

  useEffect(() => {
    dispatch(fetchWeatherDetails({ latitude, longitude, celcius }));
  }, [latitude, longitude, celcius]);

  // Use Redux state to access weather details
  // Use Redux state to access weather details from the weatherDetails slice
  const forecastData = useSelector(
    (state) => state.weatherDetails.forecastData
  );
  const uvIndex = useSelector((state) => state.weatherDetails.uvIndex);
  const windStatus = useSelector((state) => state.weatherDetails.windStatus);
  const sunrise = useSelector((state) => state.weatherDetails.sunrise);
  const sunset = useSelector((state) => state.weatherDetails.sunset);
  const humidity = useSelector((state) => state.weatherDetails.humidity);
  const visibility = useSelector((state) => state.weatherDetails.visibility);
  const airQuality = useSelector((state) => state.weatherDetails.airQuality);

  return (
    <Flex
      sx={{
        padding: '2% 3.5% 2% 3.5%',
        width: '71%',
        backgroundColor: '#F6F6F8',
        borderRightRadius: '40px',
        flexDirection: 'column',
      }}
    >
      <Flex
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '64px',
        }}
      >
        <Flex
          sx={{
            justifyContent: 'start',
            gap: '10px',
            padding: '6px',
            height: '70px',
            alignItems: 'center',
          }}
        >
          <Text sx={{ padding: '3px', color: '#CACACA' }}>Today </Text>
          <Text
            sx={{
              padding: '3px',
              color: 'black',
              borderBottom: '1px solid black',
            }}
          >
            {' '}
            Hourly{' '}
          </Text>
        </Flex>
        <Flex
          sx={{
            justifyContent: 'end',
            gap: '10px',
            padding: '6px',
            height: '70px',
            alignItems: 'center',
          }}
        >
          <Flex
            sx={{
              width: '30px',
              height: '30px',
              backgroundColor: celcius ? 'black' : 'white',
              color: celcius ? 'white' : 'black',
              p: '6px',
              borderRadius: '50%',
              cursor: 'pointer',
            }}
            onClick={() => setCelcius(true)}
          >
            °C
          </Flex>
          <Flex
            sx={{
              width: '30px',
              height: '30px',
              backgroundColor: celcius ? 'white' : 'black',
              color: celcius ? 'black' : 'white',
              p: '6px',
              borderRadius: '50%',
              cursor: 'pointer',
            }}
            onClick={() => setCelcius(false)}
          >
            °F
          </Flex>
          <Image
            width="40px"
            height="40px"
            style={{ borderRadius: '30%', marginLeft: '20px' }}
            src="https://neural.love/cdn/thumbnails/1edd1e12-dd59-64ac-8795-55d8a6e22f25/d423de04-93c1-57b0-b49d-bac79458139a.webp?Expires=1717199999&Signature=4bV84tOiceaHkFQt1Bel8eb3pkVGTxgineZ6EEu7H2Ys8adAEILQQEs4NNyqHcq5Q9tVUxQbaeZ93NDXr4wXWhI89B-tUJ7GiQTlg1vAJ2yw9TFhP12ixhtgzyc042Dn30rqXqxHy-94QepddoiBbdszLXc8-84FUX~PjXFYLxTZQSzD76~q843lrUWsUrVbTJx2Q9dwHlGcfYhRXjfiMvg940qkPZI2nydlvb-8DtQCmljs3yN~wqs~0c8~I7t2Ie7Yt4tgxYxALGN6SIobpPlsIciLgmrxoI2WYoF2xvlyqxIVV~iZzWOyM~UcitbLd4QtzzNlX8G4fq2~WiPQtQ__&Key-Pair-Id=K2RFTOXRBNSROX"
          />
        </Flex>
      </Flex>
      <WeatherForecast
        forecastData={forecastData}
        longitude={longitude}
        latitude={latitude}
        celcius={celcius}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          fontSize: '20px',
          marginTop: '20px',
        }}
      >
        Today's Highlights
      </div>
      <Flex sx={{ gap: '30px', mt: '20px', color: 'black', flexWrap: 'wrap' }}>
        <Flex
          sx={{
            width: '190px',
            height: 'x',
            backgroundColor: 'white',
            borderRadius: '15px',
            p: '2px',
            justifyContent: 'left',
            flexDirection: 'column',
            alignItems: 'start',
          }}
        >
          <Text sx={{ margin: '20px', color: '#A9A9A9' }}>UV Index:</Text>
          <Text
            sx={{
              fontSize: '40px',
              display: 'flex',
              m: '15px',
              gap: '4px',
              alignItems: 'baseline',
            }}
          >
            {uvIndex}
          </Text>
        </Flex>
        <Flex
          sx={{
            width: '190px',
            height: 'x',
            backgroundColor: 'white',
            borderRadius: '15px',
            p: '2px',
            justifyContent: 'left',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Text
            sx={{
              margin: '20px 0px 0px 20px',
              color: '#A9A9A9',
              display: 'flex',
            }}
          >
            Wind Status
          </Text>
          <Text
            sx={{
              fontSize: '40px',
              display: 'flex',
              m: '15px',
              gap: '4px',
              alignItems: 'baseline',
            }}
          >
            {windStatus && `${windStatus.speed} `}
            <span style={{ fontSize: '20px' }}>Km/h</span>
          </Text>
          <Text
            sx={{
              display: 'flex',
              m: '15px',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                padding: '3px 2px 2px 2px',
                border: '1px solid #A9A9A9',
                borderRadius: '60%',
                width: '20px',
                color: 'blue',
              }}
            >
              {getDirectionIcon(windStatus?.direction)}{' '}
            </span>
            {getDirectionText(windStatus?.direction)}
          </Text>
        </Flex>
        <Flex
          sx={{
            width: '190px',
            height: 'x',
            backgroundColor: 'white',
            borderRadius: '15px',
            p: '2px',
            justifyContent: 'left',
            alignItems: 'start',
          }}
        >
          <Text
            sx={{
              margin: '20px 0px 0px 20px',
              color: '#A9A9A9',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              mb: '10px',
              gap: '15px',
            }}
          >
            Sunrise & Sunset
            <Flex sx={{ alignItems: 'center', gap: '10px' }}>
              <BsFillSunriseFill fontSize={'40px'} color="#FF9800" /> {sunrise}
            </Flex>
            <Flex sx={{ alignItems: 'center', gap: '10px' }}>
              <BsFillSunsetFill fontSize={'40px'} color="#FF9800" /> {sunset}
            </Flex>
          </Text>
        </Flex>

        <Flex
          sx={{
            width: '190px',
            height: 'x',
            backgroundColor: 'white',
            borderRadius: '15px',
            p: '2px',
            justifyContent: 'left',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Text
            sx={{
              margin: '20px 0px 0px 20px',
              color: '#A9A9A9',
              display: 'flex',
              alignItems: 'start',
            }}
          >
            Humidity:
          </Text>
          <Text
            sx={{
              fontSize: '40px',
              display: 'flex',
              m: '18px',
              gap: '4px',
              alignItems: 'baseline',
            }}
          >
            {humidity}%
          </Text>
          <span
            style={{
              marginLeft: '20px',
              display: 'flex',
              gap: '4px',
              width: '20px',
            }}
          >
            Normal <span>👍</span>
          </span>
        </Flex>
        <Flex
          sx={{
            width: '190px',
            height: 'x',
            backgroundColor: 'white',
            borderRadius: '15px',
            p: '2px',
            justifyContent: 'left',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Text sx={{ margin: '20px 0px 0px 20px', color: '#A9A9A9' }}>
            Visibility
          </Text>
          <Text
            sx={{
              fontSize: '40px',
              display: 'flex',
              m: '18px',
              gap: '4px',
              alignItems: 'baseline',
            }}
          >
            {visibility} Km
          </Text>
          <span
            style={{
              marginLeft: '20px',
              display: 'flex',
              gap: '4px',
              width: '20px',
              color: 'black',
            }}
          >
            Average <span>🙂</span>
          </span>
          <Text sx={{ margin: '20px', color: '#A9A9A9' }}></Text>
        </Flex>
        <Flex
          sx={{
            width: '190px',
            height: 'x',
            backgroundColor: 'white',
            borderRadius: '15px',
            p: '2px',
            justifyContent: 'left',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Text sx={{ margin: '20px 0px 0px 20px', color: '#A9A9A9' }}>
            Air Quality
          </Text>
          <Text
            sx={{
              fontSize: '40px',
              display: 'flex',
              m: '18px',
              gap: '4px',
              alignItems: 'baseline',
            }}
          >
            {airQuality?.index}
          </Text>
          <span
            style={{
              marginLeft: '20px',
              display: 'flex',
              gap: '4px',
              width: '20px',
              color: 'black',
            }}
          >
            Unhealthy <span>👎</span>
          </span>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default WeatherDetails;
