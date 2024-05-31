import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useRestaurants } from '../../context/RestaurantContext';
import "../../styles/restaurantsList.css";

const RestaurantList = () => {
  const { restaurants } = useRestaurants();
    // więcej restauracji...


  return (
    <div className='restaurant-list'>
      <ul>
        {restaurants.map((restaurant) => (
          <li key={restaurant.id}>
            <Link to={`/restaurant/${restaurant.id}`}>
              <img src={restaurant.img}/>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantList;
