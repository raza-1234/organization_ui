import { AxiosResponse } from "axios";
import { useMutation } from "react-query";

import api from "../axios/api";
import { STATUS_TEXT } from "../types/types";

const checkEmail = async (email: string) => {
  try {
    const response: AxiosResponse = await api.post("check-email", { email });
    if (response?.statusText === STATUS_TEXT){
      return response.data;
    }
  } catch (err: any){      
    console.log("CheckEmail: Something went wrong", err);
    throw new Error(err.response?.data?.message || "Something went wrong at email verification. Please try again.");
  }
}

export const useCheckEmail  = (
  setIsEmailExist: (data: boolean) => void, 
  setError: (message: string) => void, 
  toastHandler: (message: string, variant: string, timeOut?: number) => void
  ) => {

  return useMutation(checkEmail, {
    onError: (error: any) => {
      if (error.message === "Email does not exist."){
        setError(error.message);
        return;
      }
      toastHandler(error.message, "error");
    },

    onSuccess() {
      setIsEmailExist(true);
    },
  })
}