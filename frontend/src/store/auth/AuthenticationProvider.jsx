import React, { useEffect, useState } from "react";

import AuthenticationContext from "./AuthenticationContext";

import {
  LogInUser,
  signInUser,
  getCurrentUser,
  logOutUser,
  deleteAccountFromServer,
} from "../../services/authService";

const AuthenticationProvider = ({ children }) => {
  const [signInCredentials, setSignInCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
  });

  const [signInError, setSignInError] = useState([]);
  const [logInCredentials, setLogInCredentials] = useState({
    email: "",
    password: "",
  });
  const [logInError, setLogInError] = useState("");
  const [loggedInUserInfo, setLoggedInUserInfo] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const user = await getCurrentUser();

        if (user) {
          setLoggedInUserInfo(user);
        } else {
          setLoggedInUserInfo(null);
        }
      } catch (error) {
        console.error("Could not restore session:", error);

        setLoggedInUserInfo(null);
      } finally {
        setIsAuthLoading(false);
      }
    };

    checkCurrentUser();
  }, []);

  const newUser = async (
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    userType
  ) => {
    try {
      await signInUser(
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
        userType
      );

      setSignInError([]);

      return true;
    } catch (error) {
      const errors = Array.isArray(error?.error)
        ? error.error
        : ["Something went wrong. Please try again."];

      setSignInError(errors);

      return false;
    }
  };

  const handleLogIn = async (email, password) => {
    try {
      const response = await LogInUser(email, password);
      setLoggedInUserInfo(response.user);
      setLogInError("");
      return true;
    } catch (error) {
      console.log(error?.error);
      setLogInError(error?.error || "Something went wrong. Please try again.");
      return false;
    }
  };

  const handleLogOut = async () => {
    try {
      await logOutUser();
      setLoggedInUserInfo(null);
      setLogInCredentials({
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const deleteAccount = async (userId) => {
    try {
      const id = Number(userId);
      await deleteAccountFromServer(id);
    } catch (error) {
      console.log("err", error);
    }
  };

  return (
    <AuthenticationContext.Provider
      value={{
        signInCredentials,
        signInError,
        logInCredentials,
        logInError,
        loggedInUserInfo,
        isAuthLoading,

        setLogInCredentials,
        setSignInCredentials,
        newUser,
        handleLogIn,
        handleLogOut,
        deleteAccount,
        setLoggedInUserInfo,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
