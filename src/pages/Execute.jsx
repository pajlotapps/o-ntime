import React, { useState, useEffect } from "react";
import { usePosition } from "use-position";
import {
  toDMS,
  parseDMS,
  formatHHMMSS,
  calculateETA,
  dateIsValid,
  diffETAnTOT,
  calculateNewGS,
} from "../utils";
import { toUTC } from "../constants";
import { Alert, Typography } from "@mui/material";

import SpeedIcon from "@mui/icons-material/Speed";
import NavigationIcon from "@mui/icons-material/Navigation";

import { Link } from "react-router-dom";

const { Position, getDistance } = require("aviation-math");
var convert = require("convert-units");

function Execute() {

  const watch = true;
  let { latitude, longitude, speed, timestamp, accuracy, heading, error } =
    usePosition(watch, {
      enableHighAccuracy: true,
      timeout: 60000,
      maximumAge: 0,
    });

  //#TODO: switch to FALSE prior deploy !!!
  const isTesting = false //true;
  const speedTest = 160; //km/h
  const hdgTest = 176; //degree
  speed = isTesting && speedTest;
  heading = isTesting && hdgTest;

  const [currPosition, setCurrPosition] = useState({
    lat: 0,
    long: 0,
    speed: 0,
    heading: 0,
  });

  const [tot, setTOT] = useState(() => {
    // const tot = (() => {
    const saved = localStorage.getItem("TOT");
    const initialValue = JSON.parse(saved);
    return initialValue || "0";
  });

  const [ete, setETE] = useState(0);
  const [toLate, setToLate] = useState(false);
  const [eta, setETA] = useState(0);
  const [newGS, setNewGS] = useState(0);

  const [distance, setDistance] = useState(() => {
    const saved = localStorage.getItem("distance");
    const initialValue = JSON.parse(saved);
    return initialValue || null;
  });

  const [targetPosition, setTargetPosition] = useState([]);

  useEffect(() => {
    const targetPosition = JSON.parse(localStorage.getItem("target"));

    if (targetPosition) {
      setTargetPosition(targetPosition);
    }

    if (targetPosition.lat !== 0 && targetPosition.long !== 0) {
      // console.log(targetPosition);
      // setDistance(
      const dist = getDistance(
        new Position(currPosition.lat, currPosition.long),
        new Position(
          parseDMS(targetPosition.lat, targetPosition.latCardinal),
          parseDMS(targetPosition.long, targetPosition.longCardinal)
        )
        // );
      );

      if (speed) {
        setETE(dist / speed);
        setNewGS(calculateNewGS(tot, dist));
      } else {
        setETE(null);
      }
      setETA(calculateETA(parseFloat(ete)));
      setToLate(diffETAnTOT(eta, tot).toLate);
      // console.log("GS:", speed, "ETE: ", ete, "ETA: ", eta, "late:", toLate);

      setDistance(dist);
      localStorage.setItem("distance", JSON.stringify(dist));
    }
  }, [currPosition, ete]);

  useEffect(() => {
    setCurrPosition({
      lat: latitude,
      long: longitude,
      speed: speed,
      heading: heading,
    });
  }, [latitude, longitude, speed, accuracy, heading]);

  return (
    <div className="Content">
      <>
        <Typography>
          <strong>Current location:</strong>
        </Typography>

        {latitude && (
          <>
            <Typography variant="subtitle1" paragraph>
              {toDMS(latitude, longitude).lati}{" "}
              {toDMS(longitude, longitude).long}
            </Typography>
            {/* <Typography variant="subtitle1" paragraph> */}

            {speed ? (
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <SpeedIcon style={{ fontSize: 20 }} />
                {convert(speed).from("m/s").to("knot").toFixed()} kt
                <NavigationIcon style={{ fontSize: 20 }} />
                {heading.toFixed()}°
              </span>
            ) : isTesting ? (
              <span>
                <strong>GS: --- kt | HDG: ---°</strong>
              </span>
            ) : (
              <Alert variant="outlined" severity="info">
                Start moving
              </Alert>
            )}
          </>
        )}

        {targetPosition.lat !== 0 && targetPosition.long !== 0 ? (
          <>
            <Typography mt={2}>
              <strong>Target location:</strong>
            </Typography>

            <Typography variant="subtitle1" paragraph>
              {targetPosition.lat} {targetPosition.latCardinal}{" "}
              {targetPosition.long} {targetPosition.longCardinal}
            </Typography>

            {distance !== null && (
              <span>
                Distance: {distance.toFixed(1)} NM
                <br />
              </span>
            )}
            {ete ? (
              <span>
                ETE: {formatHHMMSS(ete)}
                <br />
              </span>
            ) : null}
            <br />

            <strong> TOT: {tot} [UTC]</strong>
            <br />
            {speed > 0 ? (
              <Typography
                variant="body1"
                style={{ color: toLate ? "red" : "green" }}
              >
                ETA: {dateIsValid(eta) && toUTC.format(eta)} [UTC]
              </Typography>
            ) : null}
            <br />
          </>
        ) : (
          <>
            <Typography mt={2}>
              <Link className="text-link" to="/target">
                <Alert variant="outlined" severity="error">
                  Set target location and TOT
                </Alert>
              </Link>
            </Typography>
          </>
        )}

        {newGS ? (
          <Alert
            variant="outlined"
            severity={diffETAnTOT(eta, tot).toLate ? "error" : "info"}
          >
            Speed: {newGS.toFixed()}{" kt - "}
            {diffETAnTOT(eta, tot).toLate
              ? "TGT missed!"
              : <span>Slow down {(speed - newGS).toFixed()}
                </span>} {" "}
          </Alert>
        ) : null}
      </>

      {latitude ? (
        <Typography variant="caption" display="block" mt={2} gutterBottom>
          <code>
            timestamp: {toUTC.format(timestamp)} UTC
            <br />
            accuracy: {accuracy && `${Math.round(accuracy)} meters`}
            <br />
            {error ? <span>error: {error}</span> : null}
          </code>
        </Typography>
      ) : (
        <Alert variant="outlined" severity="warning">
          standby, looking for fix
        </Alert>
      )}
    </div>
  );
}

export default Execute;
