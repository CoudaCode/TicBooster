import { BASE_URL_API_DEV, BASE_URL_LINK_DEV } from "./../script.js";

window.addEventListener("DOMContentLoaded", function () {
  lucide.createIcons();
  const profile = document.getElementById("profile");
  const ordersContainer = document.getElementById("commande-en-cours");
  const token = localStorage.getItem("accessToken");
  const sellButton = document.querySelector(".sell-button");
  const buyButton = document.querySelector(".buy-button");
  const profileIcon = document.getElementById("profile-icon");
  const profileName = document.getElementById("profile-name");
  const profileEmail = document.getElementById("profile-email");
  const profilePhone = document.getElementById("profile-phone");
  const profileType = document.getElementById("profile-type");
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
        } else {
        }
      });
    });
  }

  console.log("token", token);

  const getProfile = async () => {
    try {
      const response = await fetch(`${BASE_URL_API_DEV}/users/getuser`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();

      // Assuming result is an object with user data
      if (result && result.data) {
        profile.textContent = `${result.data.firstname} ${result.data.lastname}`;
        const { firstname, lastname, email, phoneNumber, type } = result.data;

        // Met à jour le DOM avec les données du profil
        if (profileName) profileName.textContent = `${firstname} ${lastname}`;
        if (profileEmail) profileEmail.textContent = email;
        if (profilePhone) profilePhone.textContent = phoneNumber;
        if (profileType)
          profileType.textContent = type === "customer" ? "Client" : "Vendeur";
      }
    } catch (error) {
      console.log(error);
    }
  };

  getProfile();

  const renderOrders = (orders) => {
    ordersContainer.innerHTML = "";

    // Vérifiez s'il n'y a aucune commande en attente
    const pendingOrders = orders.filter((order) => order.status === "pending");

    if (pendingOrders.length === 0) {
      const noOrdersCard = `
        <div class="bg-gray-50 p-4 rounded-lg shadow-md flex items-center justify-center">
          <div class="flex-grow">
            <p class="text-lg font-semibold">Aucune commande en cours</p>
          </div>
        </div>
      `;
      ordersContainer.insertAdjacentHTML("beforeend", noOrdersCard);
      return; // Arrêtez l'exécution de la fonction
    }

    // Si des commandes en attente existent, affichez-les
    pendingOrders.forEach((order) => {
      console.log("order", order);
      const orderCard = `
        <div class="bg-gray-50 p-4 rounded-lg shadow-md">
          <div class="flex items-center">
            <div class="flex-grow">
              <h3 class="text-lg font-semibold">${order.services.name}</h3>
              <p class="text-sm text-gray-500">Vendeur: ${
                order.artisant.user.firstname
              } ${order.artisant.user.lastname}</p>
              <p class="text-sm text-gray-500">Date d'achat: ${new Date(
                order.date
              ).toLocaleDateString()}</p>
              <p class="text-sm text-gray-500">Statut: ${
                order.status === "pending" ? "En cours de traitement" : "Traité"
              }</p>
              <p class="text-lg font-semibold mt-2">Prix Total: ${
                order.totalPrice
              } FCFA</p>
              <p class="text-lg font-semibold mt-2">Quantité: ${
                order.quantity
              }</p>
              <a href="${BASE_URL_LINK_DEV}/HTML/Vendeur/confirmation.html?id=${
        order.id
      }">
              <button class="bg-green-500 text-white px-4 py-2 rounded-md" >Valider la commande</button>
              </a>
            </div>
          </div>
        </div>
      `;
      ordersContainer.insertAdjacentHTML("beforeend", orderCard);
    });
  };

  const fetchOrders = async (id) => {
    try {
      const response = await fetch(`${BASE_URL_API_DEV}/order/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      console.log("result", result);
      if (response.ok) {
        renderOrders(result.data);
      } else {
        console.error(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchOrders();
});
