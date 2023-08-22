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

  const [distance, setDistance] = useState(() => {
    const saved = localStorage.getItem("distance");
    const initialValue = JSON.parse(saved);
    return initialValue || "0";
  });

  const [targetPosition, setTargetPosition] = useState([]);

  useEffect(() => {
    const targetPosition = JSON.parse(localStorage.getItem("target"));
    if (targetPosition) {
      setTargetPosition(targetPosition);
    }
    console.log(targetPosition.lat)

    const dist = getDistance(
      new Position(currPosition.lat, currPosition.long),
      new Position(targetPosition.lat, targetPosition.long)
      // new Position(55.755826, 37.6173)
    );

    setDistance(dist);
    localStorage.setItem("distance", JSON.stringify(dist));


    // setTargetPosition((prev) => ({
    //   ...prev,
    //   distance: dist,
    // }));
  }, [currPosition]);

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
      {/* <Typography> */}
      {targetPosition.lat && targetPosition.long ? (
        <code>
      <Typography variant="h6" paragraph>
            <strong>Current location:</strong>
            </Typography >
            {latitude ? (
                <small>
                        <Typography variant="subtitle1" paragraph>

                  {toDMS(latitude, longitude).lati}{" "}
                  {toDMS(longitude, longitude).long}
                </Typography>

                  {speed ? (
                <Typography variant="subtitle2">
                        GS {convert(speed).from("m/s").to("knot").toFixed()} {"kt "}
                        </Typography>
                        ) : <span>GS: 0kt </span>}
{heading ? (
                <span>
                  {" "}
                  HDG {heading.toFixed()}°<br />{" "}
                </span>
              ) : <span>HDG: TBN<br/></span>}
              
                </small>
            ) : null}
            <h5>
                <strong>Target location:</strong>
            </h5>
              <small>
                {formatToDMS(targetPosition.lat)} {targetPosition.latCardinal}{" "}
                {formatToDMS(targetPosition.long)} {targetPosition.longCardinal}
              </small>
          <p>
          Distance: {distance.toFixed(1)} NM <br />
            <strong> TOT: {tot} [UTC]</strong><br />
            ETA: 12:54:21 [UTC]<br />
            ETE: 15 min 21 sek 
            {speed ? (
                <span>{(distance/speed).toFixed(1)} h</span>
            // ): <span> GS: 0</span>}
            ): null}

          </p>
        </code>
      ) : null}


      {latitude ? (
              <Typography variant="caption" display="block" gutterBottom>
          <code>
            <small>
              
              timestamp: {Intl.DateTimeFormat('pl-PL', {hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(timestamp)} LMT
              <br />
              accuracy: {accuracy && `${Math.round(accuracy)} meters`}
              <br />
              {error ? <span>error: {error}</span> : null}
            </small>
          </code>
              </Typography>
      ) : (
        <span>standby, looking for fix</span>
        )}
    </div>
  );
}

export default Execute;
