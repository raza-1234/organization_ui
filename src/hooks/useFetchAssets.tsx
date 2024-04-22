import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import queryString from "query-string";
import { useLocation } from "react-router-dom";

import api from "../axios/api";
import { AssetsPayload, STATUS_TEXT } from "../types/types";

type AssetsParams = {
  documentId?: string,
  search?: string,
  page?: string,
  pageCount?: string,
}

const fetchAssets = async ({documentId, search, page, pageCount}: AssetsParams) => {
    
  let url = `assets/getDocumentAssets/${documentId}`;

  if (search && page && pageCount){ //these checks will be removed by using query-string
    url += `?search=${search.toLowerCase()}&start=${page}&count=${pageCount}`
  }
  else if (search && pageCount && !page){
    url += `?search=${search.toLowerCase()}&count=${pageCount}`
  }
  else if (page && !search && pageCount){    
    url += `?start=${page}&count=${pageCount}`
  }
  else if (!page && !search && pageCount){    
    url += `?count=${pageCount}`
  }
  
  try {
    const response = await api.get(url);
    if (response.statusText === STATUS_TEXT){
      return response.data;
    }
  } catch (err){
    const error = err as Error;
    console.log("Assets: Something went wrong.", error);
    throw new Error("Something went wrong while fetching assets. Please try again.");
  }
}

export const useFetchAssets  = (
  toastHandler: (message: string, variant: string, timeOut?: number) => void,
  documentId?: string,
  search?: string,
  page?: string,
  pageCount?: string
) => {
  return useQuery(["fetchAssets", {documentId, search, page, pageCount}], () => fetchAssets({documentId, search, page, pageCount}), {
    enabled: !!documentId,
    onError: () => {  
      toastHandler("Something went wrong while fetching assets. Please try again.", "error")
    }
  })
}