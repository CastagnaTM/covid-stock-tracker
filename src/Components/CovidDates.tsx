
import React from 'react';

function CovidDates() {
  return (
    <div>
      
    </div>
  );
}

export default CovidDates;

// import React from "react";
// import { convertToRealTime } from "../functions";
// import { significantDates } from "../constants";

// interface Props {
//   data: any;
// }

// function CovidDates({ data }: Props) {
//   const filterDates = (data: any): any => {
//     // console.log(data);
//     // console.log(significantDates);
//     let filteredDates = significantDates.filter((date) => {
//       let unix = new Date(date.date).getTime() / 1000;
//       if (data.length > 1) {
//         if (unix <= data[data.length-1].date_number && unix >= data[0].date_number) {
//             return date;
//         }
//       }
      
//     });
//     console.log(filteredDates)
//     return filterDates
//   };

//   return <div>{filterDates(data)}</div>;
// }

// export default CovidDates;

