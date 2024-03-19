import "../../css/Select.css";

import React from 'react';

type ParentProp = {
  documents: any[],
  type: string
}

const Select = ({documents, type}: ParentProp) => {
  return (
    <select className={
      type.toLowerCase() === "primary"? "primarySelectInput": 
      type.toLowerCase() === "secondary"? "secondarySelectInput":
      ""
      }>
      {
        documents.map((document, index) => (
          <option key={index}>
            {document.name}
          </option>
        ))
      }
    </select>
  )
}

export default Select;
