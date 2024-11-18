import React from "react";
import "../styles/ParkingSpace.css";
const ParkingSpace = () => {
    return (
        <div>
            <h1>Parking Space Management</h1>

            <div class="container">
                <div class="parking-type">2 Wheeler Parking</div>
                <div class="parking-slots">
                    <div class="slot available">Available</div>
                    <div class="slot available">Available</div>
                    <div class="slot unavailable">Unavailable</div>
                    <div class="slot available">Available</div>
                    <div class="slot unavailable">Unavailable</div>
                    <div class="slot available">Available</div>
                    <div class="slot available">Available</div>
                    <div class="slot unavailable">Unavailable</div>
                    <div class="slot available">Available</div>
                </div>

                <div class="parking-type">3 Wheeler Parking</div>
                <div class="parking-slots">
                    <div class="slot available">Available</div>
                    <div class="slot unavailable">Unavailable</div>
                    <div class="slot available">Available</div>
                    <div class="slot available">Available</div>
                    <div class="slot unavailable">Unavailable</div>
                </div>

                <div class="parking-type">4 Wheeler Parking</div>
                <div class="parking-slots">
                    <div class="slot available">Available</div>
                    <div class="slot available">Available</div>
                    <div class="slot unavailable">Unavailable</div>
                    <div class="slot available">Available</div>
                    <div class="slot unavailable">Unavailable</div>
                </div>
            </div>
        </div>
    );
};

export default ParkingSpace;