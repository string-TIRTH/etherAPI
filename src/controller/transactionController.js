const transactionsModel = require('../model/transactionModel');
const axios = require('axios');
const storeTransactions = async (address,transactions)=>{
    for (const transaction of transactions) {
        const existingTransaction = await transactionsModel.findOne({address:address, hash: transaction.hash });
        if (!existingTransaction) {
            const newTransaction = new transactionsModel({
                address:address,
                blockNumber:transaction.blockNumber,
                blockHash:transaction.blockHash,
                timeStamp:transaction.timeStamp,
                hash:transaction.hash,
                nonce:transaction.nonce,
                transactionInde:transaction.transactionInde,
                from:transaction.from,
                to:transaction.to,
                value:transaction.value,
                gas:transaction.gas,
                gasPrice:transaction.gasPrice,
                input:transaction.input,
                methodId:transaction.methodId,
                functionName:transaction.functionName??'',
                contractAddress:transaction.contractAddress??'',
                cumulativeGasUsed:transaction.cumulativeGasUsed,
                txreceipt_status:transaction.txreceipt_status,
                gasUsed:transaction.gasUsed,
                confirmations:transaction.confirmations,
                isError:transaction.isError
            });
          await newTransaction.save();
        }
      }
}
const getTransactions = ('/api/transactions/:address', async (req, res) => {
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
});

module.exports = {
    getTransactions
}