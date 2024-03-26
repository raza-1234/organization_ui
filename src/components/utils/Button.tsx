import React from 'react';
import "../../css/Button.css";

type ParentProp = {
  value: string;
  clickHandler?: () => void;
  className?: string;
}

const Button = ({value, clickHandler, className}: ParentProp) => {  
  return (
    <div>
      <button
        className={`custom-button ${className}`}
        onClick={clickHandler}
      >
        {value}
      </button>
    </div>
  )
}

export default Button

