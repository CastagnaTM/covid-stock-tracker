import React, {useState} from "react";
import {
    Navigation, Ul, NavButton,
    Main, ControlPanel, H1,
    GraphContainer, GraphBox1, GraphBox2, Footer, DataColumn
} from './Components/Styles';
import Filters from './Components/Filters';
// import { useForm } from "react-hook-form";
import { finnhubKey, finnhubBase, tickers, GRAPHQL_API } from "./constants";
import DateInput from './Input/DateInput';
import CompanyInput from './Input/CompanyInput';
import { ResponsiveContainer } from 'recharts';
import ZoomGraph from './Components/ZoomGraph';
import { convertToRealTime } from './functions';
import CompanyData from './Components/CompanyData'
// let timer = setTimeout(callAPI, 2000);
let counter = 0;
// left off at 285

// function callAPI () {
//   fetchData(tickers[counter]);
// }
const fetchData = (ticker: string): any => {
  fetch(
    `${finnhubBase}stock/candle?symbol=${ticker}&resolution=D&from=1577750400&to=1591290500&token=${finnhubKey}`
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
    .then(({country, currency, exchange, name, ipo, marketCapitalization, shareOutstanding, logo, phone, weburl, finnhubIndustry}) => {
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
  const query = 
  `
  mutation {
    updateCompany(ticker: "${ticker}" companyInput: ${companyInput.toString()}){
      ticker,
      dates {
        date
      },
      companyData {
        country
        currency
        exchange
        industry
        ipo
        logo
        market_capitalization
        name
        phone
        share_outstanding
        web_url
      }
    }
  }
  `
  fetch(GRAPHQL_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: `application/json`,
    },
    body: JSON.stringify({ query }),
  })
    .then((resp) => resp.json())
    .then((data) => {
      if (tickers[counter]) {
        setTimeout(() => getCompanyData(tickers[++counter]),2000);
      }
      else {
        clearTimeout();
      }
    });

}

const inputStock = (ticker: string, stock: []): void => {
  const query = `mutation {
      createStock(stockInput: {ticker: "${ticker}", dates: [${stock.toString()}]})
      {
        ticker, 
        dates
          { 
            date,
            open_price,
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
    .then((data) => {
      if (tickers[counter]) {
        console.log(data);
        setTimeout(() => fetchData(tickers[++counter]),2000);
      }
      else {
        clearTimeout();
      }
    });
};

const getStockData = (): void => {
  // fetchData(tickers[counter])
  getCompanyData(tickers[counter])
  // tickers.slice(88, 100).forEach((ticker) => {
  //   fetchData(ticker);
  // });
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
  const findStock = async (ticker: string): Promise<string> => {
    let data = await fetch(`${finnhubBase}stock/profile2?symbol=${ticker}&token=${finnhubKey}`)
    .then(resp => resp.json())
    .then(data => Object.keys(data).length > 0 ? ticker: "")
    return data;
  }   

const App: React.FC = () => {

    const [state, setState] = useState({about: false});
    const  [chartData, setChartData] =  useState([]);
    const [companyData,  setCompanyData] = useState({});

    
    const fetchSingleStock = (ticker: string, beginDate: Date | null , endDate: Date | null): void => { 
      if (ticker) {
        const query = `
        query {
          findDates(ticker: "${ticker}", startDate: "${beginDate?.toLocaleDateString('en')}", endDate: "${endDate?.toLocaleDateString('en')}"){ 
          ticker,
          dates {
            date,
            low_price,
            high_price,
            open_price,
            close_price
          },
          companyData {
            country,
            currency,
            exchange,
            industry,
            ipo,
            market_capitalization,
            logo,
            name,
            phone,
            share_outstanding,
            web_url
          }
        }
      
      }`
        fetch(GRAPHQL_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: `application/json`,
          },
          body: JSON.stringify({ query }),
        })
        .then(resp => resp.json())
        .then(data => {
          let arr = data.data.findDates.dates;
          for (let i = 0; i < arr.length; ++i) {
            arr[i]["name"] =  i+1;
            arr[i]["date_number"] =  new Date(arr[i]["date"]).getTime() / 1000;
          }
            setChartData(arr);
            setCompanyData(data.data.findDates.companyData);
        });
      }
    };

    const fetchFromFinnhub = (ticker, beginDate, endDate) => {
      console.log(`before: ${beginDate}`)
        beginDate = new Date(beginDate).getTime()/1000 - 3600;
        endDate = new Date(endDate).getTime()/1000;
        console.log(`after: ${beginDate}`)
        fetch(`${finnhubBase}stock/candle?symbol=${ticker}&resolution=D&from=${beginDate}&to=${endDate}&token=${finnhubKey}`)
        .then((resp) => resp.json())
        .then(({ c, h, l, o, t }) => {
          const stock = c.map((value: number, index: number) => {
            // let close_price = value;
            // let high_price = h[index];
            // let low_price = l[index];
            // let open_price = o[index];
            // let date = convertToRealTime(t[index]);
            let dateObj = {};
            dateObj["close_price"] = value;
            dateObj["high_price"] = h[index];
            dateObj["low_price"] = l[index];
            dateObj["open_price"] = o[index];
            dateObj["date_number"] = t[index];

            // let dateInput = new DateInput(
            //   date,
            //   open_price,
            //   close_price,
            //   high_price,
            //   low_price
            // );
            return dateObj;
          });
          setChartData(stock)
        })
    
        .catch((error) => {
          throw error;
        });
    };
    //   beginDate = new Date(beginDate).getTime()/1000;
    //   endDate = new Date(endDate).getTime()/1000;
    //   fetch(`${finnhubBase}stock/candle?symbol=${ticker}&resolution=D&from=${beginDate}&to=${endDate}&token=${finnhubKey}`)
    //   .then(resp => resp.json())
    //   .then(({ c, h, l, o, t }) => {
    //     const stock = c.map((value: number, index: number) => {
    //       let close_price = value;
    //       let high_price = h[index];
    //       let low_price = l[index];
    //       let open_price = o[index];
    //       let date = convertToRealTime(t[index]);
    //       let dateInput = new DateInput(
    //         date,
    //         open_price,
    //         close_price,
    //         high_price,
    //         low_price
    //       );
    //       return dateInput;
    //     })

    // }

    const getUserData = (ticker: string, beginDate: Date | null , endDate: Date | null, from: string = ''): void => {
      if(from){
        fetchFromFinnhub(ticker, beginDate, endDate)
      }
      else {
        fetchSingleStock(ticker, beginDate, endDate);  
      }
    }

    

return (
  <div>
      <Navigation>
        <Ul>
            <li> <NavButton onClick={() => setState({about: false})}> Covid Stock Tracker </NavButton> </li>
            <li> <NavButton onClick={() => setState({about: true})}> About </NavButton> </li> 
        </Ul>
      </Navigation>
      <Main>
        <ControlPanel>
        <H1>Control Panel</H1>
            <Filters findStock={findStock} getUserData={getUserData} ></Filters>
        </ControlPanel>
          {chartData.length > 0 &&  
            <GraphContainer> 
              <GraphBox1>
                <ResponsiveContainer >
                  <ZoomGraph data={chartData}></ZoomGraph>
                </ResponsiveContainer>
              </GraphBox1>
              <GraphBox2>
                <DataColumn>
                <CompanyData companyData={companyData}/>
                </DataColumn>
                <DataColumn>
                  <p>this consist of more data :D</p>
                </DataColumn>
              </GraphBox2>
            </GraphContainer>
          }
      </Main>
      <Footer>

      </Footer>
  </div>
  );
};

export default App;
