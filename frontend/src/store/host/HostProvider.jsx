import React, { useContext, useEffect, useState } from "react";
import HostContext from "./HostContext";

import {
  addHomeToServer,
  deleteHostHomeFromServer,
  getHostEditHomeFromServer,
  getHostHomeFromServer,
  getUserHomeFromServer,
  updateHostHomeToServer,
} from "../../services/hostService";
import AuthenticationContext from "../auth/AuthenticationContext";

const HostProvider = ({ children }) => {
  const [hostHomes, setHostHomes] = useState([]);
  const [hostEditHome, setHostEditHome] = useState({});
  const { loggedInUserInfo } = useContext(AuthenticationContext);
  const [userHomes, setUserHomes] = useState([]);

  const [home, setHome] = useState({
    houseName: "",
    houseArea: "",
    houseRent: 0,
    houseImage: [],
    houseOwner: "",
  });

  const loadHostHomes = async () => {
    try {
      const homes = await getHostHomeFromServer();

      setHostHomes(homes);
    } catch (error) {
      console.log("Error fetching homes:", error);
    }
  };

  const loadUserHomes = async () => {
    try {
      const userHome = await getUserHomeFromServer();

      setUserHomes(userHome);
    } catch (error) {
      console.log("Error fetching homes:", error);
    }
  };

  useEffect(() => {
    loadUserHomes();
  }, []);

  useEffect(() => {
    if (loggedInUserInfo?.userId) {
      loadHostHomes();
    } else {
      setHostHomes([]);
    }
  }, [loggedInUserInfo?.userId]);

  const addHome = async (
    houseName,
    houseArea,
    houseRent,
    houseImage,
    houseOwner
  ) => {
    try {
      await addHomeToServer(
        houseName,
        houseArea,
        houseRent,
        houseOwner,
        houseImage
      );

      await loadHostHomes();
    } catch (error) {
      console.log("Error adding home:", error);
    }
  };

  const resetHome = () => {
    setHome({
      houseName: "",
      houseArea: "",
      houseRent: 0,
      houseImage: [],
      houseOwner: "",
    });
  };

  const editHome = async (houseId) => {
    try {
      const editHouse = await getHostEditHomeFromServer(houseId);

      setHostEditHome(editHouse);
      setHome({
        houseName: editHouse?.houseName,
        houseArea: editHouse?.houseArea,
        houseRent: editHouse?.houseRent,
        houseImage: [],
        houseOwner: editHouse?.houseOwner,
      });
    } catch (error) {
      console.log("err", error);
    }
  };

  const updateHome = async (e, houseId) => {
    e.preventDefault();

    try {
      await updateHostHomeToServer(
        houseId,
        home.houseName,
        home.houseArea,
        home.houseRent,
        home.houseOwner,
        home.houseImage
      );
      await loadHostHomes();
    } catch (error) {
      console.log("err", error);
    }
  };

  const deleteHostHome = async (houseId) => {
    const delHomeId = await deleteHostHomeFromServer(houseId);

    const houseLeft = hostHomes.filter(
      (home) => home.houseId !== Number(delHomeId)
    );
    setHostHomes(houseLeft);
  };

  return (
    <HostContext.Provider
      value={{
        home,
        hostHomes,
        userHomes,

        setHome,
        addHome,
        editHome,
        updateHome,
        resetHome,
        deleteHostHome,
      }}
    >
      {children}
    </HostContext.Provider>
  );
};

export default HostProvider;
