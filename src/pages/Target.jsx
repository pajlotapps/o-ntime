import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { 
  Alert,
  Grid, 
  Typography, 
  TextField } from "@mui/material";

import TimeField from "react-simple-timefield";
// import CoordinateInput from 'react-coordinate-input'
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { latReg, longReg } from "../constants";

import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';


function Target() {

  const [tot, setTOT] = useState(() => {
    const saved = localStorage.getItem("TOT");
    const initialValue = JSON.parse(saved);
    return initialValue || "00:00:00";
  });

  const [targetPosition, setTargetPosition] = useState(() => {
    // isSet: false,
    // coords: {
    // lat: 50.12345,
    // long: 15.123456,
    const saved = localStorage.getItem("target");
    const initialValue = JSON.parse(saved);
    return (
      initialValue || {
        lat: 0,
        latCardinal: "N",
        long: 0,
        longCardinal: "E",
      }
    );
  });

  const [northing, setNorthing] = useState("N");
  const [easting, setEasting] = useState("E");

  const toggleNorthing = (event, newNorthing) => {
    setNorthing(newNorthing);
  };

  const toggleEasting = (event, newEasting) => {
    setEasting(newEasting);
  };

  const handleTgtChange = (e) => {
    const { name, value } = e.target;
    const input = value.substring(0, 11);

    if (name === "lat") {
      const formattedLat = input.replace(latReg, `$1° $2' $3''`);
      e.target.value = formattedLat;

      // console.log("after format lat", formattedLat);
      e.target.value = formattedLat;
      setTargetPosition((prev) => ({
        ...prev,
        lat: formattedLat,
      }));
    } else if (name === "long") {
      const formattedLong = input.replace(longReg, `$1° $2' $3''`);
      e.target.value = formattedLong;

      console.log("after format long", formattedLong);
      e.target.value = formattedLong;
      setTargetPosition((prev) => ({
        ...prev,
        long: formattedLong,
      }));
    } else {
      e.target.value = input;

      setTargetPosition((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // useEffect(() => {
  //   console.log(targetPosition);
  // }, [targetPosition]);

  // function insertSlash(val) {
  //   const latReg = /^(?:[0-8]\d|90)(?:[0-5]\d)(?:[0-5]\d)/

  //   return val.replace(/^([0-8]\d|90)([0-5]\d)([0-5]\d)/, `$1°$2'$3''`);
  // }

  // console.log(insertSlash('521918'));

  useEffect(() => {
    localStorage.setItem("TOT", JSON.stringify(tot));
  }, [tot]);

  useEffect(() => {
    localStorage.setItem("target", JSON.stringify(targetPosition));
  }, [targetPosition]);

  const gridStyles = {
    // backgroundColor: "blue",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: 400,
    alignItems: "center",
  };

  return (
    <div className="Content">
      <Grid
        container
        // spacing={2}
        rowSpacing={2}
        columnSpacing={2}
        columns={16}
        sx={gridStyles}
      >
        <Grid item xs={10}>
          <TextField
            fullWidth
            inputProps={{
              inputMode: "numeric",
            }}
            onFocus={(event) => {
              event.target.select();
            }}
            label="Latitude"
            variant="outlined"
            name="lat"
            // value={targetPosition.lat}
            onChange={handleTgtChange}
            // type="number"
            placeholder="DD°MM'SS''"
          />
        </Grid>
        <Grid item xs={4}>
          <ToggleButtonGroup
            fullWidth
            color="primary"
            value={northing}
            exclusive
            onChange={toggleNorthing}
          >
            <ToggleButton
              value="N"
              onClick={handleTgtChange}
              name="latCardinal"
            >
              N
            </ToggleButton>
            <ToggleButton
              value="S"
              onClick={handleTgtChange}
              name="latCardinal"
            >
              S
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>

        <Grid item xs={10}>
          <TextField
            fullWidth
            inputProps={{
              inputMode: "numeric",
            }}
            onFocus={(event) => {
              event.target.select();
            }}
            label="Longitude"
            placeholder="DDD°MM'SS''"
            variant="outlined"
            name="long"
            // type="number"
            onChange={handleTgtChange}
          />
        </Grid>
        <Grid item xs={4}>
          <ToggleButtonGroup
            fullWidth
            color="primary"
            value={easting}
            exclusive
            onChange={toggleEasting}
          >
            <ToggleButton
              value="E"
              onClick={handleTgtChange}
              name="longCardinal"
            >
              E
            </ToggleButton>
            <ToggleButton
              value="W"
              onClick={handleTgtChange}
              name="longCardinal"
            >
              W
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={14}>
          <TimeField
            onChange={(event, value) => {
              // console.log(event, value);
              setTOT(value);
            }}
            input={
              <TextField
                fullWidth
                inputProps={{
                  inputMode: "numeric",
                }}
                onFocus={(event) => {
                  event.target.select();
                }}
                value={tot}
                label="TOT"
                variant="outlined"
                placeholder="HH:MM:SS"
              />
            }
            colon=":"
            showSeconds
          />

          {/* <CoordinateInput
            value={targetPosition.lat}
            onChange={(value, { unmaskedValue, dd, dms }) => {
              console.log(value, unmaskedValue, dd, dms)
            }}
          /> */}
        </Grid>
        <Grid item xs={14}>
          {targetPosition.lat && targetPosition.long ? (
            // {latitude && targetPosition.long ? (
            <code>
              <Typography gutterBottom>
                <>
                  <strong>Target location:</strong>
                </>
                <br />
                {targetPosition.lat} {targetPosition.latCardinal}{" "}
                {targetPosition.long} {targetPosition.longCardinal}
              </Typography>
              {tot !== "" ? (
                <Typography gutterBottom>
                  <>
                    Desire<strong> TOT</strong> [UTC]:
                  </>
                  <br />
                  {tot}
                </Typography>
              ) : null}
              <Typography mt={2}>
              <Link className="text-link" to="/execute">
                <Alert variant="outlined" severity="success">
                  Execute <DoubleArrowIcon style={{ fontSize: 10 }} /> <DoubleArrowIcon style={{ fontSize: 10 }} /> <DoubleArrowIcon style={{ fontSize: 10 }} /> be on time!
                </Alert>
              </Link>
            </Typography>
              
            </code>
          ) : null}
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </div>
  );
}

export default Target;
