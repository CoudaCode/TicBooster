const BASE_URL = "http://localhost:4000/api";
window.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("accessToken");

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
        }
      });
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

    if (serviceContainer) {
      serviceContainer.innerHTML = `
        <div class="flex items-center mb-4">
          <img
            src="${service.images[0]}"
            alt="${service.name}"
            class="w-32 h-32 object-contain object-center rounded"
          />
          <div class="ml-4">
            <p class="text-lg font-medium">${service.name}</p>
            <p class="text-gray-500">Description: ${service.description}</p>
            <p class="text-gray-500">Durée de conception: ${service.duration}</p>
          </div>
        </div>
        `;
      // Initialize price
      const unitPrice = service.price;
      updatePrice(unitPrice);
    }
  }

  function updatePrice(unitPrice) {
    const quantityElement = document.getElementById("quantity-pro");
    const amountElement = document.getElementById("amount-pro");
    const totalElement = document.getElementById("total");

    let quantity = parseInt(quantityElement.textContent);
    let total = unitPrice * quantity;

    const updateTotal = () => {
      amountElement.textContent = `${unitPrice.toLocaleString()} FCFA`;
      totalElement.textContent = `${total.toLocaleString()} FCFA`;
    };

    document.getElementById("increment").addEventListener("click", () => {
      quantity++;
      total = unitPrice * quantity;
      quantityElement.textContent = quantity;
      updateTotal();
    });

    document.getElementById("decrement").addEventListener("click", () => {
      if (quantity > 1) {
        quantity--;
        total = unitPrice * quantity;
        quantityElement.textContent = quantity;
        updateTotal();
      }
    });

    updateTotal();

    // Add event listener for "Ajouter au panier" button
    const addToCartButton = document.querySelector(".bg-yellow-500");
    if (addToCartButton) {
      addToCartButton.addEventListener("click", () => {
        OrderService(serviceId, quantity, total);
      });
    }
  }

  async function OrderService(id, quantity, totalPrice) {
    try {
      console.log("id", token);
      console.log("quantity", quantity);
      console.log("totalPrice", totalPrice);
      console.log("serviceId", id);
      const response = await fetch(`${BASE_URL}/order/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: "pending",
          quantity: quantity,
          totalPrice: totalPrice,
          serviceId: id,
          date: new Date(),
        }),
      });
      console.log("response", response);
      const result = await response.json();
      console.log("result", result);
      if (result.status === "success") {
        swal("Commande réussie !", "Votre commande a été ajoutée au panier.", {
          icon: "success",
          buttons: "ok",
        }).then(() => {
          window.location.href =
            "http://127.0.0.1:5500/HTML/creationProduit/page_produit.html";
        });
      } else {
        swal("Erreur", result.message, {
          icon: "error",
        }).then(() => {
          window.location.href =
            "http://127.0.0.1:5500/HTML/creationProduit/page_produit.html";
        });
      }
    } catch (error) {
      console.log(error);
      swal("Erreur", "Une erreur est survenue. Veuillez réessayer.", {
        icon: "error",
      });
    }
  }
});
