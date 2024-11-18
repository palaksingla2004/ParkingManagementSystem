import React, { useState } from 'react';
import "../styles/Booking.css";

const Booking = () => {
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    guests: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData({ ...bookingData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle booking logic
    console.log(bookingData);
  };

  return (
    <div className="booking">
      <h2>Book Your Slot</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input type="date" name="date" value={bookingData.date} onChange={handleChange} required />
        </label>
        <label>
          Time:
          <input type="time" name="time" value={bookingData.time} onChange={handleChange} required />
        </label>
        <label>
          Number of Guests:
          <input type="number" name="guests" value={bookingData.guests} onChange={handleChange} required />
        </label>
        <button type="submit">Book Now</button>
      </form>
    </div>
  );
};

export default Booking;