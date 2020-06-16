
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


