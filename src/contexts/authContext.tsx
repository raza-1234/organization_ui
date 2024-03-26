import React, {createContext, useState, useContext} from 'react';
import Cookies from "js-cookie";
import { Children, User, AuthContextType, STATUS_TEXT, Document } from '../types/types';
import api from '../axios/api';
import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';
import toastMessage from '../components/utils/Toast';

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
  // const [documents, setDocuments] = useState<Document[]>();

  // const fetchDocuments = async () => {
  //   try {
  //     const response: AxiosResponse = await api.get("document/getDocument");
  //     if (response.statusText !== STATUS_TEXT){
  //       return {};
  //     }      
  //     return response.data.documentData;
  //   } catch (err){
  //     console.log("Fetchdocuments: Something went wrong.", err);
  //   }
  // }

  // const { isLoading: documentLoading, isError: documentError, data: documentData } = useQuery("organizationDocuments", fetchDocuments, {
  //   enabled: !!cookie,
  //   onSuccess: (data) => {
  //     setDocuments(data);
  //   }
  // });

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

  const { isLoading, isError, data, error }: any = useQuery('userData', fetchUser, {
    enabled: !!Cookies.get("session_id"),
    onSuccess: (data) => {
      setUserInfo({...userInfo, ...data?.user});
    }
  });

  return (
    <>
      {
        isError &&
        toastMessage("error", error.message, 4000)
      }
      {
        data &&
        toastMessage("success", "User fetched successfully.", 5000)
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