import { AxiosResponse } from "axios";
import { useQuery } from "react-query";

import api from "../axios/api";
import { STATUS_TEXT } from "../types/types";

const fetchAssets = async ({documentId, search}: {documentId?: string, search?: string}) => {
  
  let url = `assets/getDocumentAssets/${documentId}`;
  if (search){
    url += `?search=${search}`
  }
  
  try {
    const response: AxiosResponse = await api.get(url);
    if (response.statusText === STATUS_TEXT){
      return response.data;
    }
  } catch (err: any){
    console.log("Assets: Something went wrong.", err.response?.data?.message);
    throw new Error(err.response?.data?.message || "Something went wrong while fetching assets. Please try again.");
  }
}

export const useFetchAssets  = (
  toastHandler: (message: string, variant: string, timeOut?: number) => void,
  documentId?: string,
  search?: string
) => {    

  return useQuery(["fetchAssets", {documentId, search}], () => fetchAssets({documentId, search}), {
    enabled: !!documentId,
    onError: () => {  
      toastHandler("Something went wrong while fetching assets. Please try again.", "error")
    }
  })
}