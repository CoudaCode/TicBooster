import {
  BASE_URL_API_DEV,
  BASE_URL_LINK_DEV,
  checkValidToken,
} from "./../script.js";

document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();
  const profileForm = document.getElementById("profileForm");
  const token = localStorage.getItem("accessToken");
  const sellButton = document.querySelector(".sell-button");
  const buyButton = document.querySelector(".buy-button");
  const profileIcon = document.getElementById("profile-icon");
  const profileName = document.getElementById("profile-name");
  const profileEmail = document.getElementById("profile-email");
  const profilePhone = document.getElementById("profile-phone");
  const profileType = document.getElementById("profile-type");

  checkValidToken(token);
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
  // Fonction pour obtenir les informations du profil
  async function getProfile() {
    try {
      const response = await fetch(`${BASE_URL_API_DEV}/users/getuser`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();

      if (result && result.data) {
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
  }

  // Appelle la fonction pour obtenir les informations du profil
  getProfile();

  async function updateProfile(profileData) {
    try {
      const response = await fetch(`${BASE_URL_API_DEV}/users/update`, {
        // Assurez-vous que ce chemin correspond à votre API
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });
      console.log("response", response);
      if (!response.ok)
        throw new Error("Erreur lors de la mise à jour du profil");

      const result = await response.json();
      console.log("result", result);
      if (result.status === "success") {
        swal({
          icon: "success",
          title: "Profil modifié avec succès",
          text: "Vos informations ont été mises à jour.",
          button: "OK",
        });
      } else {
        console.log(result);
        swal({
          icon: "error",
          title: "Erreur",
          text: result.message || "Une erreur est survenue.",
          button: "OK",
        });
      }
    } catch (error) {
      swal({
        icon: "error",
        title: "Erreur",
        text: "Une erreur est survenue lors de la mise à jour du profil.",
        button: "OK",
      });
    }
  }

  // Fonction de validation du formulaire
  function validateForm() {
    let isValid = true;

    // Réinitialiser les erreurs
    document.getElementById("firstnameError").classList.add("hidden");
    document.getElementById("lastnameError").classList.add("hidden");
    document.getElementById("phoneError").classList.add("hidden");
    document.getElementById("passwordError").classList.add("hidden");

    const firstname = document.getElementById("firstname").value.trim();
    const lastname = document.getElementById("lastname").value.trim();
    const phoneNumber = document.getElementById("phoneNumber").value.trim();
    const password = document.getElementById("password").value.trim();

    if (firstname === "") {
      document.getElementById("firstnameError").textContent = "Nom est requis";
      document.getElementById("firstnameError").classList.remove("hidden");
      isValid = false;
    }

    if (lastname === "") {
      document.getElementById("lastnameError").textContent =
        "Prénom est requis";
      document.getElementById("lastnameError").classList.remove("hidden");
      isValid = false;
    }

    if (phoneNumber === "") {
      document.getElementById("phoneError").textContent =
        "Téléphone est requis";
      document.getElementById("phoneError").classList.remove("hidden");
      isValid = false;
    } else if (!/^\+?[1-9]\d{1,14}$/.test(phoneNumber)) {
      document.getElementById("phoneError").textContent =
        "Numéro de téléphone invalide";
      document.getElementById("phoneError").classList.remove("hidden");
      isValid = false;
    }

    if (password === "") {
      document.getElementById("passwordError").textContent =
        "Mot de passe est requis";
      document.getElementById("passwordError").classList.remove("hidden");
      isValid = false;
    }

    return isValid;
  }

  // Gestion de la soumission du formulaire
  profileForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (validateForm()) {
      const profileData = {
        firstname: document.getElementById("firstname").value.trim(),
        lastname: document.getElementById("lastname").value.trim(),
        phoneNumber: document.getElementById("phoneNumber").value.trim(),
        password: document.getElementById("password").value.trim(),
      };

      await updateProfile(profileData);
    } else {
      swal({
        icon: "error",
        title: "Erreur de validation",
        text: "Veuillez corriger les erreurs dans le formulaire.",
        button: "OK",
      });
    }
  });

  // Gestion du bouton Réinitialiser
  document.querySelector('a[href="#"]').addEventListener("click", () => {
    profileForm.reset();
    document.getElementById("firstnameError").classList.add("hidden");
    document.getElementById("lastnameError").classList.add("hidden");
    document.getElementById("phoneError").classList.add("hidden");
    document.getElementById("passwordError").classList.add("hidden");
  });

  // Récupérer les informations du profil lors du chargement de la page
  getProfile();
});
