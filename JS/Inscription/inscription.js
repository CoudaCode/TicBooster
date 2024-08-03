import { BASE_URL_API_DEV, BASE_URL_LINK_DEV } from "./../script.js";

window.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("registerForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      // Réinitialiser les messages d'erreur
      ["firstname", "lastname", "phone", "email", "password"].forEach((id) => {
        document.getElementById(id + "Error").classList.add("hidden");
      });

      // Récupérer les valeurs des champs
      const firstname = document.getElementById("firstname").value.trim();
      const lastname = document.getElementById("lastname").value.trim();
      const phoneNumber = document
        .getElementById("phone")
        .value.replace(/\s+/g, ""); // Enlever les espaces
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value;

      // Validation des saisies côté client
      let isValid = true;

      // Validation du nom
      if (firstname === "") {
        document.getElementById("firstnameError").classList.remove("hidden");
        document.getElementById("firstnameError").textContent =
          "Le nom est requis";
        isValid = false;
      }

      // Validation du prénom
      if (lastname === "") {
        document.getElementById("lastnameError").classList.remove("hidden");
        document.getElementById("lastnameError").textContent =
          "Le prénom est requis";
        isValid = false;
      }

      // Validation du numéro de téléphone
      const phonePattern = /^\+225\d{10}$/;
      if (!phonePattern.test(phoneNumber)) {
        document.getElementById("phoneError").classList.remove("hidden");
        document.getElementById("phoneError").textContent =
          "Numéro de téléphone invalide (ex: +2250102030405)";
        isValid = false;
      }

      // Validation de l'adresse mail
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        document.getElementById("emailError").classList.remove("hidden");
        document.getElementById("emailError").textContent =
          "Adresse mail invalide";
        isValid = false;
      }

      // Validation du mot de passe
      if (password.length < 6) {
        document.getElementById("passwordError").classList.remove("hidden");
        document.getElementById("passwordError").textContent =
          "Le mot de passe doit contenir au moins 6 caractères";
        isValid = false;
      }

      if (!isValid) {
        return;
      }

      const obj = {
        firstname,
        lastname,
        phoneNumber,
        email,
        password,
      };

      try {
        const response = await fetch(`${BASE_URL_API_DEV}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        });

        const responseData = await response.json();

        if (responseData.status === "success") {
          swal({
            title: "Inscription réussie",
            text: "Votre compte a été créé avec succès !",
            icon: "success",
            button: "OK",
          }).then(() => {
            window.location.href = `${BASE_URL_LINK_DEV}/HTML/login.html`;
          });
        } else {
          console.error(responseData.message);
          swal({
            title: "Erreur",
            text:
              responseData.message === "phoneNumber already exists"
                ? "Ce numéro de téléphone est déjà utilisé"
                : "Une erreur est survenue lors de l'inscription",
            icon: "error",
            button: "OK",
          });
        }
      } catch (error) {
        swwl({
          title: "Erreur",
          text: error.message,
          icon: "error",
          button: "OK",
        });
      }
    });

  ["firstname", "lastname", "phone", "email", "password"].forEach((id) => {
    document.getElementById(id).addEventListener("input", function () {
      document.getElementById(id + "Error").classList.add("hidden");
    });
  });

  // Bascule de la visibilité du mot de passe
  const togglePassword = document.getElementById("togglePassword");
  const passwordInput = document.getElementById("password");
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
});
