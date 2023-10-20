import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import {useAuth} from "./Utils/AuthContext"
import { useNavigate } from "react-router-dom";
import { ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {

  useEffect(()=>{
    if(localStorage.getItem("isLoggedIn"))
    {
      window.location.href = '/';
    }
    else{
      navigate('/login');
    }
  },[]);
  const {
    isLoggedIn,
    password,
    useremail,
    setUserEmail,
    setPassword,
    handleLogin,
  } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (event) => {
    setUserEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    handleLogin();
  };


  return (
    <Container>
      <ToastContainer />
      <LoginBox>
        <Logo>
          <h1>Welcome to GlowLine</h1>
        </Logo>
     
        <InputWrapper>
          <IconWrapper>
            <FontAwesomeIcon icon={faUser} />
          </IconWrapper>
          <Input
            type="text"
            placeholder="Enter Email Address"
            value={useremail}
            onChange={handleEmailChange}
            
          />
        </InputWrapper>
        <InputWrapper>
          <IconWrapper>
            <FontAwesomeIcon icon={faLock} />
          </IconWrapper>
          <PasswordInput
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <PasswordToggle onClick={togglePasswordVisibility}>
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </PasswordToggle>
        </InputWrapper>
        <LoginButton onClick={handleLoginSubmit}>Login</LoginButton>
        
      </LoginBox>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ebf0f3;
`;

const LoginBox = styled.div`
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 30px;

  h1 {
    color: #333333;
    font-size: 30px;
    margin-bottom: 5px;
    font-weight: 350;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const IconWrapper = styled.div`
  background-color: #ebf0f3;
  padding: 10px;
  border-right: 1px solid #ccc;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;

  svg {
    color: #666666;
    font-size: 18px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: none;
  font-size: 16px;
  color: #333333;
  outline: none;
`;

const PasswordInput = styled(Input)`
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
`;

const PasswordToggle = styled.button`
  background-color: transparent;
  border: none;
  padding: 10px;
  cursor: pointer;
`;

const LoginButton = styled.button`
  display: block;
  width: 100%;
  padding: 14px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;

  &:hover {
    background-color: #45a049;
  }
`;


export default Login;