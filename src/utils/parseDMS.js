import convertDMSToDD from "./convertDMSToDD";

function parseDMS(value, direction) {
    var dd = parseInt(value.split('°')[0]);
    var mm = parseInt(value.split('°').pop().split(`'`)[0]);
    var ss = parseInt(value.split(`'`)[1]);
    // console.log(dd, mm, ss, direction)

    return convertDMSToDD(dd, mm, ss, direction);
}

export default parseDMS;

