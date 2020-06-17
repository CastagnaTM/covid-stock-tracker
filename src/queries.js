export const createStockQuery = (ticker, stock) => {
    const query = `mutation {
        createStock(stockInput: {ticker: "${ticker}", dates: [${stock.toString()}]})
        {
          ticker, 
          dates
            { 
              date,
              open_price,
              close_price,
              high_price,
              low_price
            }
          }  
        }`;
    return query;
}

export const fetchAllStocksQuery = () => {
    const query = `
    query {
      stocks{
        ticker
        dates{
          open_price,
          close_price,
          low_price,
          high_price,
          date
        }
      }
    }
    `;
    return query;
}

export const updateCompanyDataQuery = (ticker, companyInput) => {
    const query = 
    `
    mutation {
      updateCompany(ticker: "${ticker}" companyInput: ${companyInput.toString()}){
        ticker,
        dates {
          date
        },
        companyData {
          country
          currency
          exchange
          industry
          ipo
          logo
          market_capitalization
          name
          phone
          share_outstanding
          web_url
        }
      }
    }
    `
    return query;
}

export const findCompanyDatesQuery = (ticker, beginDate, endDate) => {
    const query = `
    query {
      findDates(ticker: "${ticker}", startDate: "${beginDate?.toLocaleDateString('en')}", endDate: "${endDate?.toLocaleDateString('en')}"){ 
      ticker,
      dates {
        date,
        low_price,
        high_price,
        open_price,
        close_price
      },
      companyData {
        country,
        currency,
        exchange,
        industry,
        ipo,
        market_capitalization,
        logo,
        name,
        phone,
        share_outstanding,
        web_url
      }
    }
  
  }`
  return query;
}