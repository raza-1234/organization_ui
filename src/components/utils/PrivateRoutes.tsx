import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import UseAuthData from '../../contexts/authContext';

const PrivateRoutes = () => {

  const { userInfo } = UseAuthData();

  return (
    <div>
      {
        userInfo?.email ? <Outlet/> : <Navigate to="/"/>
      }
    </div>
  )
}

export default PrivateRoutes
