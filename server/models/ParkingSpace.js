const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    licensePlate: { 
        type: String, 
        required: true, 
        unique: true 
    },
    owner: { 
        type: String, 
        required: true 
    },
    plotNumber: { 
        type: Number, 
        required: true 
    },
    vehicleType: { 
        type: String, 
        enum: ['Car', 'Bike', 'Truck','car','bike','truck'], 
        required: true 
    },
    fuelType: { 
        type: String, 
        enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid', 'petrol', 'diesel', 'electric', 'hybrid'], 
        required: true 
    },
});

const parkingSchema = new mongoose.Schema({
    totalSpots: { type: Number, default: 10 },
    slots: [
        {
            number: { type: Number, required: true },
            status: { type: String, enum: ['empty', 'reserved'], default: 'empty' },
        },
    ],
    vehicles: [vehicleSchema],
});

const Parking = mongoose.model('Parking', parkingSchema);

module.exports = Parking;