// routes/wallet.js
const express = require('express');
const router = express.Router();
const { getWalletBalance, addFunds } = require('../controllers/walletController');
const { verifyToken } = require('../middleware/authMiddleware'); // Ensure the user is authenticated

// Get wallet balance
router.get('/', verifyToken, getWalletBalance);

// Add funds to wallet
router.post('/add-funds', verifyToken, addFunds);

module.exports = router;