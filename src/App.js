import React, { useState, useEffect } from 'react';

import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


import * as geolib from 'geolib';
import './App.css';



import { Home, Target, Execute, Disclaimer, Contact, NotFound } from './pages';

// import {UserPosition} from './UserPosition';

// import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
// import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';




import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from '@mui/material/CssBaseline';
import { blueGrey } from '@mui/material/colors';

import Navbar from "./components/Navbar";

import { linksArray } from './constants';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    gradient: {
      main: "linear-gradient(-39deg, #263238 0%, #212121 100%)",
    }
  },
});



function App() {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [loading]);

  // const [value, setValue] = React.useState<Dayjs | null>(
  //   dayjs.utc('2022-04-17T15:30')
  // );



  return (
    <Router>
          <div className="App">

      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Navbar links={linksArray} />

        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/target" exact element={<Target />} />
          <Route path="/execute" exact element={<Execute />} />
          <Route path="/disclaimer" exact element={<Disclaimer />} />
          <Route path="/contact" exact element={<Contact />} />

          <Route path="*" element={<NotFound />} />

        </Routes>

       

       



      </ThemeProvider>
      </div>
    </Router>
  );
}

export default App;
