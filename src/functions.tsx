export const convertToRealTime = (unixTimestamp, from=false)=> {
  let milliseconds = unixTimestamp * 1000; // 1575909015000
  let dateObject = new Date(milliseconds);
  let humanDateFormat = dateObject.toLocaleString().split(",")[0];
  if(from === true){
    let cur = humanDateFormat.substring(0, humanDateFormat.length - 4) + humanDateFormat.substr(-2)
    return cur
  }
  return humanDateFormat;
};