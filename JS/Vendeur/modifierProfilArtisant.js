import { BASE_URL_API_DEV, BASE_URL_LINK_DEV } from "../script.js";

window.addEventListener("DOMContentLoaded", () => {
  const logout = document.getElementById("logout");
  const profileContainer = document.getElementById("profile");
  const token = localStorage.getItem("artisantToken");
  const phoneInput = document.getElementById("phoneNumber");
  const firstnameInput = document.getElementById("firstname");
  const lastnameInput = document.getElementById("lastname");
  const jobInput = document.getElementById("job");
  const categoryInput = document.getElementById("categoryId");
  const passwordInput = document.getElementById("passwordArtisant");
  const getLocationBtn = document.getElementById("getLocation");

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
      } else {
      }
    });
  });
  const phonePattern = /^\+225\d{10}$/;
  // Fonction pour valider le numéro de téléphone
  function validatePhoneNumber() {
    const phoneError = document.getElementById("phoneError");
    if (phonePattern.test(phoneInput.value)) {
      phoneError.classList.add("hidden");
      phoneError.textContent = "";
      return true;
    } else {
      phoneError.classList.remove("hidden");
      phoneError.textContent =
        "Numéro de téléphone invalide (ex: +2250102030405)";
      return false;
    }
  }
  // function validateEmail() {
  //   const emailError = document.getElementById("emailError");
  //   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailPattern.test(emailInput.value.trim())) {
  //     emailError.classList.remove("hidden");
  //     emailError.textContent = "Adresse email invalide.";
  //     return false;
  //   } else {
  //     emailError.classList.add("hidden");
  //     emailError.textContent = "";
  //     return true;
  //   }
  // }

  // Fonction pour valider le mot de passe
  function validatePassword() {
    const passwordError = document.getElementById("passwordError");

    if (passwordInput.value.length >= 6) {
      passwordError.classList.add("hidden");
      passwordError.textContent = "";
      return true;
    } else {
      passwordError.classList.remove("hidden");
      passwordError.textContent =
        "Le mot de passe doit contenir au moins 6 caractères.";
      return false;
    }
  }

  // Fonction pour valider le champ Job
  function validateJob() {
    const jobError = document.getElementById("jobError");

    if (jobInput.value.trim() === "") {
      jobError.classList.remove("hidden");
      jobError.textContent = "Le champ Job ne peut pas être vide.";
      return false;
    } else {
      jobError.classList.add("hidden");
      jobError.textContent = "";
      return true;
    }
  }

  // Fonction pour valider la catégorie
  function validateCategory() {
    const categoryError = document.getElementById("categoryError");

    if (categoryInput.value === "") {
      categoryError.classList.remove("hidden");
      categoryError.textContent = "Veuillez choisir une catégorie.";
      return false;
    } else {
      categoryError.classList.add("hidden");
      categoryError.textContent = "";
      return true;
    }
  }

  // Validation en temps réel
  phoneInput.addEventListener("input", validatePhoneNumber);
  passwordInput.addEventListener("input", validatePassword);
  jobInput.addEventListener("input", validateJob);
  categoryInput.addEventListener("change", validateCategory);
  // emailInput.addEventListener("input", validateEmail);

  // Affichage et masquage du mot de passe
  const togglePassword = document.getElementById("togglePassword");
  togglePassword.addEventListener("click", function () {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    this.innerHTML =
      type === "password"
        ? '<i data-lucide="eye"></i>'
        : '<i data-lucide="eye-off"></i>';
    lucide.createIcons();
  });

  // Obtenir la localisation
  getLocationBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          document.getElementById("lat").value = position.coords.latitude;
          document.getElementById("long").value = position.coords.longitude;
        },
        (error) => {
          console.error(error);
          swal("Erreur", "Impossible d'obtenir la localisation", "error");
        }
      );
    } else {
      swal(
        "Erreur",
        "La géolocalisation n'est pas supportée par ce navigateur.",
        "error"
      );
    }
  });

  const getProfile = async () => {
    try {
      const response = await fetch(`${BASE_URL_API_DEV}/artisant/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data.data);
      renderProfile(data.data);
      const profile = data.data;
      firstnameInput.value = profile.user.firstname;
      lastnameInput.value = profile.user.lastname;
      phoneInput.value = profile.user.phoneNumber;
      categoryInput.value = profile.categoryId;
      jobInput.value = profile.job;
      lat.value = profile.lat;
      long.value = profile.long;
      description.value = profile.description;
    } catch (error) {
      console.error("Erreur lors de l'appel API:", error);
    }
  };

  getProfile();

  document
    .getElementById("registerForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      // Validation côté client
      const isPhoneValid = validatePhoneNumber();
      const isPasswordValid = validatePassword();
      const isJobValid = validateJob();
      const isCategoryValid = validateCategory();
      // const isEmailValid = validateEmail();

      // Vérifier si tous les champs sont valides
      const isValid =
        isPhoneValid && isPasswordValid && isJobValid && isCategoryValid;
      // &&isEmailValid;

      if (!isValid) return;

      try {
        const payload = {
          firstname: firstnameInput.value,
          lastname: lastnameInput.value,
          // email: emailInput.value,
          phoneNumber: phoneInput.value,
          passwordArtisant: passwordInput.value,
          categoryId: categoryInput.value,
          job: jobInput.value,
          lat: document.getElementById("lat").value,
          long: document.getElementById("long").value,
          description: document.getElementById("description").value,
        };

        console.log("payload", payload);

        const response = await fetch(`${BASE_URL_API_DEV}/artisant`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });

        const result = await response.json();
        console.log("result", result);

        if (result.status === "success") {
          swal({
            title: "Succès",
            text: "Inscription réussie",
            icon: "success",
            button: "Fermer",
          }).then(() => {
            window.location.href = `${BASE_URL_LINK_DEV}/HTML/client/profil.html`;
          });
        } else {
          swal({
            title: "Erreur",
            text:
              result.message ||
              "Une erreur s'est produite lors de l'inscription",
            icon: "error",
            button: "Fermer",
          }).then(() => {
            if (
              result.message === "User with this phone number already exists"
            ) {
              window.location.href = `${BASE_URL_LINK_DEV}/HTML/client/connexion.html`;
            }
          });
        }
      } catch (error) {
        console.error(error);
        swal(
          "Erreur",
          "Une erreur s'est produite lors de l'inscription",
          "error"
        );
      }
    });

  const renderProfile = (profile) => {
    profileContainer.innerHTML = "";
    const profileCard = `
    <div
              class="rounded-full bg-gray-200 w-24 h-24 mx-auto mb-4 flex items-center justify-center"
            >
              <i class="fas fa-user text-gray-600 text-5xl"></i>
            </div>
            
    <h3 class="text-lg font-semibold text-center">${profile.user.firstname} ${profile.user.lastname}</h3>
            <p class="text-gray-500 text-center">${profile.job}</p>
            <p class="text-gray-500 text-center mb-4">
              ${profile.description}
            </p>
            
            <div class="text-center mb-4">
              <p class="text-gray-700">Tel: ${profile.user.phoneNumber}</p>
            </div>
            `;
    profileContainer.insertAdjacentHTML("beforeend", profileCard);
  };
});
