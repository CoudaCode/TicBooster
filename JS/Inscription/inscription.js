const url = "http://localhost:3000/api/auth/register";

async function registerUser(firstname, lastname, email, password, phoneNumber) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        phoneNumber: phoneNumber,
        lastname: lastname,
        firstname: firstname,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Register successful:", data);
    window.location.href = "./login.html";
    return data;
  } catch (error) {
    console.error("Error during register:", error);
  }
}

document
  .getElementById("registerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    registerUser(email, password, firstname, lastname, phoneNumber);
  });
