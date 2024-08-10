import { BASE_URL_API_DEV } from "./../script.js";

window.addEventListener("DOMContentLoaded", function () {
  lucide.createIcons();
  const profile = document.getElementById("profile");
  const token = localStorage.getItem("accessToken");
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
      }
    } catch (error) {
      console.log(error);
    }
  };

  getProfile();
});
