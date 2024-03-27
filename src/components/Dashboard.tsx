import "../css/Dashboard.css";
import React, { useEffect } from 'react';
import Toast from "./utils/Toast";
import useDashboardContext from "../contexts/DashboardContext";

const Dashboard = () => {

  const { isLoginToast, setIsLoginToast } = useDashboardContext();

  useEffect(() => {
    setTimeout(() => {
      setIsLoginToast(false);
    }, 4000)
  }, [])

  return (
    <div className='organization_dashboard'>
      <h1>Welcome To Dashboard</h1>
      {
        isLoginToast && 
        <Toast
          message="Successfully Login"
        />
      }
    </div>
  )
}

export default Dashboard
