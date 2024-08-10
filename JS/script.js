const BASE_URL = "https://tickbooster-backend.onrender.com/api";

// Fonction pour faire des appels API avec une gestion d'erreurs et de headers
const fetchApiBase = async (endpoint, options = {}, isAuth, isImage) => {
  const headers = isAuth
    ? { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
    : {};

  if (isImage) {
    options.headers = {
      ...options.headers,
      "Content-Type": "multipart/form-data",
    };
  } else {
    options.headers = {
      ...options.headers,
      "Content-Type": "application/json",
    };
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        statut: data.status,
        data,
      };
    }

    return data;
  } catch (error) {
    console.error("Erreur lors de l'appel API:", error);
    return {
      statut: "error",
      message: "Une erreur réseau est survenue.",
    };
  }
};

// const BASE_URL_API_DEV = "https://tickbooster-backend.onrender.com/api";
const BASE_URL_API_DEV = "http://localhost:4000/api";

// const BASE_URL_LINK_DEV = "https://coudacode.github.io/TicBooster";
const BASE_URL_LINK_DEV = "http://127.0.0.1:5500";

const checkValidTokenArtisant = async (token) => {
  try {
    const response = await fetch(`${BASE_URL_API_DEV}/users/check-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    });

    const result = await response.json();
    if (result.status === "error") {
      window.location.href = `${BASE_URL_LINK_DEV}/HTML/client/connexion.html`;
    }
  } catch (error) {
    console.log(error);
  }
};
const checkValidToken = async (token) => {
  try {
    const response = await fetch(`${BASE_URL_API_DEV}/users/check-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    });

    const result = await response.json();
    if (result.status === "error") {
      window.location.href = `${BASE_URL_LINK_DEV}/HTML/login.html`;
    }
  } catch (error) {
    console.log(error);
  }
};
export {
  BASE_URL_API_DEV,
  // BASE_URL_API_PROD,
  BASE_URL_LINK_DEV,
  // BASE_URL_LINK_PROD,
  checkValidToken,
  checkValidTokenArtisant,
  fetchApiBase,
};
