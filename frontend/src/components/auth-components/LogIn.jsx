import React, { useContext } from "react";

import { useNavigate } from "react-router-dom";

import Navbar from "../Navbar";

import { Helmet } from "react-helmet-async";

import AuthenticationContext from "../../store/auth/AuthenticationContext";

const LogIn = () => {
  const { logInCredentials, setLogInCredentials, handleLogIn, logInError } =
    useContext(AuthenticationContext);

  const navigate = useNavigate();

  const submitLogInCredentials = async (e) => {
    e.preventDefault();

    const loginSuccessful = await handleLogIn(
      logInCredentials.email,
      logInCredentials.password
    );

    if (loginSuccessful) {
      const response = await fetch("http://localhost:3000/auth/me", {
        credentials: "include",
      });

      const data = await response.json();

      if (data.user?.userType === "Host") {
        navigate("/host/homes");
      } else if (data.user?.userType === "Guest") {
        navigate("/user/homes");
      } else {
        navigate("/");
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>LogIn | StayMitra</title>
      </Helmet>

      <Navbar />

      <h2 className="mt-6 mb-6 text-center text-3xl font-semibold italic">
        LogIn
      </h2>

      <main className="flex justify-center px-4 pb-16">
        <section className="w-full max-w-2xl rounded-3xl border border-gray-800 bg-gray-900 p-6 shadow-[0px_0px_11px_-3px_white] sm:p-8">
          <form onSubmit={submitLogInCredentials}>
            {logInError && (
              <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
                <p className="font-medium text-red-400">⚠ {logInError}</p>
              </div>
            )}

            <div className="mb-6">
              <label
                htmlFor="email"
                className="mb-2 block text-[1rem] font-medium text-gray-300"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                name="email"
                placeholder="john@example.com"
                className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition placeholder:text-gray-400 focus:border-white focus:ring-2 focus:ring-white/10"
                onChange={(e) =>
                  setLogInCredentials({
                    ...logInCredentials,
                    email: e.target.value,
                  })
                }
                value={logInCredentials.email}
                required
              />
            </div>

            <div className="mb-8">
              <label
                htmlFor="password"
                className="mb-2 block text-[1rem] font-medium text-gray-300"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                name="password"
                className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition placeholder:text-gray-400 focus:border-white focus:ring-2 focus:ring-white/10"
                onChange={(e) =>
                  setLogInCredentials({
                    ...logInCredentials,
                    password: e.target.value,
                  })
                }
                value={logInCredentials.password}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-white px-5 py-3.5 font-semibold text-black transition duration-200 hover:bg-gray-200 active:scale-[0.98]"
            >
              LogIn
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default LogIn;
