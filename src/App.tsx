import React from 'react';
import {finnhubKey, finnhubBase} from './constants';


const getStockData = ():any => {
    fetch(`${finnhubBase}stock/candle?symbol=AAPL&resolution=D&from=1572651390&to=1573776000&token=${finnhubKey}`) 
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