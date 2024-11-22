// // models/Wallet.js
// const mongoose = require('mongoose');

// const WalletSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true },
//   balance: { type: Number, default: 0 },
// });

// module.exports = mongoose.model('Wallet', WalletSchema);


const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  userName: { 
    type: String, 
    required: true, 
    ref: 'User', 
    unique: true // Ensure the username is unique to prevent duplicate wallets
  },
  balance: { 
    type: Number, 
    required: true, 
    default: 0 
  },
}, { timestamps: true }); // Include timestamps for wallet creation and updates

module.exports = mongoose.model('Wallet', walletSchema);