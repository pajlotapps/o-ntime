const calculateNewGS = function(tot, dist) { 
  // console.log(typeof(tot), tot)

  var TOT = new Date();
  let [hours, minutes, seconds] = tot.split(':');
  var offset = TOT.getTimezoneOffset() / 60;

  TOT.setHours(+hours - offset);
  TOT.setMinutes(minutes);
  TOT.setSeconds(seconds);

  // console.log(TOT)
  // console.log(ETA)

  var time = TOT.getTime() - new Date().getTime();

  console.log("new GS", dist, time/1000/60/60)
  var GS = time !== 0 ? dist/(time/1000/60/60) : 0;
  console.log(typeof(time), time/1000/60)
  console.log("GS", GS)

  // const eta = date.setTime(date.getTime() + (ete*60*60*1000));

  return GS
}

export default calculateNewGS;
