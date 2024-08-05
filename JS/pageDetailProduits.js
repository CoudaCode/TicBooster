import { BASE_URL_API_DEV, BASE_URL_LINK_DEV } from "./script.js";

window.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("accessToken");
  const servicesContainer = document.getElementById("services");
  const profile = document.getElementById("profile");

  const sellButton = document.querySelector(".sell-button");
  const buyButton = document.querySelector(".buy-button");
  const profileIcon = document.getElementById("profile-icon");

  console.log("token", token);
  if (token) {
    if (profileIcon) profileIcon.classList.remove("hidden");
    if (sellButton) sellButton.classList.add("hidden");
    if (buyButton) buyButton.classList.add("hidden");
  } else {
    window.location.href = `${BASE_URL_LINK_DEV}/HTML/login.html`;
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
        }
      });
    });
  }

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

  const urlParams = new URLSearchParams(window.location.search);
  const serviceId = urlParams.get("id");
  if (serviceId) {
    fetchServiceDetails(serviceId);
  } else {
    console.error("No service ID found in URL");
  }

  async function fetchServiceDetails(id) {
    try {
      const response = await fetch(`${BASE_URL_API_DEV}/service/${id}`, {
        method: "GET",
      });
      const result = await response.json();

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
        <section class="text-gray-700 body-font overflow-hidden bg-white">
          <div class="container px-5 py-24 mx-auto">
            <div class="lg:w-4/5 mx-auto flex flex-wrap">
              <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 class="text-sm title-font text-gray-500 tracking-widest">${service.artisant.user.firstname} ${service.artisant.user.lastname}</h2>
                <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">${service.name}</h1>
                <div class="flex mb-4">
                  <span class="flex items-center">
                    <i class="lucide lucide-star text-red-500 w-4 h-4"></i>
                    <i class="lucide lucide-star text-red-500 w-4 h-4"></i>
                    <i class="lucide lucide-star text-red-500 w-4 h-4"></i>
                    <i class="lucide lucide-star text-red-500 w-4 h-4"></i>
                    <i class="lucide lucide-star text-red-500 w-4 h-4"></i>
                    <span class="text-gray-600 ml-3">4 Reviews</span>
                  </span>
                  <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                    <a class="text-gray-500">
                      <i class="lucide lucide-heart w-5 h-5"></i>
                    </a>
                    <a class="ml-2 text-gray-500">
                      <i class="lucide lucide-twitter w-5 h-5"></i>
                    </a>
                    <a class="ml-2 text-gray-500">
                      <i class="lucide lucide-facebook w-5 h-5"></i>
                    </a>
                  </span>
                </div>
                <p class="leading-relaxed">
                  ${service.description}
                </p>
                <div class="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                  <div class="flex">
                    <span class="mr-3">Durée de conception</span>
                    <span class="">${service.duration}</span>
                  </div>
                </div>
                <div class="flex mb-4">
                  <span class="title-font font-medium text-2xl text-gray-900">${service.price} FCFA</span>
                </div>
                <div class="flex items-center mb-4">
                  <button id="decrement" class="bg-gray-300 text-gray-600 border-0 py-2 px-4 mr-2 rounded">-</button>
                  <input id="quantity" type="number" value="1" min="1" class="border-2 border-gray-300 py-2 px-4 rounded text-center w-16"/>
                  <button id="increment" class="bg-gray-300 text-gray-600 border-0 py-2 px-4 ml-2 rounded">+</button>
                </div>
                <div class="flex mb-4">
                  <span id="total-amount" class="title-font font-medium text-2xl text-gray-900">Total: ${service.price} FCFA</span>
                </div>
                <button class="flex ml-auto text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded" id="order-button">
                  Commander
                </button>
              </div>
            </div>
          </div>
        </section>
      `;
      setupQuantityControl(service.price);
    }
  }

  function setupQuantityControl(price) {
    const quantityInput = document.getElementById("quantity");
    const incrementButton = document.getElementById("increment");
    const decrementButton = document.getElementById("decrement");
    const totalAmount = document.getElementById("total-amount");

    const updateTotal = () => {
      const quantity = parseInt(quantityInput.value, 10) || 1;
      const total = quantity * price;
      totalAmount.textContent = `Total: ${total} FCFA`;
    };

    incrementButton.addEventListener("click", () => {
      quantityInput.value = parseInt(quantityInput.value, 10) + 1;
      updateTotal();
    });

    decrementButton.addEventListener("click", () => {
      if (parseInt(quantityInput.value, 10) > 1) {
        quantityInput.value = parseInt(quantityInput.value, 10) - 1;
        updateTotal();
      }
    });

    quantityInput.addEventListener("input", updateTotal);
  }
});
