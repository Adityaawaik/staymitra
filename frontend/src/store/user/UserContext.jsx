import React, { createContext } from "react";

const defaultValue = {
  favHomes: [],
  houseDetail: [],

  favIdHome: () => {},
  removeUserFavHome: () => {},
  userHomeDetail: () => {},
};

const UserContext = createContext(defaultValue);

export default UserContext;
