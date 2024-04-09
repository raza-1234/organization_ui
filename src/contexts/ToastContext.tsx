import React, { createContext, useState, useContext } from 'react';

import { Children, toastInfo, ToastContextType } from '../types/types';
import Toast from '../components/utils/Toast';

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({children}: Children) => {

  const [toastInfo, setToastInfo] = useState<toastInfo>({
    variant: "",
    message: "",
    timeOut: 0
  });

  const resetToastInfo = () => {
    setToastInfo({
      variant: "",
      message: "",
      timeOut: 0
    })
  }

  const toastHandler = (message: string, variant: string , timeOut?: number) => {
    setToastInfo({
      variant: variant,
      message: message,
      timeOut: timeOut
    })
  }

  return (
    <ToastContext.Provider value={{toastHandler}}>
      {
        toastInfo.message && 
        <Toast resetToast={resetToastInfo} {...toastInfo}/>
      }
      {children}
    </ToastContext.Provider>
  )
}

const useToastContext = () => { 
  const context = useContext(ToastContext);
  
  if (!context){
    throw new Error("Context not setup properly.")
  }
  return context;
}

export default useToastContext;