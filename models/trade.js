// models/Trade.js
const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
    utc_time: Date,
    operation: String,
    market: String,
    base_coin: String,
    quote_coin: String,
    amount: Number,
    price: Number,
});

module.exports = mongoose.model('Trade', tradeSchema);
