import React, {useEffect, useState} from 'react';
import {
  Autocomplete,
  Container,
  IconButton,
  Stack,
  AppBar, Box, Toolbar, Typography, Drawer, Grid, TextField
} from "@mui/material";
import {useLocation, useParams} from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import Home from "@mui/icons-material/Home";
import SearchIcon from '@mui/icons-material/Search';
import SaveAltOutlined from '@mui/icons-material/SaveAltOutlined';
import {Link} from "react-router-dom";

import ThermostatIcon from '@mui/icons-material/Thermostat';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Slider from '@mui/material/Slider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material/styles';
import CityCard from "../../components/CityCard/CityCard";
import StarBorderIcon from '@mui/icons-material/StarBorder';

import './Filter.css'
import {testuser} from "../../stores/store";
import api from "../../api";
import PageLoader from "../PageLoader/PageLoader";
import _ from "lodash";
import {getWeatherConditionByCode} from "../../utils/openweather";

const drawerWidth = 300;

const _mock_CountryNames = [
 'London',
 'Germany',
 'America',
 'China',
 'India',
 'Canada',
 'Italy',
 'France'
];

const weatherNames = [
  'Clear',
  'Clouds',
  'Rain',
  'Snow'
];

const _mockCities = [
  {filterId: 'id1', city: 'Frankfurt am Main', temp: "26", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 201},
  {filterId: 'id2', city: 'Berlin' , temp: "28", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 300},
  {filterId: 'id3', city: 'Hanau', temp: "21", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 601},
  {filterId: 'id4', city: 'Darmstadt', temp: "24", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 800},
  {filterId: 'id1', city: 'Munich', temp: "20", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 601},
  {filterId: 'id2', city: 'Dusseldorf', temp: "16", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 302},
  {filterId: 'id3', city: 'Bonn', temp: "26", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 301},
  {filterId: 'id4', city: 'Hamburg', temp: "25", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 801},
]

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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

function getStyles(country, countries, theme) {
  return {
    fontWeight:
    countries.indexOf(country) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function Filter(props) {
  const location = useLocation();

  const theme = useTheme();
  const { filterId } = useParams();

  const [initialized, setInitialized] = useState(false);

  const [initFilter, setInitFilter] = useState(false);
  const [filterParams, setFilterParams] = useState(null);

  const [initFilteredCitiesWeather, setInitFilteredCitiesWeather] = useState(false);
  const [filteredCitiesWeather, setFilteredCitiesWeather] = useState(null);
  const [tempCitiesWeather, setTempCitiesWeather] = useState(null);

  const [initLocationData, setInitLocationData] = useState(false);
  const [countries, setCountries] = React.useState([]);
  const [regions, setRegions] = React.useState([]);
  const [cities, setCities] = React.useState([]);

  const [selectedCountries, setSelectedCountries] = React.useState([]);
  const [tempTo, setTempTo] = useState(70);
  const [tempFrom, setTempFrom] = useState(-70);
  const [selectedWeather, setSelectedWeather] = useState([]);


  const fetchFilter = async () => {
    const result = await api.get(`/filters/${testuser.id}/${filterId}`)
    const filterdata = result.data;
    setFilterParams(filterdata);
    setTempTo(filterdata.temp_to);
    setTempFrom(filterdata.temp_from);
    setInitFilter(true);
  }

  useEffect(() => {
    if (!initFilter) {
      fetchFilter();
    }
  }, [])

  const updateFilter = async () => {
    const result = await api.put(`/filters/${testuser.id}/${filterId}`, {
      id: filterParams.id,
      user_id: filterParams.id,
    })
  }

  const fetchWeatherDataForCities = async () => {
    const result = await api.get(`/weather/m`, {
      countries: selectedCountries
    })
    const weatherdata = result.data.weather;
    setFilteredCitiesWeather(weatherdata);
    setTempCitiesWeather(weatherdata);
  }

  useEffect(() => {
    if (initialized) {
      fetchWeatherDataForCities();
    }
  }, [selectedCountries])

  useEffect(() => {
    if (initialized) {
      const filteredWeather = filteredCitiesWeather.filter(item => {
        const temp = Math.trunc(item.temp - 273.15);
        const weather_cond_id = item.weather_cond_id;
        if (temp < tempFrom || temp > tempTo) {
          return false;
        }

        const weatherCondition = getWeatherConditionByCode(weather_cond_id);
        return weatherCondition in selectedWeather;
      });
      setTempCitiesWeather(filteredWeather);
    }
  }, [tempTo, tempFrom, selectedWeather])

  const fetchFilteredCitiesWeather = async () => {
    const result = await api.get(`/weather/f/${filterId}`, {
      mode: 'today_mid'
    });
    const weatherdata = result.data.weather;
    setFilteredCitiesWeather(weatherdata);
    setTempCitiesWeather(weatherdata);
    setInitFilteredCitiesWeather(true);
  }

  useEffect(() => {
    if (!initFilteredCitiesWeather) {
      fetchFilteredCitiesWeather();
    }
  }, [])

  const fetchCities = async (query) => {
    const result = await api.get("/cities", {
      q: query
    })
    setCities(result.data.cities);
  };

  const debouncedSearchChange = _.debounce(function (event) {
    const searchval = event.target.value;
    fetchCities(searchval);
  }, 300);

  const onSearchValSelected = (event, value) => {
    // TODO: update search param and request again
  }

  const fetchCountriesAndRegions = async () => {
    const _cresult = await api.get("/countries")
    const _rresult = await api.get("/regions")

    const countriesdata = _cresult.data.countries
    const regionsdata = _rresult.data.regions

    setCountries(countriesdata);
    setRegions(regionsdata);
    setInitLocationData(true);
  };

  useEffect(() => {
    if (!initLocationData) {
      fetchCountriesAndRegions();
    }
  });

  useEffect(() => {
    setInitialized(initFilter && initLocationData && initFilteredCitiesWeather);
  }, [initFilter, initLocationData, initFilteredCitiesWeather]);

  function valuetext(value) {
    return `${value}°C`;
  }

  const handleChangeCountries = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCountries(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleChangeWeather = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedWeather(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleTempToChange = (event, value) => {
    setTempTo(value);
  }

  const handleTempFromChange = (event, value) => {
    setTempFrom(value);
  }

  if (!initialized) {
    return <PageLoader/>
  }
  return (
    <Container sx={{ minWidth: '100%', bgcolor: 'primary.main'}}>
      <Stack direction="column" justifyContent="center" alignItems="strech">
        <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }  }}>
          <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
              <IconButton size="large" edge="start" sx={{ml:6}} component={Link} to={'/'} aria-label="my-location" color="secondary" >
                <Home/>
              </IconButton>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ color: 'primary.light', flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                {location.state.name}
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
                  options={cities}
                  getOptionLabel={(option) => option.name}
                  onChange={onSearchValSelected}
                  renderInput={(params) => (
                    <Search>
                      <SearchIconWrapper>
                        <SearchIcon />
                      </SearchIconWrapper>
                      <StyledInputBase
                        {...params}
                        placeholder="Search cities"
                        onChange={debouncedSearchChange}
                        InputProps={{
                          ...params.InputProps,
                          type: 'search',
                        }}
                      />
                    </Search>
                  )}
                />
                <IconButton aria-label="save-filter" color="secondary">
                  <SaveAltOutlined/>
                </IconButton>
                <IconButton aria-label="add-city" color="secondary">
                  <StarBorderIcon/>
                </IconButton>
              </Stack>
            </Toolbar>
          </AppBar>
        </Box>

        <Box sx={{ pt: 20, display: 'flex' }}>
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }}}
            aria-label="mailbox folders"
          >
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: 'none', sm: 'block' },
                '& .MuiDrawer-paper': { 
                  backgroundColor: 'secondary.dark', 
                  boxSizing: 'border-box', 
                  width: drawerWidth, 
                  pt: 20, 
                  alignItems: 'left'},
              }}
              open
            >
              <List sx={{color: 'primary.light'}}>
                <ListItem>
                  <ListItemIcon sx={{color: 'primary.light'}}> <LocationOnIcon/> </ListItemIcon>
                  <FormControl sx={{ width: '90%'}} size="large">
                    <InputLabel id="select-countries">Countries</InputLabel>
                    <Select
                      labelId="select-countries"
                      id="select-countries-id"
                      value={selectedCountries}
                      label="Countries"
                      onChange={handleChangeCountries}
                      MenuProps={MenuProps}
                      multiple
                    >
                      {countries.map((country) => (
                        <MenuItem
                          key={country.name}
                          value={country.name}
                          style={getStyles(country.name, selectedCountries, theme)}
                        >
                          {country.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{color: 'primary.light'}}> <ThermostatIcon/> </ListItemIcon>
                  <ListItemText> Temp from °C: </ListItemText>
                </ListItem>
                <ListItem>
                  <Box sx={{ ml:7, width: '90%' }}>
                    <Slider
                      aria-label="Temperature"
                      defaultValue={tempFrom}
                      getAriaValueText={valuetext}
                      valueLabelDisplay="auto"
                      step={10}
                      marks
                      min={-70}
                      max={70}
                      color="secondary"
                      onChange={handleTempFromChange}
                    />
                  </Box>
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{color: 'primary.light'}}> <ThermostatIcon/> </ListItemIcon>
                  <ListItemText> Temp to °C: </ListItemText>
                </ListItem>
                <ListItem>
                  <Box sx={{ ml:7, width: '90%' }}>
                    <Slider
                      aria-label="Temperature"
                      defaultValue={tempTo}
                      getAriaValueText={valuetext}
                      valueLabelDisplay="auto"
                      step={10}
                      marks
                      min={-70}
                      max={70}
                      color="secondary"
                      onChange={handleTempToChange}
                    />
                  </Box>
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{color: 'primary.light'}}> <WbSunnyIcon/> </ListItemIcon>
                  <FormControl sx={{ width: '90%'}} size="large">
                    <InputLabel id="select-weather">Weather</InputLabel>
                    <Select
                      labelId="select-weather"
                      id="select-weather-id"
                      value={selectedWeather}
                      label="weather"
                      onChange={handleChangeWeather}
                      multiple
                      MenuProps={MenuProps}
                    >
                      {weatherNames.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(name, selectedWeather, theme)}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </ListItem>
              </List>
            </Drawer>
          </Box>
          <Box
            component="main"
            sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
          >
            <Grid 
              container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
              sx={{px:4, py:4}}
            >
            {_mockCities.map((item) => (
              <Grid item xs={2} sm={4} md={4} key={item.filterId} >
                <CityCard {...item}/>
              </Grid>
            ))};
            </Grid>
          </Box>
        </Box>   
      </Stack>
      
    </Container>
    
  );
}

export default Filter;