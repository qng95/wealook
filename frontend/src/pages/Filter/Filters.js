import React, {useEffect, useState} from 'react';
import {useNavigate, Link, useLocation} from "react-router-dom";
import {
  Autocomplete,
  Container,
  Grid,
  IconButton,
  Stack,
  AppBar, Box, Toolbar, Typography
} from "@mui/material";
import {DeleteSweep, Home} from "@mui/icons-material";
import FilterCard from "../../components/FilterCard/FilterCard";
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {testuser} from "../../stores/store";
import PageLoader from "../PageLoader/PageLoader";
import api from "../../api";
import _ from 'lodash';

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
  const location = useLocation();
  const navigate = useNavigate();

  const [initFilters, setInitFilters] = useState(false)
  const [filters, setFilters] = useState(null)
  const [filteredFilters, setFilteredFilters] = useState(null);

  const fetchFilters = async () => {
    const result = await api.get(`/filters/${testuser.id}`);
    const filters_data = result.data.filters;
    setFilters(filters_data);
    setFilteredFilters(filters_data.filter(_f => (1===1)))
    setInitFilters(true);
  };

  useEffect(() => {
    if (!initFilters) {
      fetchFilters();
    }
  }, []);

  const addFilter = async () => {
    const result = await api.post(`/filters/${testuser.id}`);
    const newFilterData = result.data
    navigate(`/filters/${newFilterData.id}`);
  }

  const deleteAllFilters = async () => {
    const result = await api.delete(`/filters/${testuser.id}`);
    await fetchFilters();
  }

  const deleteOneFilter = async (id) => {
    const result = await api.delete(`/filters/${testuser.id}/${id}`);
    await fetchFilters();
  }

  const updateFilterName = async (id, newName) => {
    await api.put(`/filters/${testuser.id}/${id}`, {
      id: id,
      name: newName
    });
  }
  const debouncedSearchChange = _.debounce(function (event) {
    const searchVal = event.target.value;
    if (searchVal === "") {
      setFilteredFilters(filters.filter(_f => (1===1)))
    } else {
      const _filteredFilters = filters.filter(_f => (_f.name.startsWith(searchVal)))
      setFilteredFilters(_filteredFilters)
    }

  }, 300);

  if (!initFilters) {
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
                options={filters.map((option) => option.name)}
                renderInput={(params) => (
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      {...params}
                      placeholder="Search filters"
                      inputProps={{
                        ...params.inputProps,
                        type: 'search',
                      }}
                      onChange={debouncedSearchChange}
                    />
                  </Search>
                )}
              />
              <IconButton aria-label="filter-collection" color="secondary" onClick={deleteAllFilters}>
                <DeleteSweep />
              </IconButton>
              <IconButton aria-label="add-filter" color="secondary" onClick={addFilter}>
                <AddCircleOutlineIcon/>
              </IconButton>
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>
      
      <Grid 
        container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}
        sx={{px:8, py:20}}
      >
        {filteredFilters.map((item) => (
          <Grid item xs={2} sm={4} md={4} key={item.id} >
            <FilterCard onDeleteBtnClick={deleteOneFilter} onNameChange={updateFilterName} {...item}/>
          </Grid>
        ))};
      </Grid>
    </Container>
  );
}

export default Filters;