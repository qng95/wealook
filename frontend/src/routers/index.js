import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import Filters from "../pages/Filter/Filters";
import Filter from "../pages/Filter/Filter";
import PageNotFound from "../pages/ErrorPage/PageNotFound";

function Routers(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>

        <Route path="/filters" element={<Filters />}/>
        <Route path="/filters/:filterId" element={<Filter />}/>

        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register/>}/>

        <Route path="*" element={<PageNotFound />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;