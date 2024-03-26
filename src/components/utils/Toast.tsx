import "../../css/Toast.css";
import React, { useState, useEffect } from 'react';

const toastTimeouttt = 5000;
const errorTimeout = 6000;
// enum Variant {
//   success: 'sucess', 
//   error: error
// }
// const toastVariant = 

type ParentProp = {
  variant: String
  message: string
  timeOut: number
}

const Toast = ({variant, message, timeOut}: ParentProp) => {  
  const [showToast, setShowToast] = useState(true);
  const toastVariant = variant.toLowerCase();  
  // let toastTimeout; 
  // if(variant == enum) {
  //   toastTimeout = toastTimeouttt
  // } else if {

  // }
  useEffect(() => {
    setTimeout(() => {
      setShowToast(false);
    },timeOut);
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

const toastMessage = (variant: string, message: string, timeOut: number) => {  // remove
  return (
    <Toast
      variant = {variant}
      message = {message}
      timeOut = {timeOut}
    />
  )
}

export default toastMessage;
