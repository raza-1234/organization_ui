import "../css/Filter.css";

import { LiaSearchSolid } from "react-icons/lia";

import Input from "./utils/Input";
import { PayloadType } from "../types/types";
import SearchableSelect from "./utils/SearchableSelect";

type ParentProp = {
  payload?: PayloadType[];
  documentId?: string;
  setDocumentId: (value: string) => void;
  onChange: (value: string) => void;
  loading?: boolean;
  error?: string;
  refetchDocuments?: () => void;
}

const Filter = ({payload, documentId, setDocumentId, onChange, loading, error, refetchDocuments}: ParentProp) => {

  const onSelect = (value: string) => {
    setDocumentId(value)
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
            <SearchableSelect
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
          />
        </div>
      </div>
    </div>
  )
}

export default Filter
