import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#3498db", // Blue color, you can change this
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
      <button style={buttonStyle} onClick={() => loginWithRedirect()}>
        Log In
      </button>
    </div>
  );
};

export default Login;
