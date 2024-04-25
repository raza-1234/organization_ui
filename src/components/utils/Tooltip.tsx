import "../../css/Tooltip.css";

import React from 'react';
import { Tooltip as ToolTip, TooltipPosition, ShapePosition } from "../../utils/constants";

type TooltipProps = {
  message?: string,
  className?: string,
  position?: string,
  children: JSX.Element
}

const Tooltip = (prop: TooltipProps) => {

  const { message, className, position, children } = prop;
  let tooltipPosition = position?.toLowerCase();
  let shapePosition;

  if (tooltipPosition !== TooltipPosition.TOP && tooltipPosition !== TooltipPosition.BOTTOM){
    tooltipPosition = TooltipPosition.TOP
  }

  if (tooltipPosition === TooltipPosition.TOP){
    shapePosition = ShapePosition.BOTTOM
  }

  if (tooltipPosition === TooltipPosition.BOTTOM){
    shapePosition = ShapePosition.TOP
  }

  return (
    <div className="tooltip_container">
      <div className="children">
        {children}
      </div>
      <div className={`tooltip_wrapper ${tooltipPosition}`}>
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

