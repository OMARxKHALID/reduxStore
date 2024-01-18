import React from "react";
import { Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = 'dev-2g2mhsi2uuocv10w.us.auth0.com';
  const clientId = 'uVghMHPgozJatkNRlU2s0kPSvDYEK6eu';
  const navigate = useNavigate();

  const onRedirectCallback = (appState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;