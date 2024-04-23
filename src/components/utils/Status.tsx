import "../../css/Status.css";

import Button from "./Button";
import Loader from "./Loader";

type ParentProp = {
  message?: string;
  className?: string;
  variant?: string;
  showButton?: boolean;
  buttonText?: string;
  showLoader?: boolean;
  onButtonClick?: () => void;
}

export enum StausVariant {
  ERROR = "Error",
  INFORMATION = "Information"
}

const Status = (prop: ParentProp) => {

  const {
    className, 
    message = StausVariant.INFORMATION, 
    variant = StausVariant.INFORMATION,
    showButton = false,
    showLoader = false,
    onButtonClick,
    buttonText
  } = prop;

  let statusVariant = variant.charAt(0).toUpperCase() + variant.slice(1).toLowerCase();

  if (
    statusVariant !== StausVariant.ERROR && 
    statusVariant !== StausVariant.INFORMATION
  ){
    statusVariant = StausVariant.INFORMATION
  }

  return (
    <div className='status_wrapper'>
      {showButton && !showLoader && <Button value={buttonText} clickHandler = {onButtonClick}/>}
      {!showButton && showLoader && <Loader/>}
      <h4 className={`${statusVariant} ${className}`}>{message}</h4>
    </div>
  )
}

export default Status
