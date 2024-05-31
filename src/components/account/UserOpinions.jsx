import React, { useEffect, useState } from 'react';

const UserOpinions = () => {
  const [opinions, setOpinions] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Pobierz zalogowanego użytkownika z localStorage
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    if (user) {
      setLoggedInUser(user);
    }

    // Pobierz oceny z localStorage
    const storedRatings = JSON.parse(localStorage.getItem('ratings')) || [];

    // Filtruj oceny, aby wyświetlić tylko te dodane przez zalogowanego użytkownika
    if (user) {
      const userOpinions = storedRatings.filter(rating => rating.user === user.name);
      setOpinions(userOpinions);
    }
  }, []);

  return (
    <div>
      <h2>My Opinions</h2>
      {opinions.length > 0 ? (
        opinions.map((opinion, index) => (
          <div key={index}>
            <p>Restaurant: {opinion.restaurantName}</p>
            <p>Food: {opinion.food}</p>
            <p>Service: {opinion.service}</p>
            <p>Atmosphere: {opinion.atmosphere}</p>
            <p>Average: {((opinion.food + opinion.service + opinion.atmosphere) / 3).toFixed(2)}</p>
            <p>Opinion: {opinion.opinion}</p>
          </div>
        ))
      ) : (
        <p>You have not added any opinions yet.</p>
      )}
    </div>
  );
};

export default UserOpinions;
