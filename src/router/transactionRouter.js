const express = require('express');
const router = express.Router();
const transactionController = require('../controller/transactionController');
    router.get('/:address', transactionController.getTransactions); 
module.exports = router