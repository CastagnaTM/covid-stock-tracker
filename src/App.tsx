import React, {useState} from "react";
import {
    Navigation, Ul, NavButton,
    Main, ControlPanel, H1,
    GraphContainer, GraphBox1, GraphBox2, Footer, DataColumn, CompanyName
} from './Components/Styles';
import Filters from './Components/Filters';
import { finnhubKey, finnhubBase, tickers, GRAPHQL_API } from "./constants";
import DateInput from './Input/DateInput';
import CompanyInput from './Input/CompanyInput';
import { ResponsiveContainer } from 'recharts';
import ZoomGraph from './Components/ZoomGraph';
import { convertToRealTime } from './functions';
import CompanyData from './Components/CompanyData';
import { createStockQuery, fetchAllStocksQuery, updateCompanyDataQuery, findCompanyDatesQuery } from './queries';
// let timer = setTimeout(callAPI, 2000);
let counter = 0;
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

const inputStock = (ticker: string, stock: []): void => {
  const query = createStockQuery()
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
      else {
        clearTimeout();
      }
    });
};

const fetchAllStock = (): void => {
  const query = fetchAllStocksQuery();
    fetch(GRAPHQL_API, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: `application/json`,
      },
      body: JSON.stringify({query}),
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
  const [companyName, setCompanyName] = useState("");

    
    const getCompanyData = (ticker: string):void => {
      fetch(
        `${finnhubBase}stock/profile2?symbol=${ticker}&token=${finnhubKey}`
      )
        .then((resp) => resp.json())
        .then((data) => {
          setCompanyData(data);
          setCompanyName(data.name)
        })
        .catch((error) => {
          throw error;
        });
    }

    const inputCompanyData = (ticker: string, companyInput: CompanyInput) => {
      const query = updateCompanyDataQuery();
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
            setTimeout(() => getCompanyData(tickers[++counter].ticker),2000);
          }
          else {
            clearTimeout();
          }
        });
    }

    const fetchSingleStock = (ticker: string, beginDate: Date | null , endDate: Date | null): void => {
      const query = findCompanyDatesQuery(ticker, beginDate, endDate);
      if (ticker) {
        fetch(GRAPHQL_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: `application/json`,
          },
          body: JSON.stringify({query}),
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
            setCompanyName(data.data.findDates.companyData.name)
        });
      }
    };

    const fetchFromFinnhub = (ticker, beginDate, endDate) => {
        beginDate = new Date(beginDate).getTime()/1000 - 3600;
        endDate = new Date(endDate).getTime()/1000;
        getCompanyData(ticker);
        fetch(`${finnhubBase}stock/candle?symbol=${ticker}&resolution=D&from=${beginDate}&to=${endDate}&token=${finnhubKey}`)
        .then((resp) => resp.json())
        .then(({ c, h, l, o, t }) => {
          const stock = c.map((value: number, index: number) => {
            let dateObj = {};
            dateObj["close_price"] = value;
            dateObj["high_price"] = h[index];
            dateObj["low_price"] = l[index];
            dateObj["open_price"] = o[index];
            dateObj["date_number"] = t[index];
            return dateObj;
          });
          setChartData(stock)
        })
    
        .catch((error) => {
          throw error;
        });
    };

    const getUserData = (ticker: string, beginDate: Date | null , endDate: Date | null, from: string = ''): void => {
      from && (from !== "default" ? fetchFromFinnhub(ticker, beginDate, endDate) : fetchSingleStock(ticker, beginDate, endDate));  
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
              <CompanyName>
                <p>{companyName}</p>
              </CompanyName>
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
