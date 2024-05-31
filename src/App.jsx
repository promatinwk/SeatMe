import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import RestaurantList from './components/restaurants/RestaurantList';
import RestaurantDetail from './components/restaurants/RestaurantDetail';
import ReservationList from './components/reservations/ReservationList';
import UserReservations from './components/reservations/UserReservations';
import UserOpinions from './components/account/UserOpinions'; // Importujemy UserOpinions
import Account from './components/account/Account';
import Navbar from './components/layouts/Navbar';
import ProtectedRoute from './components/common/ProtectedRoute';
import { RestaurantProvider } from './context/RestaurantContext';
//import "./styles.css"



function App(){
  return (
     <RestaurantProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/restaurants" element={<RestaurantList />} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        <Route path="/reservations" element={<ProtectedRoute element={<ReservationList />} />} />
        <Route path="/UserReservations" element={<UserReservations />}/>
        <Route path="/account" element={<ProtectedRoute component={Account} />} />
        <Route path="/UserOpinions" element={<UserOpinions />}/>
        {/*<ProtectedRoute path="/messages" component={Messages} />
        <ProtectedRoute path="/favorites" component={Favorites} />
  <ProtectedRoute path="/opinions" component={Opinions} />*/}
      </Routes>
      </Router>
      </RestaurantProvider>
  )
}


export default App;
