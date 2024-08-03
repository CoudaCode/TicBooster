import { BASE_URL_API_DEV, BASE_URL_LINK_DEV } from "./../script.js";
window.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("loginForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      // Réinitialiser les messages d'erreur
      document.getElementById("phoneError").classList.add("hidden");
      document.getElementById("passwordError").classList.add("hidden");

      // Récupérer les valeurs des champs
      const phoneNumber = document
        .getElementById("phone")
        .value.replace(/\s+/g, ""); // Enlever les espaces
      const password = document.getElementById("password").value;

      // Validation des saisies côté client
      let isValid = true;

      // Validation du numéro de téléphone
      const phonePattern = /^\+225\d{10}$/;
      if (!phonePattern.test(phoneNumber)) {
        document.getElementById("phoneError").classList.remove("hidden");
        document.getElementById("phoneError").textContent =
          "Numéro de téléphone invalide";
        isValid = false;
      }

      // Validation du mot de passe
      if (password.length < 2) {
        // Assurez-vous que le mot de passe contient au moins 6 caractères
        document.getElementById("passwordError").classList.remove("hidden");
        document.getElementById("passwordError").textContent =
          "Le mot de passe doit contenir au moins 6 caractères";
        isValid = false;
      }

      if (!isValid) {
        return;
      }

      const obj = {
        phoneNumber,
        password,
      };

      try {
        const response = await fetch(`${BASE_URL_API_DEV}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        });

        const responseData = await response.json();

        console.log("Login successful:", responseData);
        if (responseData.status === "success") {
          localStorage.setItem("accessToken", responseData.data.token);
          swal({
            title: "Connexion réussie",
            text: "Vous êtes maintenant connecté !",
            icon: "success",
            button: "OK",
          }).then(() => {
            // Redirection après fermeture du modal
            window.location.href = `${BASE_URL_LINK_DEV}/HTML/creationProduit/page_produit.html`;
          });
        } else if (responseData.status === "error") {
          document.getElementById("phoneError").classList.remove("hidden");
          document.getElementById("phoneError").textContent =
            responseData.messages ||
            "Numéro de téléphone ou mot de passe incorrect";
        }
      } catch (error) {
        console.error("Erreur réseau", error);
      }
    });

  // Réinitialiser les messages d'erreur lorsque l'utilisateur commence à ressaisir les informations
  document.getElementById("phone").addEventListener("input", function () {
    document.getElementById("phoneError").classList.add("hidden");
  });

  document.getElementById("password").addEventListener("input", function () {
    document.getElementById("passwordError").classList.add("hidden");
  });
});
