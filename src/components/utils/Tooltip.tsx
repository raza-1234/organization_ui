import "../../css/Tooltip.css";

import React from 'react';

type ParentProp = {
  message?: string,
  className?: string
}

const Tooltip = (prop: ParentProp) => {
  console.log(">>>>>????? tooltip workinggg");
  
  const { message, className } = prop;

  return (
    <div className="tooltip_wrapper">
      <div className={`tooltip_content ${className}`}>
        <p>
          {message || "Tooltip"}
        </p>
      </div>
      <div className='shape'/>
    </div>
  )
}

export default Tooltip
