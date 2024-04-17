import "../css/Login.css";

import React, { FormEvent, useState, useEffect } from 'react';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { ButtonText } from "../types/types";
import { useCheckEmail } from "../hooks/useCheckEmail";
import { useLogin } from "../hooks/useLogin";
import useToastContext from "../contexts/ToastContext";
import useAuthData from "../contexts/authContext";

const Login = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isEmailExist, setIsEmailExist] = useState(false);

  const { toastHandler } = useToastContext();
  const { setUserInfo } = useAuthData();

  useEffect(() => {
    if (Cookies.get("session_id")){
      navigate("/dashboard");
    }
  }, []);

  const resetFields = () => {
    setEmail("");
    setPassword("");
    setError("");
  }

  const { 
    mutate: checkEmailMutation
  } = useCheckEmail(setIsEmailExist, setError, toastHandler);  

  const { 
    mutate: logInMutation
  } = useLogin(resetFields, setError, toastHandler, setUserInfo, navigate);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isEmailExist){
      if (!(email && password)){
        setError("Missing Credentials.");
        return;
      }
      logInMutation({email, password});
    } else {
      if (!email.trim()){
        setError("Missing Email.");
        return;
      }
      checkEmailMutation(email);
    }
    setError("");
  }

  return (
    <div className='organization_login-wrapper'>
      <div className="organization-login_container">
        <div className="organization-login_sub-container">
          <h1>inkling</h1>
          <div className="organization-login_form-container">
            <h3>Welcome to Habitat</h3>
            <form className="organization-login_form" onSubmit={submitHandler}>
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
                {isEmailExist ? ButtonText.LogIn: ButtonText.Next}
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
