
import React, {useState, useEffect} from 'react';
import {CompanyStyle} from './Styles'

interface Props {
  virusData: any,
  beginDate: String | null,
  endDate: String | null,
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
  const [beginData, setBeginData] = useState<object>({});
  const [endData, setEndData] = useState<object>({});
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
    hasDates &&
    <div>

    </div>
      // {printVirusData(virusData)}
  );
}

export default VirusData;


