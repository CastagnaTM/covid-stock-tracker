const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stockSchema = new Schema({
    ticker: {
        type: String,
        required:  true
    },
    open_price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Stock', stockSchema);