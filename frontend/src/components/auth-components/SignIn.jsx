import React, { useContext } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "../Navbar";
import AuthenticationContext from "../../store/auth/AuthenticationContext";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const { signInCredentials, setSignInCredentials, newUser, signInError } =
    useContext(AuthenticationContext);
  const navigateTo = useNavigate();

  const submitSignInCredentials = async (e) => {
    e.preventDefault();

    const success = await newUser(
      signInCredentials.firstName,
      signInCredentials.lastName,
      signInCredentials.email,
      signInCredentials.password,
      signInCredentials.confirmPassword,
      signInCredentials.userType
    );

    if (success) {
      navigateTo("/logIn");
    }
  };
  return (
    <>
      <Helmet>
        <title>SignIn</title>
      </Helmet>

      <Navbar />

      <h2 className="mt-6 mb-6 text-center text-3xl font-semibold italic">
        Create your account
      </h2>

      <main className="flex justify-center px-4 pb-16">
        <section className="w-full max-w-2xl rounded-3xl border border-gray-800 bg-gray-900 p-6 shadow-[0px_0px_11px_-3px_white] sm:p-8">
          <form onSubmit={submitSignInCredentials}>
            {Array.isArray(signInError) && signInError.length > 0 && (
              <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
                {signInError.map((err, index) => (
                  <p
                    key={index}
                    className="flex items-center gap-2 mt-2 font-medium text-red-400"
                  >
                    <span className="text-red-500">⚠</span>
                    {err}
                  </p>
                ))}
              </div>
            )}

            <div className="mb-6">
              <label
                htmlFor="firstName"
                className="mb-2 block text-[1rem] font-medium text-gray-300"
              >
                First Name
              </label>

              <input
                id="firstName"
                type="text"
                name="firstName"
                placeholder="John"
                className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition placeholder:text-gray-400 focus:border-white focus:ring-2 focus:ring-white/10"
                onChange={(e) =>
                  setSignInCredentials({
                    ...signInCredentials,
                    firstName: e.target.value,
                  })
                }
                value={signInCredentials.firstName}
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="lastName"
                className="mb-2 block text-[1rem] font-medium text-gray-300"
              >
                Last Name
              </label>

              <input
                id="lastName"
                type="text"
                name="lastName"
                placeholder="Doe"
                className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition placeholder:text-gray-400 focus:border-white focus:ring-2 focus:ring-white/10"
                onChange={(e) =>
                  setSignInCredentials({
                    ...signInCredentials,
                    lastName: e.target.value,
                  })
                }
                value={signInCredentials.lastName}
                required
              />
            </div>

            {/* Email */}
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
                  setSignInCredentials({
                    ...signInCredentials,
                    email: e.target.value,
                  })
                }
                value={signInCredentials.email}
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
                  setSignInCredentials({
                    ...signInCredentials,
                    password: e.target.value,
                  })
                }
                value={signInCredentials.password}
                required
              />
            </div>

            <div className="mb-8">
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-[1rem] font-medium text-gray-300"
              >
                Confirm Password
              </label>

              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                className="w-full rounded-xl border border-gray-700 bg-gray-950 px-4 py-3 text-white outline-none transition placeholder:text-gray-400 focus:border-white focus:ring-2 focus:ring-white/10"
                onChange={(e) =>
                  setSignInCredentials({
                    ...signInCredentials,
                    confirmPassword: e.target.value,
                  })
                }
                value={signInCredentials.confirmPassword}
                required
              />
            </div>

            <div className="mb-8">
              <p className="mb-3 text-[1rem] font-medium text-gray-300">
                Register as
              </p>

              <div className="grid grid-cols-2 gap-4">
                <label
                  htmlFor="host"
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-600 bg-gray-950 px-4 py-3 text-gray-200 transition hover:border-white hover:bg-gray-800"
                >
                  <input
                    type="radio"
                    name="userType"
                    value="Host"
                    id="host"
                    className="h-5 w-5 accent-white"
                    onChange={(e) =>
                      setSignInCredentials({
                        ...signInCredentials,
                        userType: e.target.value,
                      })
                    }
                    required
                  />

                  <span className="font-medium">Host</span>
                </label>

                <label
                  htmlFor="user"
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-600 bg-gray-950 px-4 py-3 text-gray-200 transition hover:border-white hover:bg-gray-800"
                >
                  <input
                    type="radio"
                    name="userType"
                    value="Guest"
                    id="user"
                    className="h-5 w-5 accent-white"
                    onChange={(e) =>
                      setSignInCredentials({
                        ...signInCredentials,
                        userType: e.target.value,
                      })
                    }
                    required
                  />

                  <span className="font-medium">Guest</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-white px-5 py-3.5 font-semibold text-black transition duration-200 hover:bg-gray-200 active:scale-[0.98]"
            >
              Create Account
            </button>
          </form>
        </section>
      </main>
    </>
  );
};

export default SignIn;
