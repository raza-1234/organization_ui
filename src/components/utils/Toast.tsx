import "../../css/Toast.css";
import React, { useState, useEffect } from 'react';

const successTimeout = 4000;
const errorTimeout = 6000;

enum Variant {
  success = 'success',
  error =  'error'
}

type ParentProp = {
  variant?: string
  message?: string
  timeOut?: number
}

const Toast = ({variant = Variant.success, message = variant, timeOut}: ParentProp) => {  
    
  const [showToast, setShowToast] = useState(true);
  let toastVariant = variant?.toLowerCase();
  
  let toastTimeout: number;
  if (toastVariant !== Variant.success && toastVariant !== Variant.error){
    toastVariant = Variant.success;
  }
  if (toastVariant === Variant.success){
    toastTimeout = timeOut || successTimeout;
  } else if (toastVariant === Variant.error){
    toastTimeout = timeOut || errorTimeout;
  }

  useEffect(() => {
    setTimeout(() => {
      setShowToast(false);
    }, toastTimeout);
  }, []);
  
  return (
    <>
    {
      showToast &&
      <div className={`toast-wrapper ${toastVariant}`}>
        <p>{message}</p>
      </div>
    }
    </>
  )
}


export default Toast;
