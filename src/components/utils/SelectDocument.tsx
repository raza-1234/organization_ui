import "../../css/Select.css";

import { Document } from "../../types/types";

type ParentProp = {
  documents?: Document[];
  className?: string
  getDocumentId: (id: string) => void
}

const SelectDocument = ({documents, className, getDocumentId}: ParentProp) => { // placeholder missing
  return (
    <select
      className={`organization_select-option-field ${className}`}
      onChange={(e) => getDocumentId(e.target.value)}
    >
      <option hidden></option>
      {
        documents?.map((document) => (
          <option
            key={document.id}
            value={document.id}
          >
            {document.documentName.toUpperCase()}
          </option>
        ))
      }
    </select>
  )
}

export default SelectDocument;
