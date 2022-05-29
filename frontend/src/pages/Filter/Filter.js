import React, {useState} from 'react';
import {
  Autocomplete,
  Container,
  IconButton,
  Stack,
  AppBar, Box, Toolbar, Typography, Drawer, Grid
} from "@mui/material";
import {useParams} from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import Home from "@mui/icons-material/Home";
import SearchIcon from '@mui/icons-material/Search';
import SaveAltOutlined from '@mui/icons-material/SaveAltOutlined';
import {Link} from "react-router-dom";
import InputBase from '@mui/material/InputBase';

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
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import './Filter.css'

const drawerWidth = 300;
const _mockAllLocationAndRegion = [
  {name: "Frankfurt"},
  {name: "Kakao"},
]

const _mock_CountryNames = [
 'All',
 'London',
 'Germany',
 'America',
 'China',
 'India',
 'Canada',
 'Italy',
 'France'
];

const _mock_WeatherNames = [
  'All',
  'Sunny',
  'Cloudy',
  'Rainny',
  'Stommy',
  'Snowy'
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

function getStyles(country, countries, theme) {
  return {
    fontWeight:
    countries.indexOf(country) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function Filter(props) {

  const theme = useTheme();
  const routeParams = useParams();
  const [filterParams, setFilterParams] = useState({
    regions: [],
    additionalCities: [],
  })
  const [filteredCitiesWeather, setFilteredCitiesWeather] = useState([]);

  function valuetext(value) {
    return `${value}°C`;
  }

  const [countries, setContries] = React.useState([]);

  const handleChangeCountries = (event) => {
    const {
      target: { value },
    } = event;
    setContries(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const [weather, setWeather] = React.useState([]);

  const handleChangeWeather = (event) => {
    const {
      target: { value },
    } = event;
    setWeather(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  

  const filterbox = (
    
      <List sx={{color: 'primary.light'}}>
        <ListItem>
        <ListItemIcon sx={{color: 'primary.light'}}> <LocationOnIcon/> </ListItemIcon>
          <FormControl sx={{ width: '90%'}} size="large">
            <InputLabel id="select-countries">Countries</InputLabel>
            <Select
              labelId="select-countries"
              id="select-countries-id"
              value={countries}
              label="countries"
              onChange={handleChangeCountries}
              multiple
              MenuProps={MenuProps}
            >
              {_mock_CountryNames.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, countries, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </ListItem>
        <ListItem>
          <ListItemIcon sx={{color: 'primary.light'}}> <ThermostatIcon/> </ListItemIcon>
          <ListItemText> Temp to: </ListItemText>
          
        </ListItem>
        <ListItem>
          <Box sx={{ ml:7, width: '90%' }}>
            <Slider
              aria-label="Temperature"
              defaultValue={30}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              step={10}
              marks
              min={10}
              max={110}
              color="secondary"
            />
          </Box>
        </ListItem>
        <ListItem>
          <ListItemIcon sx={{color: 'primary.light'}}> <ThermostatIcon/> </ListItemIcon>
          <ListItemText> Temp from: </ListItemText>
        </ListItem>
        <ListItem>
          <Box sx={{ ml:7, width: '90%' }}>
            <Slider
              aria-label="Temperature"
              defaultValue={30}
              getAriaValueText={valuetext}
              valueLabelDisplay="auto"
              step={10}
              marks
              min={10}
              max={110}
              color="secondary"
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
                value={weather}
                label="weather"
                onChange={handleChangeWeather}
                multiple
                MenuProps={MenuProps}
              >
                {_mock_WeatherNames.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, weather, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
          </FormControl>
        </ListItem>
      </List>
    
  );

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
                  options={_mockAllLocationAndRegion.map((option) => option.name)}
                  renderInput={(params) => (
                    <Search>
                      <SearchIconWrapper>
                        <SearchIcon />
                      </SearchIconWrapper>
                      <StyledInputBase
                        {...params}
                        placeholder="Search cities"
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
              {filterbox}
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