const API_URL = import.meta.env.VITE_API_URL;

export const signInUser = async (
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
  userType
) => {
  const response = await fetch(`${API_URL}/signIn`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      userType,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
};

export const LogInUser = async (email, password) => {
  const response = await fetch(`${API_URL}/logIn`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    credentials: "include",

    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
};

export const getCurrentUser = async () => {
  const response = await fetch(`${API_URL}/auth/me`, {
    method: "GET",

    credentials: "include",
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  return data.user;
};

export const logOutUser = async () => {
  const response = await fetch(`${API_URL}/logOut`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
};

export const deleteAccountFromServer = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/profile/${userId}`, {
      method: "POST",
    });

    return response.json();
  } catch (error) {
    console.log("err", error);
  }
};
