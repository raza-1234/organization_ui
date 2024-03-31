import "../css/Filter.css";

import React, { useEffect, useState } from 'react';
import { LiaSearchSolid } from "react-icons/lia";
import SelectDocument from './utils/SelectInput';
import Input from "./utils/Input";
import { PayloadType } from "../types/types";
import { useFetchAssets } from "../hooks/useFetchAssets";
import { useDebounce } from "use-debounce";

type ParentProp = {
  payload: PayloadType[];
  setAssets: (value: any) => void
}

const Filter = ({payload, setAssets}: ParentProp) => {

  const [search, setSearch] = useState("");
  const [debouncedValue] = useDebounce(search, 2000);

  const { mutate: fetchAssets, isError: isFetchAssetError, error: assetError }: any = useFetchAssets(setAssets);

  const onSelect = (value: string) => {
    fetchAssets(value);
  }

  const onChange = (value: string) => {
    setSearch(value);
  }  

  useEffect(() => {
    if (debouncedValue){
      console.log("search", debouncedValue);
      
    }
  }, [debouncedValue]);
  
  return (
    <div className='organization_filter-section-wrapper'>
      <div className='organization_filter-section-content container'>
        <div className="filter-document">
          <h3>Asset Library</h3>
          <div className="select-document-wrapper">
            <h5>Document:</h5> 
            <SelectDocument
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
