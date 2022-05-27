import React from 'react';
import {Box, Card, CardActionArea, IconButton, Typography} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Link} from "react-router-dom";

function FilterCard(props) {
  const {filterId, filterName} = props;
  return (
    <Card>
      <Box>
        <CardActionArea component={Link} to={`/filters/${filterId}`}>
          <Typography>{filterId}:{filterName}</Typography>
        </CardActionArea>
        <IconButton aria-label="delete-filter" color="secondary">
          <Delete />
        </IconButton>
      </Box>
    </Card>
  );
}

export default FilterCard;