const express = require("express");
const graphqlHTTP = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const Stock = require("./models/stocks");
const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: buildSchema(`
        type Stock {
            _id: ID!,
            ticker: String!,
            dates: [StockDate!]!
        }
        
        type StockDate {
          date: String,
          open_price: Float!
        }

        input DateInput {
          date: String,
          open_price: Float!,
        }

        input StockInput {
            _id: ID!
            ticker: String!,
            dates: [DateInput]
        }

        type RootQuery {
            stocks: [Stock!]!,
            findStock(ticker: String): Stock,
        }

        type RootMutation {
            createStock(stockInput: StockInput): Stock,
            updateStock(stockInput: StockInput): Stock 
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
        // const stocks = {
        //   _id: args.stockInput._id,
        //   ticker: args.stockInput.ticker,
        //   dates: JSON.parse(JSON.stringify(args.stockInput.dates))
        // }
        // // console.log(stocks);
        // return stocks
      },
      updateStock: (args) => {
        const stock = new Stock({
          // needs to find stock
        });
      },
    },
    graphiql: true,
  })
);

mongoose
  .connect(
    `mongodb+srv://amber:${process.env.MONGO_PASSWORD}@cluster0-adymw.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
  )
  .then(app.listen(4000))
  .catch((err) => console.log(err));
