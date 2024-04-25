import "../../css/Tooltip.css";

import React, { useState } from 'react';
import { Tooltip as ToolTip, TooltipPosition } from "../../utils/constants";

type TooltipProps = {
  message?: string,
  className?: string,
  position?: string,
  children: JSX.Element
}

const Tooltip = (prop: TooltipProps) => {

  const { message, className, position, children } = prop;
  let shapePosition = position?.toLowerCase();

  if (shapePosition !== TooltipPosition.TOP && shapePosition !== TooltipPosition.Bottom){
    shapePosition = TooltipPosition.Bottom
  }

  return (
    <div className="tooltip_container">
      <div className="children">
        {children}
      </div>
      <div className="tooltip_wrapper">
        <div className={`tooltip_content ${className}`}>
          <p>
            {message || ToolTip}
          </p>
        </div>
        <div className={`shape ${shapePosition}`}/>
      </div>
    </div>

  )
}

export default Tooltip;

