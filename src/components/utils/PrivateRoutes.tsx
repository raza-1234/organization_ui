import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import UseAuthData from '../../contexts/authContext';
import Cookies from 'js-cookie';

const PrivateRoutes = () => {

  const { userInfo } = UseAuthData();
  const location = useLocation();
  const cookie = Cookies.get("session_id");

  return (
    <div>
      {
        cookie ? <Outlet/> : <Navigate to="/" state = {{from: location}} replace/>
      }
    </div>
  )
}

export default PrivateRoutes
