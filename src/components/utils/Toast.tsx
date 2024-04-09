import "../../css/Toast.css";
import { useState, useEffect } from 'react';
import { ToastVariant, ToastTimeout } from "../../utils/constants";

type ParentProp = {
  variant?: string;
  message: string;
  timeOut?: number;
  resetToast: () => void
}

const Toast = ({variant = ToastVariant.SUCCESS, message, timeOut, resetToast}: ParentProp) => {  

  const [showToast, setShowToast] = useState(message ? true: false);
  let toastVariant = variant?.toLowerCase();
  
  let defaultTimeout : number = timeOut || ToastTimeout.STANDARD;

  if (toastVariant !== ToastVariant.SUCCESS && toastVariant !== ToastVariant.ERROR){
    toastVariant = ToastVariant.SUCCESS;
  }
  
  if (toastVariant === ToastVariant.SUCCESS){
    defaultTimeout = timeOut || ToastTimeout.SHORT;
  } else if (toastVariant === ToastVariant.ERROR){
    defaultTimeout = timeOut || ToastTimeout.LONG;
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowToast(false);
      resetToast()
    }, timeOut || ToastTimeout.STANDARD);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
    {
      showToast && message && 
      <div className={`toast-wrapper ${toastVariant}`}>
        <p>{message}</p>
      </div>
    }
    </>
  )
}


export default Toast;
