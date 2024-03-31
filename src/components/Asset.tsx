import "../css/Asset.css";

import React, { useEffect, useState } from 'react';
import DialogBox from './utils/Modal';
import SelectDocument from "./utils/SelectInput";
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
    if (documentId){
      fetchAssets(documentId);
    }
  }

  const onChange = (id: string) => {
    setDocumentId(id);
  }

  return (
    <div className='organization-asset_wrapper'>
      <Filter
        payload = {createDocumentPayload()}
        setAssets = {setAssets}
      />
      {
        isModelOpen &&
        <DialogBox
          title="select a document to view assets"
          component={<SelectDocument payLoad= {createDocumentPayload()} onChange={onChange}/>}
          okButtonText="done"
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