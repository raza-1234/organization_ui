import { AxiosResponse } from "axios";
import { useMutation } from "react-query";

import { STATUS_TEXT, User } from "../types/types";
import api from "../axios/api";

const loginUser = async ({email, password}: {email: string, password: string}) => {
  try {
    const response: AxiosResponse = await api.post("login", {email, password });
    if (response?.statusText === STATUS_TEXT){
      return response.data.user;
    }
  } catch (err: any){
    console.log("LoginUser: Something went wrong", err);
    throw new Error(err.response?.data?.message || "Something went wrong at login. Please try again.");
  }
}

export const useLogin = (
  resetFields: () => void, 
  setError: (message: string) => void,
  toastHandler: (message: string, variant: string, timeOut?: number) => void,
  setUserInfo: (data: User) => void,
  navigate: (value: string) =>  void
  ) => {

  return useMutation(loginUser, {
    onSuccess(data) {
      setUserInfo({...data})
      navigate("/dashboard");
      resetFields();
      toastHandler("successfully login", "success");
    },
    onError(error: any) {
      if (error.message === "User does not exists." || error.message === "Incorrect password"){
        setError(error.message);
        return;
      }
      toastHandler(error.message, "error");
    }
  })
}