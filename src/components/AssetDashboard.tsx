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
import Select from "./utils/Select";

const AssetDashboard = () => {

  const navigate = useNavigate();
  const { documentID } = useParams();

  const [searchParams, setSearchParams] = useSearchParams();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [id, setId] = useState<string>();
  
  const [documentId, setDocumentId] = useState<string>(documentID as string);
  const [pageCount, setPageCount] = useState<number>(Number(searchParams.get("count")) || 5); //5 should be in const 
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
    isLoading: assetLoading,
    data: assetsData,
    refetch: refetchAssets
  } = useFetchAssets(toastHandler, documentId, debouncedValue, page, pageCount);

  const {
    data: documentsData,
    isLoading: isDocumentLoading,
    isError: isDocumentError,
    refetch: refetchDocuments
  } = useFecthDocuments(toastHandler);
  
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
      if (!value.trim()){
        prevValues.delete("title")
        return prevValues;
      }
      prevValues.set("title", value)
      prevValues.delete("page");
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
    setId(id) // naming convention.
  }  

  const onPageChange = (page: number) => {
    const currentPage =
    getCurrentPage(assetsData?.pagingInfo?.start as number, pageCount as number);

    if (page === currentPage) return;

    let pageStartFrom: number;

    if (page === currentPage - 1) {
      pageStartFrom = (assetsData?.pagingInfo?.start as number - pageCount);
    } else if (page === currentPage + 1) {
      pageStartFrom = (assetsData?.pagingInfo?.start as number) + pageCount;
    } else {
      pageStartFrom = (page - 1) * pageCount;
    }

    setPage(pageStartFrom);

    setSearchParams((prevValues) => {
      if (page === 1){
        prevValues.delete("page");
        return prevValues;
      }
      prevValues.set("page", page.toString());
      return prevValues;
    });
    
  }

  const onPageSizeChanged = (count: string) => {
    setPageCount(Number(count));
    setPage(0);
    setSearchParams((prevValues) => {
      if (prevValues.has("page")){
        prevValues.delete("page");
      }
      prevValues.set("count", count)
      return prevValues;
    })
  }

  const getCurrentPage = (start: number, pageCount: number) => {
    const currentPage = Math.ceil((start + 1)/ pageCount);
    return currentPage;
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
        // error = {documentError?.message && "Something went wrong."}
        refetchDocuments = {refetchDocuments}
        value = {title}
        resetFilter = {resetFilter}
      />
      {isModelOpen &&
        <DialogBox
          title="select a document to view assets"
          component={
            <Select
              payLoad= {documentPayload()}
              onChange={onSelectDocument}
              loading={isDocumentLoading}
              error={isDocumentError ? 'unable to load docs. something went wrong.' : ''}
              placeholder="Select Document"
              retryHandler={refetchDocuments}
            />
          }
          okButtonText="done"
          onOk={modalSuccessHandler}
        />
      }
      <div className="organization-asset-table">
        {(!isAssetError || !isDocumentError) &&
          <Table
            columns = {columns}
            data = {assetsData?.documentAssets}
            isLoading = {assetLoading}
            didFail = {isAssetError}
            onRowClicked={() => {}}
            pageCount = {pageCount}
            onPageChange = {onPageChange}
            onPageSizeChanged = {onPageSizeChanged}
            totalDataCount={assetsData?.pagingInfo?.totalCount as number}
            moreData={assetsData?.pagingInfo?.nextPage ? true: false}
            currentPage={getCurrentPage(assetsData?.pagingInfo?.start as number, pageCount)}
            refetchAssets={refetchAssets}
          />
          // <DataStates></DataStates>
        }
      </div>
    </div>
  )
}

export default AssetDashboard;