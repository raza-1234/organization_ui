import "../css/Asset.css";

<<<<<<< Updated upstream
import React, { FormEvent, useEffect, useState } from 'react';
import DialogBox from './DialogBox';
import SelectDocument from "./utils/SelectDocument";
import { Document, PayloadType } from "../types/types";
=======
import React, { useEffect, useState } from 'react';
import DialogBox from './utils/Modal';
import SelectDocument from "./utils/SelectInput";
import { Document, PayloadType } from "../types/types";
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
  const submitHandler = async (event: FormEvent<HTMLFormElement>) => { //
    event.preventDefault();
    fetchAssets(documentId);
=======
  const successHandler = () => {
    if (documentId){
      fetchAssets(documentId);
    }
>>>>>>> Stashed changes
  }

  const getDocumentId = (id: string) => {
    setDocumentId(id);
<<<<<<< Updated upstream
  }

  const onChange = (id: string) => {
    setDocumentId(id);
  }

=======
  }  
  
>>>>>>> Stashed changes
  return (
    <div className='organization-asset_wrapper'>
      <Filter
        payload = {createDocumentPayload()}
        setAssets = {setAssets}
      />
      {
        isModelOpen &&
<<<<<<< Updated upstream
        <div className='organization-document_model-wrapper'>
          <DialogBox
            toggleModel={toggleModel}
            title="select a document to view assets"
            component={<SelectDocument documents= {documents} getDocumentId={getDocumentId}/>}
            submitHandler={submitHandler}
          />
        </div>
=======
        <DialogBox
          title="select a document to view assets"
          component={<SelectDocument payLoad= {createDocumentPayload()} onChange={getDocumentId}/>}
          okButtonText="done"
          loading={isDocumentLoading}
          error = {documentError?.message}
          onOk={successHandler}
        />
>>>>>>> Stashed changes
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