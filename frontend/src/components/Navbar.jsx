import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthenticationContext from "../store/auth/AuthenticationContext";
import { IoMenu, IoClose } from "react-icons/io5";

const Navbar = () => {
  const { loggedInUserInfo, handleLogOut } = useContext(AuthenticationContext);
  const navigateTo = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkStyles = ({ isActive }) =>
    `px-4 py-2 rounded-full text-[1.05rem] font-medium transition-all duration-200
    ${
      isActive
        ? "bg-white text-black shadow-md"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  const userType = loggedInUserInfo?.userType;

  const userLoggedOut = async () => {
    await handleLogOut();
    setMenuOpen(false);
    navigateTo("/");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-800 backdrop-blur-md shadow-[0px_1px_5px_-2px_white]">
      <div className="mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <NavLink
          to="/"
          onClick={closeMenu}
          className="text-2xl font-bold tracking-tight text-white"
        >
          Stay
          <span className="text-gray-400">Mitra</span>
        </NavLink>

        <nav className="hidden items-center gap-2 rounded-full border border-gray-800 bg-gray-900 p-1.5 shadow-lg sm:flex">
          {!loggedInUserInfo && (
            <>
              <NavLink to="/logIn" className={navLinkStyles}>
                LogIn
              </NavLink>

              <NavLink to="/signIn" className={navLinkStyles}>
                SignIn
              </NavLink>
            </>
          )}

          {loggedInUserInfo && userType === "Host" && (
            <>
              <NavLink to="/host/homes" className={navLinkStyles}>
                Host Homes
              </NavLink>

              <NavLink to="/host/add-home" className={navLinkStyles}>
                Add Home
              </NavLink>

              <NavLink
                to={`/host/profile/${loggedInUserInfo.firstName}/${loggedInUserInfo.userId}/${loggedInUserInfo.userType}`}
                className={navLinkStyles}
              >
                Profile
              </NavLink>

              <button
                onClick={userLoggedOut}
                className="rounded-full px-4 py-2 text-[1.05rem] font-medium text-gray-300 transition-all duration-200 hover:bg-red-500 hover:text-white"
              >
                LogOut
              </button>
            </>
          )}

          {loggedInUserInfo && userType === "Guest" && (
            <>
              <NavLink to="/user/homes" className={navLinkStyles}>
                Homes
              </NavLink>

              <NavLink to="/user/fav-homes" className={navLinkStyles}>
                Fav Homes
              </NavLink>

              <NavLink
                to={`/user/profile/${loggedInUserInfo.firstName}/${loggedInUserInfo.userId}/${loggedInUserInfo.userType}`}
                className={navLinkStyles}
              >
                Profile
              </NavLink>

              <button
                onClick={userLoggedOut}
                className="rounded-full px-4 py-2 text-[1.05rem] font-medium text-gray-300 transition-all duration-200 hover:bg-red-500 hover:text-white"
              >
                LogOut
              </button>
            </>
          )}
        </nav>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="block cursor-pointer text-3xl text-white sm:hidden"
        >
          {menuOpen ? <IoClose /> : <IoMenu />}
        </button>
      </div>

      {menuOpen && (
        <div className="border-t border-gray-700 bg-gray-900 px-6 py-4 sm:hidden">
          <nav className="flex flex-col gap-2">
            {!loggedInUserInfo && (
              <>
                <NavLink
                  to="/logIn"
                  onClick={closeMenu}
                  className={navLinkStyles}
                >
                  LogIn
                </NavLink>

                <NavLink
                  to="/signIn"
                  onClick={closeMenu}
                  className={navLinkStyles}
                >
                  SignIn
                </NavLink>
              </>
            )}

            {loggedInUserInfo && userType === "Host" && (
              <>
                <NavLink
                  to="/host/homes"
                  onClick={closeMenu}
                  className={navLinkStyles}
                >
                  Host Homes
                </NavLink>

                <NavLink
                  to="/host/add-home"
                  onClick={closeMenu}
                  className={navLinkStyles}
                >
                  Add Home
                </NavLink>

                <NavLink
                  to={`/host/profile/${loggedInUserInfo.firstName}/${loggedInUserInfo.userId}/${loggedInUserInfo.userType}`}
                  onClick={closeMenu}
                  className={navLinkStyles}
                >
                  Profile
                </NavLink>

                <button
                  onClick={userLoggedOut}
                  className="rounded-full px-4 py-2 text-left text-[1.05rem] font-medium text-gray-300 transition-all duration-200 hover:bg-red-500 hover:text-white"
                >
                  LogOut
                </button>
              </>
            )}

            {loggedInUserInfo && userType === "Guest" && (
              <>
                <NavLink
                  to="/user/homes"
                  onClick={closeMenu}
                  className={navLinkStyles}
                >
                  Homes
                </NavLink>

                <NavLink
                  to="/user/fav-homes"
                  onClick={closeMenu}
                  className={navLinkStyles}
                >
                  Fav Homes
                </NavLink>

                <NavLink
                  to={`/user/profile/${loggedInUserInfo.firstName}/${loggedInUserInfo.userId}/${loggedInUserInfo.userType}`}
                  onClick={closeMenu}
                  className={navLinkStyles}
                >
                  Profile
                </NavLink>

                <button
                  onClick={userLoggedOut}
                  className="rounded-full px-4 py-2 text-left text-[1.05rem] font-medium text-gray-300 transition-all duration-200 hover:bg-red-500 hover:text-white"
                >
                  LogOut
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
