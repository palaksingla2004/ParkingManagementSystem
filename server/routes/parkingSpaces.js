const express = require('express');
const { registerVehicle, exitVehicle, getParkingStatus } = require('../controllers/parkingController');

const router = express.Router();

// Register a vehicle
router.post('/register', registerVehicle);

// Exit a vehicle
router.post('/exit', exitVehicle);

// Get parking status
router.get('/status', getParkingStatus);

module.exports = router;