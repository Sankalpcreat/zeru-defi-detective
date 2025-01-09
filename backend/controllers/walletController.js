const Transaction = require('../models/Transaction');
const { getUserTransactions } = require('../services/aaveService');

// Fetch the  wallet transactions
const getWalletTransactions = async (req, res) => {
  const { address } = req.params;

  try {
    let transactions = await Transaction.find({ user: address });

    if (transactions.length === 0) {
      transactions = await getUserTransactions(address);
      await Transaction.insertMany(transactions.map((tx) => ({ ...tx, user: address })));
    }

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get stats (total volume and transaction count)
const getWalletStats = async (req, res) => {
  const { address } = req.params;

  try {
    const transactions = await Transaction.find({ user: address });

    if (transactions.length === 0) {
      return res.status(404).json({ message: 'No transactions found' });
    }

    const totalVolume = transactions.reduce((sum, tx) => sum + tx.amount * tx.assetPriceUSD, 0);
    const transactionCount = transactions.length;

    res.status(200).json({ totalVolume, transactionCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getWalletTransactions,
  getWalletStats,
};

