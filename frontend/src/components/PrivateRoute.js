import React from 'react';
import { Navigate, Route } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('loggedInUser');

  return token ? <Component {...rest} /> : <Navigate to="/" />;
};

export default PrivateRoute;
