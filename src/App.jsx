import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Cart from './components/Cart';
import Header from './components/Navbar';
import Home from './components/home';

const App = () => {
  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Header />

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
