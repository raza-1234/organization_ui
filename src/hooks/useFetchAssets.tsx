import { AxiosResponse } from "axios";
import api from "../axios/api";
import { STATUS_TEXT, API_FAILS } from "../types/types";
import { useMutation } from "react-query";

const fetchAssets = async (documentId: string, search?: undefined) => {
  try {
    const response: AxiosResponse = await api.get(`assets/getDocumentAssets/${documentId}?search=${search}`);
    if (response.statusText !== STATUS_TEXT){
      return {};
    }
    return response.data?.documentAssets;
  } catch (err: any){
    console.log("Assets: Something went wrong.", err.response?.data?.message);
    throw new Error(err.response?.data?.message || API_FAILS);
  }
}

export const useFetchAssets  = (setAssets: (data: any) => void) => {
  return useMutation(fetchAssets, {
    onSuccess: (data) => {      
      setAssets(data);
    }
  })
}