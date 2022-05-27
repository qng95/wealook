import React from 'react';
import {
  Autocomplete,
  Box, Card,
  CardActionArea,
  Container,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import {DeleteSweep, Home} from "@mui/icons-material";
import {Link} from "react-router-dom";
import FilterCard from "../../components/FilterCard/FilterCard";

const _mockAllLocationAndRegion = [
  {name: "Frankfurt"},
  {name: "Kakao"},
]

const _mockFilters = [
  {filterId: 'id1', filterName: 'Germany Cities'},
  {filterId: 'id2', filterName: 'America Cities'},
  {filterId: 'id3', filterName: 'Brazil Cities'},
  {filterId: 'id4', filterName: 'Brazil Cities'},
]

function Filters(props) {
  return (
    <Container sx={{ minWidth: '80%', bgcolor: 'primary.main'}}>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={1}
      >
        <IconButton component={Link} to={'/'} aria-label="my-location" color="secondary">
          <Home />
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
        <IconButton aria-label="filter-collection" color="secondary">
          <DeleteSweep />
        </IconButton>
      </Stack>
      <Grid container spacing={2}>
        <Grid item xs={4} md={2} lg={2} key={"addFilterBtn1"}>
          <Card>
            <Box>
              <CardActionArea>
                <Typography>Add Filter</Typography>
              </CardActionArea>
            </Box>
          </Card>
        </Grid>
        {_mockFilters.map((item) => (
          <Grid item xs={4} md={2} lg={2} key={item.filterId}>
            <FilterCard {...item}/>
          </Grid>
        ))};
      </Grid>
    </Container>
  );
}

export default Filters;