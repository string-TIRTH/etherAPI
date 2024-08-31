const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const axios = require("axios")
require('dotenv').config();

const cryptoPriceModel = require('./model/cryptoPriceModel');
const app = express();
const PORT = process.env.PORT || 3000;

const transactionRouter = require('./router/transactionRouter');
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const baseUrl = '/api'
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.use(`${baseUrl}/transactions`,transactionRouter)

cron.schedule('*/10 * * * *', async () => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr'
    );
    const price = response.data.ethereum.inr;
    const newPrice = new cryptoPriceModel({cryptoName:"Ethereum", price:price });
    await newPrice.save();
  } catch (error) {
    console.error('Error fetching Ethereum price:', error);
  }
});