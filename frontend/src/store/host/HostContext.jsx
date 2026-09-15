import { createContext } from "react";

const defaultValues = {
  home: {
    houseName: "",
    houseArea: "",
    houseRent: 0,
    houseImage: [],
    houseOwner: "",
    userId: null,
  },
  hostHomes: [],
  userHomes: [],

  setHome: () => {},
  addHome: () => {},
  editHome: () => {},
  updateHome: () => {},
  resetHome: () => {},
  deleteHostHome: () => {},
};

const HostContext = createContext(defaultValues);

export default HostContext;
