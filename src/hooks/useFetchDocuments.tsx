import { AxiosResponse } from "axios";
import api from "../axios/api";
import { STATUS_TEXT, API_FAILS } from "../types/types";
import { useQuery } from "react-query";
import Cookies from "js-cookie";

const fetchDocuments = async () => {
  try {
    const response: AxiosResponse = await api.get("document/getDocument");
    if (response.statusText !== STATUS_TEXT){
      return {};
    }      
    return response.data.documentData;
  } catch (err){
    console.log("Fetchdocuments: Something went wrong.", err);
    throw new Error(API_FAILS)
  }
}

export const useFecthDocuments = (setDocuments: (data: any) => void) => {
  return useQuery("fetchDocuments", fetchDocuments, {
    enabled: !!Cookies.get("session_id"),
    onSuccess: (data) => {
      setDocuments(data)
    }
  })
}