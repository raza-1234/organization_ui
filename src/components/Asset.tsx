import "../css/Asset.css";

import React, { useEffect, useState } from 'react';
import DialogBox from './DialogBox';

const Asset = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);

  const toggleModel = () => {
    setIsModelOpen(!isModelOpen);
  }

  useEffect(() => {
    toggleModel();
  }, []);

  return (
    <div className='organization-asset_wrapper'>
      {
        isModelOpen &&
        <div className='organization-document_model-wrapper'>
          <DialogBox
            toggleModel = {toggleModel}
          />
        </div>
      }
    </div>
  )
}

export default Asset