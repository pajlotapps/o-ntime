
const convertDMSToDD = function(degrees, minutes, seconds, direction) {
    var dd = degrees + minutes/60 + seconds/(60*60);

    if (direction === "S" || direction === "W") {
        dd = dd * -1;
    }
    return dd;
}

export default convertDMSToDD;
