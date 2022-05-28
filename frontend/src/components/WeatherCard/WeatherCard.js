import React from 'react';
import {Stack, Box, Card, CardActionArea, SvgIcon, Typography} from "@mui/material";
import {getWeatherConditionIcon} from "../../utils/openweather";
import ThermostatIcon from '@mui/icons-material/Thermostat';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import AirIcon from '@mui/icons-material/Air';

const WeatherCard = (props) => {

  const {date, temp, feels_like, humidity, wind_speed, wcond_id} = props;

  return (
    <Card sx={{minWidth:'30%'}}>
      <Box sx={{
        border:'2px solid',
        borderColor: 'third.light',
        backgroundColor: 'third.dark',
        '&:hover': {
          backgroundColor: 'secondary.main',
          opacity: [1.9, 1.8, 1.7],
        },
      }}>
        <CardActionArea sx={{color: 'primary.light', p:2, textAlign: 'center'}}>
          <Typography variant="h6">{date} <SvgIcon fontSize="large" component={getWeatherConditionIcon(wcond_id)} inheritViewBox /></Typography>       
        </CardActionArea>
        <Stack direction="row" spacing={2}>
          <CardActionArea sx={{ color: 'third.main', pl:8, pb:1, textAlign: 'left'}}>
            <Typography> <ThermostatIcon/> Temp: {temp} °C</Typography>
            <Typography> <SentimentSatisfiedIcon/> Feel Like: {feels_like} °C</Typography>
          </CardActionArea>
          <CardActionArea sx={{ color: 'third.main', pl:1, pb:1, pr:1, textAlign: 'left'}}>
          <Typography> <AirIcon/> Wind: {wind_speed} km/h</Typography>
          <Typography> <InvertColorsIcon/> Humidity: {humidity}%</Typography>
        </CardActionArea>
        </Stack>
      </Box>
    </Card>
  );
}

export default WeatherCard;

