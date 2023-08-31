import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Home, Target, Execute, Disclaimer, Settings, NotFound } from './pages';

import { ThemeProvider } from "@mui/material/styles";
import darkTheme from './styles/Styles';

import CssBaseline from '@mui/material/CssBaseline';

// import Navbar from "./components/Navbar";
// import { linksArray } from './constants';

import FloatingNav from './components/FloatingNav'

function App() {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, [loading]);

  return (
  <Router>
      <div className="App">
        <FloatingNav/>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            {/* <Navbar links={linksArray} /> */}
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/target" exact element={<Target />} />
              <Route path="/execute" exact element={<Execute />} />
              <Route path="/disclaimer" exact element={<Disclaimer />} />
              <Route path="/settings" exact element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ThemeProvider>
      </div>
    </Router>
  );
}

export default App;
