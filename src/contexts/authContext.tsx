import React, { createContext, useState, useContext } from 'react';
import { Children, User, AuthContextType } from '../types/types';
import Toast from '../components/utils/Toast';
import { useFetchUser } from '../hooks/useFetchUser';

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

  const {isError, error}: any = useFetchUser(setUserInfo);

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

const useAuthData = () => { 
  const context = useContext(AuthContext);
  
  if (!context){
    throw new Error("Context not setup properly.")
  }
  return context;
}

export default useAuthData;