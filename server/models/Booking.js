// models/Booking.js
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  guests: { type: Number, required: true },
});

module.exports = mongoose.model('Booking', BookingSchema);