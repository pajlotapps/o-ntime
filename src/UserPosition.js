import React from 'react';
import { usePosition } from 'use-position';
import Typography from '@mui/material/Typography';

export const UserPosition = () => {

  const watch = true;
  const {
    latitude,
    longitude,
    speed,
    timestamp,
    accuracy,
    heading,
    error,
  } = usePosition(watch);

  return (
    <>
    <p>Current location: <br/></p>
    {latitude ? (<code>
      latitude: {latitude}<br/>
      longitude: {longitude}<br/>
      {speed ? <Typography>speed: {speed}<br/></Typography> : null} 
      timestamp: {timestamp}<br/>
      accuracy: {accuracy && `${accuracy} meters`}<br/>
      {heading ? <Typography>heading: {heading}°<br/></Typography> : null} 
      {error ? <Typography>error: {error}</Typography> : null}
    </code>) : <p>standby, looking for fix</p>}
    </>
  );
};