import { AxiosResponse } from "axios";
import api from "../axios/api";
import { STATUS_TEXT, API_FAILS, User } from "../types/types";
import { useQuery } from "react-query";
import Cookies from "js-cookie";

const fetchUser = async () => {    
  try {
    const response: AxiosResponse = await api.get("user");
    if (response.statusText !== STATUS_TEXT){
      return {};
    }      
    return response?.data;
  } catch (err){
    throw new Error(API_FAILS);
  }
}

export const useFetchUser  = (setUserInfo: (data: User | undefined) => void) => {
  return useQuery("fetchUserData", fetchUser, {
    enabled: !!Cookies.get("session_id"),
    onSuccess: (data) => {      
      setUserInfo(data.user);
    }
  })
}