export const finnhubKey = process.env.REACT_APP_FINNHUB_KEY;
export const finnhubBase = 'https://finnhub.io/api/v1/';
export const GRAPHQL_API = "http://localhost:4000/graphql";
export const tickers: string[] = [
    "JPM", "BRK.A", "BAC", "AAPL", "T", "GOOGL", "MSFT", "XOM", "WFC", "C", "WMT", "VZ", "AMZN", "UNH",         //14
    "CMCSA", "JNJ", "DIS", "INTC", "FB", "CVS", "GS", "MS", "PFE", "IBM", "GE", "CVX", "CI", "PG", "MET",       //15       29
    "CSCO", "RTX", "PEP", "AXP", "GM", "MRK", "ORCL", "KO", "USB", "ANTM", "HD", "PRU", "ABBV", "DELL",          //14       43
    "CAT", "WBA", "BMY", "PNC", "V", "COST", "UPS", "DUK", "LMT", "CHTR", "HON", "AIG", "ABT", "BK",            //14       57
    "COF", "AMGN", "TFC", "EXC", "LOW", "SO", "BLK", "NEE", "DE", "UNP", "TMO", "GILD", "PSX", "MDLZ", "AVGO",  //15       72
    "MMM", "TGT", "MPC", "PGR", "COP", "PM", "MCD", "GD", "AFL", "TRV", "LLY", "KHC", "SCHW", "HCA", "DHR",
    "HUM", "NOC", "NKE", "PYPL", "QCOM", "DAL", "KR", "MA", "D", "MU", "NFLX", "HPQ", "SBUX"
];

export const significantDates = [
    {date: "12/31/2019", info: "Chinese authorities treated dozens of cases of pneumonia of unknown cause."}, 
    {date: "1/11/2020",info: "China reported its first death."},
    {date: "1/21/2020",info: "First confirmed case in Washington state."}, 
    {date: "1/23/2020",info: "Wuhan, a city of more than 11 million, was cut off by the Chinese authorities."},
    {date: "1/30/2020",info: "The W.H.O. declared a global health emergency."},
    {date: "2/2/2020", info: "The first coronavirus death was reported outside China."},
    {date: "2/5/2020", info: "A cruise ship in Japan quarantined thousands."},
    {date: "2/7/2020", info: "A Chinese doctor who tried to raise the alarm died."},
    {date: "2/11/2020",info: "The disease the virus causes was named."},
    {date: "2/14/2020", info: "France announced the first coronavirus death in Europe."},
    {date: "2/19/2020", info: "Hundreds left the quarantined cruise."},
    {date: "2/21/2020", info: "A secretive church was linked to the outbreak in South Korea."},
    {date: "2/23/2020", info: "Italy saw a major surge in cases."},
    {date: "2/24/2020", info: "Iran emerged as a second focus point."},
    {date: "2/26/2020", info: "Latin America reported its first case."},
    {date:"2/28/2020", info: ["Infections spiked in Europe.","Sub-Saharan Africa recorded its first infection."]},
    {date:"2/29/2020",info: "The United States reported a death."},
    {date:"3/3/2020", info: "U.S. officials approved widespread testing."},
    {date:"3/11/2020", info: "President Trump blocked most visitors from continental Europe."},
    {date:"3/13/2020", info: "President Trump declared a national emergency."},
    {date:"3/15/2020", info: "The C.D.C. recommended no gatherings of 50 or more people in the U.S."},
    {date:"3/16/2020", info: "Latin America began to feel the effects."},
    {date:"3/17/2020", info: ["France imposed a nationwide lockdown.","The E.U. barred most travelers from outside the bloc."]},
    {date:"3/19/2020", info: "For the first time, China reported zero local infections."},
    {date:"3/23/2020", info: "Prime Minister Boris Johnson locked Britain down."},
    {date:"3/24/2020", info: ["The Tokyo Olympics were delayed until 2021."," India announced a 21-day lockdown."]},
    {date:"3/26/2020", info: "The United States led the world in confirmed cases."},
    {date:"3/27/2020", info: "Trump signed a stimulus bill into law."},
    {date:"3/28/2020", info: "The C.D.C. issued a travel advisory for the New York region."},
    {date:"3/30/2020", info: "More states issued stay-at-home directives."},
    {date:"4/2/2020", info: "Cases topped one million, and millions lost their jobs."},
    {date:"4/6/2020", info: "Prime Minister Boris Johnson moved into intensive care."},
    {date:"4/8/2020", info: "Companies planned vaccine trials."},
    {date:"4/10/2020", info: "Cases surged in Russia."},
    {date:"4/14/2020", info: ["President Trump planned to stop U.S. funding of the W.H.O.","The global economy slid toward contraction."]},
    {date:"4/17/2020", info: "President Trump encouraged protests against some state restrictions."},
    {date:"4/19/2020", info: "Chile issued ‘immunity cards’ to people who have recovered from the virus."},
    {date:"4/21/2020", info: "Officials discovered earlier known U.S. coronavirus deaths in California."},
    {date:"4/24/2020", info: ["The European Union, pressured by China, watered down a report on disinformation.","The president was criticized over disinfectant comments."]},
    {date:"4/26/2020", info: "The global death toll surpassed 200,000."},
    {date:"4/27/2020", info: "Oxford scientists led the race for a vaccine."},
    {date:"4/30/2020", info: "Airlines announced rules requiring face masks."},
    {date:"5/1/2020", info: ["The F.D.A. authorized emergency use of an antiviral drug.","The W.H.O. extended its declaration of a global public health emergency."]},
    {date:"5/3/2020", info: "Several countries targeted China over the coronavirus."},
    {date:"5/5/2020", info: "The coronavirus reached France in December, doctors said, rewriting the epidemic’s "},
    {date:"5/6/2020", info: "Poland delayed its presidential election."},
    {date:"5/10/2020", info: "The British prime minister relaxed certain restrictions."},
    {date:"5/13/2020", info: "A top W.H.O. official said the coronavirus ‘may never go away.’"},
    {date:"5/16/2020", info: "Barack Obama criticized the U.S.’s virus response."},
    {date:"5/17/2020", info: "Japan and Germany, two of the world’s largest economies, enter recessions."},
]
