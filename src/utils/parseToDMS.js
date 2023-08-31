  const parseToDMS = (coord) => {
    const dd = coord.substring(0, 2);
    const mm = coord.substring(2, 4);
    const ss = coord.substring(4, 6);

    return `${dd}° ${mm}' ${ss}''`;

  }

  export default parseToDMS;

  // const formatToDMS = (e) => {
  //   // console.log("format: ", e.target.value)
  //       const input = e.target.value.substring(0,7); // First ten digits of input only
  //       const dd = input.substring(0,2);
  //       const mm = input.substring(2,4);
  //       const ss = input.substring(4,6);
  //       console.log(dd, mm, ss, "length", input.length)

  //       if(input.length > 6){e.target.value = `${dd}° ${mm}' ${ss}''`;}
  //       // else if(input.length > 4){e.target.value = `${dd}° ${mm}`;}
  //       // else if(input.length > 2){e.target.value = `${dd}°`;}
  //   };