const express = require('express');
const router = express.Router();

const transactionController = require('../Controllers/getTransactions.js')

router.get("/", transactionController);

module.exports = router;