import {
  BASE_URL_API_DEV,
  BASE_URL_LINK_DEV,
  checkValidToken,
} from "./script.js";

window.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("accessToken");
  const artisantContainer = document.getElementById("services");
  const profile = document.getElementById("profile");

  checkValidToken(token);

  const logoutButton = document.getElementById("logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
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
            localStorage.removeItem("accessToken");
            window.location.reload();
          });
        }
      });
    });
  }

  let allServices = [];

  const getProfile = async () => {
    try {
      const response = await fetch(`${BASE_URL_API_DEV}/users/getuser`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();

      profile.textContent = `${result.data.firstname} ${result.data.lastname}`;
    } catch (error) {
      console.log(error);
    }
  };

  getProfile();

  const fetchServices = async () => {
    try {
      const response = await fetch(`${BASE_URL_API_DEV}/artisant/all`);
      const result = await response.json();

      if (response.ok) {
        allServices = result.data;
        renderArtisant(allServices);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderArtisant = (artisant) => {
    artisantContainer.innerHTML = ""; // Clear previous artisant

    artisant.forEach((artisant) => {
      const serviceCard = `
      <div class="bg-white shadow-md rounded-lg p-4 mb-4" data-service-id="${artisant.id}">
        <a href="${BASE_URL_LINK_DEV}/HTML/Vendeur/infoArtisant.html?id=${artisant.id}">
          <div class="mt-4">
            <div class="flex justify-between mb-2">
              <h2 class="text-gray-800 font-semibold">${artisant.user.firstname} ${artisant.user.lastname}</h2>
              <div class="flex">
                <i class="fas fa-star text-yellow-500"></i>
                <i class="fas fa-star text-yellow-500"></i>
                <i class="fas fa-star text-yellow-500"></i>
                <i class="far fa-star text-yellow-500"></i>
                <i class="far fa-star text-yellow-500"></i>
              </div>
            </div>
            <div class="flex items-center mt-4 justify-between">
              <div class="flex items-center">
                <div class="ml-2 flex flex-col max-w-full">
                  <p class="text-gray-600 text-sm overflow-hidden overflow-ellipsis">${artisant.job}</p>
                </div>
              </div>
            </div>
            <div class="flex items-center mt-4 justify-between">
              <div class="flex items-center">
                <div class="h-8 flex items-center shadow-rounded justify-center">
                  <i class="fas fa-user-circle text-black text-3xl mr-2"></i>
                </div>
                <div class="ml-2">
                  Ville : Abidjan
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
      `;
      artisantContainer.insertAdjacentHTML("beforeend", serviceCard);
    });
  };

  fetchServices();
});
