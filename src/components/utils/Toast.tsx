import "../../css/Toast.css";
import { useState, useEffect, Fragment } from 'react';
import { ToastVariant, ToastTimeout } from "../../utils/constants";

type ParentProp = {
  variant?: string;
  message: string;
  timeOut?: number;
  resetToastInfo: () => void
}

const Toast = ({variant = ToastVariant.SUCCESS, message, timeOut, resetToastInfo}: ParentProp) => {  

  const [showToast, setShowToast] = useState(!!message);
  let toastVariant = variant?.toLowerCase();
  
  let defaultTimeout: number = timeOut || ToastTimeout.STANDARD;

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
      resetToastInfo()
    }, timeOut || ToastTimeout.STANDARD);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <Fragment>
    {
      showToast && message && 
      <div className={`toast-wrapper ${toastVariant}`}>
        <p>{message}</p>
      </div>
    }
    </Fragment>
  )
}


export default Toast;
