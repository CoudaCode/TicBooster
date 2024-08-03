window.addEventListener("DOMContentLoaded", function () {
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
    window.location.href =
      "https://coudacode.github.io/TicBooster/HTML/login.html";
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
      const response = await fetch(
        "https://tickbooster-backend.onrender.com/api/users/getuser",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      console.log("result", result);

      // Assuming result is an object with user data
      if (result && result.data) {
        const { firstname, lastname, email, phoneNumber, type } = result.data;

        // Update DOM with user data
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
});
