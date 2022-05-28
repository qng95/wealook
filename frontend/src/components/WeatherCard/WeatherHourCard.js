import React from 'react';
import {Stack, Box, Card, CardActionArea, SvgIcon, Typography} from "@mui/material";
import {getWeatherConditionByCode, getWeatherConditionIcon} from "../../utils/openweather";
import ThermostatIcon from '@mui/icons-material/Thermostat';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import AirIcon from '@mui/icons-material/Air';


const WeatherHourCard = (props) => {

  const {hour, temp, humidity, wind_speed, wcond_id} = props;

  return (
    <Card>
      <Box sx={{
        border:'2px solid',
        borderColor: 'third.light',
        backgroundColor: 'third.light',
      }}>
        <Stack direction="row">
          <CardActionArea sx={{py: 2, pl: 5, color: 'primary.main'}}>
            <Typography variant="h6">{hour} <SvgIcon fontSize="large" component={getWeatherConditionIcon(wcond_id)} inheritViewBox /></Typography>
            <Typography>{getWeatherConditionByCode(wcond_id).description}</Typography>    
          </CardActionArea>
          <CardActionArea sx={{ pr: 5, py: 2, width: '15%', color: 'third.main'}}>
              <Typography> <ThermostatIcon/> Temp: {temp} °C</Typography>
              <Typography> <InvertColorsIcon/> Humidity: {humidity}%</Typography>
              <Typography> <AirIcon/> Wind: {wind_speed} km/h</Typography>
          </CardActionArea>     
        </Stack>
      </Box>
    </Card>
  );
}

export default WeatherHourCard;

