import {
  BASE_URL_API_DEV,
  BASE_URL_LINK_DEV,
  checkValidTokenArtisant,
} from "../script.js";

window.addEventListener("DOMContentLoaded", function () {
  const logout = document.getElementById("logout");
  const urlParams = new URLSearchParams(window.location.search);
  const serviceId = urlParams.get("id");
  const token = localStorage.getItem("artisantToken");
  const name = document.getElementById("name");
  const price = document.getElementById("price");
  const duration = document.getElementById("duration");
  const description = document.getElementById("description");
  const form = document.getElementById("form");
  const artisanId = parseInt(localStorage.getItem("artisantId"));
  console.log("DOM fully loaded and parsed");
  console.log("artisantID", localStorage.getItem("artisantId"));

  checkValidTokenArtisant(token);

  logout.addEventListener("click", function () {
    swal({
      title: "Déconnexion",
      text: "Voulez-vous vous déconnecter ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((action) => {
      if (action) {
        swal("Vous êtes déconnecté !", "Déconnexion réussie.", {
          icon: "success",
        }).then(() => {
          localStorage.removeItem("artisantToken");
          window.location.reload();
        });
      } else {
      }
    });
  });

  const getService = async (id) => {
    try {
      const response = await fetch(`${BASE_URL_API_DEV}/service/${id}`);
      const data = await response.json();
      const service = data.data;
      name.value = service.name;
      price.value = service.price;
      duration.value = service.duration;
      description.value = service.description;
    } catch (error) {
      console.error("Erreur lors de l'appel API:", error);
    }
  };

  getService(serviceId);

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const serviceData = {
      name: name.value,
      price: price.value,
      duration: duration.value,
      description: description.value,
      artisanId,
    };

    console.log(serviceData);

    const updateService = async () => {
      try {
        const response = await window.fetch(
          `${BASE_URL_API_DEV}/service/${serviceId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(serviceData),
          }
        );

        const result = await response.json();
        if (result.status === "success") {
          swal({
            title: "Mise à jour réussie !",
            text: "Votre service a bien été mis à jour.",
            icon: "success",
            button: "ok",
          }).then(() => {
            window.location.href = `${BASE_URL_LINK_DEV}/HTML/client/profil.html`;
          });
        } else {
          swal({
            title: "Erreur lors de la mise à jour",
            text:
              result.message ||
              "Une erreur est survenue lors de la mise à jour du service.",
            icon: "error",
          });
        }
      } catch (error) {
        console.error("Erreur lors de la création", error);
      }
    };

    updateService();
  });
});
