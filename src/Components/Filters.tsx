import React, {useState} from 'react';
import { H4, FormContainer, FormDiv, ErrorMessage } from './Styles';
import { FormControl, InputLabel, FormHelperText, Select, MenuItem } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { tickers } from "../constants";
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import TextField from '@material-ui/core/TextField';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

// import Select from "./Select"
// import DatePicker from './DatePicker'


interface Props {
  getUserData(ticker: string, beginDate: Date | null, endDate: Date | null): void;
  findStock(ticker: string): Promise<string>;
}

export const Filters: React.FC<Props> = (props) => {
  // select functions
 
  const [stock, setStock] = useState<String>('');  

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStock(event.target.value as string);
  }

  const mapTickers = () => {
    return tickers.sort((a,b) => a.localeCompare(b)).map((ticker, key) => {
         return <MenuItem value={ticker} key={key}>{ticker}</MenuItem> 
    })
  }

  //Date Picker Functions

  const [startDate, setStartDate] = useState<Date | null>( new Date('2020-01-01'));
  const [endDate, setEndDate] = useState<Date | null>( new Date('2020-01-02'));
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [validTicker, setValidTicker] = useState<string>('default');
  const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
      background: "#1db954",
      marginTop: "1em",
      fontSize: "1.2rem",
      transition: 'all 500ms ease-in-out',
      '&:hover': {
        background: "#059ac1",
        color: "#0a0a0a",
        transition: 'all 500ms ease-in-out'
      }
    },
    root: {
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: validTicker === 'default'? 'pink' : (validTicker ? "green" : "red")
      }
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120    
    }})
  )
  const classes = useStyles();
  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  }; 

  const validateSubmit = (stock, startDate, endDate) => {
    if(stock.length > 0){
      if (endDate <= startDate){
        setErrorMessage('The End Date must be greater than the Start Date')
      } else {
        props.getUserData(stock, startDate, endDate)
        setErrorMessage('')
      }
    } else {
      setErrorMessage('Please select a valid stock ticker')
    }
  }

  return (
    <div>
      <TextField 
        id="outlined-search" 
        label="Search Ticker" 
        type="search" 
        variant="outlined" 
        className={classes.root}
        onChange={(e) => {
          if (e.target.value.length === 0) setValidTicker('default');
          if (e.target.value.length > 0 && e.target.value.length <= 5) {
            props.findStock(e.target.value).then(ticker => {
              setValidTicker(ticker);
              setStock(ticker);
            });

          } 
        }}
      />
      <ErrorMessage>{errorMessage}</ErrorMessage>  
      <H4> Select Stock </H4>
      <FormDiv>
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">Ticker</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={stock}
                onChange={handleChange}
                >
                {mapTickers()}
            </Select>
            <FormHelperText>Select Stock Ticker</FormHelperText>
        </FormControl>
      </FormDiv>
      <H4> Select Dates </H4>
      <FormContainer> 
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <KeyboardDatePicker
              disableToolbar
              autoOk={true}
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              minDate="2020-01-01"
              // id="date-picker-start"
              label="Start Date"
              value={startDate}
              onChange={handleStartDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              autoOk={true}
              format="MM/dd/yyyy"
              margin="normal"
              minDate="2020-01-02"
              // id="date-picker-end"
              label="End Date"
              value={endDate}
              onChange={handleEndDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        <Button // condition make sure that stock exists error handling
          variant="contained"
          color="primary"
          size="large"
          // className={classes.button}
          startIcon={<SaveIcon />}
          onClick={() => 
            validateSubmit(stock, startDate, endDate)
          }
        >
        Submit
      </Button>
      </FormContainer>
    </div>
  );
}

export default Filters;
