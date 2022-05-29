import React from 'react';
import {Box, Card, IconButton, Typography, Avatar, Stack, SvgIcon, Button, Grid} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {getWeatherConditionIcon} from "../../utils/openweather";
import Popover from '@mui/material/Popover';
import ExpandCircleDownRoundedIcon from '@mui/icons-material/ExpandCircleDownRounded';
import WeatherMiniCard from "../../components/WeatherCard/WeatherMiniCard";
import { useMatchMedia } from "../../utils/useMatchMedia";

function CityCard(props) {
  const {city, temp, feels_like, humidity, wind_speed, wcond_id} = props;
  const img_name = Math.floor(Math.random() * 8);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const _mockWeatherConditions = [
    {city: 'Frankfurt', date: 'Wed 25', temp: "26", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 201},
    {city: 'Frankfurt', date: 'Thu 26', temp: "26", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 202},
    {city: 'Frankfurt', date: 'Fri 27', temp: "26", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 800},
    {city: 'Frankfurt', date: 'Sat 28', temp: "26", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 300},
    {city: 'Frankfurt', date: 'Sun 29', temp: "26", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 601},
  ]

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const isDesktopResolution = useMatchMedia("(min-width:1600px)", true);

  return (
    <Card>
      <Box 
        sx={{
          border:'2px solid',
          borderColor: 'third.light',
          backgroundColor: 'third.dark',
          '&:hover': {
            backgroundColor: 'secondary.main',
            opacity: [1.9, 1.8, 1.7],
          },
      }}>
        <Stack direction="column">
          <Stack direction="row">
          {isDesktopResolution &&
            <Avatar 
              variant="square" 
              style={{border: 0, objectFit: 'cover'}} 
              sx={{width:'50%', height: 200}} 
              src={`/countries_img/${img_name}.jpg`} 
              id="avarta"
            />}
              <Box sx={{color: 'primary.light', p:2}} >
                <Typography
                  variant="h4"
                  noWrap
                  component="div"
                  sx={{ color: 'primary.light', flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                > 
                  <SvgIcon fontSize="large" component={getWeatherConditionIcon(wcond_id)} inheritViewBox /> {temp} °C
                </Typography>
                <Typography sx={{ml:3, mt:1, color: 'third.main'}}> Feels Like: {feels_like} °C</Typography>
                <Typography sx={{ml:3, mt:1, color: 'third.main'}}> Humidity: {humidity} %</Typography>
                <Typography sx={{ml:3, mt:1, color: 'third.main'}}> Wind: {wind_speed} km/h</Typography>
              </Box>
          </Stack>
          
          <Stack direction="row" backgroundColor="primary.light" justifyContent="center" alignItems="strech">
            <IconButton aria-label="delete-filter" color="error">
              <Delete />
            </IconButton>
            <Box sx={{color: 'primary.main', p:2, textAlign: 'center', width: '80%'}} >
              <Typography>{city}</Typography>
            </Box>
            <Button aria-describedby={id} onClick={handleClick}>
              <ExpandCircleDownRoundedIcon/>
            </Button>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
            >
              <Box sx={{maxWidth: 1200}}>
                <Grid 
                  container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
                  sx={{px:4, py:4, backgroundColor: 'fourth.light'}}
                >
                  {_mockWeatherConditions.map((item) => (
                    <Grid item xs={2} sm={4} md={4} key={item.filterId} >
                      <WeatherMiniCard {...item}/>
                    </Grid>
                  ))};
                </Grid>

              </Box>
              
            </Popover>
          </Stack>
          
        </Stack>
        
      </Box>
    </Card>
  );
}

export default CityCard;