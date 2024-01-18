import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { setUserCart } from '../redux/cartSlice';

const Profile = () => {
  const { isAuthenticated, user } = useAuth0();
  const [userData, setUserData] = useState(null);
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

          // Set user data (if needed)
          setUserData({
            name: user.name,
            email: user.email,
            picture: user.picture,
          });
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
          <img
            src={userData?.picture}
            alt="Profile"
            style={{ borderRadius: '50%', width: '100px', height: '100px', marginBottom: '20px' }}
          />
          <p style={{ fontSize: '18px', marginBottom: '8px' }}>Name: {userData?.name}</p>
          <p style={{ fontSize: '16px', color: '#555', marginBottom: '20px' }}>Email: {userData?.email}</p>
        </>
      ) : (
        <p style={{ fontSize: '16px', color: '#555' }}>Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;
