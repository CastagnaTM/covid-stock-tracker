import React from 'react';
import {finnhubKey, finnhubBase} from './constants';


const getStockData = ():any => {
    fetch(`${finnhubBase}stock/candle?symbol=AAPL&resolution=D&from=1577750400&to=1590510123&token=${finnhubKey}`) 
    .then(resp => resp.json())
    .then(data => {
        console.log(data);        
    });

  }
const App: React.FC = () => {
    return (
        <div>
            {getStockData()}
        </div>
    );
}

export default App;