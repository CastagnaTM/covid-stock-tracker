import React from "react";
import { finnhubKey, finnhubBase, tickers} from "./constants";

class DateInput {
  open_price: number;
  high_price: number;
  low_price: number;
  close_price: number;
  date: String;
  constructor(date: String, open_price: number, close_price: number, high_price:number, low_price: number) {
    this.open_price = open_price;
    this.close_price = close_price;
    this.high_price = high_price;
    this.low_price = low_price;
    this.date = date;
  }
}
DateInput.prototype.toString = function dogToString() {
  return `{date: "${this.date}", open_price: ${this.open_price}, close_price: ${this.close_price}, low_price: ${this.low_price}, high_price: ${this.high_price}}`;
};


// left off at 285


const fetchData = (ticker: string): any => {
    fetch(
      `${finnhubBase}stock/candle?symbol=${ticker}&resolution=D&from=1577750400&to=1590510123&token=${finnhubKey}`
    )
      .then((resp) => resp.json())
      .then(({c,h,l,o,t}) => {
          const stock = c.map((value: number, index: number) => {
            let close_price = value;
            let high_price = h[index];
            let low_price = l[index];
            let open_price = o[index];
            let date = convertToRealTime(t[index]);
            let dateInput = new DateInput(date, open_price, close_price, high_price, low_price)
            return dateInput
          })
          inputStock(ticker, stock);
       })

      .catch(error => {
          throw error;
      });
}

const inputStock = (ticker: String, stock: []) => {
    const query = `mutation {
      createStock(stockInput: {ticker: "${ticker}", dates: [${stock.toString()}]})
      {
        ticker, 
        dates
          { open_price,
            close_price,
            high_price,
            low_price
          }
        }  
      }`
    fetch('http://localhost:4000/graphql', {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          'Accept': `application/json` 
        },
        body: JSON.stringify({ query })
    })
    .then(resp => resp.json())
    .then(data => console.log(data))
}

const getStockData = (): any => {
    tickers.slice(88, 100).forEach(ticker => {
        fetchData(ticker);
    })
};

const convertToRealTime = (unixTimestamp: number): string => {
    let milliseconds = unixTimestamp * 1000 // 1575909015000
    let dateObject = new Date(milliseconds)
    let humanDateFormat = dateObject.toLocaleString()
    return humanDateFormat
} 

const App: React.FC = () => {
return (
  <div>
    :D
  </div>
  // <div>{getStockData()}
  //   <div>{convertToRealTime(10)}</div>
  //   <p>{tickers.length}</p>
  // </div>
)
};

export default App;
