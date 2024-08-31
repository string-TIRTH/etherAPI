const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

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