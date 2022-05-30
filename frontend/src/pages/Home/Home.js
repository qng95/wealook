import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import {
  Typography,
  Autocomplete,
  Container,
  IconButton,
  Stack,
  Tabs,
  Box,
  AppBar,
  Toolbar,
  TextField
} from "@mui/material";
import {MyLocation, BurstMode} from "@mui/icons-material";
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';

import WeatherCard from "../../components/WeatherCard/WeatherCard";
import WeatherHourCard from "../../components/WeatherCard/WeatherHourCard";
import PageLoader from "../PageLoader/PageLoader";
import api from "./../../api";
import dateutils from "../../utils/dateutils";
import {testuser} from "../../stores/store";

import './Home.css';
import _ from "lodash";


const _mockWeatherConditions = [
  {date: 'Wed 25', temp: "26", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 201},
  {date: 'Thu 26', temp: "26", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 202},
  {date: 'Fri 27', temp: "26", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 800},
  {date: 'Sat 28', temp: "26", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 300},
  {date: 'Sun 29', temp: "26", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 601},
]

const _mockWeatherHourConditions = [
  {hour:"9:00", temp: "26", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 201},
  {hour:"12:00", temp: "26", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 201},
  {hour:"4:00", temp: "26", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 201},
  {hour:"7:00", temp: "26", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 201},
  {hour:"11:00", temp: "26", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 201}
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

const StyledInputBase = styled(TextField)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})!important`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      width: '20ch!important',
      '&:focus': {
        width: '20ch!important',
      },
    },
  },
}));

function Home(props) {
  const [dataAvailable, setDataAvailable] = useState(null);

  const [initCities, setInitCities] = useState(false);
  const [cities, setCities] = useState([]);

  const [initUserPref, setInitUserPref] = useState(false);
  const [userPref, setUserPref] = useState(null);

  const [selectedCity, setSelectedCity] = useState(null);

  const [initWeatherData, setInitWeatherData] = useState(false);
  const [selectedCityForecast, setSelectedCityForecast] = useState(null);

  const [initSortedWeatherData, setInitSortedWeatherData] = useState(false);
  const [sortedWeatherDataByDay, setSortedWeatherDataByDay] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);

  const getCitiesData = async (query) => {
    const result = await api.get("/cities", {
      q: query
    })
    setCities(result.data.cities);
    setInitCities(true);
  };

  useEffect(() => {
    const getUserPref = async () => {
      const result = await api.get(`/userpref/${testuser.id}`)
      const resultdata = result.data;
      const usercity = {
        name: resultdata.city_ascii,
        id: resultdata.id
      };
      setSelectedCity(usercity);
      setUserPref(usercity);
      setInitUserPref(true);
    };
    if (!initUserPref) {
      getUserPref();
    }
  },[]);

  const updateUserPref = async () => {
    if (selectedCity) {
      await api.put(`/userpref/${testuser.id}`, {
        user_id: testuser.id,
        home_location_id: selectedCity.id
      });
    }
  };

  const debouncedSearchChange = _.debounce(function (event) {
    const searchval = event.target.value;
    getCitiesData(searchval);
  }, 300);

  const onSearchValSelected = (event, value) => {
    setSelectedCity(value);
  }

  const fetchWeatherData = async () => {
    const result = await api.get(`/weather/s/${selectedCity.id}`, {
      mode: 'forecast'
    });
    const weatherdata = result.data.weather;
    setSelectedCityForecast(weatherdata);
    setInitWeatherData(true);
  };

  useEffect(() => {
    if (selectedCity) {
      fetchWeatherData();
    }
  }, [selectedCity]);

  useEffect(() => {
    setDataAvailable( initUserPref && initWeatherData && initSortedWeatherData);
  }, [initUserPref, initWeatherData, initSortedWeatherData]);

  useEffect(() => {
    if (initWeatherData) {
      const sortedweather = selectedCityForecast.map(item => (item));
      sortedweather.sort((a, b) => {
        return a.dt <= b.dt;
      });

      const hourlyWeatherByDate = {};

      sortedweather.forEach(item => {
        const dt = item.dt;
        const dateStr = dateutils.Epoch2DateStr(dt);
        const hourStr = dateutils.Epoch2HourStr(dt);

        if (!(dateStr in hourlyWeatherByDate)) {
          hourlyWeatherByDate[dateStr] = {
            midday: null,
            hourly: []
          };
        }

        const converteddata = {
          date: dateStr,
          hour: hourStr,
          temp: `${Math.trunc(item.temp - 273.15)}`,
          feels_like: `${Math.trunc(item.feels_like - 273.15)}`,
          humidity: `${item.humidity}`,
          wind_speed: `${Math.trunc(item.wind_speed * 3.6)}`,
          visibility: `${Math.trunc(item.visibility / 1000.0)}`,
          wcond_id: item.weather_cond_id,
        };

        hourlyWeatherByDate[dateStr].hourly.push(converteddata);
        if (hourlyWeatherByDate[dateStr].midday === null) {
          hourlyWeatherByDate[dateStr].midday = converteddata;
        }
      });
      setSortedWeatherDataByDay(hourlyWeatherByDate);
      setSelectedDate(Object.values(hourlyWeatherByDate)[0].midday.date)
      setInitSortedWeatherData(true);
    }
  }, [selectedCityForecast])

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
            <IconButton size="large" edge="start" sx={{ml:6}} aria-label="my-location" color="secondary" onClick={updateUserPref}>
              <HomeRoundedIcon/> 
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ color: 'primary.light', flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              {selectedCity.name}
            </Typography>
            <Stack
              direction="row"
              justifyContent="right"
              alignItems="stretch"
              sx={{mr:7}}
            >

              <Autocomplete
                /*freeSolo */ /*value can be any does not have to be in the allLocationAndRegion list*/
                disableClearable
                id="locationSearch"
                options={cities}
                getOptionLabel={(option) => option.name}
                onChange={onSearchValSelected}
                renderInput={(params) => (
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      onChange={debouncedSearchChange}
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
        {Object.values(sortedWeatherDataByDay).map((item) => {
            console.log(item);
            const date = item.midday.date;
            const weatherdata = item.midday;
            if (selectedDate === date) {
              return <WeatherCard value={date} onClick={onWeatherCardSelected} key={date} bgcolor={'secondary.main'} txtcolor={'primary.main'} {...weatherdata}/>;
            } else {
              return <WeatherCard value={date} onClick={onWeatherCardSelected} key={date} bgcolor={'third.dark'} txtcolor={'primary.light'} {...weatherdata}/>
            }
        })}
      </Tabs>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="strech"
        spacing={2}
        sx={{px:8, py:2}}
        
        >
        {sortedWeatherDataByDay[selectedDate].hourly.map((item) => (
          <WeatherHourCard key={item.hour} {...item}/>
        ))}
      </Stack>
      

    </Container>
  );
}

export default Home;

