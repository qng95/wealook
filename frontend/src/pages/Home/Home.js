import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import {Typography, Autocomplete, Container, IconButton, Stack, Tabs,Box, AppBar, Toolbar} from "@mui/material";
import {MyLocation, BurstMode} from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import { styled, alpha } from '@mui/material/styles';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

import WeatherCard from "../../components/WeatherCard/WeatherCard";
import WeatherHourCard from "../../components/WeatherCard/WeatherHourCard";
import PageLoader from "../PageLoader/PageLoader";
import api from "./../../api";
import {testuser} from "../../stores/store";

import './Home.css';


const _mockAllLocationAndRegion = [
  {name: "Frankfurt"},
  {name: "Kakao"},
]

const _mockWeatherConditions = [
  {city: 'Frankfurt', date: 'Wed 25', temp: "26", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 201},
  {city: 'Frankfurt', date: 'Thu 26', temp: "26", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 202},
  {city: 'Frankfurt', date: 'Fri 27', temp: "26", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 800},
  {city: 'Frankfurt', date: 'Sat 28', temp: "26", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 300},
  {city: 'Frankfurt', date: 'Sun 29', temp: "26", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 601},
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
  const [dataAvailable, setDataAvailable] = useState(null);

  const [initCities, setInitCities] = useState(false);
  const [cities, setCities] = useState({});

  const [initUserPref, setInitUserPref] = useState(false);
  const [userPref, setUserPref] = useState({});

  const [selectedCity, setSelectedCity] = useState(null);

  const [initWeatherData, setInitWeatherData] = useState(false);
  const [selectedForecast, setSelectedForecast] = useState({});
  const [selectedDate, setSelectedDate] = useState('Thu 26');

  useEffect(() => {
    const getCitiesData = async () => {
      const result = await api.get("/cities")
      setCities(result.data.cities);
      setInitCities(true);
    };
    if (!initCities) {
      getCitiesData()
    }
  },[]);

  useEffect(() => {
    const getUserPref = async () => {
      const result = await api.get(`/userpref/${testuser.id}`)
      const user_home_location = result.data.home_location_id;
      if (user_home_location === "") {
        const mycity = await api.get(`/cities/mycity`)
        const city = mycity.data;
        const cityLocationId = city.id;
        await api.put(`/userpref/${testuser.id}`, {
          user_id: testuser.id,
          home_location_id: cityLocationId
        });
        setUserPref(cityLocationId);
        setSelectedCity(cityLocationId);
      } else {
        setUserPref(user_home_location);
        setSelectedCity(user_home_location);
      }
      setInitUserPref(true);
    };
    if (!initUserPref) {
      getUserPref();
    }
  },[]);

  useEffect(() => {
    const updateUserPref = async () => {
      await api.put(`/userpref/${testuser.id}`, {
        user_id: testuser.id,
        home_location_id: userPref
      });
    };
    if (initUserPref) {
      updateUserPref();
    }
  }, [userPref]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const result = await api.get(`/weather/s/${selectedCity}`, {
        mode: 'today'
      });
      const weatherdata = result.data.weather;
      setSelectedForecast(weatherdata);
      setInitWeatherData(true);
    };

    if (!initWeatherData && selectedCity) {
      fetchWeatherData();
    }
  }, [selectedCity]);

  useEffect(() => {
    setDataAvailable(initCities && initUserPref && initWeatherData);
  }, [initCities, initUserPref, initWeatherData]);


  const onWeatherCardSelected = (event, newValue) => {
    console.log("Event " + newValue);
    setSelectedDate(newValue);
  }

  if (!dataAvailable) {
    return (
      <PageLoader/>
    );
  }
  return (
    <Container sx={{ minWidth: '100%', bgcolor: 'primary.main'}}>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }  }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton size="large" edge="start" sx={{ml:6}} component={Link} to={'/'} aria-label="my-location" color="secondary" >
              <HomeRoundedIcon/> 
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ color: 'primary.light', flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            > 
              Frankfurt Am Main
            </Typography>
            <Stack
              direction="row"
              justifyContent="right"
              alignItems="stretch"
              sx={{mr:7}}
            >
        
              <Autocomplete
                freeSolo /*value can be any does not have to be in the allLocationAndRegion list*/
                disableClearable
                id="locationSearch"
                options={cities.map((option) => option.city_ascii)}
                renderInput={(params) => (
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      {...params}
                      placeholder="Search locations"
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
          </Toolbar>
        </AppBar>
      </Box>
      
      <Tabs 
        variant="scrollable"
        sx={{px:3, pt:20, pb:5}}
        scrollButtons={true}
        value={selectedDate}
        indicatorColor="primary"
      >
        {_mockWeatherConditions.map((item) => (
            (selectedDate === item.date)
            ? <WeatherCard value={item.date} onClick={onWeatherCardSelected} key={item.date} bgcolor={'secondary.main'} txtcolor={'primary.main'} {...item}/>
            : <WeatherCard value={item.date} onClick={onWeatherCardSelected} key={item.date} bgcolor={'third.dark'} txtcolor={'primary.light'} {...item}/>  
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

