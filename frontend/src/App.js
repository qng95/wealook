import React, {Fragment} from 'react';
import './App.css';
import Routers from "./routers";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <Fragment>
      <Routers/>
      <Outlet />
    </Fragment>
  );
}

export default App;
