const BASE_URL = "http://localhost:3000/api";

// const token = localStorage.getItem("accessToken");
// let profile = document.querySelector(".profile");
// window.addEventListener("DOMContentLoaded", async function () {
//   if (!token) {
//     window.location.href = "http://127.0.0.1:5500/HTML/login.html";
//   }

//   console.log("token", token);
//   console.log("profile", profile);
// });

window.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("accessToken");

  const sellButton = document.querySelector(".sell-button");
  const buyButton = document.querySelector(".buy-button");
  const profileIcon = document.getElementById("profile-icon");

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
      window.location.reload(); // Recharger la page pour mettre à jour l'état de connexion
    });
  }
});
