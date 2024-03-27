import { AxiosResponse } from "axios";
import api from "../axios/api";
import { STATUS_TEXT, API_FAILS } from "../types/types";
import { useMutation } from "react-query";

const checkEmail = async (email: string) => {
  try {
    const response: AxiosResponse = await api.post("check-email", { email });
    if (response?.statusText !== STATUS_TEXT){
      return {};
    }
    return response.data;
  } catch (err: any){      
    console.log("CheckEmail: Something went wrong", err);
    throw new Error(err.response?.data?.message || API_FAILS);
  }
}

export const useCheckEmail  = (setIsEmailExist: (data: boolean) => void, setError: (message: string) => void) => {
  return useMutation(checkEmail, {
    onError(error: any, variables, context) {
      if (error.message !== API_FAILS){
        setError(error.message);
      }
    },
    onSuccess(data, variables, context) {
      setIsEmailExist(true);
    },
  })
}