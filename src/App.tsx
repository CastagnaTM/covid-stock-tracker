import React from 'react';
import {finnhubKey, finnhubBase} from './constants';


const getStockData = (): any => {
    console.log(finnhubBase)
    console.log(finnhubKey)
    return fetch(`${finnhubBase}stock/candle?symbol=AAPL&resolution=D&from=1572651390&to=1573776000&token=${finnhubKey}`) 
    .then(resp => {
        console.log("hello")
        return resp.json()
    }
        )
    .then(data => {
        console.log(data);  
        return data;
      
    });

  }

// function getStockData<Object>(): Promise<Object> {
//     return fetch(`${finnhubBase}stock/candle?symbol=AAPL&resolution=D&from=1572651390&to=1573776000&token=br2kub7rh5rbm8ou45ng`)
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(response.statusText)
//         }
//         return response.json()
//       })
  
//   }

const App: React.FC = () => {
    return <div>{getStockData().toString()}</div>
}

export default App;