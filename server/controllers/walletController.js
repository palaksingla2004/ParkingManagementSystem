// controllers/walletController.js
const Wallet = require('../models/Wallet');

exports.getWalletBalance = async (req, res) => {
  const userId = req.user.id; // Assuming you have user authentication in place

  try {
    const wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }
    res.status(200).json({ balance: wallet.balance });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving wallet balance' });
  }
};

exports.addFunds = async (req, res) => {
  const userId = req.user.id; // Assuming you have user authentication in place
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Invalid amount' });
  }

  try {
    let wallet = await Wallet.findOne({ userId });
    if (!wallet) {
      wallet = new Wallet({ userId, balance: 0 });
    }

    wallet.balance += amount;
    await wallet.save();
    res.status(200).json({ message: 'Funds added successfully', balance: wallet.balance });
  } catch (error) {
    res.status(500).json({ message: 'Error adding funds to wallet' });
  }
};