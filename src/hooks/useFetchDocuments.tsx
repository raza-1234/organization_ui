import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import Cookies from "js-cookie";

import api from "../axios/api";

import { STATUS_TEXT, Document } from "../types/types";

const fetchDocuments = async(): Promise<Document[] | undefined> => {
  try {
    const response: AxiosResponse = await api.get("document/getDocument");
    if (response.statusText === STATUS_TEXT){      
      return response.data.documentData;
    }      
  } catch (err){
    console.log("Fetchdocuments: Something went wrong.", err);
    throw new Error("Something went wrong while fetching documents.")
  }
}

export const useFecthDocuments = (toastHandler: (message: string, variant: string, timeOut?: number) => void) => {
  return useQuery("fetchDocuments", fetchDocuments, {
    enabled: !!Cookies.get("session_id"),
    onError: () => {
      toastHandler("Something went wrong while fetching documents.", "error")
    }
  })

}