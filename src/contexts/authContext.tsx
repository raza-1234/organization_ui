import React, { createContext, useState, useContext } from 'react';
import { Children, User, AuthUserContext } from '../types/types';
import { useFetchUser } from '../hooks/useFetchUser';
import useToastContext from './ToastContext';

const AuthContext = createContext<AuthUserContext | undefined>(undefined);

export const AuthProvider = ({children}: Children) => {
  const [userInfo, setUserInfo] = useState<User | undefined>({
    id: null,
    userName: "",
    email: "",
    role: "",
    rights: "",
    organizationId: null
  });

  const { toastHandler } = useToastContext();

  const results = useFetchUser(setUserInfo, toastHandler);

  return (
    <AuthContext.Provider value={{userInfo, setUserInfo}}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuthData = () => { 
  const context = useContext(AuthContext);
  
  if (!context){
    throw new Error("Context not setup properly.")
  }
  return context;
}

export default useAuthData;