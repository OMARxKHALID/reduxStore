import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { setUserCart } from '../redux/cartSlice';

const Profile = () => {
  const { isAuthenticated, user } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuthenticated) {
          // Get the user's Auth0 sub (subject) identifier
          const userSub = user.sub;

          // Fetch user-specific cart data from the server
          const response = await fetch(`/api/cart/${userSub}`);
          const userCartData = await response.json();

          // Dispatch setUserCart to update the Redux store with the user-specific cart data
          dispatch(setUserCart(userCartData));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [isAuthenticated, user, dispatch]);

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      {isAuthenticated ? (
        <>
          <h1 style={{ color: '#333', marginBottom: '10px' }}>Profile Information</h1>
          <p style={{ fontSize: '16px', marginBottom: '20px' }}>Email: {user?.email}</p>
        </>
      ) : (
        <p style={{ fontSize: '16px', color: '#555' }}>Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;
