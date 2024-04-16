import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

import { STATUS_TEXT, User } from "../types/types";
import api from "../axios/api";

const loginUser = async ({email, password}: {email: string, password: string}) => {
  try {
    const response: AxiosResponse = await api.post("login", {email, password });
    if (response?.statusText !== STATUS_TEXT){
      return {};
    }
    return response.data.user;
  } catch (err: any){
    console.log("LoginUser: Something went wrong", err);
    throw new Error(err.response?.data?.message || "Something went wrong. Please try again.");
  }
}

export const useLogin = (
  resetFields: () => void, 
  setError: (message: string) => void,
  toastHandler: (message: string, variant: string, timeOut?: number) => void,
  setUserInfo: (data: User) => void
  ) => {

  const navigate = useNavigate();

  return useMutation(loginUser, {
    onSuccess(data) {
      setUserInfo({...data})
      navigate("/dashboard");
      resetFields();
      toastHandler("successfully login", "success")
    },
    onError(error: any) {
      if (error.message === "Something went wrong. Please try again."){
        toastHandler("Something went wrong at login. Please try again.", "error");
        return;
      }
      setError(error.message);
    },
  })
}