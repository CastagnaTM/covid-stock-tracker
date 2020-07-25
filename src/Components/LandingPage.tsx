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
          <li> Using the dropdown to select a stock ticker. This search will pull from our MongoDB database using GraphQL, which consists of data for the top 100 stocks in the US (This option may take about 30 seconds if it has not been used recently). </li>
          <li> Using the search bar to enter a stock ticker. This search will pull data from the Finnhub API. </li>
        </ol>
        <p>Select a start date and end date to display a graph showing the low, high, open, and closing prices within the selected time period.</p>
      </section>

      <h3>The Graph</h3>
      <section>
        <p>Click on yellow dates on the x-axis to see any significant events related to Covid-19 that have occured.</p>
        <p>Toggle which prices you want displayed on the graph by clicking the appropriate label beneath the x-axis.</p>
        <p>To zoom in, click and drag with your mouse to highlight a section of the graph. Use the "zoom out" button to return to the original graph.</p>
      </section>

      <h3>Additional Data</h3>
      <section>
        <p>Below the graph, you can view data about the selected company, as well as data about the virus during the selected time period (only available starting January 22st, 2020).</p>
      </section>

      <h3>Sources</h3>
      <section>
        <p>Our stock data is sourced from the <a href="https://finnhub.io/" target="_blank" rel="noopener noreferrer">Finnhub API</a>.</p>
        <p>Our virus data is sourced from <a href="https://covidtracking.com/" target="_blank" rel="noopener noreferrer">The COVID Tracking Project</a>, which states "Almost all of the data we compile is taken directly from the websites of state/territory public health authorities."</p>
        <p>Our Covid-19 significant events data is sourced directly from <a href="https://www.nytimes.com/article/coronavirus-timeline.html" target="_blank" rel="noopener noreferrer">The New York Times</a>.</p>

      </section>
    </Introduction>
  );
}

export default LandingPage;
