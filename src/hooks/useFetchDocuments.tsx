import { AxiosResponse } from "axios";
import api from "../axios/api";
import { STATUS_TEXT } from "../types/types";
import { useQuery } from "react-query";
import Cookies from "js-cookie";
import useToastContext from "../contexts/ToastContext";

const fetchDocuments = async () => {
  try {
    const response: AxiosResponse = await api.get("document/getDocument");
    if (response.statusText !== STATUS_TEXT){
      return {};
    }      
    return response.data.documentData;
  } catch (err){
    console.log("Fetchdocuments: Something went wrong.", err);
    throw new Error("Something went wrong while fetching documents.")
  }
}

export const useFecthDocuments = (setDocuments: (data: any) => void) => {
  const { toastHandler } = useToastContext();

  return useQuery("fetchDocuments", fetchDocuments, {
    enabled: !!Cookies.get("session_id"),
    onSuccess: (data) => {
      setDocuments(data)
    },
    onError: () => {
      toastHandler("Something went wrong while fetching documents. Please try again.", "error")
    }
  })
}