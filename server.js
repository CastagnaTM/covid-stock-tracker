const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const Stock = require("./models/stocks");
const cors = require("cors");
const app = express();

app.use(cors());
mongoose.set("useFindAndModify", false);
app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
        type Stock {
            _id: ID!,
            ticker: String!,
            dates: [StockDate!]!,
            companyData: CompanyData
        }
        
        type StockDate {
          date: String,
          open_price: Float!,
          close_price: Float!,
          high_price: Float!,
          low_price: Float!,
        }

        type CompanyData {
          country: String,
          currency: String,
          exchange: String,
          industry: String,
          ipo: String,
          logo: String,
          market_capitalization: Float,
          name: String,
          phone: String,
          share_outstanding: Float,
          web_url: String,
        }

        input CompanyInput {
          country: String,
          currency: String,
          exchange: String,
          industry: String,
          ipo: String,
          logo: String,
          market_capitalization: Float,
          name: String,
          phone: String,
          share_outstanding: Float,
          web_url: String, 
        }

        input DateInput {
          date: String!,
          open_price: Float!,
          close_price: Float!,
          high_price: Float!,
          low_price: Float!,
        }

        input StockInput {
            ticker: String!,
            dates: [DateInput!]!,
            companyData: CompanyInput
        }

        type RootQuery {
            stocks: [Stock!]!,
            findStock(ticker: String): Stock,
            findDates(ticker: String, endDate: String, startDate: String): Stock,
        }

        type RootMutation {
            createStock(stockInput: StockInput): Stock,
            updateCompany(ticker: String, companyInput: CompanyInput): Stock,
            updateDate(ticker: String, dateInput: DateInput): Stock 
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
      stocks: () => {
        return Stock.find()
          .then((result) => {
            return result.map((event) => {
              return { ...event._doc, _id: event.id };
            });
          })
          .catch((err) => {
            console.log(err);
            throw err;
          });
      },
      findStock: (args) => {
        return Stock.findOne({ ticker: args.ticker })
          .then((result) => {
            return result;
          })
          .catch((err) => {
            console.log(err);
            throw err;
          });
      },
      createStock: (args) => {
        const stock = new Stock({
          ticker: args.stockInput.ticker,
          dates: JSON.parse(JSON.stringify(args.stockInput.dates)),
        });
        return stock
          .save()
          .then((result) => {
            return { ...result._doc };
          })
          .catch((err) => {
            console.log(err);
            throw err;
          });
      },
      updateCompany: (args) => {
        const query = { ticker: args.ticker };
        // const update = {$set: {companyData: {exchange: args.companyInput.exchange, country: args.companyInput.exchange }}};
        const updateParams = {};
        for (const key in args.companyInput) {
          updateParams[`companyData.${key}`] = args.companyInput[key];
        }
        const update = { $set: updateParams };
        const options = { returnNewDocument: true, new: true };
        return Stock.findOneAndUpdate(query, update, options)
          .then((result) => {
            return result;
          })
          .catch((err) => {
            console.log(err);
            throw err;
          });
        // return Stock.findOne({ ticker: args.ticker })
        // .then(result => {
        //   let current = result
        //   current['company'] = {ticker: "AAPL"}
        //   return current
        // }).save()
        // .then((result => {
        //   return {...result._doc}
        // }).catch(err => console.log(err)))
      },
      updateDate: (args) => {
        const query = { ticker: args.ticker };
        const update = { $push: { dates: args.dateInput } };
        const options = { returnNewDocument: true, new: true };
        return Stock.findOneAndUpdate(query, update, options).then(
          (result) => result
        );
      },
      findDates: (args) => {
        return Stock.findOne({ ticker: args.ticker }) 
          .then((result) => {
            let data = result.dates
            let startIndex = data.findIndex(element => element.date === args.startDate) 
            let endIndex = data.findIndex(element => element.date === args.endDate) + 1;
            let slicedData = data.slice(startIndex, endIndex);
            result.dates = slicedData;
          console.log(result);            
          return result;
          })
        },
    },
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://amber:${process.env.MONGO_PASSWORD}@cluster0-adymw.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(app.listen(4000))
  .catch((err) => console.log(err));