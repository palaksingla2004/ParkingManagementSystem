// // server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// require('dotenv').config();
// const walletRoutes = require('./routes/wallet');
// const parkingSpacesRoutes = require('./routes/parkingSpaces');
 

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Database connection
// mongoose.connect("mongodb://localhost:27017/parkingmanagement")
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));
// // Routes
// const authRoutes = require('./routes/auth');
// const bookingRoutes = require('./routes/booking');

// app.use('/api/auth', authRoutes);
// app.use('/api/booking', bookingRoutes);


// app.use('/api/wallet', walletRoutes);

// app.use('/api/parkingSpaces', parkingSpacesRoutes);



// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

// Mongoose Connection
const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(
            'Database Connected: ',
            connect.connection.host,
            connect.connection.name
        );
    } catch (err) {
        console.error('Database connection error:', err.message);
        process.exit(1); // Exit the process with failure
    }
};

// Parking Model
const Parking = require('./models/ParkingSpace');

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to Database and Initialize Parking Lot
connectDb().then(async () => {
    try {
        // Initialize Parking Lot if not exists
        const existingParking = await Parking.findOne();
        if (!existingParking) {
            const slots = Array.from({ length: 10 }, (_, i) => ({
                number: i + 1,
                status: 'empty',
            }));

            const newParkingLot = new Parking({
                totalSpots: 10,
                slots: slots,
                vehicles: [],
            });

            await newParkingLot.save();
            console.log('Parking lot initialized with 10 slots.');
        } else {
            console.log('Parking lot already exists.');
        }
    } catch (err) {
        console.error('Error initializing parking lot:', err.message);
    }
});

// Import Routes
const authRoutes = require('./routes/auth');
const parkingRouter = require('./routes/parkingSpaces');
const walletRoutes = require('./routes/wallet');
// Routes
app.use('/api/user', authRoutes);
app.use('/api/parking', parkingRouter);
// Use wallet routes
app.use('/api/wallet', walletRoutes);

// Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});