import "../css/Asset.css";

import React, { useEffect, useState } from 'react';
import { useDebounce } from "use-debounce";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";

import DialogBox from './utils/Modal';
import { Document, Payload, FetchDocuments } from "../types/types";
import Filter from "./Filter";
import { useFetchAssets } from "../hooks/useFetchAssets";
import { useFecthDocuments } from "../hooks/useFetchDocuments";
import Table from "./utils/Table";
import useAssetColumns from "../hooks/useAssetColumns";
import Status from "./utils/Status";
import useToastContext from "../contexts/ToastContext";
import SearchableSelect from "./utils/SearchableSelect";

const Asset = () => {

  const navigate = useNavigate();
  const { documentID } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [id, setId] = useState<string>();
  
  const [documentId, setDocumentId] = useState<string>(documentID as string);
  const [pageCount, setPageCount] = useState<number>(Number(searchParams.get("count")) || 5);
  const [title, setTitle] = useState(searchParams.get("title") || "");
  const [page, setPage] = useState<number>();

  const [debouncedValue] = useDebounce(title, 500);
  
  const { toastHandler } = useToastContext();
  const columns = useAssetColumns();

  useEffect(() => {
    if (documentId){
      const page_number = Number(searchParams.get("page"));
      page_number && setPage((page_number - 1) * pageCount);
      return;
    }
    setIsModelOpen(true);
  }, []);

  const { 
    isError: isAssetError,
    error: assetError,
    isLoading: assetLoading,
    data: assetsData,
    refetch: refetchAssets
  } = useFetchAssets(toastHandler, documentId, debouncedValue, page, pageCount);

  const {
    data: documentsData,
    isLoading: isDocumentLoading,
    error: documentError,
    refetch: refetchDocuments
  }: FetchDocuments = useFecthDocuments(toastHandler);
  
  const documentPayload = () => {
    const payload: Payload[] = [];
    documentsData?.map((document: Document) => {
      payload.push({
        id: document.id,
        value: document.documentName
      })
    })
    return payload;
  }  

  const onChange = (value: string) => {
    setTitle(value);
    setPage(0);
    setSearchParams((prevValues) => {
      if (value.trim()){
        prevValues.set("title", value)
      } else {
        prevValues.delete("title")
      }
      if (prevValues.has("page")){
        prevValues.delete("page");
      }
      return prevValues
    })
  }

  const modalSuccessHandler = () => {
    if (id){
      setDocumentId(id);
      navigate(`/asset-library/${id}`);
    }
  }

  const onSelectDocument = (id: string) => {   
    setId(id)
  }  

  const onPageChange = (value: number) => {
    
    const currentPage =
    getCurrentPage(assetsData?.pagingInfo?.start as number, pageCount as number);

    if (value === currentPage) return;

    let pageStartFrom: number;

    if (value === currentPage - 1) {
      pageStartFrom = (assetsData?.pagingInfo?.start as number - pageCount);
    } else if (value === currentPage + 1) {
      pageStartFrom = (assetsData?.pagingInfo?.start as number) + pageCount;
    } else {
      pageStartFrom = (value - 1) * pageCount;
    }

    setPage(pageStartFrom);

    setSearchParams((prevValues) => {
      if (value === 1){
        prevValues.delete("page");
        return prevValues;
      }
      prevValues.set("page", value.toString());
      return prevValues;
    });
    
  }

  const onPageSizeChanged = (value: string) => {    
    setPageCount(Number(value));
    setPage(0);
    setSearchParams((prevValues) => {
      if (prevValues.has("page")){
        prevValues.delete("page");
      }
      prevValues.set("count", value)
      return prevValues;
    })
  }

  const getCurrentPage = (start: number, pageCount: number) => {
    const currentPage = Math.ceil((start + 1)/ pageCount);
    return currentPage;
  }

  const tableRowClickHandler = () => {
    console.log("table row clickkeddddd");
  }
  
  const resetFilter = () => {
    setPage(0);
    setTitle("");
  }

  return (
    <div className='organization-asset_wrapper'>
      <Filter
        payload = {documentPayload()}
        documentId = {documentId}
        setDocumentId = {setDocumentId}
        onChange = {onChange}
        loading = {isDocumentLoading}
        error = {documentError?.message && "Something went wrong."}
        refetchDocuments = {refetchDocuments}
        value = {title}
        resetFilter = {resetFilter}
      />

      <div className="organization-asset-table">
        { !isAssetError && !assetError ?
          <Table
            columns = {columns}
            data = {assetsData?.documentAssets}
            isLoading = {assetLoading}
            didFail = {isAssetError}
            // error={assetError?.message}
            onRowClicked={tableRowClickHandler}
            pageCount = {pageCount}
            onPageChange = {onPageChange}
            onPageSizeChanged = {onPageSizeChanged}
            totalDataCount={assetsData?.pagingInfo?.totalCount as number}
            moreData={assetsData?.pagingInfo?.nextPage ? true: false}
            currentPage={getCurrentPage(assetsData?.pagingInfo?.start as number, pageCount as number)}
            refetchAssets={refetchAssets}
          />
          :<div className="assets-error_wrapper">
            <Status
              showButton={true}
              variant="error"
              message={"something went wrong, please try again."}
              onButtonClick={refetchAssets}
              buttonText="retry"
            />
          </div>
        }
      </div>

      {
        isModelOpen &&
        <DialogBox
          title="select a document to view assets"
          component={
            <SearchableSelect
              payLoad= {documentPayload()}
              onChange={onSelectDocument}
              loading={isDocumentLoading}
              error={documentError?.message}
              placeholder="Select Document"
              retryHandler={refetchDocuments}
            />
          }
          okButtonText="done"
          onOk={modalSuccessHandler}
        />
      }
    </div>
  )
}

export default Asset