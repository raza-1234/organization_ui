import "../css/Asset.css";

import React, { useEffect, useState } from 'react';
import DialogBox from './Modal';
import SelectDocument from "./utils/SelectDocument";
import { Document, PayloadType } from "../types/types";
import Toast from "./utils/Toast";
import Filter from "./Filter";
import { useFetchAssets } from "../hooks/useFetchAssets";
import { useFecthDocuments } from "../hooks/useFetchDocuments";

const Asset = () => {

  const [isModelOpen, setIsModelOpen] = useState(false);
  const [documents, setDocuments] = useState<Document[]>();
  const [documentId, setDocumentId] = useState<string | null>(null);
  const [assets, setAssets] = useState<any[]>();

  const createDocumentPayload = () => {
    const payload: PayloadType[] = [];
    documents?.map((document) => {
      payload.push({
        id: document.id,
        value: document.documentName
      })
    })
    return payload;
  }

  const toggleModel = () => {
    setIsModelOpen(!isModelOpen);
  }

  useEffect(() => {
    toggleModel();
  }, []);

  const { mutate: fetchAssets, isError: isFetchAssetError, error: assetError }: any = useFetchAssets(setAssets);
  const { isError: isDocumentError, error: documentError, isLoading: isDocumentLoading }: any = useFecthDocuments(setDocuments);

  const successHandler = () => {
    fetchAssets(documentId);
  }

  const getDocumentId = (id: string) => {
    setDocumentId(id);
  }  

  return (
    <div className='organization-asset_wrapper'>
      <Filter/>
      {
        isModelOpen &&
        <DialogBox
          title="select a document to view assets"
          component={<SelectDocument payLoad= {createDocumentPayload()} onChange={getDocumentId}/>}
          // crossIconClassName="close-icon"
          okButtonText="done"
          cancelButtonText="cancel"
          // footer={false}
          // button_position="flex-end"
          loading={isDocumentLoading}
          error = {documentError?.message}
          onOk={successHandler}
        />
      }
      {
        isFetchAssetError && 
        <Toast
          message={assetError.message}
          variant="error"
        />
      }
      {
        isDocumentError && 
        <Toast
          message={documentError.message}
          variant="error"
        />
      }
    </div>
  )
}

export default Asset