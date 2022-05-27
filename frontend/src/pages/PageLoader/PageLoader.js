import React from 'react';
import {CircularProgress, Container} from "@mui/material";

function PageLoader(props) {
  return (
    <Container sx={{minWidth: "100%"}}>
      <CircularProgress />
    </Container>
  );
}

export default PageLoader;