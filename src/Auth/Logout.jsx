import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const Logout = () => {
  const { logout } = useAuth0();

  useEffect(() => {
    const handleLogout = async () => {
      await logout({ returnTo: window.location.origin });
    };

    handleLogout();
  }, [logout]);

  return (
    <div>
      <p>Logging out...</p>
    </div>
  );
};

export default Logout;
