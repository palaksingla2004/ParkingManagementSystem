// // controllers/walletController.js
// const Wallet = require('../models/Wallet');

// exports.getWalletBalance = async (req, res) => {
//   const userId = req.user.id; // Assuming you have user authentication in place

//   try {
//     const wallet = await Wallet.findOne({ userId });
//     if (!wallet) {
//       return res.status(404).json({ message: 'Wallet not found' });
//     }
//     res.status(200).json({ balance: wallet.balance });
//   } catch (error) {
//     res.status(500).json({ message: 'Error retrieving wallet balance' });
//   }
// };

// exports.addFunds = async (req, res) => {
//   const userId = req.user.id; // Assuming you have user authentication in place
//   const { amount } = req.body;

//   if (!amount || amount <= 0) {
//     return res.status(400).json({ message: 'Invalid amount' });
//   }

//   try {
//     let wallet = await Wallet.findOne({ userId });
//     if (!wallet) {
//       wallet = new Wallet({ userId, balance: 0 });
//     }

//     wallet.balance += amount;
//     await wallet.save();
//     res.status(200).json({ message: 'Funds added successfully', balance: wallet.balance });
//   } catch (error) {
//     res.status(500).json({ message: 'Error adding funds to wallet' });
//   }
// };


const Wallet = require('../models/Wallet');
const User = require('../models/User'); // Import the User model to verify user registration

// Add balance to the wallet
exports.addBalance = async (req, res) => {
    try {
        const { userName, amount } = req.body;

        // Validate the amount
        if (!amount || isNaN(amount) || amount <= 0) {
            return res.status(400).json({ message: 'Invalid amount. Please provide a valid number greater than 0.' });
        }

        // Verify the username exists in the User model
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(400).json({ message: 'Username not found. Please register first.' });
        }

        // Find or create a wallet for the user
        let wallet = await Wallet.findOne({ userName });
        if (!wallet) {
            wallet = new Wallet({ userName, balance: 0 });
        }

        // Safeguard against invalid balance values
        if (isNaN(wallet.balance)) {
            wallet.balance = 0; // Reset invalid balances to 0
        }

        // Add the specified amount to the wallet balance
        wallet.balance += amount;
        await wallet.save();

        res.status(200).json({
            message: `Balance of ₹${amount} added successfully.`,
            wallet,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// Get wallet balance for a user
exports.getWalletBalance = async (req, res) => {
    try {
        const { userName } = req.params;

        // Verify the username exists in the User model
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(400).json({ message: 'Username not found.' });
        }

        // Retrieve the user's wallet
        const wallet = await Wallet.findOne({ userName });
        if (!wallet) {
            return res.status(404).json({ message: 'Wallet not found for this user.' });
        }

        res.status(200).json({
            message: 'Wallet balance retrieved successfully.',
            balance: wallet.balance,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// Deduct parking fees from the wallet
exports.deductFees = async (userName, vehicleType) => {
    try {
        // Fees based on vehicle type
        const fees = {
            bike: 30,
            car: 40,
            truck: 60,
        };

        const fee = fees[vehicleType.toLowerCase()];
        if (!fee) throw new Error('Invalid vehicle type.');

        // Retrieve the wallet
        const wallet = await Wallet.findOne({ userName });
        if (!wallet) throw new Error('Wallet not found for this user.');

        // Safeguard against invalid balance values
        if (isNaN(wallet.balance)) {
            wallet.balance = 0; // Reset invalid balances to 0
        }

        // Check if the wallet has sufficient balance
        if (wallet.balance < fee) {
            throw new Error('Insufficient balance in wallet.');
        }

        // Deduct the fee
        wallet.balance -= fee;
        await wallet.save();

        return { success: true, message: `${fee} deducted for ${vehicleType}. Remaining balance: ₹${wallet.balance}.` };
    } catch (error) {
        return { success: false, message: error.message };
    }
};
