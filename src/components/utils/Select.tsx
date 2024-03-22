import "../../css/Select.css";

import React from 'react';
import { Document } from "../../types/types";

type ParentProp = {
  documents?: Document[],
  type: string
}

const Select = ({documents, type}: ParentProp) => {
  console.log("documentsssss", documents);
  
  return (
    <select className={
      type.toLowerCase() === "primary"? "primarySelectInput": 
      type.toLowerCase() === "secondary"? "secondarySelectInput":
      ""
      }>
      {
        documents?.map((document, index) => (
          <option key={index}>
            {document.documentName.toUpperCase()}
          </option>
        ))
      }
    </select>
  )
}

export default Select;
