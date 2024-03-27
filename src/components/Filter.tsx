import "../css/Filter.css";

import React from 'react';
import SelectDocument from './utils/SelectDocument';

const Filter = () => {
  
  return (
    <div className='organization_filter-section-wrapper'>
      <div className='container organization_filter-section-content'>
        <div className="filter-document">
          <h3>Asset Library</h3>
          <div className="select-document-wrapper">
            <h5>Document:</h5> 
            <SelectDocument 
              getDocumentId={() => {}}
              documents={[]}
              className="select-document"
            />
          </div>
        </div>
        <div className="search-assets-wrapper">
          <p>search assets</p>
        </div>
      </div>
    </div>
  )
}

export default Filter
