import {
  BASE_URL_API_DEV,
  BASE_URL_LINK_DEV,
  checkValidToken,
} from "./../script.js";

window.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("accessToken");
  const profileIcon = document.getElementById("profile");
  const orderDetails = document.getElementById("service-details");
  const total = document.getElementById("total");
  const logoutButton = document.getElementById("logout");
  const paymentMethod = document.getElementById("paymentMethod");
  const livraisonCity = document.getElementById("livraisonCity");
  const addToCart = document.getElementById("add-to-cart");
  const phoneNumber = document.getElementById("phoneNumber");
  let amount;
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

  checkValidToken(token);
  const urlParams = new URLSearchParams(window.location.search);
  const commandId = urlParams.get("id");

  console.log("commandId", commandId);

  const renderOrderDetails = (order) => {
    orderDetails.innerHTML = "";
    const orderServiceCard = `<div class="mb-4">
              <h3 class="text-lg font-medium">Détails de l'artisan</h3>
              <p><strong>Nom:</strong> ${order.artisant.user.firstname} ${order.artisant.user.lastname}</p>
              <p>
                <strong>Téléphone:</strong> ${order.artisant.user.phoneNumber}
                <span>
                  <a href="tel:${order.artisant.user.phoneNumber}"><i class="fas fa-phone"></i> </a>

                  <a href="https://wa.me/${order.artisant.user.phoneNumber}"><i class="fas fa-phone"></i> </a>
                    <i class="fab fa-whatsapp"></i>
                  </a>
                </span>
              </p>
              <p><strong>Métier:</strong> ${order.artisant.job}</p>
              <p><strong>Description:</strong> Quod est reiciendis</p>
            </div>

            <div class="mb-4">
              <h3 class="text-lg font-medium">Détails du service</h3>
              <p><strong>Nom:</strong> ${order.services.name}</p>
              <p><strong>Description:</strong> ${order.services.description}</p>
              <p><strong>Durée:</strong> ${order.services.duration}</p>
              <p><strong>Prix unitaire:</strong> ${order.services.price} FCFA</p>
              <p><strong>Quantité:</strong> ${order.quantity}</p>
            </div>`;

    orderDetails.insertAdjacentHTML("beforeend", orderServiceCard);
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
      if (result.status === "success") {
        renderOrderDetails(result.data[0]);
        total.textContent = `${
          result.data[0].services.price * result.data[0].quantity
        } FCFA`;
        amount = result.data[0].services.price * result.data[0].quantity;
      }
      console.log("result", result);
    } catch (error) {
      console.log(error);
    }
  };

  fetchOrders(commandId);

  const getProfile = async () => {
    try {
      const response = await fetch(`${BASE_URL_API_DEV}/users/getuser`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();

      profileIcon.textContent = `${result.data.firstname} ${result.data.lastname}`;
    } catch (error) {
      console.log(error);
    }
  };

  getProfile();
  addToCart.addEventListener("click", function () {
    console.log("addToCart", addToCart);
    console.log("phoneNumber", phoneNumber.value);
    if (
      phoneNumber.value.trim() === "" &&
      paymentMethod.value.trim() === "" &&
      livraisonCity.value.trim() === ""
    ) {
      swal({
        title: "Erreur",
        text: "Veuillez renseigner un numéro de téléphone, un mode de paiement et une ville de livraison.",
        icon: "error",
      });
      return;
    }
    // Vérifiez si le champ du numéro de téléphone est vide
    if (phoneNumber.value.trim() === "") {
      swal({
        title: "Erreur",
        text: "Veuillez renseigner un numéro de téléphone valide.",
        icon: "error",
      });
      return;
    }

    // Expression régulière pour vérifier le format du numéro de téléphone
    const phoneRegex = /^\+225\d{10}$/;

    // Vérifiez si le numéro de téléphone respecte le format
    if (!phoneRegex.test(phoneNumber.value.trim())) {
      swal({
        title: "Erreur",
        text: "Veuillez renseigner un numéro de téléphone valide. Le format attendu est +225XXXXXXXXXX",
        icon: "error",
      });
      return;
    }

    if (paymentMethod.value.trim() === "") {
      swal({
        title: "Erreur",
        text: "Veuillez renseigner un mode de paiement valide.",
        icon: "error",
      });
      return;
    }

    if (livraisonCity.value.trim() === "") {
      swal({
        title: "Erreur",
        text: "Veuillez renseigner une ville de livraison valide.",
        icon: "error",
      });
      return;
    }

    if (amount === 0) {
      swal({
        title: "Erreur",
        text: "Veuillez renseigner un montant valide.",
        icon: "error",
      });
      return;
    }

    const data = {
      paymentMethod: paymentMethod.value.trim(),
      livraisonCity: livraisonCity.value.trim(),
      amount: amount,
      paymentDate: new Date(),
    };

    validateCommand(data);
  });

  const validateCommand = async (data) => {
    try {
      const response = await fetch(`${BASE_URL_API_DEV}/payment/${commandId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.status === "success") {
        swal({
          title: "Paiement validé !",
          text: "L'artisant vous informe que votre commande a été validée et sera traitée prochainement.",
          icon: "success",
        }).then(() => {
          window.location.href = `${BASE_URL_LINK_DEV}HTML/Vendeur/historique.html`;
        });
      } else {
        swal({
          title: "Erreur",
          text: result.message,
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
});
