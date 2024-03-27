import "../css/Asset.css";

import React, { FormEvent, useEffect, useState } from 'react';
import DialogBox from './DialogBox';
import SelectDocument from "./utils/SelectDocument";
import api from "../axios/api";
import { STATUS_TEXT, Document } from "../types/types";
import { useMutation, useQuery } from "react-query";
import Cookies from "js-cookie";
import { AxiosResponse } from "axios";
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

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => { //
    event.preventDefault();
    fetchAssets(documentId);
  }

  const getDocumentId = (id: string) => {
    setDocumentId(id);
  }

  const onChange = (id: string) => {
    setDocumentId(id);
  }

  return (
    <div className='organization-asset_wrapper'>
      <Filter/>
      {
        isModelOpen &&
        <div className='organization-document_model-wrapper'>
          <DialogBox
            toggleModel={toggleModel}
            title="select a document to view assets"
            component={<SelectDocument documents= {documents} getDocumentId={getDocumentId}/>}
            submitHandler={submitHandler}
          />
        </div>
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