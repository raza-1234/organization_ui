import "../css/Asset.css";

import React, { useEffect, useState } from 'react';


import DialogBox from './utils/Modal';
import SelectDocument from "./utils/SelectInput";
import { Document, PayloadType } from "../types/types";
import { Boolean_False } from "../utils/constants";
import Filter from "./Filter";
import { useFetchAssets } from "../hooks/useFetchAssets";
import { useFecthDocuments } from "../hooks/useFetchDocuments";
import Table from "./utils/Table";
import useAssetColumns from "../hooks/useAssetColumns";
import Status from "./utils/Status";
import Button from "./utils/Button";
import useToastContext from "../contexts/ToastContext";

const Asset = () => {

  const [isModelOpen, setIsModelOpen] = useState(Boolean_False);
  const [documentId, setDocumentId] = useState<string>();
  const [pageCount, setPageCount] = useState<number>(10);

  const { toastHandler } = useToastContext();
  const columns = useAssetColumns();

  useEffect(() => {
    setIsModelOpen(!isModelOpen);
  }, []);

  const { 
    mutate: fetchAssets, 
    isError: isAssetError, 
    error: assetError,
    isLoading: assetLoading,
    data: assetsData
  }: any = useFetchAssets(toastHandler); // types

  const {
    isError: isDocumentError, 
    error: documentError, 
    isLoading: isDocumentLoading,
    data: documentsData
  }: any = useFecthDocuments(toastHandler); // types
  
  const documentPayload = () => {
    const payload: PayloadType[] = [];
    documentsData?.map((document: Document) => {
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

  return (
    <div className='organization-asset_wrapper'>
      <Filter
        payload = {documentPayload()}
        documentId = {documentId}
        setDocumentId = {setDocumentId}
        fetchAssets = {fetchAssets}
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
        { !isAssetError && !assetError?.message ?
          <Table
            columns = {columns}
            data = {assetsData?.documentAssets}
            isLoading = {assetLoading}
            didFail = {isAssetError}
            error={assetError?.message}
            onRowClicked={tableRowClickHandler}
            pageCount = {pageCount}
            onPageChange = {onPageChange}
            onPageSizeChanged = {onPageSizeChanged}
            currentDataCount={assetsData?.pagingInfo.currentDataCount as number}
            totalDataCount={assetsData?.pagingInfo.totalCount as number}
            moreData={assetsData?.pagingInfo.nextPage ? true: false}
            currentPage={getCurrentPage(assetsData?.pagingInfo.start as number, assetsData?.pagingInfo.currentDataCount as number)}
          />
          :
          <div className="assets-error_wrapper">
            <Status
              variant="error"
              message={assetError?.message}
            />
            <Button
              value="retry"
              clickHandler={modalSuccessHandler}
            />
          </div>
        }
      </div>

      {
        isModelOpen &&
        <DialogBox
          title="select a document to view assets"
          component={<SelectDocument payLoad= {documentPayload()} onChange={onSelectDocument}/>}
          okButtonText="done"
          onOk={modalSuccessHandler}
        />
      }
      
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