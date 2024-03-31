import { AxiosResponse } from "axios";
import { STATUS_TEXT, API_FAILS } from "../types/types";
import api from "../axios/api";
import { useMutation } from "react-query";
import useAuthData from "../contexts/authContext";
import useDashboardContext from "../contexts/DashboardContext";
import { useNavigate } from "react-router-dom";

const loginUser = async ({email, password}: {email: string, password: string}) => {
  try {
    const response: AxiosResponse = await api.post("login", {email, password });      
    if (response?.statusText !== STATUS_TEXT){
      return {};
    }
    return response.data.user;
  } catch (err: any){
    console.log("LoginUser: Something went wrong", err);
    throw new Error(err.response?.data?.message || API_FAILS);
  }
}

export const useLogin = (resetFields: () => void, setError: (message: string) => void) => {

  const navigate = useNavigate();
  const { setUserInfo } = useAuthData();
  const { setIsLoginToast } = useDashboardContext();

  return useMutation(loginUser, {
    onSuccess(data, variables, context) {
      setUserInfo({...data})
      setIsLoginToast(true);
      navigate("/dashboard");
      resetFields();
    },
    onError(error: any, variables, context) {
      if (error.message !== API_FAILS){
        setError(error.message);
      }
    },
  })
}