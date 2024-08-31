const mongoose = require('mongoose')
const cryptoPriceSchema = new mongoose.Schema({
    timestamp: { type: Date, default: Date.now },
    cryptoName: {type: String,required:true},
    price: {type: Number,required:true},
});

const cryptoPriceModel = mongoose.model('cryptoPrice', cryptoPriceSchema)
module.exports = cryptoPriceModel