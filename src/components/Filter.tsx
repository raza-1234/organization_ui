import "../css/Filter.css";

import React, { useEffect, useState } from 'react';
import { LiaSearchSolid } from "react-icons/lia";
import { useDebounce } from "use-debounce";

import SelectDocument from './utils/SelectInput';
import Input from "./utils/Input";
import { PayloadType } from "../types/types";

type ParentProp = {
  payload: PayloadType[];
  documentId?: string,
  setDocumentId: (value: string) => void,
  fetchAssets: (value: any) => void
}

const Filter = ({payload, documentId, setDocumentId, fetchAssets}: ParentProp) => {

  const [search, setSearch] = useState("");
  const [debouncedValue] = useDebounce(search, 2000);

  useEffect(() => {
    if (documentId){
      fetchAssets({documentId, search: debouncedValue});
    }
  }, [debouncedValue]);

  const onSelect = (value: string) => {
    setDocumentId(value)
    fetchAssets({documentId: value, search});
  }

  const onChange = (value: string) => {
    setSearch(value);
  }

  const selectedDocument = () => {
    const filteredDocument = payload.find((document) => document.id.toString() === documentId);
    return filteredDocument?.value;
  }
  
  return (
    <div className='organization_filter-section-wrapper'>
      <div className='organization_filter-section-content container'>
        <div className="filter-document">
          <h3>Asset Library</h3>
          <div className="select-document-wrapper">
            <h5>Document:</h5> 
            <SelectDocument
              placeholder={selectedDocument()}
              onChange={onSelect}
              payLoad={payload}
              className="select-document"
            />
          </div>
        </div>
        <div className="search-assets-wrapper">
          <Input
            onChange={onChange}
            placeholder="Search by filename"
            icon={<LiaSearchSolid/>}
          />
        </div>
      </div>
    </div>
  )
}

export default Filter
