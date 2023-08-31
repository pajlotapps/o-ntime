
const convertDMS = function(coordinate) {
    var absolute = Math.abs(coordinate);
    var degrees = Math.floor(absolute);
    var minutesNotTruncated = (absolute - degrees) * 60;
    var minutes = Math.floor(minutesNotTruncated);
    var seconds = (Math.round((minutesNotTruncated - minutes) * 60));

    return degrees + "° " + minutes + "' " + seconds + "''";

}

export default convertDMS;