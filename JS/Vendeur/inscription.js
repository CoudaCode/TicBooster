import { BASE_URL_API_DEV, BASE_URL_LINK_DEV } from "../script.js";

// window.addEventListener("DOMContentLoaded", () => {
//   const phoneInput = document.getElementById("phoneNumber");
//   const jobInput = document.getElementById("job");
//   const categoryInput = document.getElementById("categoryId");
//   const togglePassword = document.getElementById("togglePassword");
//   const passwordInput = document.getElementById("password");
//   const getLocationBtn = document.getElementById("getLocation");

//   phoneInput.addEventListener("input", function () {
//     const phonePattern = /^\+225\d{10}$/;
//     if (phonePattern.test(phoneInput.value)) {
//       document.getElementById("phoneError").classList.add("hidden");
//     } else {
//       document.getElementById("phoneError").classList.remove("hidden");
//       document.getElementById("phoneError").textContent =
//         "Numéro de téléphone invalide (ex: +2250102030405)";
//     }
//   });

//   togglePassword.addEventListener("click", function () {
//     const type =
//       passwordInput.getAttribute("type") === "password" ? "text" : "password";
//     passwordInput.setAttribute("type", type);
//     this.innerHTML =
//       type === "password"
//         ? '<i data-lucide="eye"></i>'
//         : '<i data-lucide="eye-off"></i>';
//     lucide.createIcons();
//   });

//   getLocationBtn.addEventListener("click", () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           document.getElementById("lat").value = position.coords.latitude;
//           document.getElementById("long").value = position.coords.longitude;
//         },
//         (error) => {
//           console.error(error);
//           swal("Erreur", "Impossible d'obtenir la localisation", "error");
//         }
//       );
//     } else {
//       swal(
//         "Erreur",
//         "La géolocalisation n'est pas supportée par ce navigateur.",
//         "error"
//       );
//     }
//   });

//   document
//     .getElementById("registerForm")
//     .addEventListener("submit", async (e) => {
//       e.preventDefault();
//       const formData = new FormData();
//       formData.append("phoneNumber", phoneInput.value);
//       formData.append("password", passwordInput.value);
//       formData.append("categoryId", categoryInput.value);
//       formData.append("job", jobInput.value);
//       formData.append("lat", document.getElementById("lat").value);
//       formData.append("long", document.getElementById("long").value);
//       formData.append(
//         "description",
//         document.getElementById("description").value
//       );
//       formData.append(
//         "profileImage",
//         document.getElementById("profileImage").files[0]
//       );

//       try {
//         const response = await fetch(`${BASE_URL_API_DEV}/register`, {
//           method: "POST",
//           body: formData,
//         });

//         const result = await response.json();

//         if (response.ok) {
//           swal("Succès", "Inscription réussie", "success").then(() => {
//             window.location.href = `${BASE_URL_LINK_DEV}/dashboard`;
//           });
//         } else {
//           swal("Erreur", result.message, "error");
//         }
//       } catch (error) {
//         console.error(error);
//         swal(
//           "Erreur",
//           "Une erreur s'est produite lors de l'inscription",
//           "error"
//         );
//       }
//     });
// });
/*
window.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("accessToken");
  checkValidToken(token);
  const phoneInput = document.getElementById("phoneNumber");
  const jobInput = document.getElementById("job");
  const categoryInput = document.getElementById("categoryId");
  const passwordInput = document.getElementById("passwordArtisant");
  const getLocationBtn = document.getElementById("getLocation");

  const phonePattern = /^\+225\d{10}$/;

  // Fonction pour valider le numéro de téléphone
  function validatePhoneNumber() {
    const phoneError = document.getElementById("phoneError");

    if (phonePattern.test(phoneInput.value)) {
      phoneError.classList.add("hidden");
      phoneError.textContent = "";
    } else {
      phoneError.classList.remove("hidden");
      phoneError.textContent =
        "Numéro de téléphone invalide (ex: +2250102030405)";
    }
  }

  // Fonction pour valider le mot de passe
  function validatePassword() {
    const passwordError = document.getElementById("passwordError");

    if (passwordInput.value.length >= 6) {
      // Exemple: longueur minimale pour le mot de passe
      passwordError.classList.add("hidden");
      passwordError.textContent = "";
    } else {
      passwordError.classList.remove("hidden");
      passwordError.textContent =
        "Le mot de passe doit contenir au moins 6 caractères.";
    }
  }

  // Fonction pour valider le champ Job
  function validateJob() {
    const jobError = document.getElementById("jobError");

    if (jobInput.value.trim() !== "") {
      jobError.classList.add("hidden");
      jobError.textContent = "";
    } else {
      jobError.classList.remove("hidden");
      jobError.textContent = "Le champ Job ne peut pas être vide.";
    }
  }

  // Validation en temps réel
  phoneInput.addEventListener("input", validatePhoneNumber);
  passwordInput.addEventListener("input", validatePassword);
  jobInput.addEventListener("input", validateJob);

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

  document
    .getElementById("registerForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      // Validation côté client
      validatePhoneNumber();
      validatePassword();
      validateJob();

      // Vérifier si tous les champs sont valides
      const phoneError = document.getElementById("phoneError");
      const passwordError = document.getElementById("passwordError");
      const jobError = document.getElementById("jobError");

      const isValid =
        phoneError.classList.contains("hidden") &&
        passwordError.classList.contains("hidden") &&
        jobError.classList.contains("hidden");

      if (!isValid) return;

      try {
        const formData = new FormData();
        formData.append("phoneNumber", phoneInput.value);
        formData.append("passwordArtisant", passwordInput.value);
        formData.append("categoryId", categoryInput.value);
        formData.append("job", jobInput.value);
        formData.append("lat", document.getElementById("lat").value);
        formData.append("long", document.getElementById("long").value);
        formData.append(
          "description",
          document.getElementById("description").value
        );

        // Affichage du contenu de FormData
        console.log(formData.get("description"));
        console.log(formData.get("job"));
        console.log(formData.get("lat"));
        console.log(formData.get("long"));
        console.log(formData.get("categoryId"));
        console.log(formData.get("phoneNumber"));
        console.log(formData.get("passwordArtisant"));
        console.log(formData.get("description"));

        const response = await fetch(`${BASE_URL_API_DEV}/artisant`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();
        console.log(result);

        // if (response.ok) {
        //   swal("Succès", "Inscription réussie", "success").then(() => {
        //     window.location.href = `${BASE_URL_LINK_DEV}/dashboard`;
        //   });
        // } else {
        //   swal("Erreur", result.message, "error");
        // }
      } catch (error) {
        console.error(error);
        swal(
          "Erreur",
          "Une erreur s'est produite lors de l'inscription",
          "error"
        );
      }
    });
});
*/
window.addEventListener("DOMContentLoaded", () => {
  const phoneInput = document.getElementById("phoneNumber");
  const firstnameInput = document.getElementById("firstname");
  const lastnameInput = document.getElementById("lastname");

  const jobInput = document.getElementById("job");
  const categoryInput = document.getElementById("categoryId");
  const passwordInput = document.getElementById("passwordArtisant");
  const getLocationBtn = document.getElementById("getLocation");
  const emailInput = document.getElementById("email");
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

  function validateEmail() {
    const emailError = document.getElementById("emailError");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      emailError.classList.remove("hidden");
      emailError.textContent = "Adresse email invalide.";
      return false;
    } else {
      emailError.classList.add("hidden");
      emailError.textContent = "";
      return true;
    }
  }

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
  emailInput.addEventListener("input", validateEmail);

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

  document
    .getElementById("registerForm")
    .addEventListener("submit", async (e) => {
      e.preventDefault();

      // Validation côté client
      const isPhoneValid = validatePhoneNumber();
      const isPasswordValid = validatePassword();
      const isJobValid = validateJob();
      const isCategoryValid = validateCategory();
      const isEmailValid = validateEmail();

      // Vérifier si tous les champs sont valides
      const isValid =
        isPhoneValid &&
        isPasswordValid &&
        isJobValid &&
        isCategoryValid &&
        isEmailValid;

      if (!isValid) return;

      try {
        const payload = {
          firstname: firstnameInput.value,
          lastname: lastnameInput.value,
          email: emailInput.value,
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
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
            window.location.href = `${BASE_URL_LINK_DEV}/HTML/Acheteur/connexion.html`;
          });
        } else {
          swal({
            title: "Erreur",
            text:
              result.message === "User with this phone number already exists"
                ? "Cet artisan existe déjà"
                : "Une erreur s'est produite lors de l'inscription",
            icon: "error",
            button: "Fermer",
          }).then(() => {
            if (
              result.message === "User with this phone number already exists"
            ) {
              window.location.href = `${BASE_URL_LINK_DEV}/HTML/Acheteur/connexion.html`;
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
});
