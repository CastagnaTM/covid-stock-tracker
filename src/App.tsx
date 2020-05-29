import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import  {FormControl, InputLabel, Input, FormHelperText, Select, MenuItem} from '@material-ui/core';
import { finnhubKey, finnhubBase, tickers, GRAPHQL_API } from "./constants";

class DateInput {
  open_price: number;
  high_price: number;
  low_price: number;
  close_price: number;
  date: string;
  constructor(
    date: string,
    open_price: number,
    close_price: number,
    high_price: number,
    low_price: number
  ) {
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
    .then(({ c, h, l, o, t }) => {
      const stock = c.map((value: number, index: number) => {
        let close_price = value;
        let high_price = h[index];
        let low_price = l[index];
        let open_price = o[index];
        let date = convertToRealTime(t[index]);
        let dateInput = new DateInput(
          date,
          open_price,
          close_price,
          high_price,
          low_price
        );
        return dateInput;
      });
      inputStock(ticker, stock);
    })

    .catch((error) => {
      throw error;
    });
};

const getCompanyData = (ticker: string):void => {
  fetch(
    `${finnhubBase}stock/profile2?symbol=${ticker}&token=${finnhubKey}`
  )
    .then((resp) => resp.json())
    .then(({country, currency, exchange, name, ticker, ipo, marketCapitalization, shareOutstanding, logo, phone, weburl, finnhubIndustry}) => {
      // do something with the data
    })
    .catch((error) => {
      throw error;
    });
}

const inputStock = (ticker: string, stock: []): void => {
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
      }`;
  fetch(GRAPHQL_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: `application/json`,
    },
    body: JSON.stringify({ query }),
  })
    .then((resp) => resp.json())
    .then((data) => console.log(data));
};

const getStockData = (): void => {
  tickers.slice(88, 100).forEach((ticker) => {
    fetchData(ticker);
  });
};

const convertToRealTime = (unixTimestamp: number): string => {
  let milliseconds = unixTimestamp * 1000; // 1575909015000
  let dateObject = new Date(milliseconds);
  let humanDateFormat = dateObject.toLocaleString();
  return humanDateFormat;
};

const fetchAllStock = (): void => {
    const query = `
    query {
      stocks{
        ticker
        dates{
          open_price,
          close_price,
          low_price,
          high_price,
          date
        }
      }
    }
    `;
    fetch(GRAPHQL_API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: `application/json`,
      },
      body: JSON.stringify({ query }),
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
    })
  };
  
  const fetchSingleStock = (ticker: string): void => {
    const query = `
    query {
      findStock(ticker: "${ticker}"){
        ticker
        dates{
          open_price,
          close_price,
          low_price,
          high_price,
          date
        }
      }
    }
    `
    fetch(GRAPHQL_API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: `application/json`,
      },
      body: JSON.stringify({ query }),
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
    });
  };

const variables = {
    palette: {
        grey: "#222",
        green: "#1db954",
        red: "#f45b5b",
        blue: "#2c8096",
        darkGrey: "#0a0a0a"
    },
    liColor: "white"

};

const Navigation = styled.nav`
    top: 0;
    box-sizing: border-box
    height: 80px;
    padding: 1em;
    width: 100%;
    background-color: ${variables.palette.grey};
`

const Ul = styled.ul `
    display: flex;
    flex-direction: row;
    padding: 0;
    justify-content: space-evenly;
`

const Li = styled.li`
    list-style: none;
    color: ${variables.liColor};
`

const Main = styled.div`
    background-color: ${variables.palette.darkGrey}; 
    display: flex;
    flex-direction: row;
    height: 100vh;
`

const ControlPanel = styled.div`
    background-color: white;
    width: 30%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center
`

const H1 = styled.h1`
    font-size: x-large;
    color: ${variables.palette.blue}; 
    margin: 0 auto;
`

const H4 = styled.h4`
    font-size: large;
    color: ${variables.palette.blue}; 
    margin: 0 auto;
    padding: 1em;
`

// const FormContainer = styled(FormControl)`
//     &.MuiFormControl-root{
//         flex-direction: row
//     }
//     display: flex;
    
// `

const Graph = styled.div`
    width: 70%;
    height: 100%;
`

const Footer = styled.footer`
   bottom: 0;
   box-sizing: border-box
   height: 80px;
   padding: 1em;
   width: 100%;
   background-color: ${variables.palette.grey};

`

// const setMenuItems = (): ReactElement => {
//     tickers.forEach(ticker => {
//         return <MenuItem value={ticker}>{ticker}</MenuItem>
//     })
// }

const App: React.FC = () => {
return (
  <div>
      <Navigation >
        <Ul>
            <Li>Covid Stock Tracker</Li>
            <Li>About</Li>
        </Ul>
      </Navigation>
      <Main>
        <ControlPanel>
            <H1>Control Panel</H1>
            {/*  stock options:  h4, ticker search bar + ticker drop down, start and end dates, stock value (open, close, etc) */}
           
            <H4>Select Stock Filters</H4>
            <FormControl>
            <InputLabel id="demo-simple-select-helper-label">Ticker</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={Stock Ticker}
                    // onChange={handleChange}
                    >
                    {tickers.map((ticker, key) => {
                        return <MenuItem value={ticker} key={key}>{ticker}</MenuItem> 
                    })}
                </Select>
                <FormHelperText>Select Stock Ticker</FormHelperText>
            </FormControl>
            {/* virus options: h4, start and end dates, location */}

            <H4>Select Virus Filters</H4>
            <FormControl>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value="Stock Ticker"
                    // onChange={handleChange}
                    >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
           
        </ControlPanel>
        <Graph>

        </Graph>
      </Main>
      <Footer>

      </Footer>
  </div>
  // <div>{getStockData()}
  //   <div>{convertToRealTime(10)}</div>
  //   <p>{tickers.length}</p>
  // </div>
    );
};

export default App;
