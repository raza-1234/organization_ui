import "../css/Filter.css";

import { LiaSearchSolid } from "react-icons/lia";
import { useNavigate, useSearchParams } from "react-router-dom";

import Input from "./utils/Input";
import { Payload } from "../types/types";
import Select from "./utils/Select";

type ParentProp = {
  payload?: Payload[];
  documentId?: string;
  setDocumentId: (value: string) => void;
  onChange: (value: string) => void;
  loading?: boolean;
  error?: string;
  refetchDocuments?: () => void;
  value: string;
  resetFilter: () => void
}

const Filter = ({payload, documentId, setDocumentId, onChange, loading, error, refetchDocuments, value, resetFilter}: ParentProp) => {

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const onSelect = (value: string) => {
    setDocumentId(value);
    resetFilter()
    navigate(`/asset-library/${value}`);
    setSearchParams((prevValues) => {
      prevValues.delete("page");
      prevValues.delete("title");
      return prevValues;
    })
  }

  const selectedDocument = () => {
    const filteredDocument = payload?.find((document) => document.id.toString() === documentId);
    return filteredDocument?.value;
  }
  
  return (
    <div className='organization_filter-section-wrapper'>
      <div className='organization_filter-section-content container'>
        <div className="filter-document">
          <h3>Asset Library</h3>
          <div className="select-document-wrapper">
            <h5>Document:</h5> 
            <Select
              onChange={onSelect}
              payLoad={payload}
              placeholder="Select Document"
              initialValue={selectedDocument()}
              loading={loading}
              error={error}
              retryHandler={refetchDocuments}
            />
          </div>
        </div>
        <div className="search-assets-wrapper">
          <Input
            onChange={onChange}
            placeholder="Search by filename"
            icon={<LiaSearchSolid/>}
            value = {value}
          />
        </div>
      </div>
    </div>
  )
}

export default Filter
