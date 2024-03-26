import "../../css/Select.css";

import React, { useState } from 'react';
import { useQuery } from "react-query";
import { Document, STATUS_TEXT } from "../../types/types";
import api from "../../axios/api";
// import toastMessage from "./Toast";

type ParentProp = {
  documents?: Document[]
}

const SelectDocument = ({documents}: ParentProp) => {
  const [documentId, setDocumentId] = useState<string | null>(null);
  // const variantType = variant.toLowerCase();

  const fetchAssets = async () => {
    try {
      const response = await api.get(`assets/getDocumentAssets/${documentId}`);
      if (response.statusText !== STATUS_TEXT){
        return {};
      }
      return response.data?.documentAssets;
    } catch (err: any){
      console.log("Assets: Something went wrong.", err.response?.data?.message);
      throw new Error(err.response?.data?.message || "Something went wrong");
    }
  }

  const { data } = useQuery("Assets", fetchAssets, {
    enabled: !!documentId,
    onSuccess: (data) => {
      console.log(data);
      setDocumentId(null);
    }
  });

  return (
    <>
      {
        data 
      }
      <select className="primary"
        onChange={(e) => setDocumentId(e.target.value)}
        >
        {
          documents?.map((document, index) => (
            <option 
              key={index}
              value={document.id}
            >
              {document.documentName.toUpperCase()}
            </option>
          ))
        }
      </select>
    </>
  )
}

export default SelectDocument;
