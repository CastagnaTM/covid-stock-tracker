import React from "react";
import { FormDiv } from "../Input/Styles";
import { FormControl, InputLabel, FormHelperText, Select, MenuItem } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { tickers } from "../constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120    
    }})
  )


export default function SimpleSelect() {
    const classes = useStyles();
    const [stock, setStock] = React.useState(''); 

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setStock(event.target.value as string);
  };

  const mapTickers = () => {
   return tickers.map((ticker, key) => {
        return <MenuItem value={ticker.ticker} key={key}>{ticker.ticker}</MenuItem> 
    })
  }

  return (
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
    )
}