import React from 'react';
import {Stack, Box, SvgIcon, Typography} from "@mui/material";
import {getWeatherConditionByCode, getWeatherConditionIcon} from "../../utils/openweather";
import ThermostatIcon from '@mui/icons-material/Thermostat';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import AirIcon from '@mui/icons-material/Air';

const WeatherMiniCard = (props) => {

  const {date, temp, feels_like, humidity, wind_speed, wcond_id} = props;

  return (
    <Box>
        <Box sx={{
          backgroundColor: 'fourth.main'
        }}>
          <Box sx={{color: 'secondary.dark', p:2, textAlign: 'center'}}>
            <Typography variant="h6">{date} <SvgIcon fontSize="large" component={getWeatherConditionIcon(wcond_id)} inheritViewBox /></Typography> 
            <Typography>{getWeatherConditionByCode(wcond_id).description}</Typography>      
          </Box>
          <Stack direction="row" spacing={2}>
            <Box sx={{ color: 'fourth.dark', pl: 2, pb: 1, textAlign: 'left'}}>
              <Typography> <ThermostatIcon/> Temp: {temp} °C</Typography>
              <Typography> <SentimentSatisfiedIcon/> Feel Like: {feels_like} °C</Typography>
            </Box>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ color: 'primary.light', flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            />
            <Box sx={{ color: 'fourth.dark', pr:2, pb:1, textAlign: 'left'}}>
              <Typography> <AirIcon/> Wind: {wind_speed} km/h</Typography>
              <Typography> <InvertColorsIcon/> Humidity: {humidity}%</Typography>
            </Box>
          </Stack>
        </Box>
    </Box>
  );
}

export default WeatherMiniCard;

