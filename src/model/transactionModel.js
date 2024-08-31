const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
    address: { type: String, required: true },
    blockNumber: { type: String, required: true },
    blockHash: { type: String, required: true },
    timeStamp: { type: String, required: true },
    hash: { type: String, required: true },
    nonce: { type: String, required: true },
    transactionIndex: { type: String, required: false },
    from: { type: String, required: true },
    to: { type: String, required: true },
    value: { type: String, required: true },
    gas: { type: String, required: true },
    gasPrice: { type: String, required: true },
    input: { type: String, required: true },
    methodId: { type: String, required: true },
    functionName: { type: String, required: false },
    contractAddress: { type: String, required: false },
    cumulativeGasUsed: { type: String, required: true },
    txreceipt_status: { type: String, required: true },
    gasUsed: { type: String, required: true },
    confirmations: { type: String, required: true },
    isError: { type: String, required: true },
});
transactionSchema.index({ address: 1, hash: 1 }, { unique: true });
const transactionsModel = mongoose.model('transactions', transactionSchema)
module.exports = transactionsModel