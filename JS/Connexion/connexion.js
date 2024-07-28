const url = "http://localhost:3000/api/auth/login";

async function loginUser(email, password) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        email: email,
        password: password,
      }).toString(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Login successful:", data);
    localStorage.setItem("user", JSON.stringify(data));
    ///window.location.href = "/index.html";
    return data;
  } catch (error) {
    console.error("Error during login:", error);
  }
}

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    loginUser(email, password);
  });
