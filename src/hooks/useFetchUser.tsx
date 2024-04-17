import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import Cookies from "js-cookie";

import api from "../axios/api";
import { STATUS_TEXT, User } from "../types/types";

const fetchUser = async () => {    
  try {
    const response: AxiosResponse = await api.get("user");
    if (response.statusText === STATUS_TEXT){
      return response?.data;
    }      
  } catch (err){
    console.log("Fetching User: Something went wrong.", err);
    throw new Error("Something went wrong while fetching user.");
  }
}

export const useFetchUser  = (
  setUserInfo: (data: User) => void,
  toastHandler: (message: string, variant: string, timeOut?: number) => void,
  ) => {

  return useQuery("fetchUserData", fetchUser, {
    enabled: !!Cookies.get("session_id"),
    onSuccess: (data) => {
      setUserInfo(data.user);
    },
    onError: () => {
      toastHandler("Something went wrong while fetching user. Please try again.", "error")
    }
  })
}