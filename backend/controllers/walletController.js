const Transaction = require('../models/Transaction');
const { getUserTransactions } = require('../services/aaveService');

// Fetch the  wallet transactions
const getWalletTransactions = async (req, res) => {
  const { address } = req.params;

  try {
    let transactions = await Transaction.find({ 
      user: address,
      action: { $in: ['SEND', 'RECEIVE', 'TRANSFER'] }
    });

    if (transactions.length === 0) {
      transactions = await getUserTransactions(address);
      if (transactions.length > 0) {
        await Transaction.insertMany(
          transactions.map(tx => ({ ...tx, user: address }))
        );
      }
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
    const transactions = await Transaction.find({ 
      user: address,
      action: { $in: ['SEND', 'RECEIVE', 'TRANSFER'] }
    });

    if (transactions.length === 0) {
      return res.status(404).json({ message: 'No transactions found' });
    }

    const totalVolume = transactions.reduce(
      (sum, tx) => sum + (tx.amount * tx.assetPriceUSD), 
      0
    );
    
    res.status(200).json({
      totalVolume,
      transactionCount: transactions.length,
      sendCount: transactions.filter(tx => tx.action === 'SEND').length,
      receiveCount: transactions.filter(tx => tx.action === 'RECEIVE').length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getWalletTransactions,
  getWalletStats,
};

