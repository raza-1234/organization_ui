import "../../css/Status.css";

import React from 'react'

type ParentProp = {
  message?: string;
  className?: string;
  variant?: string;
}

export enum StausVariant {
  ERROR = "error",
  INFORMATION = "information"
}

const Status = ({message = StausVariant.INFORMATION, className, variant = StausVariant.INFORMATION}: ParentProp) => {
  let statusVariant = variant.toLowerCase();

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
