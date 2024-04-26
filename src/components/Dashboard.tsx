import "../css/Dashboard.css";
import React from 'react';
import TooltTip from "./utils/TooltTip";

const Dashboard = () => {

  return (
    <div className='organization_dashboard'>
      <h1>Welcome To Dashboard</h1>
      <TooltTip message="Delete asset">
        <p>Check info...</p>
      </TooltTip>
    </div>
  )
}

export default Dashboard
