const calculateETA = function (ete, date = new Date()) {
  if (typeof ete !== 'number') {
    throw new Error('Invalid "ETE" argument')
  }

  if (!(date instanceof Date)) {
    throw new Error('Invalid "date" argument')
  }

  if (ete !== null) {
    const eta = date.setTime(date.getTime() + (ete * 60 * 60 * 1000));
    return eta
  } else {
    return 0
  }
}

export default calculateETA;
