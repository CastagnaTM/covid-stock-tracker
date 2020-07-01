import React, {useState, useEffect} from "react";
import {
    Navigation, Ul, NavButton,
    Main, ControlPanel, H1, MobileButton, 
    GraphContainer, GraphBox1, GraphBox2, Footer, DataColumn, CompanyName
} from './Components/Styles';
import Filters from './Components/Filters';
import { finnhubKey, finnhubBase, tickers, GRAPHQL_API } from "./constants";
import DateInput from './Input/DateInput';
import CompanyInput from './Input/CompanyInput';
import ZoomGraph from './Components/ZoomGraph';
import { convertToRealTime } from './functions';
import CompanyData from './Components/CompanyData';
import { createStockQuery, fetchAllStocksQuery, updateCompanyDataQuery, findCompanyDatesQuery } from './queries';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(25),
    fontWeight: theme.typography.fontWeightRegular,
    color: "#2c8096",
    padding: "1em",
    align: 'center',
  },
  filters: {
    display: 'flex',
    justifyContent: 'center', 
    height: 'calc(100vh - 180px)',
  },
}));


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
  const classes = useStyles();
  const [state, setState] = useState({about: false});
  const [chartData, setChartData] =  useState([]);
  const [companyData,  setCompanyData] = useState({});
  const [companyName, setCompanyName] = useState("");
  const [isMobile, setMobile] = useState(false);
  useEffect( () => {
    windowSizeCheck()
    window.addEventListener('resize', windowSizeCheck)
  }, [])

  const windowSizeCheck = () => {
    setMobile(window.innerWidth < 650);
  }
    
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
        <MobileButton className={classes.root}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              
            >
              <Typography className={classes.heading} >Dashboard</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.filters}> 
              {/* <Typography> */}
              <Filters findStock={findStock} getUserData={getUserData} ></Filters>
              {/* </Typography> */}
            </AccordionDetails>
          </Accordion>
          </MobileButton>
        <ControlPanel>
          
          <H1>Dashboard</H1>
            
          <Filters findStock={findStock} getUserData={getUserData} ></Filters>
        </ControlPanel>
          {chartData.length > 0 &&  
            <GraphContainer> 
              <CompanyName>
                <p>{companyName}</p>
              </CompanyName>
              <GraphBox1>
                  <ZoomGraph data={chartData} isMobile={isMobile}></ZoomGraph>
              </GraphBox1>
              <GraphBox2>
                <DataColumn>
                  <CompanyData companyData={companyData}/>
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
