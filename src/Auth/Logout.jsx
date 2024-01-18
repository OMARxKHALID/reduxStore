import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { removeAll } from '../redux/cartSlice';

const Logout = () => {
  const { logout } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleLogout = async () => {
      dispatch(removeAll()); 
      await logout({ returnTo: window.location.origin });
    };

    handleLogout();
  }, [logout, dispatch]);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
