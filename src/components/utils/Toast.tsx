import "../../css/Toast.css";
import { useState, useEffect } from 'react';
import { ToastVariant, ToastTimeout } from "../../utils/constants";

type ParentProp = {
  variant?: string
  message: string
  timeOut?: number
}

const Toast = ({variant = ToastVariant.SUCCESS, message, timeOut}: ParentProp) => {  
    
  const [showToast, setShowToast] = useState(true);
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
    setTimeout(() => {
      setShowToast(false);
    }, defaultTimeout);
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
