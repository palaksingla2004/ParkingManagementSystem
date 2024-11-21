const Parking = require('../models/ParkingSpace');

// Register a vehicle and reserve a slot
const registerVehicle = async (req, res) => {
    try {
        const { licensePlate, owner, vehicleType, fuelType } = req.body;

        const parking = await Parking.findOne();
        if (!parking) return res.status(404).json({ message: 'Parking lot not initialized.' });

        // Check for available slots
        const availableSlot = parking.slots.find(slot => slot.status === 'empty');
        if (!availableSlot) {
            return res.status(400).json({ message: 'No empty parking slots available.' });
        }

        // Check if vehicle is already registered
        const existingVehicle = parking.vehicles.find(v => v.licensePlate === licensePlate);
        if (existingVehicle) {
            return res.status(400).json({ message: 'Vehicle already registered.' });
        }

        // Reserve the slot and register the vehicle
        availableSlot.status = 'reserved';
        const newVehicle = {
            licensePlate,
            owner,
            plotNumber: availableSlot.number,
            vehicleType,
            fuelType,
        };
        parking.vehicles.push(newVehicle);

        await parking.save();
        res.status(201).json({
            message: `Vehicle registered and slot ${availableSlot.number} reserved.`,
            vehicle: newVehicle,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// Exit a vehicle and free up its slot
const exitVehicle = async (req, res) => {
    try {
        const { licensePlate } = req.body;

        const parking = await Parking.findOne();
        if (!parking) return res.status(404).json({ message: 'Parking lot not initialized.' });

        // Find the vehicle
        const vehicleIndex = parking.vehicles.findIndex(v => v.licensePlate === licensePlate);
        if (vehicleIndex === -1) {
            return res.status(400).json({ message: 'Vehicle not found in the parking lot.' });
        }

        // Free up the parking slot
        const plotNumber = parking.vehicles[vehicleIndex].plotNumber;
        const slot = parking.slots.find(slot => slot.number === plotNumber);
        if (slot) slot.status = 'empty';

        // Remove the vehicle from the list
        parking.vehicles.splice(vehicleIndex, 1);

        await parking.save();
        res.status(200).json({ message: `Vehicle with license plate ${licensePlate} exited. Slot ${plotNumber} is now empty.` });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

// Get current parking status
const getParkingStatus = async (req, res) => {
    try {
        const parking = await Parking.findOne();
        if (!parking) return res.status(404).json({ message: 'Parking lot not initialized.' });

        res.status(200).json({
            totalSpots: parking.totalSpots,
            availableSpots: parking.slots.filter(slot => slot.status === 'empty').length,
            vehicles: parking.vehicles,
            slots: parking.slots,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
};

module.exports = {
    registerVehicle,
    exitVehicle,
    getParkingStatus,
};