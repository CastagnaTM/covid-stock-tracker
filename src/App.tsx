import React, {useState, useEffect} from "react";
import {
    Navigation, Ul, NavButton,
    Main, ControlPanel, H1, MobileButton, MobileVirusButton,
    GraphContainer, GraphBox1, GraphBox2, Footer, DataColumn, VirusDataColumn, CompanyName
} from './Components/Styles';
import Filters from './Components/Filters';
import { finnhubKey, finnhubBase, tickers, GRAPHQL_API, VIRUS_API } from "./constants";
import DateInput from './Input/DateInput';
import CompanyInput from './Input/CompanyInput';
import ZoomGraph from './Components/ZoomGraph';
import LandingPage from './Components/LandingPage';
import { convertToRealTime } from './functions';
import CompanyData from './Components/CompanyData';
import { createStockQuery, fetchAllStocksQuery, updateCompanyDataQuery, findCompanyDatesQuery, findDates, updateDates } from './queries';
import { makeStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AboutPage from './Components/AboutPage'
import VirusData from "./Components/VirusData";
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(25),
    fontWeight: theme.typography.fontWeightRegular,
    color: "#2c8096",
    padding: "1em",
    
  },
  filters: {
    display: 'flex',
    justifyContent: 'center', 
    height: 'calc(100vh - 180px - 1.4em)',
    
  },
  summary: {
    flexGrow: 0,
    
  },
  virusAccordionRoot: {
    backgroundColor: 'transparent',
  },
  virusDataRoot: {
    width: '100%',
  },
  virusDataHeading: {
    fontSize: theme.typography.pxToRem(25),
    fontWeight: theme.typography.fontWeightRegular,
    color: "white",
    padding: "1em",
    backgroundColor: '#0a0a0a',
  },
  virusDataFilters: {
    display: 'flex',
    justifyContent: 'center', 
    height: 'calc(100vh - 180px - 1.4em)',
    backgroundColor: '#0a0a0a',
  },
  virusDataSummary: {
    flexGrow: 0,
    backgroundColor: '#0a0a0a',
  },
  virusSumRoot: {
    backgroundColor: '#0a0a0a',
  }
}));


// let timer = setTimeout(callAPI, 2000);
let counter = 0;
// function callAPI () {
//   fetchData(tickers[counter]);
// }


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
  const [chartData, setChartData] =  useState([]);
  const [companyData,  setCompanyData] = useState<any>({});
  const [isMobile, setMobile] = useState(false);
  const [expanded, setExpanded] = React.useState<string | false>(false);
  const [virusData,  setVirusData] = useState<any>([]);
  const [beginDate, setBeginDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [today, setToday] = useState<any>("2/7/89");    // unix

  const setCurrentDate = () => {
    const currDate = new Date();
    setToday(new Date((currDate.getMonth()+1)+'/'+currDate.getDate()+'/' + currDate.getFullYear()).getTime()/1000);
  }
  
  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  useEffect( () => {
    setCurrentDate();
    windowSizeCheck();
    getVirusData();
    window.addEventListener('resize', windowSizeCheck);
  }, [])

  const fetchData = (ticker: string, beginDate: number, endDate: number): any => {
    fetch(
      `${finnhubBase}stock/candle?symbol=${ticker}&resolution=D&from=${beginDate}&to=${endDate}&token=${finnhubKey}`
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
        // inputStock(ticker, stock);
        updateMongoDb(ticker, stock);
      })
  
      .catch((error) => {
        throw error;
      });
  };
  // const inputStock = (ticker: string, stock: []): void => {
  //   const query = createStockQuery()
  //   fetch(GRAPHQL_API, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: `application/json`,
  //     },
  //     body: JSON.stringify({query}),
  //   })
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       if (tickers[counter]) {
  //         setTimeout(() => fetchData(tickers[++counter].ticker),2000);
  //       }
  //       else {
  //         clearTimeout();
  //       }
  //     });
  // };

  const windowSizeCheck = () => {
    setMobile(window.innerWidth < 1024);
  }
    
    const getCompanyData = (ticker: string):void => {
      fetch(
        `${finnhubBase}stock/profile2?symbol=${ticker}&token=${finnhubKey}`
      )
        .then((resp) => resp.json())
        .then((data) => {
          setCompanyData(data);          
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


    const getLatestDate = async (ticker): Promise<number> => {
      const query = findDates(ticker);
      let data = fetch (GRAPHQL_API,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: `application/json`,
        },
        body: JSON.stringify({query}),
      })
      .then(resp => resp.json())
      .then(data => {
        const dates = data.data.findStock.dates;
        return new Date(dates[dates.length - 1].date).getTime()/1000;
      })
      return data;
    }

    const updateMongoDb = (ticker, dateInput) => {
      const query = updateDates(ticker, dateInput);
      fetch(GRAPHQL_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: `application/json`,
        },
        body: JSON.stringify({query}),
      })
      // .then(resp => resp.json())
      // .then(data => data);
    }

    const fetchSingleStock = (ticker: string, startingDate: Date | null, endingDate: Date | null): void => {  // graphql not finnhub
      if (ticker) {
        getLatestDate(ticker).then(latestDate => {
          console.log(latestDate, today); // 06/04 vs 07/10
          if (latestDate < today ) {
            fetchFromFinnhub(ticker, startingDate, endingDate);
            fetchData(ticker, latestDate, today);
          }
          else {
            const query = findCompanyDatesQuery(ticker, startingDate, endingDate);
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
                  console.log("THIS IS FROM MONGODB BISHHHHHHH ")
              });
          }
        })
      }
    };

    const fetchFromFinnhub = (ticker: string, startingDate, endingDate) => {
        startingDate = new Date(startingDate).getTime()/1000 - 3600;
        endingDate = new Date(endingDate).getTime()/1000;
        getCompanyData(ticker);
        // 01/01 - 07/07 and our database only has 01/01 - 06/04 then we need to fetch from finnhub (06/04 - 07-07)
        fetch(`${finnhubBase}stock/candle?symbol=${ticker}&resolution=D&from=${startingDate}&to=${endingDate}&token=${finnhubKey}`)
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
          //update mongo dbboolean
        })
    
        .catch((error) => {
          throw error;
        });
    };
    const convertDateObjectToString = (date):string => {   //yyyymmdd
      let mm = date.getMonth() + 1; // getMonth() is zero-based
      let dd = date.getDate();
    
      return [date.getFullYear(),
              (mm>9 ? '' : '0') + mm,
              (dd>9 ? '' : '0') + dd
             ].join('');
    };
    
    const getUserData = (ticker: string, beginDate: Date | null , endDate: Date | null, from: string = ''): void => {
      if (beginDate) {
        setBeginDate(convertDateObjectToString(beginDate));
      }
      if (endDate) {
        setEndDate(convertDateObjectToString(endDate));
      }
      from && (from !== "default" ? fetchFromFinnhub(ticker, beginDate, endDate) : fetchSingleStock(ticker, beginDate, endDate));  
    }  

    const getVirusData = () => {
      fetch(VIRUS_API,  {
        method: 'GET',
        redirect: 'manual'
      })
        .then(response => response.json())
        .then(result => setVirusData(result))
        .catch(error => console.log('error', error));
    }

return (
  <>
    <Main>
      <MobileButton className={classes.root}>
        <MuiAccordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
          <MuiAccordionSummary aria-controls="panel1d-content" id="panel1d-header"
            expandIcon={<ExpandMoreIcon />}
            classes={{
              content: classes.summary
            }}
          >
            <Typography className={classes.heading} >Dashboard</Typography>
          </MuiAccordionSummary>
          <MuiAccordionDetails className={classes.filters}> 
            <Filters findStock={findStock} getUserData={getUserData} setExpanded={setExpanded}></Filters>
          </MuiAccordionDetails>
        </MuiAccordion>
        </MobileButton>
      <ControlPanel>
        <H1>Dashboard</H1>
        <Filters findStock={findStock} getUserData={getUserData} setExpanded={setExpanded}></Filters>
      </ControlPanel>
        {chartData.length > 0? 
          (
          <GraphContainer> 
            <CompanyName href={companyData.web_url || companyData.weburl} target="_blank" rel="noopener">{companyData.name}</CompanyName>
            <GraphBox1>
              <ZoomGraph data={chartData} isMobile={isMobile}></ZoomGraph>
            </GraphBox1>
            <GraphBox2>
              <DataColumn>
                <CompanyData companyData={companyData}/>
              </DataColumn>
              <MobileVirusButton className={classes.virusDataRoot}>
              <MuiAccordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}
                classes={{
                  root: classes.virusAccordionRoot,
                }}
              >
                <MuiAccordionSummary aria-controls="panel2d-content" id="panel2d-header"
                  expandIcon={<ExpandMoreIcon style={{color: 'white'}}/>}
                  classes={{
                    content: classes.virusDataSummary,
                    root: classes.virusSumRoot,
                  }}
                >
                  <Typography className={classes.virusDataHeading} >Virus Data</Typography>
                </MuiAccordionSummary>
                <MuiAccordionDetails className={classes.virusDataFilters}> 
                  <DataColumn>
                    <VirusData beginDate={beginDate} endDate={endDate} virusData={virusData} virusMobile={true}/>
                  </DataColumn>
                </MuiAccordionDetails>
              </MuiAccordion>
              </MobileVirusButton>
              <VirusDataColumn>
                <VirusData beginDate={beginDate} endDate={endDate} virusData={virusData} virusMobile={false}/>
              </VirusDataColumn>
            </GraphBox2>
          </GraphContainer>
          )
          :
          <LandingPage/>
        }            
    </Main>
    <Footer>
      <div>
        <p>Thomas Castagna</p> 
        <a href="https://github.com/CastagnaTM" target="_blank" rel="noopener noreferrer"><GitHubIcon /></a> 
        <a href="https://www.linkedin.com/in/castagnatm/" target="_blank" rel="noopener noreferrer"><LinkedInIcon/></a>
      </div>
      <div>
        <p>Cees Wang</p> 
        <a href="https://github.com/CeesWang" target="_blank" rel="noopener noreferrer"><GitHubIcon /></a> 
        <a href="https://www.linkedin.com/in/cees-wang/" target="_blank" rel="noopener noreferrer"><LinkedInIcon/></a>
      </div>
      <div>
        <p>Amber Ye</p> 
        <a href="https://github.com/tingtingye24" target="_blank" rel="noopener noreferrer"><GitHubIcon /></a> 
        <a href="https://www.linkedin.com/in/ting-ting-ye-73a6b0157/" target="_blank" rel="noopener noreferrer"><LinkedInIcon/></a>
      </div>
    </Footer>
  </>
  );
};

export default App;
