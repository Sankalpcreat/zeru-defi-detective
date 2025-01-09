const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  user: { type: String, required: true },
  id: { type: String, required: true },
  timestamp: { type: Number, required: true },
  txHash: { type: String, required: true },
  action: { type: String, required: true },
  amount: { type: Number, required: true },
  assetPriceUSD: { type: Number, required: true },
  reserve: {
    symbol: { type: String },
    decimals: { type: Number },
  },
});

module.exports = mongoose.model('Transaction', TransactionSchema);

