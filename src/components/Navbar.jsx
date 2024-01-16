import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { FiHome, FiShoppingCart } from 'react-icons/fi';

const Header = () => {
  const items = useSelector((state) => state.cart);

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <div className="container">
        <Navbar.Brand as={Link} to="/">
          <FiHome size={35} style={{ color: '#fff' }} />
        </Navbar.Brand>
        <Nav className="mx-auto">
          <Navbar.Brand className="text-center" as={Link} to="/" style={{ color: '#fff', fontSize: '3rem', fontWeight: 'bold' }}>
            React eSTORE  
          </Navbar.Brand>
        </Nav>
        <Nav className="ml-auto align-items-center">
          <Nav.Link as={Link} to="/cart" className="position-relative" style={{ color: '#fff' }}>
            <FiShoppingCart size={35} />
            {items.length > 0 && (
              <span className="badge badge-danger ml-1 cart-badge" style={{ fontSize: '1.2rem', color: '#fff', borderRadius: '50%', padding: '0.3rem 0.6rem' }}>{items.length}</span>
            )}
          </Nav.Link>
        </Nav>
      </div>
    </Navbar>
  );
};

export default Header;
