import React, { useState } from 'react';
import "../../styles/reservationForm.css";

const ReservationForm = ({ restaurantName, onSave, onCancel }) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState(1);
  const [isAnimal, setIsAnimal] = useState(false);
  const [hasBabySeat, setHasBabySeat] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState('');

  const handleSave = () => {
    // Sprawdzanie czy dane są poprawne
    if (!date || !time) {
      alert('Proszę wybrać datę i godzinę rezerwacji.');
      return;
    }

     const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));


    if (!loggedInUser) {
    alert('Aby dokonać rezerwacji, musisz być zalogowany.');
    return;
  }
    // Zapis rezerwacji
    const reservation = {
      restaurantName,
      date,
      time,
      guests,
      isAnimal,
      hasBabySeat,
      additionalInfo,
    };


  // Pobieramy istniejące rezerwacje z local storage
  const existingReservations = JSON.parse(localStorage.getItem('reservations')) || [];

  // Dodajemy rezerwację do tablicy rezerwacji w obiekcie użytkownika
  loggedInUser.reservations = [...existingReservations, reservation];

  // Zapisujemy zaktualizowanego użytkownika w local storage
 localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

    onSave(reservation);
  };

  return (
    <div className='reservation-form-div'>
      <h3 className='reservation-header'>Reservation</h3>
      <fieldset>
        <legend>Date:</legend>
        <input className='date-input' type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </fieldset>
  
      <label>
        <input className='reservation-time' type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      </label>
      <label>
        Guests:<span className='guests-counter'>{guests}</span>
        <p><input className='guestsRange' type="range" value={guests} min={1} max={8} onChange={(e) => setGuests(parseInt(e.target.value))} /></p>
      </label>
  
      <label className="switch">
      <span>Animal:</span>
      <input type="checkbox" checked={isAnimal} onChange={(e) => setIsAnimal(e.target.checked)} />
      <span className="slider"></span>
      <span className="tick">&#10004;</span>
      <span className="cross">&#10008;</span>
      </label>
      <label className="switch">
        Baby Seat:
        <input type="checkbox" checked={hasBabySeat} onChange={(e) => setHasBabySeat(e.target.checked)} />
        <span className="slider"></span>
        <span className="tick">&#10004;</span>
        <span className="cross">&#10008;</span>
      </label>
      <label>
        <textarea className='additional-info-area'value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} placeholder='Allergens and notes' />
      </label>
      <div className='button-div'>
      <button className='save-btn reservation-btn' onClick={handleSave}>Save</button>
      <button className='cancel-btn reservation-btn'onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default ReservationForm;
