import "../css/Asset.css";

import React, { useEffect, useState } from 'react';
import { useDebounce } from "use-debounce";

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
  const [id, setId] = useState<string>();

  const [search, setSearch] = useState("");
  const [debouncedValue] = useDebounce(search, 500);

  const { toastHandler } = useToastContext();
  const columns = useAssetColumns();

  useEffect(() => {
    setIsModelOpen(true);
  }, []);

  const { 
    isError: isAssetError, 
    error: assetError,
    isLoading: assetLoading,
    data: assetsData,
    refetch: refetchAssets
  }: any = useFetchAssets(toastHandler, documentId, debouncedValue); // types

  const {
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

  const onChange = (value: string) => {
    setSearch(value);
  }

  const modalSuccessHandler = () => {
    if (id){
      setDocumentId(id)
    }
  }

  const onSelectDocument = (id: string) => {   
    setId(id)
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
        onChange = {onChange}
      />

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
            currentDataCount={assetsData?.pagingInfo?.currentDataCount as number}
            totalDataCount={assetsData?.pagingInfo?.totalCount as number}
            moreData={assetsData?.pagingInfo?.nextPage ? true: false}
            currentPage={getCurrentPage(assetsData?.pagingInfo?.start as number, assetsData?.pagingInfo?.currentDataCount as number)}
          />
          :
          <div className="assets-error_wrapper">
            <Status
              variant="error"
              message={assetError?.message}
            />
            <Button
              value="retry"
              clickHandler={refetchAssets}
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
    </div>
  )
}

export default Asset