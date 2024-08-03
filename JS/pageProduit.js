const BASE_URL = "https://tickbooster-backend.onrender.com/api";

window.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("accessToken");
  const servicesContainer = document.getElementById("services");
  const searchInput = document.getElementById("search-input");

  const sellButton = document.querySelector(".sell-button");
  const buyButton = document.querySelector(".buy-button");
  const profileIcon = document.getElementById("profile-icon");

  if (token) {
    if (profileIcon) profileIcon.classList.remove("hidden");
    if (sellButton) sellButton.classList.add("hidden");
    if (buyButton) buyButton.classList.add("hidden");
  } else {
    window.location.href = "http://127.0.0.1:5500/HTML/login.html";
  }

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
        } else {
        }
      });
    });
  }

  let allServices = [];

  const fetchServices = async () => {
    try {
      const response = await window.fetch(`${BASE_URL}/service/`, {});
      const result = await response.json();

      if (response.ok) {
        allServices = result.data;
        renderServices(allServices);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderServices = (services) => {
    servicesContainer.innerHTML = ""; // Clear previous services
    services.forEach((service) => {
      const serviceCard = `
        <div class="bg-white shadow-md rounded-lg p-4">
          <a href="./../Acheteur/page_service_detaille.html?id=${service.id}">
            <img
              src="${service.images[0]}" // Assuming the service object has an imageUrl property
              alt="${service.name}"
              class="w-full h-64 object-contain object-center rounded-t-lg"
          />
          <div class="mt-4">
            <div class="flex justify-between mb-2">
              <h2 class="text-gray-800">${service.name}</h2>
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
                <div
                  class="h-8 flex items-center shadow-rounded justify-center"
                >
                  <i class="fas fa-user-circle text-black text-3xl mr-2"></i>
                </div>
                <div class="ml-2">
                  <span class="text-sm">${service.artisant.user.firstname} ${service.artisant.user.lastname}</span>
                  <p class="text-xs text-gray-500">${service.artisant.job}</p>
                </div>
              </div>
              <p class="text-lg font-semibold">${service.price} FCFA</p>
            </div>
          </div>
          </a>
        </div>`;
      servicesContainer.insertAdjacentHTML("beforeend", serviceCard);
    });
  };

  const filterServices = (query) => {
    const filteredServices = allServices.filter((service) =>
      service.name.toLowerCase().includes(query.toLowerCase())
    );
    renderServices(filteredServices);
  };

  if (searchInput) {
    searchInput.addEventListener("input", (event) => {
      const query = event.target.value;
      filterServices(query);
    });
  }

  fetchServices();
});
