import { useQuery } from "react-query";

import api from "../axios/api";
import { AssetsPayload, STATUS_TEXT, PAGE_COUNT } from "../types/types";

type AssetsParams = {
  documentId?: string,
  search?: string,
  pageNumber?: number,
  pageCount?: number,
}

const fetchAssets = async ({documentId, search, pageNumber, pageCount}: AssetsParams): Promise<AssetsPayload | null> => {
  
  if(!documentId) {
    return null;
  }

 const page_count = pageCount || PAGE_COUNT;

  let url = `assets/getDocumentAssets/${documentId}`;

  if (search && pageNumber && pageCount){ //these checks will be removed by using query-string
    url += `?search=${search.toLowerCase()}&start=${pageNumber}&count=${page_count}`
  }
  else if (search && pageCount && !pageNumber){
    url += `?search=${search.toLowerCase()}&count=${page_count}`
  }
  else if (pageNumber && !search && pageCount){    
    url += `?start=${pageNumber}&count=${page_count}`
  }
  else if (!pageNumber && !search && page_count){    
    url += `?count=${page_count}`
  }
  
  const response = await api.get(url);
  if (response.statusText !== STATUS_TEXT){
    throw new Error("Error while fetching assets.");
  }

  return response.data;
}

export const useFetchAssets  = (
  toastHandler: (message: string, variant: string, timeOut?: number) => void,
  documentId?: string,
  search?: string,
  pageNumber?: number,
  pageCount?: number
) => {
  return useQuery(["fetchAssets", {documentId, search, pageNumber, pageCount}], () => fetchAssets({documentId, search, pageNumber, pageCount}), {
    enabled: !!documentId,
    onError: () => {  
      toastHandler("Something went wrong while fetching assets. Please try again.", "error")
    }
  })
}