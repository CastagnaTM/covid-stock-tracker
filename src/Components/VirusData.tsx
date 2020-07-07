
import React, {useState, useEffect} from 'react';
import {VirusStyle} from './Styles'

interface Props {
  virusData: any,
  beginDate: any,
  endDate: any,
}


function VirusData({virusData, beginDate, endDate}: Props) {
  
  const [beginData, setBeginData] = useState<any>({});
  const [endData, setEndData] = useState<any>({});
  const [hasDates, setHasDates] = useState<boolean>(true);

  const formatDate = (date) => {
    return `${date.slice(4,6)}-${date.slice(6)}-${date.slice(0,4)}`;
  }

  const setVirusDate = (): void => {
    const filteredVirusDates = virusData.filter(virusDate => virusDate.date.toString() === endDate ||virusDate.date.toString() === beginDate );
    if (filteredVirusDates.length === 1) {
      setBeginData(virusData[virusData.length -1]);
      setEndData(filteredVirusDates[0]);
      setHasDates(true);
    }
    else if (filteredVirusDates.length === 2) {
      setBeginData(filteredVirusDates[1]);
      setEndData(filteredVirusDates[0]);
      setHasDates(true);
    }
    else {
      setHasDates(false);
    }
  }
  useEffect( () => {    
    setVirusDate();
  }, [])

  useEffect( () => {    
    setVirusDate();
  }, [beginDate, endDate])

  return (    
    hasDates ? (
      <>
        <VirusStyle>
          <h2>Virus Data</h2>
          <p><span>Starting Date: </span>{formatDate(beginDate)}</p>
          <p className='positive'><span>Positive Cases: </span>{beginData.positive}</p>
          <p className='negative'><span>Negative Cases: </span>{beginData.negative}</p>
          {beginData.recovered && <p className='recovered'><span>Recovered: </span>{beginData.recovered}</p>}
          <p><span>Ending Date: </span>{formatDate(endDate)}</p>
          <p className='positive'><span>Positive Cases: </span>{endData.positive}</p>
          <p className='negative'><span>Negative Cases: </span>{endData.negative}</p>
          {endData.recovered && <p className='recovered'><span>Recovered: </span>{endData.recovered}</p>}
          <p>differences</p>
          <p className='positive'><span>Positive Cases: </span>{endData.positive - beginData.positive}</p>
          <p className='negative'><span>Negative Cases: </span>{endData.negative - beginData.negative}</p>
          {endData.recovered && <p className='recovered'><span>Recovered:</span> {endData.recovered - beginData.recovered}</p>}
        </VirusStyle>
      </>
    ) 
    : 
    null      
  );
}

export default VirusData;


