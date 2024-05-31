import React, { useState, useEffect} from 'react';
import "../../styles/ratingForm.css";

const RatingForm = ({ onSave, onCancel,restaurantId, restaurantName }) => {
  const [food, setFood] = useState(0);
  const [service, setService] = useState(0);
  const [atmosphere, setAtmosphere] = useState(0);
  const [opinion, setOpinion] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
 
  useEffect(() => {
    // Pobierz zalogowanego użytkownika z localStorage
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (user) {
      setLoggedInUser(user);
    }
  }, []);
  const handleSave = () => {
    // Sprawdzanie czy dane są poprawne
    if (food < 0 || food > 5 || service < 0 || service > 5 || atmosphere < 0 || atmosphere > 5) {
      alert('Oceny muszą być w zakresie od 0 do 5.');
      return;
    }

    // Zapis oceny
    const ratingData = {
      user: loggedInUser.name,
      restaurantId,
      restaurantName,
      food,
      service,
      atmosphere,
      opinion,
    };

    onSave(ratingData);
  };

  return (
    <div className='rating-form'>
      <h3>Rate restaurant</h3>
      <label>
        Food:
        <input className='rating-number' type="number" value={food} min={0} max={5} onChange={(e) => setFood(parseInt(e.target.value))} />
      </label>
      <label>
        Service:
        <input className='rating-number' type="number" value={service} min={0} max={5} onChange={(e) => setService(parseInt(e.target.value))} />
      </label>
      <label>
        Atmosphere:
        <input  className='rating-number' type="number" value={atmosphere} min={0} max={5} onChange={(e) => setAtmosphere(parseInt(e.target.value))} />
      </label>
      <label>
        Opinion:
        <textarea className='rating-opinion'value={opinion} onChange={(e) => setOpinion(e.target.value)} />
      </label>
      <button onClick={handleSave}>Zapisz</button>
      <button onClick={onCancel}>Anuluj</button>
    </div>
  );
};

export default RatingForm;
