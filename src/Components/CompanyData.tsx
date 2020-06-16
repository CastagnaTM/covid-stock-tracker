
import React from 'react';

interface Props {
  companyData: Object
}

const formatPhoneNumber = (phoneNumber: string) => {
  return "+" + phoneNumber.charAt(0) + ' (' + phoneNumber.slice(1,4) + ')-'
      + phoneNumber.slice(4,7) + "-" + phoneNumber.slice(7); 
}

function printingCompany(companyData): any{
  if(companyData){
    return (
      <div>
        <p>Company: {companyData.name}</p>
        <p>Country: {companyData.country}</p>
        <p>IPO: {companyData.ipo}</p>
        <p>Phone Number: {companyData.phone.length > 0 && formatPhoneNumber(companyData.phone)}</p>
      </div>
    )
  }
}


function CompanyData({companyData}: Props) {
  return (
    <div>
      {printingCompany(companyData)}
        
    
    </div>
  );
}

export default CompanyData;

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

