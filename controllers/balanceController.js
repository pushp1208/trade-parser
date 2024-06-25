// controllers/balanceController.js
const Trade = require('../models/trade');

exports.getBalance = async (req, res) => {
    const { timestamp } = req.body;
    const date = new Date(timestamp);

    const trades = await Trade.find({ utc_time: { $lt: date } });

    const balances = trades.reduce((acc, trade) => {
        const amount = trade.operation === 'BUY' ? trade.amount : -trade.amount;
        if (!acc[trade.base_coin]) {
            acc[trade.base_coin] = 0;
        }
        acc[trade.base_coin] += amount;
        return acc;
    }, {});

    res.json(balances);
};
