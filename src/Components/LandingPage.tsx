import React from 'react';
import Cees from './headshot.png';
import {Introduction} from './Styles'

function LandingPage() {
  return (
    <Introduction>
      <h1>Welcome to CoVID STOck TRacker</h1>
      <p>1. You can search for a stock by using either the search bar or dropdown selective stock to select a ticker</p>
        <p> -Search Bar: consist of pulling data from FinHub API</p>
        <p> -Dropdown Bar: consist of data from out GRAPHQL database using MangoDB :D</p>
      <p>2. Select start date and end date to display an graph showing low, high, open, and close price within the timep period.</p>
        {/* <p>Dropdown Bar: consists of only data up to end date of 6/3/2020</p> */}
      <p>Hover over the yellow dates to see significant events that have occured</p>
      <p>Below the graph displays the Company data and Virus count during the time period inputted</p>
    </Introduction>
  );
}

export default LandingPage;
