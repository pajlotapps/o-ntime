import React, { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import TimeField from "react-simple-timefield";
// import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { formatToDMS } from "../utils";

function Target() {
  const [tot, setTOT] = useState(() => {
    const saved = localStorage.getItem("TOT");
    const initialValue = JSON.parse(saved);
    return initialValue || "0";
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
        distance: 0,
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
    const input = value.substring(0, 6);
    e.target.value = input;

    setTargetPosition((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // useEffect(() => {
  //   console.log(targetPosition);
  // }, [targetPosition]);

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

    // justifyContent: "space-between"
  };

  return (
    <div className="Content">
      <Grid
        container
        //spacing={2}
        rowSpacing={2}
        columnSpacing={2}
        columns={16}
        sx={gridStyles}

        // alignItems="center"

        // container
        // spacing={2}
        // container
        // justifyContent="space-between"
        // spacing={2}
      >
        <Grid item xs={10}>
          <TextField
            fullWidth
            inputProps={{ inputMode: 'numeric' }}
            label="Latitude"
            variant="outlined"
            name="lat"
            onChange={handleTgtChange}
            type="number"
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
            inputProps={{ inputMode: 'numeric' }}
            label="Longitude"
            placeholder="DD°MM'SS''"
            variant="outlined"
            name="long"
            type="number"
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
            }} // {Function} required
            input={
              <TextField
                fullWidth
                inputProps={{ inputMode: 'numeric' }}
                value={tot} // {String}   required, format '00:00' or '00:00:00'
                label="TOT"
                variant="outlined"
                placeholder="HH:MM:SS"
              />
            }
            colon=":"
            showSeconds
          />
        </Grid>
        <Grid item xs={14}>
          {targetPosition.lat && targetPosition.long ? (
            <code>
              <Typography>
                <p>
                  <small>
                    <strong>Target location:</strong>
                  </small>
                  <br />
                  {formatToDMS(targetPosition.lat)} {targetPosition.latCardinal}{" "}
                  {formatToDMS(targetPosition.long)}{" "}
                  {targetPosition.longCardinal}
                </p>
              </Typography>
              {tot !== "" ? (
                <Typography>
                  <small>
                    Desire<strong> TOT</strong> [UTC]:
                  </small>
                  <br />
                  {tot}
                </Typography>
              ) : null}
              <p>
                {/* Distance: {targetPosition.distance.toFixed(1)} NM <br />
                ETT: 15 min 21 sek */}
              </p>
              <Link className="text-link" to="/execute">
                <Button variant="outlined">Execute </Button>
              </Link>
            </code>
          ) : null}
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </div>
  );
}

export default Target;
