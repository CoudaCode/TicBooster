import {
  BASE_URL_API_DEV,
  BASE_URL_LINK_DEV,
  checkValidTokenArtisant,
} from "../script.js";

window.addEventListener("DOMContentLoaded", function () {
  const logout = document.getElementById("logout");
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

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const serviceData = {
      name: name.value,
      price: price.value,
      duration: duration.value,
      description: description.value,
      artisanId,
    };

    const createService = async () => {
      try {
        const response = await window.fetch(`${BASE_URL_API_DEV}/service`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(serviceData),
        });

        const result = await response.json();
        if (result.status === "success") {
          swal({
            title: "Création réussie !",
            text: "Votre service a bien été créé.",
            icon: "success",
            button: "ok",
          }).then(() => {
            window.location.href = `${BASE_URL_LINK_DEV}/HTML/client/profil.html`;
          });
        } else {
          swal({
            title: "Erreur lors de la création",
            text:
              result.message ||
              "Une erreur est survenue lors de la création du service.",
            icon: "error",
          });
        }
      } catch (error) {
        swal({
          title: "Erreur lors de la création",
          text: error.message,
          icon: "error",
        });
      }
    };

    createService();
  });
});
