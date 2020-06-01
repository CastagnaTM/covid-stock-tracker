import React from 'react';
import { H4, FormContainer } from './Styles'
import Select from "./Select"
import DatePicker from './DatePicker'

function Filters() {

  return (
    <div> 
      <H4> Select Stock Filters </H4>
        <Select></Select>
      <FormContainer> 
        <DatePicker></DatePicker>
      </FormContainer>
      <H4> Select Virus Dates </H4>
      <FormContainer> 
        <DatePicker></DatePicker>
      </FormContainer>
    </div>
  );
}

export default Filters;
