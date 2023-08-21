const { Position, getDistance } = require("aviation-math");


const calculateDistance = (currentLocation, targetLocation) => {
  const dis = getDistance(
    new Position(currentLocation.lat, currentLocation.long),
    new Position(targetLocation.lat, targetLocation.long)
  );
  // console.log(
  //   `Distance\n\n${dis.toFixed(1)} NM\nOR\n${(dis * 1.852).toFixed(1)} km`
  // );
  return dis
};

export default calculateDistance;
