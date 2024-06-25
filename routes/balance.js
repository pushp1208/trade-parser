// routes/balance.js
const express = require('express');
const { getBalance } = require('../controllers/balanceController');

const router = express.Router();

router.post('/', getBalance);

module.exports = router;
