// // routes/wallet.js
// const express = require('express');
// const router = express.Router();
// const { getWalletBalance, addFunds } = require('../controllers/walletController');
// const { verifyToken } = require('../middleware/authMiddleware'); // Ensure the user is authenticated

// // Get wallet balance
// router.get('/', verifyToken, getWalletBalance);

// // Add funds to wallet
// router.post('/add-funds', verifyToken, addFunds);

// module.exports = router;


const express = require('express');
const { addBalance, getWalletBalance } = require('../controllers/walletController');
const router = express.Router();

// Route to add balance to the wallet
router.post('/add', addBalance);

// Route to get wallet balance
router.get('/:userName', getWalletBalance);

module.exports = router;