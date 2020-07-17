import { finnhubKey, finnhubBase, tickers, GRAPHQL_API, VIRUS_API } from "./constants";
import DateInput from './Input/DateInput';
import CompanyInput from './Input/CompanyInput';
import { convertToRealTime } from './functions';
import { createStockQuery, updateCompanyDataQuery} from './queries';

let counter = 0;
export const callAPI = () => {
    fetchData(tickers[counter].ticker);
   
    addCompanyDataToDB(tickers[counter].ticker);
}

  const fetchData = (ticker: string): any => {  // begin date and end date 
    fetch(
      `${finnhubBase}stock/candle?symbol=${ticker}&resolution=D&from=1569931200&to=1595004403&token=${finnhubKey}`
    )
      .then((resp) => resp.json())
      .then(stockData => {
        console.log(stockData);
        const {c, h, l, o, t} = stockData;
        if (c) {
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
        }
      })
  };
  const inputStock = (ticker: string, stock: []): void => {
    const query = createStockQuery(ticker, stock);
    fetch(GRAPHQL_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: `application/json`,
      },
      body: JSON.stringify({query}),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (tickers[counter]) {
          setTimeout(() => fetchData(tickers[++counter].ticker),2000);
        }
      });
  };

  const addCompanyDataToDB = (ticker: string):void => {
    fetch(
      `${finnhubBase}stock/profile2?symbol=${ticker}&token=${finnhubKey}`
    )
      .then((resp) => resp.json())
      .then(({country, currency, exchange, name, ipo, marketCapitalization, shareOutstanding, logo, phone, weburl, finnhubIndustry}) => {
        console.log(counter);
        // do something with the data
        let companyInput = new CompanyInput(
          country,
          currency,
          exchange,
          name,
          ipo,
          marketCapitalization,
          shareOutstanding,
          logo,
          phone,
          weburl,
          finnhubIndustry
        );
        inputCompanyData(ticker, companyInput)
      })
      .catch((error) => {
        throw error;
      });
  }
  
  const inputCompanyData = (ticker: string, companyInput: CompanyInput) => {
    const query = updateCompanyDataQuery(ticker, companyInput);
    fetch(GRAPHQL_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: `application/json`,
      },
      body: JSON.stringify({query}),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (counter < 90 && tickers[counter]) {
          setTimeout(() => addCompanyDataToDB(tickers[++counter].ticker),2000);
        }
      });
  }