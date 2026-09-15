import { Navigate, Route, Routes } from "react-router-dom";

import "./App.css";

import UserHomes from "./components/user-components/UserHomes";
import FavHomes from "./components/user-components/FavHomes";
import HostHomes from "./components/host-components/HostHomes";
import AddHome from "./components/host-components/AddHome";
import DeleteHome from "./components/host-components/DeleteHome";

import LogIn from "./components/auth-components/LogIn";
import SignIn from "./components/auth-components/SignIn";

import Index from "./components/Index";
import HomeDetail from "./components/user-components/HomeDetail";

import { useContext } from "react";

import AuthenticationContext from "./store/auth/AuthenticationContext";
import Profile from "./components/Profile";

function App() {
  const { loggedInUserInfo, isAuthLoading } = useContext(AuthenticationContext);

  if (isAuthLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-700 text-white">
        <div className="text-center">
          <div className="mb-4 text-3xl font-bold">
            Stay<span className="text-gray-400">Mitra</span>
          </div>

          <p className="text-gray-300">Loading...</p>
        </div>
      </div>
    );
  }

  const userType = loggedInUserInfo?.userType;

  return (
    <div className="min-h-screen bg-gray-700 text-white">
      <Routes>
        <Route path="/" element={<Index />} />

        <Route
          path="/logIn"
          element={
            loggedInUserInfo ? (
              <Navigate
                to={userType === "Host" ? "/host/homes" : "/user/homes"}
                replace
              />
            ) : (
              <LogIn />
            )
          }
        />

        <Route
          path="/signIn"
          element={
            loggedInUserInfo ? (
              <Navigate
                to={userType === "Host" ? "/host/homes" : "/user/homes"}
                replace
              />
            ) : (
              <SignIn />
            )
          }
        />

        <Route
          path="/user/homes"
          element={
            userType === "Guest" ? (
              <UserHomes />
            ) : (
              <Navigate to="/logIn" replace />
            )
          }
        />

        <Route
          path="/user/fav-homes"
          element={
            userType === "Guest" ? (
              <FavHomes />
            ) : (
              <Navigate to="/logIn" replace />
            )
          }
        />

        <Route
          path="/user/home-detail/:houseId"
          element={
            userType === "Guest" ? (
              <HomeDetail />
            ) : (
              <Navigate to="/logIn" replace />
            )
          }
        />

        <Route
          path="/user/profile/:userName/:userId/:typeOfUser"
          element={
            userType === "Guest" ? (
              <Profile />
            ) : (
              <Navigate to="/logIn" replace />
            )
          }
        />

        <Route
          path="/host/homes"
          element={
            userType === "Host" ? (
              <HostHomes />
            ) : (
              <Navigate to="/logIn" replace />
            )
          }
        />

        <Route
          path="/host/add-home"
          element={
            userType === "Host" ? <AddHome /> : <Navigate to="/logIn" replace />
          }
        />

        <Route
          path="/host/edit-home/:houseId"
          element={
            userType === "Host" ? <AddHome /> : <Navigate to="/logIn" replace />
          }
        />

        <Route
          path="/host/delete-home/:houseId"
          element={
            userType === "Host" ? (
              <DeleteHome />
            ) : (
              <Navigate to="/logIn" replace />
            )
          }
        />

        <Route
          path="/host/profile/:hostName/:hostId/:typeOfUser"
          element={
            userType === "Host" ? <Profile /> : <Navigate to="/logIn" replace />
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to={
                loggedInUserInfo
                  ? userType === "Host"
                    ? "/host/homes"
                    : "/user/homes"
                  : "/logIn"
              }
              replace
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
