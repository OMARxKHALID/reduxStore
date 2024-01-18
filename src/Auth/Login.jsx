import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from 'react-redux';
import { setUserCart } from '../redux/cartSlice';

const Login = () => {
  const { loginWithRedirect, user } = useAuth0();
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(setUserCart({ userId: user.sub, ...cartData }));
    loginWithRedirect();
  };

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  };

  const containerStyle = {
    textAlign: "center",
    marginTop: "50px",
  };

  return (
    <div style={containerStyle}>
      <h2>Login</h2>
      <button style={buttonStyle} onClick={handleLogin}>
        Log In
      </button>
    </div>
  );
};

export default Login;
