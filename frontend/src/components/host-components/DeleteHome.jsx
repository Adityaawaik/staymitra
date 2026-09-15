import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HostContext from "../../store/host/HostContext";

const DeleteHome = () => {
  const { houseId } = useParams();
  const { deleteHostHome } = useContext(HostContext);
  const navigate = useNavigate();

  console.log("delete home id", houseId);

  useEffect(() => {
    deleteHostHome(houseId);
    navigate("/host/homes");
  }, [houseId]);
};

export default DeleteHome;
