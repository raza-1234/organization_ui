import { AxiosResponse } from "axios";
import api from "../axios/api";
import { STATUS_TEXT, User } from "../types/types";
import { useQuery } from "react-query";
import Cookies from "js-cookie";
import useToastContext from "../contexts/ToastContext";

const fetchUser = async () => {    
  try {
    const response: AxiosResponse = await api.get("user");
    if (response.statusText !== STATUS_TEXT){
      return {};
    }      
    return response?.data;
  } catch (err){
    throw new Error("Something went wrong while fetching user.");
  }
}

export const useFetchUser  = (setUserInfo: (data: User | undefined) => void) => {
  const { toastHandler } = useToastContext();

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