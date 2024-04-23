import { useQuery } from "react-query";
import Cookies from "js-cookie";

import api from "../axios/api";
import { STATUS_TEXT, Document } from "../types/types";

const fetchDocuments = async(): Promise<Document[] | undefined> => {  
  const response = await api.get("document/getDocument");
  if (response.statusText !== STATUS_TEXT){
    throw new Error("Error while fetching documents.")
  }

  return response.data.documentData;
}

// const fetchDocuments = async(): Promise<Document[] | undefined> => {
//   try {
//     const response: AxiosResponse = await api.get("document/getDocument");
//     if (response.statusText === STATUS_TEXT){      
//       return response.data.documentData;
//     }      
//   } catch (err){
//     console.log("Fetchdocuments: Something went wrong.", err);
//     throw new Error("Something went wrong while fetching documents.")
//   }
// }

export const useFecthDocuments = (toastHandler: (message: string, variant: string, timeOut?: number) => void) => {
  return useQuery("fetchDocuments", fetchDocuments, {
    refetchOnWindowFocus: false,
    enabled: !!Cookies.get("session_id"),
    onError: () => {
      toastHandler("Something went wrong while fetching documents.", "error")
    }
  })

}