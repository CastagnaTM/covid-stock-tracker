
import React from 'react';
import {CompanyStyle} from './Styles'

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
      <CompanyStyle>
        <p><span>Industry:</span> {companyData.industry || companyData.finnhubIndustry}</p>
        <p><span>Currency:</span> {companyData.currency}</p>
        <p><span>Market Capitalization:</span> {companyData.market_capitalization || companyData.marketCapitalization}</p>
        <p><span>Share Outstanding:</span> {companyData.share_outstanding || companyData.shareOutstanding}</p>
        <p><span>Country:</span> {companyData.country}</p>
        <p><span>IPO:</span> {companyData.ipo}</p>
        <p><span>Phone Number:</span> {companyData.phone && formatPhoneNumber(companyData.phone)}</p>
      </CompanyStyle>
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


