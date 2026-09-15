const API_URL = import.meta.env.VITE_API_URL;

export const addUserFavHomeToServer = async (houseId) => {
  try {
    const response = await fetch(`${API_URL}/user/fav-homes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        houseId: Number(houseId),
      }),
      credentials: "include",
    });
    return response.json();
  } catch (error) {
    console.log("err", error);
  }
};

export const getUserFavHomesFromServer = async () => {
  try {
    const response = await fetch(`${API_URL}/user/fav-homes`, {
      method: "GET",
      credentials: "include",
    });
    return response.json();
  } catch (error) {
    console.log("err", error);
  }
};

export const removeUserFavHomeFromServer = async (houseId) => {
  try {
    const response = await fetch(`${API_URL}/user/fav-home/delete/${houseId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        houseId: Number(houseId),
      }),
    });
    return response.json();
  } catch (error) {
    console.log("err", error);
  }
};

export const homeDetailFromServer = async (houseId) => {
  try {
    const response = await fetch(`${API_URL}/user/home-detail/${houseId}`, {
      method: "GET",
    });
    return response.json();
  } catch (error) {
    console.log("err", error);
  }
};
