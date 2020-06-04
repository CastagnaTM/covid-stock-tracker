import React, {useState} from "react";
import {
    Navigation, Ul, Button,
    Main, ControlPanel, H1,
    GraphContainer, Footer
} from './Components/Styles';
import Filters from './Components/Filters'
// import { useForm } from "react-hook-form";
import { finnhubKey, finnhubBase, tickers, GRAPHQL_API } from "./constants";
import DateInput from './Input/DateInput';
import CompanyInput from './Input/CompanyInput';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';


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
      // do something with company input
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
  


const App: React.FC = () => {

    const [state, setState] = useState({about: false});
    const  [chartData, setChartData] = useState([]);

    
    const fetchSingleStock = (ticker: string, beginDate: Date | null , endDate: Date | null): void => {
      const query = `
      query {
        findStock(ticker: "${ticker}"){
          ticker
          dates {
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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: `application/json`,
        },
        body: JSON.stringify({ query }),
      })
      .then(resp => resp.json())
      .then(data => {
        if(!data.data){
          setChartData(data.data.findStock.dates)
        }
        
      });
    };

    const getUserData = (ticker: string, beginDate: Date | null , endDate: Date | null): void => {
      // console.log(ticker + ' ' + beginDate?.toLocaleDateString('en-US') + ' ' + endDate?.toLocaleDateString('en-US'));
      fetchSingleStock(ticker, beginDate, endDate);
    }

    // testing tick formatter function to only return ticks for maybe 5 values
    // const chartDataTickFormatter = (chartData) => {
    //   let returnData = [];
    //   returnData[0] = chartData[0];
      
    // }

    const legendStyle = {
      color: '#5e5e5e'
    }


return (
  <div>
      <Navigation>
        <Ul>
            <li> <Button onClick={() => setState({about: false})}> Covid Stock Tracker </Button> </li>
            <li> <Button onClick={() => setState({about: true})}> About </Button> </li> 
        </Ul>
      </Navigation>
      <Main>
        <ControlPanel>
        <H1>Control Panel</H1>
            <Filters getUserData={getUserData} ></Filters>
        </ControlPanel>
          {chartData.length > 0 &&  
            <GraphContainer> 
              <ResponsiveContainer >
                <LineChart
                  width = {800}
                  height={500}
                  data={chartData}
                
                >
                  <CartesianGrid/>
                  <XAxis  /> 
                  <YAxis />
                  <Tooltip />
                  <Legend wrapperStyle={legendStyle}/>
                  
                  <Line type="monotone" dataKey ='open_price' stroke = "#8804d8" dot={false} />
                  <Line type="monotone" dataKey ='close_price' stroke = "#8084d8" dot={false} />
                  <Line type="monotone" dataKey ='low_price' stroke = "#f45b5b" dot={false} />
                  <Line type="monotone" dataKey ='high_price' stroke = "#1db954" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </GraphContainer>
          }
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
