import { AxiosResponse } from "axios";
import { useQuery } from "react-query";
import Cookies from "js-cookie";

import api from "../axios/api";
import { STATUS_TEXT, User } from "../types/types";

const fetchUser = async (): Promise<User | undefined> => {
  
  try {
    const response: AxiosResponse = await api.get("user");
    if (response.statusText !== STATUS_TEXT){      
      throw new Error("Error while fetching user.")
    }
        
    return response?.data?.user;
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
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      if (data){
        setUserInfo(data);
      }
    },
    onError: () => {
      toastHandler("Something went wrong while fetching user. Please try again.", "error")
    }
  })
}