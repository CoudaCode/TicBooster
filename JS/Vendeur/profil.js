import {
  BASE_URL_API_DEV,
  BASE_URL_LINK_DEV,
  checkValidTokenArtisant,
} from "../script.js";

window.addEventListener("DOMContentLoaded", () => {
  const logout = document.getElementById("logout");
  lucide.createIcons();
  const serviceContainer = document.getElementById("services");
  const token = localStorage.getItem("artisantToken");
  const profileContainer = document.getElementById("profile");
  checkValidTokenArtisant(token);

  const artisantId = parseInt(localStorage.getItem("artisantId"));
  console.log(typeof artisantId);

  const renderServices = (services) => {
    serviceContainer.innerHTML = "";
    services.forEach((service) => {
      const serviceCard = `
        <div class="w-full sm:w-1/2 lg:w-1/3 p-2">
            <div class="bg-white rounded-lg shadow p-4 mb-4 relative">
              <div class="absolute top-2 right-2 flex space-x-2">
              <a href="${BASE_URL_LINK_DEV}/HTML/client/creationProduit/modifierService.html?id=${service.id}">
                <button class="text-gray-500 hover:text-blue-500"  >
                  <i class="fa-regular fa-pen-to-square"></i>
                </button>
              </a>
                <button class="text-gray-500 hover:text-red-500 btn-delete" data-id="${service.id}">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
              <div class="mb-2">
                <h3 class="text-lg font-semibold">${service.name}</h3>
                <p class="text-gray-500">${service.description}</p>
              </div>
              <div class="flex items-center mb-2">
                <i class="fas fa-clock mr-2"></i>
                <span>${service.duration} </span>
              </div>
              <div class="flex items-center mb-2">
                <p class="text-lg font-semibold">Prix: ${service.price} FCFA</p>
              </div>
            </div>
          </div>`;
      serviceContainer.insertAdjacentHTML("beforeend", serviceCard);
    });

    // Ajouter les écouteurs d'événements après l'insertion des cartes

    document.querySelectorAll(".btn-delete").forEach((button) => {
      button.addEventListener("click", (event) => {
        const serviceId = event.currentTarget.getAttribute("data-id");
        console.log(`Supprimer le service avec ID: ${serviceId}`);
        deleteService(serviceId);
      });
    });
  };

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

  const renderProfile = (profile) => {
    profileContainer.innerHTML = "";

    console.log("profile==>", profile);
    const profileCard = `

    
     <div class="bg-white rounded-lg shadow p-4 relative">
            <div class="rounded-full bg-gray-200 w-24 h-24 mx-auto mb-4">
              <!-- Placeholder for image -->
            </div>
            <h3 class="text-lg font-semibold text-center">${profile.user.firstname} ${profile.user.lastname}</h3>
            <p class="text-gray-500 text-center">${profile.job}</p>
            <p class="text-gray-500 text-center mb-4">
              ${profile.description}
            </p>
            
            <div class="text-center mb-4">
              <p class="text-gray-700">Tel: ${profile.phoneNumber}</p>
            </div>
            <div class="text-center">
              <button class="text-gray-700 py-2 px-4 rounded mr-2">
                <i class="text-2xl fas fa-phone-volume"></i>
              </button>
<a href="${BASE_URL_LINK_DEV}/HTML/client/modifierProfil.html">
              <button class="bg-gray-200 text-gray-700 py-2 px-4 rounded">
                Modifier le profil
              </button>
</a>
            </div>
          </div> 
    `;
    profileContainer.insertAdjacentHTML("beforeend", profileCard);
  };

  const deleteService = async (id) => {
    try {
      const response = await fetch(`${BASE_URL_API_DEV}/service/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (result.status === "success") {
        swal({
          title: "Demande de confirmation",
          text: "Voulez-vous supprimer ce service ?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((action) => {
          if (action) {
            swal({
              title: "Suppression réussie !",
              text: "Votre service a bien été supprimé.",
              icon: "success",
            }).then(() => {
              window.location.reload();
            });
          } else {
            swal(
              "Suppression annulée !",
              "Vous n'avez pas supprimé le service.",
              {
                icon: "error",
              }
            );
          }
        });
      } else {
        swal({
          title: "Erreur lors de la suppression",
          text:
            result.message ||
            "Une erreur est survenue lors de la suppression du service.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la suppression du service:", error);
    }
  };
  const getService = async (id) => {
    try {
      const response = await fetch(
        `${BASE_URL_API_DEV}/artisant/${id}/services`
      );
      const data = await response.json();
      console.log(data.data);
      renderServices(data.data);
    } catch (error) {
      console.error("Erreur lors de l'appel API:", error);
    }
  };

  const getProfile = async () => {
    try {
      const response = await fetch(`${BASE_URL_API_DEV}/artisant/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data.data);
      renderProfile(data.data);
    } catch (error) {
      console.error("Erreur lors de l'appel API:", error);
    }
  };

  getService(artisantId);

  getProfile();
});
