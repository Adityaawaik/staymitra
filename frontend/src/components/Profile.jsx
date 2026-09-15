import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "./Navbar";
import AuthenticationContext from "../store/auth/AuthenticationContext";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const { loggedInUserInfo, deleteAccount, setLoggedInUserInfo } = useContext(
    AuthenticationContext
  );

  const { userId } = useParams();
  const navigateTo = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount(userId);
      setLoggedInUserInfo(null);
      navigateTo("/signIn");
    } catch (error) {
      console.log("err", error);
    }
  };

  if (!loggedInUserInfo) {
    return (
      <>
        <Navbar />

        <main className="min-h-[calc(100vh-80px)] bg-gray-950 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
              <span className="text-2xl">👤</span>
            </div>

            <h2 className="text-xl font-semibold text-white">
              Profile not available
            </h2>

            <p className="mt-2 text-gray-400">
              Please log in to view your profile.
            </p>
          </div>
        </main>
      </>
    );
  }

  const { firstName, lastName, userType } = loggedInUserInfo;

  const initials = `${firstName?.charAt(0) || ""}${
    lastName?.charAt(0) || ""
  }`.toUpperCase();

  return (
    <>
      <Helmet>
        <title>{`StayMitra | profile/${loggedInUserInfo.firstName}`}</title>
      </Helmet>

      <Navbar />

      <main className="min-h-[calc(100vh-80px)] bg-gray-900 px-4 py-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <p className="text-sm text-orange-400 font-medium mb-2">ACCOUNT</p>

            <h1 className="text-3xl md:text-4xl font-bold text-white">
              My Profile
            </h1>

            <p className="mt-2 text-gray-400">
              Manage your StayMitra account information.
            </p>
          </div>

          <section className="bg-gray-900 border border-gray-800 rounded-3xl p-6 md:p-8 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <div className="w-24 h-24 shrink-0 rounded-full bg-linear-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
                <span className="text-3xl font-bold text-white">
                  {initials}
                </span>
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    {firstName} {lastName}
                  </h2>

                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20 capitalize">
                    {userType}
                  </span>
                </div>

                <p className="mt-2 text-gray-400">
                  Welcome back to StayMitra 👋
                </p>
              </div>
            </div>
          </section>

          <section className="mt-6 bg-gray-900 border border-gray-800 rounded-3xl p-6 md:p-8">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white">
                Personal Information
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                Your basic account details
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-5">
                <p className="text-sm text-gray-500 mb-2">First Name</p>
                <p className="text-lg font-medium text-white">{firstName}</p>
              </div>

              <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-5">
                <p className="text-sm text-gray-500 mb-2">Last Name</p>
                <p className="text-lg font-medium text-white">{lastName}</p>
              </div>

              <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-5">
                <p className="text-sm text-gray-500 mb-2">Account Type</p>
                <p className="text-lg font-medium text-white capitalize">
                  {userType}
                </p>
              </div>

              <div className="bg-gray-800/60 border border-gray-700 rounded-2xl p-5">
                <p className="text-sm text-gray-500 mb-2">Account Status</p>

                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>

                  <p className="text-lg font-medium text-green-400">Active</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mt-6 bg-linear-to-r from-orange-500/10 to-transparent border border-orange-500/20 rounded-3xl p-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 shrink-0 rounded-2xl bg-orange-500/10 flex items-center justify-center">
                <span className="text-xl">
                  {userType?.toLowerCase() === "host" ? "🏠" : "🧳"}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white">
                  {userType?.toLowerCase() === "host"
                    ? "Host Account"
                    : "Guest Account"}
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  {userType?.toLowerCase() === "host"
                    ? "You can list and manage your properties on StayMitra."
                    : "You can explore homes and manage your favorite properties."}
                </p>
              </div>
            </div>
          </section>

          <section className="mt-6 bg-linear-to-r from-orange-500/10 to-transparent border border-orange-500/20 rounded-3xl p-6">
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleDeleteAccount}
                className="font-bold  w-full cursor-pointer block"
              >
                Delete Account
              </button>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Profile;
