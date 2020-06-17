
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
        <p>Company: <a href={companyData.web_url || companyData.weburl}>{companyData.name}</a></p>
        <p>Industry: {companyData.industry || companyData.finnhubIndustry}</p>
        <p>Currency: {companyData.currency}</p>
        <p>Market Capitalization: {companyData.market_capitalization || companyData.marketCapitalization}</p>
        <p>Share Outstanding: {companyData.share_outstanding || companyData.shareOutstanding}</p>
        <p>Country: {companyData.country}</p>
        <p>IPO: {companyData.ipo}</p>
        <p>Phone Number: {companyData.phone && formatPhoneNumber(companyData.phone)}</p>
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


