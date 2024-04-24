import "../../css/Tooltip.css";

import React from 'react';
import { Tooltip as ToolTip, TooltipPosition } from "../../utils/constants";

type ParentProp = {
  message?: string,
  className?: string,
  position?: string
}

const Tooltip = (prop: ParentProp) => {
  
  const { message, className, position } = prop;
  let shapePosition = position?.toLowerCase();

  if (shapePosition !== TooltipPosition.TOP && shapePosition !== TooltipPosition.Bottom){
    shapePosition = TooltipPosition.Bottom
  }

  return (
    <div className="tooltip_wrapper">
      <div className={`tooltip_content ${className}`}>
        <p>
          {message || ToolTip}
        </p>
      </div>
      <div className={`shape ${shapePosition}`}/>
    </div>
  )
}

export default Tooltip
