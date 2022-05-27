import React from 'react';
import {Box, Card, CardActionArea, SvgIcon, Typography} from "@mui/material";
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import {getWeatherConditionByCode, getWeatherConditionIcon} from "../../utils/openWeatherUtils";



const WeatherCard = (props) => {

  const {city, date, temp, feels_like, humidity, wind_speed, visibility, wcond_id} = props;

  return (
    <Card>
      <Box>
        <CardActionArea>
          <Typography>{date}</Typography>
          <Typography><LocationOnRoundedIcon/> {city}</Typography>
          <Typography>Temp: {temp} °C</Typography>
          <Typography>Feels like: {feels_like} °C</Typography>
          <Typography>Humidity: {humidity}%</Typography>
          <Typography>Wind: {wind_speed} km/h</Typography>
          <Typography>Visibility: {visibility} km</Typography>
          <Typography>Condition: {getWeatherConditionByCode(wcond_id).description}</Typography>
          <SvgIcon component={getWeatherConditionIcon(wcond_id)} inheritViewBox />
        </CardActionArea>
      </Box>
    </Card>
  );
}

export default WeatherCard;