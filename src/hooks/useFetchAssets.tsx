import { AxiosResponse } from "axios";
import { useMutation } from "react-query";

import api from "../axios/api";
import { STATUS_TEXT, API_FAILS } from "../types/types";

const fetchAssets = async ({documentId, search}: {documentId: string, search?: string}) => {

  let url = `assets/getDocumentAssets/${documentId}`;
  if (search){
    url += `?search=${search}`
  }  
  
  try {
    const response: AxiosResponse = await api.get(url);
    if (response.statusText !== STATUS_TEXT){
      return {};
    }
    
    return response.data;
  } catch (err: any){
    console.log("Assets: Something went wrong.", err.response?.data?.message);
    throw new Error(err.response?.data?.message || API_FAILS);
  }
}

export const useFetchAssets  = (setAssets: (data: any) => void) => {
  return useMutation(fetchAssets, {
    onSuccess: (data) => {   
      setAssets({documentAsset: data.documentAssets, pagination: data.pagingInfo});
    }
  })
}