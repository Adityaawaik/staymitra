import { createContext } from "react";

const defaultValues = {
  signInCredentials: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: "",
  },
  logInCredentials: {
    email: "",
    password: "",
  },
  signInError: [],
  logInError: "",
  loggedInUserInfo: null,
  isAuthLoading: true,

  setSignInCredentials: () => {},
  newUser: () => {},
  setLogInCredentials: () => {},
  handleLogIn: () => {},
  handleLogOut: () => {},
  deleteAccount: () => {},
  setLoggedInUserInfo: () => {},
};

const AuthenticationContext = createContext(defaultValues);

export default AuthenticationContext;
