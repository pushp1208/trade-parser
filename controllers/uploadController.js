// controllers/uploadController.js
const csv = require('csv-parser');
const fs = require('fs');
const Trade = require('../models/trade');

exports.uploadCSV = (req, res) => {
    const results = [];
    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', async () => {
            for (const row of results) {
                const [base_coin, quote_coin] = row.Market.split('/');
                await Trade.create({
                    utc_time: new Date(row.UTC_Time),
                    operation: row.Operation,
                    market: row.Market,
                    base_coin,
                    quote_coin,
                    amount: parseFloat(row['Buy/Sell Amount']),
                    price: parseFloat(row.Price),
                });
            }
            res.status(200).send('File uploaded and data saved.');
        });
};
