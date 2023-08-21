import React, { useState, useEffect } from "react";
import { usePosition } from "use-position";
import { calculateDistance, toDMS, formatToDMS } from "../utils";

import Typography from "@mui/material/Typography";

const { Position, getDistance } = require("aviation-math");
var convert = require("convert-units");

function Execute() {
  const watch = true;
  const { latitude, longitude, speed, timestamp, accuracy, heading, error } =
    usePosition(watch, {
      enableHighAccuracy: true,
      timeout: 60000,
      maximumAge: 0,
    });

  const [currPosition, setCurrPosition] = useState({
    lat: 0,
    long: 0,
    speed: 0,
    heading: 0,
  });

  const [tot, setTOT] = useState(() => {
    const saved = localStorage.getItem("TOT");
    const initialValue = JSON.parse(saved);
    return initialValue || "0";
  });

  const [targetPosition, setTargetPosition] = useState([]);

  useEffect(() => {
    const targetPosition = JSON.parse(localStorage.getItem("target"));
    if (targetPosition) {
      setTargetPosition(targetPosition);
    }

    const dist = getDistance(
      new Position(currPosition.lat, currPosition.long),
      new Position(targetPosition.lat, targetPosition.long)
    );

    setTargetPosition((prev) => ({
      ...prev,
      distance: dist,
    }));
  }, []);

  useEffect(() => {
    setCurrPosition({
      lat: latitude,
      long: longitude,
      speed: speed,
      heading: heading,
    });
  }, []);

  return (
    <div className="Content">
      {targetPosition.lat && targetPosition.long ? (
        <code>
          <Typography>
            <p>
            <small><strong>Current location:</strong></small>
            </p>
            {latitude ? (
                <small>
                  {toDMS(latitude, longitude).lati}{" "}
                  {toDMS(longitude, longitude).long}
                </small>
            ) : null}
            <p>
              <small>
                <strong>Target location:</strong>
              </small>
            </p>
              <small>
                {formatToDMS(targetPosition.lat)} {targetPosition.latCardinal}{" "}
                {formatToDMS(targetPosition.long)} {targetPosition.longCardinal}
              </small>
          <p>
            Distance: {targetPosition.distance.toFixed(1)} NM <br />
            <strong> TOT: {tot} [UTC]</strong><br />
            ETA: 12:54:21 [UTC]<br />
            ETE: 15 min 21 sek 
            {speed ? (
               
                <span>{(targetPosition.distance/speed).toFixed(1)} h</span>
            // ): <span> GS: 0</span>}
            ): null}

          </p>
          </Typography>
        </code>
      ) : null}
      {latitude ? (
        <p>
          <code>
            <small>
              {speed ? (
                <span>
                  GS {convert(speed).from("m/s").to("knot").toFixed()} kt{" "}
                </span>
              ) : <span>GS: 0kt </span>}
              {heading ? (
                <span>
                  {" "}
                  HDG {heading.toFixed()}°<br />{" "}
                </span>
              ) : <span>HDG: 0°<br/></span>}
              timestamp: {timestamp}
              <br />
              accuracy: {accuracy && `${Math.round(accuracy)} meters`}
              <br />
              {error ? <span>error: {error}</span> : null}
            </small>
          </code>
        </p>
      ) : (
        <p>standby, looking for fix</p>
      )}
    </div>
  );
}

export default Execute;
