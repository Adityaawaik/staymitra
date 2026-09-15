const API_URL = import.meta.env.VITE_API_URL;

export const addHomeToServer = async (
  houseName,
  houseArea,
  houseRent,
  houseOwner,
  houseImage
) => {
  const formData = new FormData();
  formData.append("houseName", houseName);
  formData.append("houseArea", houseArea);
  formData.append("houseRent", houseRent);
  formData.append("houseOwner", houseOwner);

  houseImage.map((image) => formData.append("houseImage", image));

  const response = await fetch(`${API_URL}/host/add-home`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });
  return response.json();
};

export const getHostHomeFromServer = async () => {
  const response = await fetch(`${API_URL}/host/homes`, {
    method: "GET",
    credentials: "include",
  });
  return response.json();
};

export const getHostEditHomeFromServer = async (houseId) => {
  console.log(houseId);
  try {
    const response = await fetch(`${API_URL}/host/edit-home/${houseId}`, {
      method: "GET",
    });
    return response.json();
  } catch (error) {
    console.log("err", error);
  }
};

export const updateHostHomeToServer = async (
  houseId,
  houseName,
  houseArea,
  houseRent,
  houseOwner,
  houseImage
) => {
  const formData = new FormData();
  formData.append("houseId", houseId);
  formData.append("houseName", houseName);
  formData.append("houseArea", houseArea);
  formData.append("houseRent", houseRent);
  formData.append("houseOwner", houseOwner);

  houseImage.map((image) => formData.append("houseImage", image));

  const response = await fetch(`${API_URL}/host/edit-home`, {
    method: "POST",
    body: formData,
  });
  return response.json();
};

export const deleteHostHomeFromServer = async (houseId) => {
  try {
    const response = await fetch(`${API_URL}/host/delete-home/${houseId}`, {
      method: "POST",
    });
    return response.json();
  } catch (error) {
    console.log("err", error);
  }
};

export const getUserHomeFromServer = async () => {
  try {
    const response = await fetch(`${API_URL}/user/homes`, {
      method: "GET",
    });

    return response.json();
  } catch (error) {
    console.log("err", error);
  }
};
