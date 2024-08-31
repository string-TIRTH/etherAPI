const express = require('express');
const router = express.Router();
const transactionController = require('../controller/transactionController');
    router.get('/getTransactions/:address', transactionController.getTransactions); 
    router.get('/getExpense/:address', transactionController.getExpense); 
module.exports = router