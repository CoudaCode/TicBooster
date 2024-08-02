window.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("accessToken");
  const sellButton = document.querySelector(".sell-button");
  const buyButton = document.querySelector(".buy-button");
  const profileIcon = document.getElementById("profile-icon");

  if (token) {
    if (profileIcon) profileIcon.classList.remove("hidden");
    if (sellButton) sellButton.classList.add("hidden");
    if (buyButton) buyButton.classList.add("hidden");
  } else {
    window.location.href = "http://127.0.0.1:5500/HTML/login.html";
  }

  const logoutButton = document.getElementById("logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
      localStorage.removeItem("accessToken");
      window.location.reload();
    });
  }
});
