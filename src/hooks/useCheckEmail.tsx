import { AxiosResponse } from "axios";
import { useMutation } from "react-query";

import api from "../axios/api";
import { STATUS_TEXT } from "../types/types";

const checkEmail = async (email: string) => {
  try {
    const response: AxiosResponse = await api.post("check-email", { email });
    if (response?.statusText !== STATUS_TEXT){
      return {};
    }
    return response.data;
  } catch (err: any){      
    console.log("CheckEmail: Something went wrong", err);
    throw new Error(err.response?.data?.message || "Something went wrong. Please try again.");
  }
}

export const useCheckEmail  = (
  setIsEmailExist: (data: boolean) => void, 
  setError: (message: string) => void, 
  toastHandler: (message: string, variant: string, timeOut?: number) => void
  ) => {

  return useMutation(checkEmail, {
    onError: (error: any) => {
      if (error.message === "Something went wrong. Please try again."){
        toastHandler(error.message, "error");
        return;
      }
      setError(error.message);
    },

    onSuccess() {
      setIsEmailExist(true);
    },
  })
}