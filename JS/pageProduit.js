const BASE_URL = "http://localhost:3000/api";

window.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("accessToken");
  const servicesContainer = document.getElementById("services");

  const sellButton = document.querySelector(".sell-button");
  const buyButton = document.querySelector(".buy-button");
  const profileIcon = document.getElementById("profile-icon");

  console.log("token", token);
  if (token) {
    // Si connecté, afficher l'icône de profil et masquer les boutons "Vendre" et "Acheter"
    if (profileIcon) profileIcon.classList.remove("hidden");
    if (sellButton) sellButton.classList.add("hidden");
    if (buyButton) buyButton.classList.add("hidden");
  } else {
    window.location.href = "http://127.0.0.1:5500/HTML/login.html";
  }

  // Gestion de la déconnexion
  const logoutButton = document.getElementById("logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
      localStorage.removeItem("accessToken");
      window.location.reload();
    });
  }

  // Affichage des Produits
  const fetchServices = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/service/`, {
        method: "GET",
      });

      const result = await response.json();

      console.log("result", result);
      if (response.ok) {
        renderServices(result.data);
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
      console.log("service", service);
      const serviceCard = `
        <div class="bg-white shadow-md rounded-lg p-4">
          <a href="./../Acheteur/page_service_detaille.html">
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

  fetchServices();
});
