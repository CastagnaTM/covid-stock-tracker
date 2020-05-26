import React from "react";
import { finnhubKey, finnhubBase } from "./constants";

const getStockData = (): any => {
  fetch(
    `${finnhubBase}stock/candle?symbol=AAPL&resolution=D&from=1577750400&to=1590510123&token=${finnhubKey}`
  )
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
    });
};


const convertToRealTime = (unixTimestamp: number): string => {
    let milliseconds = unixTimestamp * 1000 // 1575909015000
    let dateObject = new Date(milliseconds)
    let humanDateFormat = dateObject.toLocaleString()
    return humanDateFormat
} 

const App: React.FC = () => {
return <div>{getStockData()}<div>{convertToRealTime(10)}</div></div>;
};

export default App;
