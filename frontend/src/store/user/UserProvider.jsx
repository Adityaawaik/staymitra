import React, { useContext, useEffect, useState } from "react";

import UserContext from "./UserContext";

import {
  addUserFavHomeToServer,
  getUserFavHomesFromServer,
  homeDetailFromServer,
  removeUserFavHomeFromServer,
} from "../../services/userService";

import HostContext from "../host/HostContext";
import AuthenticationContext from "../auth/AuthenticationContext";

const UserProvider = ({ children }) => {
  const { userHomes, hostHomes } = useContext(HostContext);
  const { loggedInUserInfo } = useContext(AuthenticationContext);
  const [favIds, setFavIds] = useState([]);
  const [favHomes, setFavHomes] = useState([]);
  const [houseDetail, setHouseDetail] = useState([]);

  const favIdHome = async (houseId) => {
    try {
      const savedHouseId = await addUserFavHomeToServer(houseId);

      setFavIds((prevIds) => {
        if (prevIds.includes(savedHouseId)) {
          return prevIds;
        }

        return [...prevIds, savedHouseId];
      });
    } catch (error) {
      console.log("Error adding favourite:", error);
    }
  };

  const fetchUserFavHomes = async () => {
    try {
      const favHomesFromServer = await getUserFavHomesFromServer();

      const houseIds = favHomesFromServer.map((home) => home.houseId);

      setFavIds(houseIds);
    } catch (error) {
      console.log("Error fetching favourites:", error);
    }
  };

  useEffect(() => {
    if (loggedInUserInfo?.userId) {
      fetchUserFavHomes();
    } else {
      setFavIds([]);
      setFavHomes([]);
    }
  }, [loggedInUserInfo?.userId]);

  useEffect(() => {
    const userFavHomes = userHomes.filter((home) =>
      favIds.includes(home.houseId)
    );
    setFavHomes(userFavHomes);
  }, [favIds, userHomes, hostHomes]);

  const removeUserFavHome = async (houseId) => {
    try {
      await removeUserFavHomeFromServer(houseId);
      setFavIds((prevIds) => prevIds.filter((id) => id !== houseId));
    } catch (error) {
      console.log("Error removing favourite:", error);
    }
  };

  const userHomeDetail = async (houseId) => {
    try {
      const homeDetail = await homeDetailFromServer(houseId);
      setHouseDetail(homeDetail);
    } catch (error) {
      console.log("err", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        favIds,
        favHomes,
        houseDetail,

        favIdHome,
        removeUserFavHome,
        userHomeDetail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
