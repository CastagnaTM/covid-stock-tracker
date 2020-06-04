export default class CompanyInput {
    country: string;
    currency: string;
    exchange: string;
    name: string;
    ipo: string;
    market_capitalization: number;
    share_outstanding: number;
    logo: string;
    phone: string;
    web_url: string;
    industry: string;
    constructor(
        country: string,
        currency: string,
        exchange: string,
        name: string,
        ipo: string,
        market_capitalization: number,
        share_outstanding: number,
        logo: string,
        phone: string,
        web_url: string,
        industry: string,
    ) {
        this.country = country;
        this.currency = currency;
        this.exchange = exchange;
        this.name = name;
        this.ipo = ipo;
        this.market_capitalization = market_capitalization;
        this.share_outstanding = share_outstanding;
        this.logo = logo;
        this.phone = phone;
        this.web_url = web_url;
        this.industry = industry;
    }
  }
CompanyInput.prototype.toString = function dogToString() {
    return `{
        country: "${this.country}", currency: "${this.currency}", exchange: "${this.exchange}", 
        name: "${this.name}", ipo: "${this.ipo}", market_capitalization: ${this.market_capitalization}, 
        share_outstanding: ${this.share_outstanding}, logo: "${this.logo}", phone: "${this.phone}", industry: "${this.industry}", web_url: "${this.web_url}"
    }`;
};
