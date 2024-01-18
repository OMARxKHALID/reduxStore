import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth0ProviderWithHistory from './Auth/Auth0ProviderWithHistory';
import Home from './components/Home.jsx';
import Cart from './components/Cart.jsx';
import Checkout from './components/Checkout.jsx';
import Header from './components/Navbar.jsx';
import Profile from './Auth/Profile.jsx';
import Login from './Auth/Login.jsx'; 
import Logout from './Auth/Logout.jsx';

const App = () => {
  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Auth0ProviderWithHistory>
        <Header />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />  {/* Corrected route */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </Auth0ProviderWithHistory>
    </div>
  );
};

export default App;
