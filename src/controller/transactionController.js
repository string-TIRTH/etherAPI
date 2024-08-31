const transactionsModel = require('../model/transactionModel');
const priceModel = require('../model/cryptoPriceModel');
const axios = require('axios');
const storeTransactions = async (address,transactions)=>{
    transactionsModel.deleteMany({address:address});
    for (const transaction of transactions) {
      transaction.address = address;
    }
    transactionsModel.insertMany(transactions)
}
const getTransactions =  async (req, res) => {
    try {
      const { address } = req.params;
      const response = await axios.get(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=asc&apikey=${process.env.ETHERSCAN_API_KEY}`
      );
      const transactions = response.data.result;
  
      if(transactions.length != 0)
        await storeTransactions(address,transactions)
  
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching transactions' });
    }
};
const getExpense = async (req, res) => {
  try {
    const { address } = req.params;

    const transactions = await transactionsModel.find({ address });
    if (!transactions) return res.status(404).json({ error: 'Address not found' });

    let totalExpense = 0;
    for(const transaction of transactions){
      totalExpense += (transaction.gasUsed * transaction.gasPrice) / 1e18;
    }

    const latestPrice = await priceModel.findOne().sort({ timestamp: -1 });
    res.json({ totalExpense, currentPrice: latestPrice.price });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error calculating expenses' });
  }
};

module.exports = {
    getTransactions,
    getExpense
}