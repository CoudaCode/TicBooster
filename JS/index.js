import { BASE_URL_API_DEV, BASE_URL_LINK_DEV } from "./script.js";
window.addEventListener("DOMContentLoaded", function () {
  let allArtisant = [];
  const artisantContainer = document.getElementById("services"); // Assurez-vous que cet élément existe

  const fetchServices = async () => {
    try {
      const response = await window.fetch(
        `${BASE_URL_API_DEV}/artisant/all`,
        {}
      );
      const result = await response.json();

      if (response.ok) {
        console.log(result);
        allArtisant = result.data;
        renderArtisant(allArtisant);
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
</div>
`;
      artisantContainer.insertAdjacentHTML("beforeend", serviceCard);
    });

    // Add click event listener to all service cards
    document.querySelectorAll("[data-service-id]").forEach((card) => {
      card.addEventListener("click", function () {
        swal({
          title: "Redirection vers la page de connexion",
          text: "Vous devez être connecté pour consulter les détails du service.",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((action) => {
          if (action) {
            swal("Vous serez redirigé vers la page de connexion.", {
              icon: "success",
            }).then(() => {
              window.location.href = `${BASE_URL_LINK_DEV}/HTML/login.html`;
            });
          } else {
          }
        });
      });
    });
  };

  fetchServices();
});
