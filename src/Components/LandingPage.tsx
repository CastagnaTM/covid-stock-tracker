import React from 'react';
import {Introduction} from './Styles'

function LandingPage() {
  return (
    <Introduction>
      <h2>Welcome to Covid Stock Tracker</h2>
      <h3>Searching</h3>
      <section>
        <p>You can search for a stock two ways:</p>
        <ol>
          <li> Using the dropdown to select a stock ticker. This search will pull from our MongoDB database using GraphQL, which consists of data for the top 100 stocks in the US. </li>
          <li> Using the search bar to enter a stock ticker. This search will pull data from the Finnhub API. </li>
        </ol>
        <p>Select start date and end date to display a graph showing the low, high, open, and closing prices within the selected time period.</p>
          {/* <p>Dropdown Bar: consists of only data up to end date of 6/3/2020</p> */}
      </section>

      <h3>The Graph</h3>
      <section>
        <p>Hover over yellow dates on the x-axis to see any significant events related to Covid-19 that have occured.</p>
        <p>Toggle which prices you want displayed on the graph by clicking the appropriate label beneath the x-axis.</p>
      </section>

      <h3>Additional Data</h3>
      <section>
        <p>Below the graph, you can view data about the selected company, and data about the virus during the selected time period.</p>
      </section>
    </Introduction>
  );
}

export default LandingPage;
