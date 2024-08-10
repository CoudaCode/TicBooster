import {
  BASE_URL_API_DEV,
  BASE_URL_LINK_DEV,
  checkValidToken,
} from "../script.js";

window.addEventListener("DOMContentLoaded", () => {
  const logout = document.getElementById("logout");
  lucide.createIcons();
  const urlParams = new URLSearchParams(window.location.search);
  const artisantId = parseInt(urlParams.get("id"));
  const serviceContainer = document.getElementById("services");
  const token = localStorage.getItem("accessToken");
  const profileContainer = document.getElementById("profile");
  checkValidToken(token);

  console.log("artisantId===>", typeof artisantId);

  const renderServices = (services) => {
    serviceContainer.innerHTML = "";
    console.log("profile==>", profile);
    services.forEach((service) => {
      const serviceCard = `
    <div class="w-full sm:w-1/2 lg:w-1/3 p-2">
  <div class="bg-white rounded-lg shadow p-4 mb-4 relative">
    
    <a href="${BASE_URL_LINK_DEV}/HTML/page_service_detaille.html?id=${service.id}">
      <div class="mb-2">
        <h3 class="text-lg font-semibold">${service.name}</h3>
        <p class="text-gray-500">${service.description}</p>
      </div>
      <div class="flex items-center mb-2">
        <i class="fas fa-clock mr-2"></i>
        <span>${service.duration}</span>
      </div>
      <div class="flex items-center mb-2">
        <p class="text-lg font-semibold">Prix: ${service.price} FCFA</p>
      </div>
    </a>
  </div>
</div>

  
  `;

      serviceContainer.insertAdjacentHTML("beforeend", serviceCard);
    });
  };

  const renderProfile = (profile) => {
    profileContainer.innerHTML = "";
    console.log("profile==>", profile);
    const profileCard = `
    
    <div class="bg-white rounded-lg shadow p-4 relative">
            <div class="rounded-full bg-gray-200 w-24 h-24 mx-auto mb-4">
              <!-- Placeholder for image -->
            </div>
            <h3 class="text-lg font-semibold text-center">
              ${profile.user.firstname} ${profile.user.lastname}
            </h3>
            <p class="text-gray-500 text-center">${profile.job}</p>
            <div class="text-center mb-4">
              <p class="text-gray-700">Tel:${profile.phoneNumber}</p>
            </div>
            <div class="text-center">
            <a href="tel:${profile.phoneNumber}">
              <button class="text-gray-700 py-2 px-4 rounded mr-2">
                <i class="text-2xl fas fa-phone-volume"></i>
              </button>
             </a>
              <a href="https://wa.me/${profile.phoneNumber}">
                <button class="bg-gray-200 text-green-700 py-2 px-4 rounded">
                  <i class="fab fa-whatsapp fa-lg text-green-700"></i>
                </button>
              </a>
            </div>
          </div>
    `;

    profileContainer.insertAdjacentHTML("beforeend", profileCard);
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
      const response = await fetch(
        `${BASE_URL_API_DEV}/artisant/${artisantId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      renderProfile(data.data);
    } catch (error) {
      console.error("Erreur lors de l'appel API:", error);
    }
  };

  if (logout) {
    logout.addEventListener("click", () => {
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
        }
      });
    });
  }

  getProfile();
  getService(artisantId);
});
