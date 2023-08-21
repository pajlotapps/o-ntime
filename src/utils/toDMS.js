import convertDMS from './convertDMS';


const toDMS = function(lat, lng) {

    var latitude = convertDMS(lat);
    var latitudeCardinal = lat >= 0 ? "N" : "S";

    var longitude = convertDMS(lng);
    var longitudeCardinal = lng >= 0 ? "E" : "W";

    const lati = latitude + " " + latitudeCardinal;
    const long = longitude + " " + longitudeCardinal;

    return { lati, long }
    // return latitude + " " + latitudeCardinal + "\n" + longitude + " " + longitudeCardinal;
  }

  export default toDMS;