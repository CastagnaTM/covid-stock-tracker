
import React, {useState, useEffect} from 'react';
import {CompanyStyle} from './Styles'

interface Props {
  virusData: any,
  beginDate: any,
  endDate: any,
}

function printVirusData(virusData): any {
  if(virusData){
    return (
      <CompanyStyle>
        <p><span>Industry:</span> {virusData.industry || virusData.finnhubIndustry}</p>

      </CompanyStyle>
    )
  }
}


function VirusData({virusData, beginDate, endDate}: Props) {
  const [beginData, setBeginData] = useState<any>({});
  const [endData, setEndData] = useState<any>({});
  const [hasDates, setHasDates] = useState<boolean>(true);

  const setVirusDate = (): void => {
    const filteredVirusDates = virusData.filter(virusDate => virusDate.date.toString() === endDate ||virusDate.date.toString() === beginDate );
    if (filteredVirusDates.length === 1) {
      setBeginData(virusData[virusData.length -1]);
      setEndData(filteredVirusDates[0]);
    }
    else if (filteredVirusDates.length === 2) {
      setBeginData(filteredVirusDates[1]);
      setEndData(filteredVirusDates[0]);
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
        <CompanyStyle>
          <div>{beginData.date}</div>
          <p><span>positive:</span>{beginData.positive}</p>
          <p><span>negative:</span>{beginData.negative}</p>
          <p><span>recovered:</span>{beginData.recovered}</p>
          <div>{endData.date}</div>
          <p><span>positive:</span>{endData.positive}</p>
          <p><span>negative:</span>{endData.negative}</p>
          <p><span>recovered:</span>{endData.recovered}</p>
          <div>differences</div>
          <p><span>positive:</span>{endData.positive - beginData.positive}</p>
          <p><span>negative:</span>{endData.negative - beginData.negative}</p>
          <p><span>recovered:</span>{endData.recovered - beginData.recovered}</p>
        </CompanyStyle>
      </>
    ) 
    : 
    null      
      // {printVirusData(virusData)}
  );
}

export default VirusData;


