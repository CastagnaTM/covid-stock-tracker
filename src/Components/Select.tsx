import React from "react";
import styled from "styled-components";
import  {FormControl, InputLabel, Input, FormHelperText, Select, MenuItem} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {tickers} from "../constants";

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

  const FormDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    `

  return (
      <FormDiv>
            {/*  stock options:  h4, ticker search bar + ticker drop down, start and end dates, stock value (open, close, etc) */}
        <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">Ticker</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={stock}
                onChange={handleChange}
                >
                {tickers.map((ticker, key) => {
                    return <MenuItem value={ticker} key={key}>{ticker}</MenuItem> 
                })}
            </Select>
            <FormHelperText>Select Stock Ticker</FormHelperText>
        </FormControl>
      </FormDiv>
    )
}