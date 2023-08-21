import React, { useState } from 'react';
import Button from '@mui/material/Button';

function GetPosition() {
    const [location, setLocation] = useState(null);
    const [coords, setCoords] = useState(null);

    const { Position, getDistance } = require("aviation-math");
    

    function handleLocationClick() {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);

        } else {
            console.log("Geolocation not supported");
        }
    }

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation({ latitude, longitude });
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        // console.log(`pos1: ${pos1.toDMS}`);
        const pos1 = new Position(latitude, longitude);
        setCoords(pos1.toDMS())
    }

    function error() {
        console.log("Unable to retrieve your location");
    }

    return (
        <div>
            {!location ? <Button
            sx={{ m: 2 }}
                variant="outlined"
                onClick={handleLocationClick}>refresh position</Button> : null}
            {/* {location ? <p>{location.latitude} {location.longitude}</p> : null} */}
            {location ? <p>Current location: <br/> {coords}</p> : null}

        </div>
    );
}

export default GetPosition;