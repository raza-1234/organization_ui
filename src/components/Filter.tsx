import "../css/Filter.css";

import React, { useEffect, useState } from 'react';
import { LiaSearchSolid } from "react-icons/lia";
import SelectDocument from './utils/SelectInput';
import Input from "./utils/Input";
import { PayloadType } from "../types/types";
import { useFetchAssets } from "../hooks/useFetchAssets";
import { useDebounce } from "use-debounce";
import Toast from "./utils/Toast";

type ParentProp = {
  payload: PayloadType[];
  setAssets: (value: any) => void;
  documentId?: string,
  setDocumentId: (value: string) => void
}

const Filter = ({payload, setAssets, documentId, setDocumentId}: ParentProp) => {

  const [search, setSearch] = useState("");
  const [debouncedValue] = useDebounce(search, 2000);

  const { mutate: fetchAssets, isError: isFetchAssetError, error: assetError }: any = useFetchAssets(setAssets);

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
        {
          isFetchAssetError && 
          <Toast
            message={assetError.message}
            variant="error"
          />
        }
      </div>
    </div>
  )
}

export default Filter
