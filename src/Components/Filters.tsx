import React from 'react';
import { H4, FormContainer } from './Styles'
import Select from "./Select"
import DatePicker from './DatePicker'

function Filters() {

  return (
    <div> 
      <H4> Select Stock </H4>
        <Select></Select>
      <H4> Select Dates </H4>
      <FormContainer> 
        <DatePicker></DatePicker>
      </FormContainer>
    </div>
  );
}

export default Filters;
