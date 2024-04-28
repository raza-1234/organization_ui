import { AxiosResponse } from "axios";

import api from "../axios/api";
import { STATUS_TEXT } from "../types/types";
import { useMutation } from "react-query";

const Logout = async () => {
  try {
    const response: AxiosResponse = await api.get("logout");
    if (response.statusText === STATUS_TEXT){
      return response;
    }
  } catch (err: any){
    console.log("Logout: something went wrong", err);
    throw new Error("Logout: Something went wrong.")
  }
}

export const useLogout = (
  setUserInfo: (value: undefined) => void,
  toggleDropDown: () => void,
  navigate: (value: string) => void
) => {

  return useMutation(Logout, {
    onSuccess(data) {
      setUserInfo(undefined);
      toggleDropDown();
      navigate("/")
    }
  })
}