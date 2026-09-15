import React, { useContext } from "react";
import Navbar from "./Navbar.jsx";
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import AuthenticationContext from "../store/auth/AuthenticationContext.jsx";

const Index = () => {
  const { loggedInUserInfo } = useContext(AuthenticationContext);
  console.log(loggedInUserInfo);
  return (
    <>
      <Helmet>
        <title>StayMitra | Your Living Space</title>
      </Helmet>

      <div className="min-h-screen bg-gray-700 text-white">
        <Navbar />

        <main className="flex min-h-[calc(100vh-64px)] items-center justify-center px-6">
          <section className="w-full max-w-4xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-gray-400">
              Welcome to StayMitra
            </p>

            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Your Home,
              <span className="block text-gray-300">Your Space.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">
              Manage your homes, showcase your spaces, and make them available
              to people looking for a comfortable place to stay.
            </p>

            {loggedInUserInfo?.userType === "Host" && (
              <div className="mx-auto mt-10 max-w-md rounded-3xl border border-gray-700 bg-gray-900 p-8 shadow-[0px_0px_20px_-8px_white]">
                <div className="mb-5 text-5xl">🏡</div>

                <h2 className="text-2xl font-semibold">
                  Ready to add your home?
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  Add your property and start managing your living space with
                  StayMitra.
                </p>

                <NavLink
                  to="/host/add-home"
                  className="mt-7 block w-full rounded-xl bg-white px-6 py-3.5 font-semibold text-black transition duration-200 hover:bg-gray-200 active:scale-[0.98]"
                >
                  + Add Home
                </NavLink>
              </div>
            )}

            {loggedInUserInfo?.userType === "Guest" && (
              <div className="mx-auto mt-10 max-w-md rounded-3xl border border-gray-700 bg-gray-900 p-8 shadow-[0px_0px_20px_-8px_white]">
                <div className="mb-5 text-5xl">🏡</div>

                <p className="mt-2 text-sm leading-6 text-gray-400">
                  Check our latest home
                </p>

                <NavLink
                  to="/user/homes"
                  className="mt-7 block w-full rounded-xl bg-white px-6 py-3.5 font-semibold text-black transition duration-200 hover:bg-gray-200 active:scale-[0.98]"
                >
                  Homes
                </NavLink>
              </div>
            )}
          </section>
        </main>
      </div>
    </>
  );
};

export default Index;
