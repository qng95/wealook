import React, {useState} from 'react';
import {Box, Divider, Drawer, Toolbar, Typography} from "@mui/material";
import {useParams} from "react-router-dom";

const drawerWidth = 300;

function Filter(props) {
  const routeParams = useParams();
  const [filterParams, setFilterParams] = useState({
    regions: [],
    additionalCities: [],
  })
  const [filteredCitiesWeather, setFilteredCitiesWeather] = useState([]);

  return (
    <Box sx={{display: 'flex'}}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar/>
        <Divider/>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />

      </Box>
    </Box>
  );
}

export default Filter;