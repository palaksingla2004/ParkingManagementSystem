// // controllers/authController.js
// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// exports.register = async (req, res) => {
//   const { username, email, password } = req.body;

//   // Check if user already exists
//   const existingUser  = await User.findOne({ email });
//   if (existingUser ) {
//     return res.status(400).json({ message: 'User  already exists' });
//   }

//   // Hash password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   // Create new user
//   const newUser  = new User({
//     username,
//     email,
//     password: hashedPassword,
//   });

//   try {
//     await newUser .save();
//     res.status(201).json({ message: 'User  registered successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error registering user' });
//   }
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;

//   // Find user by email
//   const user = await User.findOne({ email });
//   if (!user) {
//     return res.status(400).json({ message: 'User  not found' });
//   }

//   // Validate password
//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     return res.status(400).json({ message: 'Invalid credentials' });
//   }

//   // Generate JWT token
//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//   res.status(200).json({ token });
// };

const User = require('../models/User');
const Wallet = require('../models/Wallet'); // Import the Wallet model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { firstName, lastName, userName, email, password, phone } = req.body;

    if (!firstName || !lastName || !userName || !email || !password || !phone)
        return res.status(400).json({ message: 'Please fill all the details' });

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
        firstName,
        lastName,
        userName,
        email,
        phone,
        password: hashedPassword,
    });

    try {
        // Save the user in the database
        await newUser.save();

        // Create wallet for the new user with an initial balance
        const initialBalance = 0; // Default balance
        const newWallet = new Wallet({
            userId: newUser._id,  // Link wallet to the user
            balance: initialBalance,
            userName, // Ensure the username is associated with the wallet
        });

        // Save the wallet in the database
        await newWallet.save();

        res.status(201).json({
            message: 'User registered successfully, and wallet created.',
            user: {
                id: newUser._id,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                userName: newUser.userName,
                email: newUser.email,
                phone: newUser.phone,
            },
            wallet: {
                balance: newWallet.balance,
            },
        });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password.' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, 'secretkey', { expiresIn: '1h' });

    res.status(200).json({
        message: 'Login successful.',
        token,
    });
};