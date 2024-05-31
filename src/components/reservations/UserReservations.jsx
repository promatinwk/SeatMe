import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
const UserReservations = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    // Pobieramy zalogowanego użytkownika z local storage
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // Sprawdzamy czy użytkownik jest zalogowany i czy ma rezerwacje
    if (loggedInUser && loggedInUser.reservations) {
      setReservations(loggedInUser.reservations);
    }
  }, []);

  return (
    <div className="reservations">
      <h2>My Reservations</h2>
      {reservations.length > 0 ? (
        <ul>
          {reservations.map((reservation, index) => (
            <li key={index}>
              <p>Restaurant: {reservation.restaurantName}</p>
              <p>Date: {reservation.date}</p>
              <p>Time: {reservation.time}</p>
              <p>Number of Guests: {reservation.guests}</p>
              {/* Dodaj pozostałe informacje o rezerwacji */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No reservations yet.</p>
      )}
    </div>
  );
};

export default UserReservations;
