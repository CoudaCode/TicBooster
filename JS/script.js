const BASE_URL = "http://localhost:3000/api";

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

export { fetchApiBase };
