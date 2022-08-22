import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

/**
 * Import types
 */
import { Country, Continent } from "./interfaces/Types";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Home } from "./Home/Home";
import CountryDetail from "./CountryDetailPage/CountryDetail";
import LogoCrheana from "./assets/crehana-logo.png";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const innerTheme = createTheme({
  palette: {
    primary: {
      main: "#4624EA",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={innerTheme}>
      <div className="App">
        <nav className="navbar navbar-light nav-bar">
          <img src={LogoCrheana} alt="logo-crehana" className="logo-crehana" />
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:id" element={<CountryDetail />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
