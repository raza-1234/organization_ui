import React, { createContext, useState, useContext } from 'react';

import { Children } from '../types/types';
import Tooltip from '../components/utils/Tooltip';

const TooltipContext = createContext<any>(undefined);

export const TooltipProvider = ({children}: Children) => {

  const [tooltipInfo, setTooltipInfo] = useState<any>({
    message: "",
    position: "" ,
    className: ""
  });

  const resetTooltipInfo = () => {
    setTooltipInfo({
      message: "",
      position: "",
      className: ""
    })
  }

  const tooltipHandler = (message: string, position: string , className: string) => {
    console.log(">>>>checkinggg");
    
    setTooltipInfo({
      message: message,
      position: position,
      className: className
    })
  }

  const props  = {...tooltipInfo};

  return (
    <TooltipContext.Provider value={{tooltipHandler, resetTooltipInfo}}>
      {
        tooltipInfo.message &&
        <Tooltip {...props}/>
      }
      {children}
    </TooltipContext.Provider>
  )
}

const useTooltipContext = () => { 
  const context = useContext(TooltipContext);
  
  if (!context){
    throw new Error("Context not setup properly.")
  }
  return context;
}

export default useTooltipContext;