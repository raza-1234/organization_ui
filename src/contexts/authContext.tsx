import React, { createContext, useState, useContext } from 'react';
import { useQuery } from 'react-query';
import Cookies from "js-cookie";
import { Children, User, AuthContextType, STATUS_TEXT } from '../types/types';
import api from '../axios/api';
import { AxiosResponse } from 'axios';
import Toast from '../components/utils/Toast';

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

  const { isError, error }: any = useQuery('userData', fetchUser, {
    enabled: !!Cookies.get("session_id"),
    onSuccess: (data) => {
      setUserInfo({...userInfo, ...data?.user});
    }
  });

  return (
    <>
      {
        isError && 
        <Toast
          variant='error'
          message={error.message}
        />
      }
      <AuthContext.Provider value={{userInfo, setUserInfo}}>
        {children}
      </AuthContext.Provider>
    </>
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