import "../css/Asset.css";

import React, { useEffect, useState } from 'react';
import DialogBox from './utils/Modal';
import SelectDocument from "./utils/SelectInput";
import { Document, PayloadType, AssetsType } from "../types/types";
import { Boolean_False } from "../utils/constants";
import Toast from "./utils/Toast";
import Filter from "./Filter";
import { useFetchAssets } from "../hooks/useFetchAssets";
import { useFecthDocuments } from "../hooks/useFetchDocuments";
import Table from "./utils/Table";
import useAssetColumns from "../hooks/useAssetColumns";

const Asset = () => {

  const [isModelOpen, setIsModelOpen] = useState(Boolean_False);
  const [documents, setDocuments] = useState<Document[]>();
  const [documentId, setDocumentId] = useState<string>();
  const [pageCount, setPageCount] = useState<number>(10);
  const [assets, setAssets] = useState<AssetsType>({
    documentAsset: [],
    pagination: {}
  });

  useEffect(() => {
    setIsModelOpen(!isModelOpen);
  }, []);

  const columns = useAssetColumns();

  const { 
    mutate: fetchAssets, 
    isError: isAssetError, 
    error: assetError,
    isLoading: assetLoading
  }: any = useFetchAssets(setAssets); // types 

  const { 
    isError: isDocumentError, 
    error: documentError, 
    isLoading: isDocumentLoading 
  }: any = useFecthDocuments(setDocuments);// types 
  
  const documentPayload = () => {
    const payload: PayloadType[] = [];
    documents?.map((document) => {
      payload.push({
        id: document.id,
        value: document.documentName
      })
    })
    return payload;
  }

  const modalSuccessHandler = () => {
    if (documentId){
      fetchAssets({documentId});
    }
  }

  const onSelectDocument = (id: string) => {    
    setDocumentId(id);
  }

  const onPageChange = (value: number) => {
    console.log(">>>>>>", value);
  }

  const onPageSizeChanged = (value: string) => {
    console.log("chefkingggg sizeeee", value);
  }

  const tableRowClickHandler = () => {
    console.log("table row clickkeddddd");
  }

  const getCurrentPage = (start: number, currentDataCount: number) => {
    const currentPage = Math.ceil((start + 1)/ currentDataCount);
    return currentPage;
  }

  // const handleError = (loading, error) => {
  //   return (
  //     if(error) {
  //       <></> // message function 

  //     }

  //     if(loading) {
  //       <></> // loading 
  //     }
  //   )
  // }

  return (
    <div className='organization-asset_wrapper'>
      <Filter // NAME
        payload = {documentPayload()}
        setAssets = {setAssets}
        documentId = {documentId}
        setDocumentId = {setDocumentId}
      />
      {
        isModelOpen &&
        <DialogBox
          title="select a document to view assets"
          component={<SelectDocument payLoad= {documentPayload()} onChange={onSelectDocument}/>}
          okButtonText="done"
          loading={isDocumentLoading}
          error = {documentError?.message}
          onOk={modalSuccessHandler}
        />
      }

      <div className="organization-asset-table">
        { assets.documentAsset.length > 0 &&
          <Table
            columns = {columns}
            data = {assets.documentAsset}
            isLoading = {assetLoading}
            didFail = {isAssetError}
            error={assetError?.message}
            onRowClicked={()=> {}}
            pageCount = {pageCount}
            onPageChange = {onPageChange}
            onPageSizeChanged = {onPageSizeChanged}
            currentDataCount={assets.pagination.currentDataCount as number}
            totalDataCount={assets.pagination.totalCount as number}
            moreData={assets.pagination.nextPage ? true: false}
            currentPage={getCurrentPage(assets.pagination.start as number, assets.pagination.currentDataCount as number)}
          />
        }
      </div>
      
      {
        isAssetError && 
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