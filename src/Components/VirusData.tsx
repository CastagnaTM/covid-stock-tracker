
import React, {useState, useEffect} from 'react';
import { VirusStyle, MobileVirusStyle } from './Styles'

interface Props {
  virusData: any,
  beginDate: any,
  endDate: any,
  virusMobile: boolean,
}


function VirusData({virusData, beginDate, endDate, virusMobile}: Props) {
  
  const [beginData, setBeginData] = useState<any>({"positive": 0, "negative": 0, "recovered": 0});
  const [endData, setEndData] = useState<any>({"positive": 0, "negative": 0, "recovered": 0});
  const [hasDates, setHasDates] = useState<boolean>(true);

  const formatDate = (date) => {
    return `${date.slice(4,6)}-${date.slice(6)}-${date.slice(0,4)}`;
  }

  const setVirusDate = (): void => {
    const filteredVirusDates = virusData.filter(virusDate => virusDate.date.toString() === endDate ||virusDate.date.toString() === beginDate );
    if (filteredVirusDates.length === 1) {
      setBeginData({positive: 0, negative: 0, recovered: 0});
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
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect( () => {    
    setVirusDate();
  }, [beginDate, endDate]) // eslint-disable-line react-hooks/exhaustive-deps

  if (virusMobile) {
    return (
      hasDates ? (
        <>
          <MobileVirusStyle>
            <p><span>Starting Date: </span>{formatDate(beginDate)}</p>
            <p className='positive'><span>Positive Cases: </span>{beginData.positive}</p>
            <p className='negative'><span>Negative Cases: </span>{beginData.negative}</p>
            <p className='recovered'><span>Recovered: </span>{beginData.recovered}</p>
            <p><span>Ending Date: </span>{formatDate(endDate)}</p>
            <p className='positive'><span>Positive Cases: </span>{endData.positive}</p>
            <p className='negative'><span>Negative Cases: </span>{endData.negative}</p>
            <p className='recovered'><span>Recovered: </span>{endData.recovered}</p>
            <p>Differences</p>
            <p className='positive'><span>Positive Cases: </span>{endData.positive - beginData.positive}</p>
            <p className='negative'><span>Negative Cases: </span>{endData.negative - beginData.negative}</p>
            <p className='recovered'><span>Recovered:</span> {endData.recovered - beginData.recovered}</p>
          </MobileVirusStyle>
        </>
      )
      :
      <MobileVirusStyle>
        <p> Virus data not available until 01/22/2020</p> 
      </MobileVirusStyle> 
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
                <p>Recovered: </p>
              </div>
              <div>
                <p>{formatDate(beginDate)}</p>
                <p className='positive'>{beginData.positive}</p>
                <p className='negative'>{beginData.negative}</p>
                <p className='recovered'>{beginData.recovered ? beginData.recovered : 0}</p>
              </div>
              <div>
                <p>{formatDate(endDate)}</p>
                <p className='positive'>{endData.positive}</p>
                <p className='negative'>{endData.negative}</p>
                <p className='recovered'>{endData.recovered ? endData.recovered : 0}</p>
              </div>
              <div>
                <p>Difference</p>
                <p className='positive'>{endData.positive - beginData.positive}</p>
                <p className='negative'>{endData.negative - beginData.negative}</p>
                <p className='recovered'>{endData.recovered - beginData.recovered}</p>
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


