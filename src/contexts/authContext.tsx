import React, {createContext, useState, useEffect, useContext} from 'react';
import Cookies from "js-cookie";
import { Children, User, AuthContextType, STATUS_TEXT } from '../types/types';
import api from '../axios/api';
import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: Children) => {
  const [userInfo, setUserInfo] = useState<User | undefined>({
    id: null,
    userName: "",
    email: "",
    role: "",
    rights: "",
    organizationId: null
  });

  const fetchUser = async () => {
    const response: AxiosResponse = await api.get("user");
    if (response.statusText !== STATUS_TEXT){
      return {};
    }
    return response?.data;
  }

  const { isLoading, isError } = useQuery('userData', fetchUser, {
    enabled: !!Cookies.get("session_id"),
    onSuccess: (data) => {
      setUserInfo(data?.user);
    }
  });

  return (
    <AuthContext.Provider value={{userInfo, setUserInfo}}>
      {children}
    </AuthContext.Provider>
  )
}

const UseAuthData = () => { 
  const context = useContext(AuthContext);
  
  if (!context){
    throw new Error("Context not setup properly.")
  }
  return context;
}

export default UseAuthData;