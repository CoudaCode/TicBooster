import {
  BASE_URL_API_DEV,
  BASE_URL_LINK_DEV,
  checkValidTokenArtisant,
} from "./../script.js";

window.addEventListener("DOMContentLoaded", () => {
  const logout = document.getElementById("logout");
  const token = localStorage.getItem("artisantToken");
  const commandesContainer = document.getElementById("commande");
  const artisantId = parseInt(localStorage.getItem("artisantId"));

  console.log("token", logout);
  checkValidTokenArtisant(token);
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
      }
    });
  });

  const renderCommandes = (commandes) => {
    commandesContainer.innerHTML = "";
    commandes.forEach((commande) => {
      const commandeCard = `
     <div class="w-full sm:w-1/2 lg:w-1/3 p-2">
        <div class="bg-white rounded-lg shadow p-4 mb-4 relative">
          <div class="absolute top-2 right-2 flex space-x-2">
            <a href="${BASE_URL_LINK_DEV}/HTML/client/creationProduit/modifierService.html?id=${
        commande.id
      }">
              <button class="text-gray-500 hover:text-blue-500">
                <i class="fa-regular fa-pen-to-square"></i>
              </button>
            </a>
            <button class="text-gray-500 hover:text-red-500 btn-delete" data-id="${
              commande.id
            }">
              <i class="fa-solid fa-trash"></i>
            </button>
          </div>
          <div class="mb-2">
            <h3 class="text-lg font-semibold">${commande.services.name}</h3>
            <p class="text-gray-500">${commande.services.description}</p>
          </div>
          <div class="flex items-center mb-2">
            <i class="fas fa-clock mr-2"></i>
            <span>${commande.services.duration}</span>
          </div>
          <div class="flex items-center mb-2">
            <p class="text-lg font-semibold">Prix: ${
              commande.services.price
            } FCFA</p>
          </div>

          <!-- Informations du client -->
          <div class="mt-4 border-t pt-4">
            <h4 class="text-md font-semibold mb-2">Informations du client</h4>
            <p><strong>Prénom:</strong> ${commande.user.firstname}</p>
            <p><strong>Nom:</strong> ${commande.user.lastname}</p>
            <p><strong>Téléphone:</strong> ${commande.user.tel}</p>
            <p><strong>Date de commande:</strong> ${new Date(
              commande.date
            ).toLocaleDateString("fr-FR")}</p>
          </div>

          <!-- Détails du service choisi -->
          <div class="mt-4 border-t pt-4">
            <h4 class="text-md font-semibold mb-2">Détails du service</h4>
            <p><strong>Nom du service:</strong> ${commande.services.name}</p>
            <p><strong>Prix unitaire:</strong> ${
              commande.services.price
            } FCFA</p>
            <p><strong>Quantité:</strong> ${commande.quantity}</p>
            <p><strong><i class="fas fa-clock mr-2"></i> Durée:</strong> ${
              commande.services.duration
            }</p>
            <p><strong>Prix total:</strong> ${commande.totalPrice} FCFA</p>
          </div>
        </div>
      </div>
          `;
      commandesContainer.insertAdjacentHTML("beforeend", commandeCard);
    });
    attachDeleteEvents(); // Attach delete events after rendering the commandes
  };

  const attachDeleteEvents = () => {
    document.querySelectorAll(".btn-delete").forEach((button) => {
      button.addEventListener("click", (event) => {
        const commandeId = event.currentTarget.getAttribute("data-id");
        console.log(`Supprimer la commande avec ID: ${commandeId}`);
        deleteCommande(commandeId);
      });
    });
  };

  const deleteCommande = async (id) => {
    console.log(id);
    try {
      const response = await fetch(`${BASE_URL_API_DEV}/order/${id}`, {
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
          text: "Voulez-vous supprimer cette commande ?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((action) => {
          if (action) {
            swal({
              title: "Suppression réussie !",
              text: "Votre commande a bien été supprimée.",
              icon: "success",
            }).then(() => {
              window.location.reload();
            });
          } else {
            swal(
              "Suppression annulée !",
              "Vous n'avez pas supprimé la commande.",
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
            "Une erreur est survenue lors de la suppression de la commande.",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de la commande:", error);
    }
  };

  const getCommandes = async (id) => {
    console.log(id);
    try {
      const response = await fetch(
        `${BASE_URL_API_DEV}/artisant/${id}/orders`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      console.log(data.data);
      renderCommandes(data.data);
    } catch (error) {
      console.error("Erreur lors de l'appel API:", error);
    }
  };

  getCommandes(artisantId);
});
