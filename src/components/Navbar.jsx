import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { FiHome, FiShoppingCart, FiLogIn, FiLogOut, FiUser } from 'react-icons/fi';
import { useAuth0 } from '@auth0/auth0-react';

const Header = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const items = useSelector((state) => state.cart);

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <div className="container d-flex align-items-center">
        <Navbar.Brand as={Link} to="/">
          <FiHome size={25} style={{ color: '#fff' }} />
        </Navbar.Brand>
        <Nav className="mx-auto">
          <Navbar.Brand className="text-center" as={Link} to="/" style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 'bold' }}>
            REACT eSTORE  
          </Navbar.Brand>
        </Nav>
        <Nav className="ml-auto">
          <div className="d-flex align-items-center">
            {isAuthenticated ? (
              <>
                <Nav.Link as={Link} to="/profile" style={{ color: '#fff', marginRight: '8px' }}>
                  <FiUser size={25} />
                </Nav.Link>
                <Nav.Link onClick={() => logout()} style={{ color: '#fff', marginRight: '8px', cursor: 'pointer' }}>
                  <FiLogOut size={25} />
                </Nav.Link>
              </>
            ) : (
              <Nav.Link onClick={() => loginWithRedirect()} style={{ color: '#fff', marginRight: '8px', cursor: 'pointer' }}>
                <FiLogIn size={25} />
              </Nav.Link>
            )}
            <Nav.Link as={Link} to="/cart" className="position-relative" style={{ color: '#fff' }}>
              <FiShoppingCart size={25} />
              {items.length > 0 && (
                <span className="badge badge-danger ml-1 cart-badge" style={{ fontSize: '1rem', color: '#fff', borderRadius: '50%', padding: '0.3rem 0.6rem' }}>{items.length}</span>
              )}
            </Nav.Link>
          </div>
        </Nav>
      </div>
    </Navbar>
  );
};

export default Header;
