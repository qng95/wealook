import React from 'react';
import {Box, Card, CardActionArea, IconButton, Typography, Avatar, Stack} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Link} from "react-router-dom";
import StarIcon from '@mui/icons-material/Star';


function FilterCard(props) {
  const {filterId, filterName} = props;
  const img_name = Math.floor(Math.random() * 8);
  return (
    <Card component={Link} to={`/filters/${filterId}`}>
      <Box 
        sx={{
          border:'2px solid',
          borderColor: 'third.light',
          backgroundColor: 'third.dark',
          '&:hover': {
            backgroundColor: 'secondary.main',
            opacity: [1.9, 1.8, 1.7],
          },
      }}>
        <Stack direction="column">
          <Avatar variant="square" 
            style={{border: 0, objectFit: 'cover'}} 
            sx={{width:'100%', height: 300}} 
            src={`/countries_img/${img_name}.jpg`} />
          <Stack direction="row">
            <IconButton aria-label="delete-filter" color="error">
              <Delete />
            </IconButton>
            <CardActionArea sx={{color: 'primary.light', p:2, textAlign: 'center'}} >
              <Typography>{filterName}</Typography>
            </CardActionArea>
            <IconButton aria-label="start" color="info">
              <StarIcon/>
            </IconButton>
          </Stack>
          
        </Stack>
        
      </Box>
    </Card>
  );
}

export default FilterCard;