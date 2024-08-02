const BASE_URL = "http://localhost:4000/api";
window.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("accessToken");
  const servicesContainer = document.getElementById("services");

  const sellButton = document.querySelector(".sell-button");
  const buyButton = document.querySelector(".buy-button");
  const profileIcon = document.getElementById("profile-icon");

  console.log("token", token);
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
      localStorage.removeItem("accessToken");
      window.location.reload();
    });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const serviceId = urlParams.get("id");
  if (serviceId) {
    fetchServiceDetails(serviceId);
  } else {
    console.error("No service ID found in URL");
  }
  async function fetchServiceDetails(id) {
    try {
      const response = await fetch(`${BASE_URL}/service/${id}`, {
        method: "GET",
      });
      const result = await response.json();
      console.log("result", result);
      if (response.ok) {
        renderServiceDetails(result.data);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  }
  function renderServiceDetails(service) {
    const serviceContainer = document.getElementById("service-details");
    console.log("service", service);
    if (serviceContainer) {
      serviceContainer.innerHTML = `
     <div class="flex flex-col lg:flex-row">
        <!-- Image and Summary Section -->
        <div class="w-full lg:w-2/3 lg:pr-4 mb-4">
          <div class="bg-white rounded-lg shadow-md">
            <img
              src="${service.images[0]}"
              alt="Service Image"
              class="w-full h-64 object-cover rounded-t-lg"
            />
            <div class="p-4">
              <h2 class="text-2xl font-semibold mb-2">${service.name}</h2>
              <p class="text-gray-700 mb-4">
                ${service.description}
              </p>
              <div class="flex items-center mb-4">
                <div class="text-yellow-500 flex items-center">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star text-gray-200"></i>
                </div>
                <span class="ml-2 text-gray-600">Duree de conception: ${service.duration}</span>
              </div>
              <p class="text-lg font-semibold mb-4">Prix: ${service.price} FCFA</p>
              <a href="http://127.0.0.1:5500/HTML/Vendeur/panier.html?id=${service.id}">
                <button class="custom-button">Commander</button>
              </a>
            </div>
          </div>
        </div>

        <!-- Seller Information Section -->
        <div class="w-full lg:w-1/3 lg:pl-4 mb-4">
          <div class="bg-white rounded-lg shadow-md p-4">
            <div class="flex items-center mb-4">
              <div
                class="rounded-full bg-gray-200 w-16 h-16 flex items-center justify-center mr-4"
              >
                <i class="fas fa-user text-gray-600 text-4xl"></i>
              </div>
              <div>
                <h3 class="text-xl font-semibold">${service.artisant.user.firstname} ${service.artisant.user.lastname}</h3>
                <p class="text-gray-500">${service.artisant.job}</p>
                <div class="text-yellow-500 mt-2">
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star"></i>
                  <i class="fas fa-star text-gray-200"></i>
                </div>
              </div>
            </div>
            <div class="text-center">
              <button class="text-gray-700 py-2 px-4 rounded mr-2">
                <i class="text-2xl fas fa-phone-volume"></i>
              </button>
              <button
                class="bg-gray-200 text-gray-700 py-2 px-4 rounded text-xl"
              >
                Message
              </button>
            </div>
          </div>
        </div>
      </div>
        `;
    }
  }
});
