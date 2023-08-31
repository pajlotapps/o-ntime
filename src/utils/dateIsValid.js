const dateIsValid = function(date) {
    return !Number.isNaN(new Date(date).getTime());
}

export default dateIsValid;