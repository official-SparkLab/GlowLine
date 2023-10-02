// AuthContext.js
import axios from "axios";
import React, { createContext, useState, useContext } from "react";
import {toast } from "react-toastify";
import { GlobalService } from "../service/GlobalService";


const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [useremail, setUserEmail] = useState("");

  const handleLogin = () => {
    // Check if the user is using the default admin credentials
    if (useremail === "admin" && password === "password") {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn",true);
      localStorage.setItem("username", "admin"); // Set the admin username
      toast.success("Login Successful", {
        // Customize the success message for admin login
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      window.location.href = "/";
      return; // Exit the function to prevent making an API call
    }

    axios
      .post(`${GlobalService.path}/userLogin`, {
        user_email: useremail,
        user_password: password,
      })
      .then((response) => {
        const { name, message } = response.data;
        if (message) {
          setIsLoggedIn(true);
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("username", name);
          toast.success("Login Successful", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          window.location.href = "/";
        } else {
          toast.error("Login Failed!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch((error) => {
        console.error("API Error:", error);
        toast.error("Login Failed! please check username and password and try again.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.clear();
    window.location.replace('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        username,
        setUsername,
        password,
        setPassword,
        useremail,
        setUserEmail,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext easily in functional components
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };