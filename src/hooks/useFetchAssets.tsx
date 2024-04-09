import { AxiosResponse } from "axios";
import api from "../axios/api";
import { STATUS_TEXT } from "../types/types";
import { useMutation } from "react-query";
import useToastContext from "../contexts/ToastContext";

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
    throw new Error(err.response?.data?.message || "Something went wrong while fetching assets. Please try again.");
  }
}

export const useFetchAssets  = (setAssets: (data: any) => void) => {

  const { toastHandler } = useToastContext();

  return useMutation(fetchAssets, {
    retry: 3,
    onSuccess: (data) => {   
      setAssets({documentAsset: data.documentAssets, pagination: data.pagingInfo});
    },
    onError: () => {  
      toastHandler("Something went wrong while fetching assets. Please try again.", "error")
    }
  })
}