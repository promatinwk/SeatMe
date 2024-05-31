import React, { createContext, useContext, useState } from 'react';
import MUBarImage from '../assets/MUbar.png';
import HOWHOWTHAIImage from '../assets/HOWHOWTHAI.png';

// Tworzymy kontekst
const RestaurantContext = createContext();

// Hook do używania kontekstu
export const useRestaurants = () => useContext(RestaurantContext);

// Provider kontekstu
export const RestaurantProvider = ({ children }) => {
  const [restaurants] = useState([
    { id: 1, name: 'MU.BAR', description: 'Lorem ipsum 1', img: MUBarImage },
    { id: 2, name: 'How (How) Thai', description: 'How (How) Thai is a delightful restaurant that has been serving authentic Thai cuisine since its establishment.', img: HOWHOWTHAIImage },
    // Dodaj więcej restauracji zgodnie z potrzebami
  ]);

  return (
    <RestaurantContext.Provider value={{ restaurants }}>
      {children}
    </RestaurantContext.Provider>
  );
};
