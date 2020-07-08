
import React, {useState, useEffect} from 'react';
import { VirusStyle, MobileVirusStyle } from './Styles'

interface Props {
  virusData: any,
  beginDate: any,
  endDate: any,
  virusMobile: boolean,
}


function VirusData({virusData, beginDate, endDate, virusMobile}: Props) {
  
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

  if (virusMobile) {
    return (
      hasDates ? (
        <>
          <MobileVirusStyle>
            <p><span>Starting Date: </span>{formatDate(beginDate)}</p>
            <p className='positive'><span>Positive Cases: </span>{beginData.positive}</p>
            <p className='negative'><span>Negative Cases: </span>{beginData.negative}</p>
            {beginData.recovered && <p className='recovered'><span>Recovered: </span>{beginData.recovered}</p>}
            <p><span>Ending Date: </span>{formatDate(endDate)}</p>
            <p className='positive'><span>Positive Cases: </span>{endData.positive}</p>
            <p className='negative'><span>Negative Cases: </span>{endData.negative}</p>
            {endData.recovered && <p className='recovered'><span>Recovered: </span>{endData.recovered}</p>}
            <p>Differences</p>
            <p className='positive'><span>Positive Cases: </span>{endData.positive - beginData.positive}</p>
            <p className='negative'><span>Negative Cases: </span>{endData.negative - beginData.negative}</p>
            {endData.recovered && <p className='recovered'><span>Recovered:</span> {endData.recovered - beginData.recovered}</p>}
          </MobileVirusStyle>
        </>
      )
      :
      null 
    );
  } else {
    return (    
      hasDates ? (
        <>
          <VirusStyle>
            <div>
              <h2>Virus Data</h2>
            </div>
            <div className="virusColumn">
              <div className='labels'>
                <p>&nbsp;</p>
                <p>Positive Cases:</p>
                <p>Negative Cases:</p>
                {endData.recovered && <p>Recovered: </p>}
              </div>
              <div>
                <p>{formatDate(beginDate)}</p>
                <p className='positive'>{beginData.positive}</p>
                <p className='negative'>{beginData.negative}</p>
                {beginData.recovered && <p className='recovered'>{beginData.recovered}</p>}
              </div>
              <div>
                <p>{formatDate(endDate)}</p>
                <p className='positive'>{endData.positive}</p>
                <p className='negative'>{endData.negative}</p>
                {endData.recovered && <p className='recovered'>{endData.recovered}</p>}
              </div>
              <div>
                <p>differences</p>
                <p className='positive'>{endData.positive - beginData.positive}</p>
                <p className='negative'>{endData.negative - beginData.negative}</p>
                {endData.recovered && <p className='recovered'>{endData.recovered - beginData.recovered}</p>}
              </div>
            </div>
          </VirusStyle>
        </>
      ) 
      : 
      null      
    );
  }
}

export default VirusData;


