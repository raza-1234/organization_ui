import "../css/Login.css";

import React, { FormEvent, useState, useEffect } from 'react';
import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import api from "../axios/api";
import { STATUS_TEXT } from "../types/types";
import UseAuthData from "../contexts/authContext";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isEmailExist, setIsEmailExist] = useState(false);
  const {userInfo, setUserInfo} = UseAuthData();

  useEffect(() => {    
    if (userInfo?.email){      
      navigate("/dashboard");
    }
  }, [userInfo?.email]);

  const checkEmail = async () => {    
    try {
      const response: AxiosResponse = await api.post("check-email", { email });
      if (response?.statusText !== STATUS_TEXT){
        return {};
      }
      return response.data;
    } catch (err: any){      
      console.log("CheckEmail: Something went wrong", err);
      throw new Error(err.response?.data?.message || "Something went wrong. Please try again.");
    }
  }

  const { mutate: checkEmailMutation } = useMutation(checkEmail, {
    onSuccess: () => {
      setIsEmailExist(true);
      setError("");
    },
    onError: (err: any) => {
      setError(err.message || "Something went wrong. Please try again.")
    }
  });

  const submitEmailHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()){
      setError("Missing Email.");
      return;
    }
    checkEmailMutation();
  }

  const loginUser = async () => {
    try {
      const response: AxiosResponse = await api.post("login", { email, password });
      if (response?.statusText !== STATUS_TEXT){
        return {};
      }
      return response.data.user;
    } catch (err: any){
      console.log("LoginUser: Something went wrong", err);
      throw new Error(err.response?.data?.message || "Somethong went wrong. Please try again.");
    }
  }

  const { mutate: loginUserMutation } = useMutation(loginUser, {
    onSuccess: (data) => {      
      setUserInfo(data);
      navigate("/dashboard");
      setEmail("");
      setPassword("");
      setError("");
    },
    onError: (err: any) => {
      setError(err.message || "Somwthing went wrong. Please try again.")
    }
  });

  const submitLoginHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!(email && password)){
      setError("Missing Credentials.");
      return;
    }
    loginUserMutation();
  }

  return (
    <div className='organization_login-wrapper'>
      <div className="organization-login_container">
        <div className="organization-login_sub-container">
          <h1>inkling</h1>
          <div className="organization-login_form-container">
            <h3>Welcome to Habitat</h3>
            <form className="organization-login_form" onSubmit={isEmailExist? submitLoginHandler: submitEmailHandler}>
              <input
                placeholder="Email Address"
                className="organization-login_fields"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {
                isEmailExist && 
                <input
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="organization-login_fields"
                />
              }
              <button
                className= {`organization-login-fields 
                  ${isEmailExist ? 'organization-login-form_button': 'organization-email-form_button'}`
                }
              >
                {isEmailExist ? "log in": "next"}
              </button>
            </form>
          </div>
        </div>
        {
          error &&
          <div className="organization_input-field-error">
            <p>{error}</p>
          </div>
        }
      </div>
    </div>
  )
}

export default Login
