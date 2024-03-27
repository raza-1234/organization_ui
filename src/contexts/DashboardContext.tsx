import React, { createContext, useState, useContext } from 'react';
import { Children } from '../types/types';

const DashboardContext = createContext<any>(undefined);

export const DashboardProvider = ({children}: Children) => {

  const [isLoginToast, setIsLoginToast] = useState(false);

  return (
    <DashboardContext.Provider value={{isLoginToast, setIsLoginToast}}>
      {children}
    </DashboardContext.Provider>
  )
}

const useDashboardContext = () => { 
  const context = useContext(DashboardContext);
  
  if (!context){
    throw new Error("Context not setup properly.")
  }
  return context;
}

export default useDashboardContext;