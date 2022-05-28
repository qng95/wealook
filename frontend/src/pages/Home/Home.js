import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {Typography, Autocomplete, Container, IconButton, Stack, Tabs} from "@mui/material";
import {MyLocation, BurstMode} from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';

import WeatherCard from "../../components/WeatherCard/WeatherCard";
import WeatherHourCard from "../../components/WeatherCard/WeatherHourCard";
import PageLoader from "../PageLoader/PageLoader";
import { styled, alpha } from '@mui/material/styles';
import './Home.css';

const _mockAllLocationAndRegion = [
  {name: "Frankfurt"},
  {name: "Kakao"},
]

const _mockWeatherConditions = [
  {value: 1, city: 'Frankfurt', date: 'Wed 25', temp: "26", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 201},
  {value: 2, city: 'Frankfurt', date: 'Thu 26', temp: "26", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 202},
  {value: 3, city: 'Frankfurt', date: 'Fri 27', temp: "26", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 800},
  {value: 4, city: 'Frankfurt', date: 'Sat 28', temp: "26", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 300},
  {value: 5, city: 'Frankfurt', date: 'Sun 29', temp: "26", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 601},
]

const _mockWeatherHourConditions = [
  {date: 'Wed 25', hour:"9:00", temp: "26", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 201},
  {date: 'Thu 25', hour:"12:00", temp: "26", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 201},
  {date: 'Fri 25', hour:"4:00", temp: "26", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 201},
  {date: 'Sat 25', hour:"7:00", temp: "26", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 201},
  {date: 'Sat 25', hour:"11:00", temp: "26", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 201}
]

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '80%',
  [theme.breakpoints.up('xs')]: {
    margin: theme.spacing(2),
    width: '300',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      width: '20ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function Home(props) {
  const [dataAvailable, setDataAvailable] = useState(false);
  const [value, setValue] = useState(2);

  const handleChange = (event, newValue) => {
    console.log(event);
    setValue(newValue);
  };

  useEffect(() => {
    setDataAvailable(true);
  },[])

  if (!dataAvailable) {
    return (
      <PageLoader/>
    );
  }
  return (
    <Container sx={{ minWidth: '100%', bgcolor: 'primary.main'}}>
      <Stack direction="row" justifyContent="left" alignItems="stretch">
        <Container sx={{minWith: '70%'}} >
          <Typography sx={{color: 'primary.light', pt: 4, pl:4}} variant="h5">
            <LocationOnRoundedIcon/> 
            Frankfurt Am Main
          </Typography>
        </Container>
        
        <Stack direction="row" justifyContent="right" alignItems="stretch" sx={{pt:2, pr:8}}>
          
          <Autocomplete
            freeSolo /*value can be any does not have to be in the allLocationAndRegion list*/
            disableClearable
            id="locationSearch"
            options={_mockAllLocationAndRegion.map((option) => option.name)}
            renderInput={(params) => (
              <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                {...params}
                placeholder="Search location"
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
              />
            </Search>

            )}
            
          />
          <IconButton aria-label="my-location" color="secondary">
            <MyLocation />
          </IconButton>
          <IconButton 
          component={Link} to={'/filters'} 
          aria-label="filter-collection" 
          color="secondary"
          >
            <BurstMode />
          </IconButton>
        </Stack>
      </Stack>

      <Tabs 
        variant="scrollable"
        sx={{px:3, py:2}}
        scrollButtons={true}
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
      >
        {_mockWeatherConditions.map((item) => (
            <WeatherCard key={item.date} {...item}/>  
        ))}
      </Tabs>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="strech"
        spacing={2}
        sx={{px:8, py:2}}
        
        >
        {_mockWeatherHourConditions.map((item) => (
            <WeatherHourCard key={item.hour} {...item}/>
        ))}
      </Stack>
      

    </Container>
  );
}

export default Home;

