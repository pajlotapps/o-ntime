const diffETAnTOT = function (eta, tot) {

  if (typeof eta !== 'number') {
    throw new Error('Invalid "ETA" argument')
  }

  var TOT = new Date();
  let [hours, minutes, seconds] = tot.split(':');
  var offset = TOT.getTimezoneOffset() / 60;

  TOT.setHours(+hours - offset);
  TOT.setMinutes(minutes);
  TOT.setSeconds(seconds);

  let ETA = new Date(parseFloat(eta));

  // console.log(TOT)
  // console.log(ETA)

  var diff = TOT.getTime() - ETA.getTime();

  if (diff < 0) {

    // dateIsValid(diff) && console.log("zapas ", (diff));
    return {
      toLate: true,
      value: 0
    }
  } else {

    return {
      toLate: false,
      value: Math.abs(diff) / 3600000,
    }
  }


}

export default diffETAnTOT;
