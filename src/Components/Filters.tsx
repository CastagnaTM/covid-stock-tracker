import React from 'react';
import { H4, FormContainer, FormDiv } from './Styles';
import { FormControl, InputLabel, FormHelperText, Select, MenuItem } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { tickers } from "../constants";
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
// import Select from "./Select"
// import DatePicker from './DatePicker'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(1),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120    
    }})
)

interface Props {
  getUserData(ticker: string, beginDate: Date | null, endDate: Date | null): void; 
}

export const Filters: React.FC<Props> = (props) => {
  // select functions
  const classes = useStyles();
  const style = {
    backgroundColor: "#1db954"
  }
  const [stock, setStock] = React.useState(''); 

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStock(event.target.value as string);
  }

  const mapTickers = () => {
    // return tickers.sort((a,b) => a.localeCompare(b)).map((ticker, key) => {
    //      return <MenuItem value={ticker} key={key}>{ticker}</MenuItem> 
    // })
    return <MenuItem value={tickers[0]} key={1}>{tickers[0]}</MenuItem> 
  }

  //Date Picker Functions

  const [startDate, setStartDate] = React.useState<Date | null>(
    new Date('2020-01-01'),
  );

  const [endDate, setEndDate] = React.useState<Date | null>(
    new Date('2020-01-02'),
  );

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  return (
    <div> 
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
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<SaveIcon />}
          style={style}
          onClick={() => props.getUserData(stock, startDate, endDate)}
        >
        Save
      </Button>
      </FormContainer>
    </div>
  );
}

// onClick={() => Props.getUserData(stock, startDate, endDate)}

export default Filters;
