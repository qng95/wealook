import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {Autocomplete, Container, IconButton, Stack, TextField} from "@mui/material";
import {MyLocation, BurstMode} from "@mui/icons-material";

import WeatherCard from "../../components/WeatherCard/WeatherCard";
import PageLoader from "../PageLoader/PageLoader";

const _mockAllLocationAndRegion = [
  {name: "Frankfurt"},
  {name: "Kakao"},
]

const _mockWeatherConditions = [
  {city: 'Frankfurt', date: 'Wed 25', temp: "26", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 201},
  {city: 'Frankfurt', date: 'Thurs 26', temp: "26", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 202},
  {city: 'Frankfurt', date: 'Fri 27', temp: "26", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 800},
  {city: 'Frankfurt', date: 'Sat 28', temp: "26", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 703},
  {city: 'Frankfurt', date: 'Sun 29', temp: "26", feels_like: "24", humidity: "66", wind_speed: "11", visibility: "10", wcond_id: 601},
]

function Home(props) {
  const [dataAvailable, setDataAvailable] = useState(false);

  useEffect(() => {
    setDataAvailable(true);
  },[])

  if (!dataAvailable) {
    return (
      <PageLoader/>
    );
  }
  return (
    <Container sx={{ minWidth: '80%', bgcolor: 'primary.main'}}>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={1}
      >
        <IconButton aria-label="my-location" color="secondary">
          <MyLocation />
        </IconButton>
        <Autocomplete
          freeSolo /*value can be any does not have to be in the allLocationAndRegion list*/
          disableClearable
          id="locationSearch"
          options={_mockAllLocationAndRegion.map((option) => option.name)}
          renderInput={(params) => (
            <TextField
              sx={{minWidth: 300}}
              {...params}
              label="Search location/region"
              InputProps={{
                ...params.InputProps,
                type: 'search',
              }}
            />
          )}
        />
        <IconButton component={Link} to={'/filters'} aria-label="filter-collection" color="secondary">
          <BurstMode />
        </IconButton>
      </Stack>

      <Stack
        direction="column"
        justifyContent="center"
        alignItems="stretch"
        spacing={1}
        >
        {_mockWeatherConditions.map((item) => (
          <WeatherCard key={item.date} {...item}/>
        ))}
      </Stack>

    </Container>
  );
}

export default Home;