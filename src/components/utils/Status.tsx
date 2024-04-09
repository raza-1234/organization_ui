import "../../css/Status.css";

import React from 'react'

type ParentProp = {
  message?: string;
  className?: string;
  variant?: string;
}

export enum StausVariant {
  ERROR = "Error",
  INFORMATION = "Information"
}

const Status = ({message = StausVariant.INFORMATION, className, variant = StausVariant.INFORMATION}: ParentProp) => {
  let statusVariant = variant.charAt(0).toUpperCase() + variant.slice(1).toLowerCase();

  if (
    statusVariant !== StausVariant.ERROR && 
    statusVariant !== StausVariant.INFORMATION
  ){
    statusVariant = StausVariant.INFORMATION
  }

  return (
    <div className='status_wrapper'>
      <h4 className={`${statusVariant} ${className}`}>{message}</h4>
    </div>
  )
}

export default Status
