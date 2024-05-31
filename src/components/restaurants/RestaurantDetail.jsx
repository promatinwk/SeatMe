import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRestaurants } from '../../context/RestaurantContext';
import ReservationForm from '../reservations/ReservationForm'; // Importujemy komponent ReservationForm
import RatingForm from '../common/RatingForm';
import RatingStartImage from '../../assets/RateMe.png';
import "../../styles/restaurantDetail.css";

const RestaurantDetail = () => {
  const { id } = useParams();
  const { restaurants } = useRestaurants();
  const [restaurant, setRestaurant] = useState(null);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [reservation, setReservation] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [comments, setComments] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  
 
  useEffect(() => {
    // Pobierz oceny z localStorage po załadowaniu komponentu
    const storedRatings = JSON.parse(localStorage.getItem('ratings')) || [];
    setRatings(storedRatings);

    // Pobierz zalogowanego użytkownika z localStorage
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (user) {
      setLoggedInUser(user);
    }
  }, []);

const handleReservationSave = (reservationData) => {
  // Zapisujemy rezerwację w localStorage
  const existingReservations = JSON.parse(localStorage.getItem('reservations')) || [];
  const updatedReservations = [...existingReservations, reservationData];
  localStorage.setItem('reservations', JSON.stringify(updatedReservations));

  // Dodajemy zapisaną rezerwację do stanu, aby wyświetlić ją użytkownikowi
  setReservation(reservationData);

  // Zamykamy formularz po zapisie rezerwacji
  setIsReservationOpen(false);
};

const handleReservationCancel = () => {
    // Anulowanie rezerwacji
    setIsReservationOpen(false);
  };
  

  
  const handleRatingSave = (ratingData) => {
    console.log('Zapisano ocenę:', ratingData);

    const existingRatings = JSON.parse(localStorage.getItem('ratings')) || [];
    const updatedRatings = [...existingRatings, ratingData];
    localStorage.setItem('ratings', JSON.stringify(updatedRatings));
    setRatings(updatedRatings);
    setIsRatingOpen(false);
  };

  const handleRatingCancel = () => {
    setIsRatingOpen(false);
  };

  const averageRating = () => {
    if (ratings.length === 0) return 0;
    const total = ratings.reduce((acc, curr) => acc + curr.food + curr.service + curr.atmosphere, 0);
    return total / (ratings.length * 3);
  };

  const handleCommentChange = (e) => {
    setComments(e.target.value);
  };

  const handleSubmitComment = () => {
    // Obsługa wysłania komentarza - możesz dodać tutaj logikę wysyłania komentarza
    console.log('Submitted comment:', comments);
  };

  useEffect(() => {
    // Znajdź odpowiednią restaurację na podstawie ID
    const fetchedRestaurant = restaurants.find(r => r.id === parseInt(id));
    setRestaurant(fetchedRestaurant);
  }, [id, restaurants]);

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <div id='restaurant-detail'> 
      <h2 className={!isReservationOpen ? '' : 'hidden'}>{restaurant.name}</h2>
      <p className={!isReservationOpen ? '' : 'hidden'}>{restaurant.description}</p>
      <button className={!isReservationOpen ? '' : 'hidden'} onClick={() => setIsReservationOpen(true)}>Rezerwuj</button>
      {isReservationOpen && (
      <div>
          {/* Wyświetlanie formularza rezerwacji */}
          <ReservationForm restaurantName={restaurant.name} onSave={handleReservationSave} onCancel={handleReservationCancel} />
      </div>
      )}
      {reservation && (
        <div>
          {/* Wyświetlanie potwierdzenia rezerwacji */}
          <h3>Potwierdzenie Rezerwacji</h3>
          <p>Data: {reservation.date}</p>
          <p>Godzina: {reservation.time}</p>
          <p>Liczba Gości: {reservation.guests}</p>
          <p>Zwierzęta: {reservation.isAnimal ? 'Tak' : 'Nie'}</p>
          <p>Krzesełko Dla Dziecka: {reservation.hasBabySeat ? 'Tak' : 'Nie'}</p>
          <p>Dodatkowe Informacje: {reservation.additionalInfo}</p>
        </div>
      )}
      <div id="rate-me-btn-div" className={!isReservationOpen ? '' : 'hidden'}>
      <button className='rate-me' onClick={() => setIsRatingOpen(true)}>RateMe</button>
      {isRatingOpen && (
        <RatingForm
          onSave={handleRatingSave}
          onCancel={handleRatingCancel}
          loggedInUser={loggedInUser}
          restaurantId={restaurant.id}
          restaurantName={restaurant.name}
        />
      )}
    <img className='rate-me-stars-img' src={RatingStartImage} alt=""/>
    </div>
      <div id='restaurant-opinions' className={!isReservationOpen ? '' : 'hidden'}>
        {ratings.filter(rating => rating.restaurantId === restaurant.id).map((rating, index) => (
          <div key={index} class='single-opinion'>
            <p>{rating.user}</p>
            <div className='thisOpinion-ratings'>
              <p>Food: {rating.food}</p>
              <p>Service: {rating.service}</p>
              <p>Atmosphere: {rating.atmosphere}</p>
            </div>
            <p>Opinion: {rating.opinion}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantDetail;
