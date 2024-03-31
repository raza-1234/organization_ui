import "../css/Asset.css";

<<<<<<< Updated upstream
import React, { FormEvent, useEffect, useState } from 'react';
import DialogBox from './DialogBox';
import SelectDocument from "./utils/SelectDocument";
import api from "../axios/api";
import { STATUS_TEXT, Document } from "../types/types";
import { useMutation, useQuery } from "react-query";
import Cookies from "js-cookie";
import { AxiosResponse } from "axios";
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
import { error } from "console";

const Asset = () => {

  const cookie = Cookies.get("session_id");
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [documents, setDocuments] = useState<Document[]>();
  const [documentId, setDocumentId] = useState<string | null>(null);
  const [assets, setAssets] = useState<any[]>();

  const toggleModel = () => {
    setIsModelOpen(!isModelOpen);
  }

  useEffect(() => {
    toggleModel();
  }, []);

  const { mutate: fetchAssets, isError: isFetchAssetError, error: assetError }: any = useFetchAssets(setAssets);
  const { isError: isDocumentError, error: documentError }: any = useFecthDocuments(setDocuments);

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
        />
      }
      {
        isDocumentError && 
        <Toast
          message={documentError.message}
        />
      }
    </div>
  )
}

export default Asset