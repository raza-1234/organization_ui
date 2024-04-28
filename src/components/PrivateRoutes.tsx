import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PrivateRoutes = () => {

  return (
    <div>
      {
        Cookies.get("session_id") ? <Outlet/> : <Navigate to="/"/>
      }
    </div>
  )
}

export default PrivateRoutes
