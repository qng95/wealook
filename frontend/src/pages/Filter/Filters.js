import React from 'react';
import {
  Autocomplete,
  Container,
  Grid,
  IconButton,
  Stack
} from "@mui/material";
import {DeleteSweep, Home} from "@mui/icons-material";
import {Link} from "react-router-dom";
import FilterCard from "../../components/FilterCard/FilterCard";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const _mockAllLocationAndRegion = [
  {name: "Frankfurt"},
  {name: "Kakao"},
]

const _mockFilters = [
  {filterId: 'id1', filterName: 'NewYork Cities'},
  {filterId: 'id2', filterName: 'Singapore Cities'},
  {filterId: 'id3', filterName: 'Brazil Cities'},
  {filterId: 'id4', filterName: 'London Cities'},
  {filterId: 'id1', filterName: 'NewYork Cities'},
  {filterId: 'id2', filterName: 'Singapore Cities'},
  {filterId: 'id3', filterName: 'Brazil Cities'},
  {filterId: 'id4', filterName: 'London Cities'},
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

function Filters(props) {
  return (
    <Container sx={{ minWidth: '100%', bgcolor: 'primary.main'}}>
      <Stack 
        direction="row"
        justifyContent="right"
        alignItems="stretch">
        <Container sx={{minWith: '70%'}} >
          <IconButton sx={{pt: 4, pl:4}} component={Link} to={'/'} aria-label="my-location" color="secondary" >
            <Home fontSize="large"/>
          </IconButton>
        </Container>
        <Container >
          <Stack
            direction="row"
            justifyContent="right"
            alignItems="stretch"
            sx={{pt:2, pr:4}}
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
                    placeholder="Search filters"
                    InputProps={{
                      ...params.InputProps,
                      type: 'search',
                    }}
                  />
                </Search>
              )}
            />
            <IconButton aria-label="filter-collection" color="secondary">
              <DeleteSweep />
            </IconButton>
            <IconButton aria-label="add-filter" color="secondary">
              <AddCircleOutlineIcon/>
            </IconButton>
          </Stack>
        </Container>
      </Stack>
      
      <Grid 
        container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{px:8, py:2}}
      >
        {_mockFilters.map((item) => (
          <Grid item xs={2} sm={4} md={4} key={item.filterId} >
            <FilterCard {...item}/>
          </Grid>
        ))};
      </Grid>
    </Container>
  );
}

export default Filters;