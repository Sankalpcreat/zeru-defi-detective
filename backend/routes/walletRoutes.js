const express = require('express');
const router = express.Router();
const { getWalletTransactions, getWalletStats } = require('../controllers/walletController');

router.get('/:address', getWalletTransactions);
router.get('/:address/stats', getWalletStats);

module.exports = router;

