const form = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");
const errorName = document.getElementById("errorName");
const errorEmail = document.getElementById("errorEmail");
const errorMessage = document.getElementById("errorMessage");
const submitBtn = document.getElementById("submitBtn");
const btnText = document.getElementById("btnText");
const loadingSpinner = document.getElementById("loadingSpinner");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Limpiar mensajes de error
  [errorName, errorEmail, errorMessage].forEach((el) => {
    el.textContent = "";
    el.classList.remove("show");
  });
  successMessage.classList.remove("show");
  successMessage.classList.remove("hide");

  // Preparar datos para enviar
  const data = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    description: document.getElementById("message").value.trim(),
  };

  // Activar el spinner y desactivar el botón
  submitBtn.classList.add("loading");

  try {
    const response = await fetch("/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success) {
      successMessage.classList.add("show");
      form.reset();
      form.scrollIntoView({ behavior: "smooth" });

      setTimeout(() => {
        successMessage.classList.add("hide");
      }, 3000);
    } else {
      if (result.errors.name) {
        errorName.textContent = result.errors.name;
        errorName.classList.add("show");
      }
      if (result.errors.email) {
        errorEmail.textContent = result.errors.email;
        errorEmail.classList.add("show");
      }
      if (result.errors.description) {
        errorMessage.textContent = result.errors.description;
        errorMessage.classList.add("show");
      }
      if (result.errors.send) {
        successMessage.textContent = result.errors.send;
        successMessage.classList.add("show");
      }
      form.scrollIntoView({ behavior: "smooth" });
    }
  } catch (err) {
    console.error("Error sending form:", err);
    successMessage.textContent = "Error sending email. Please try again later.";
    successMessage.classList.add("show");
    form.scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
      successMessage.classList.add("hide");
    }, 3000);
  } finally {
    submitBtn.classList.remove("loading");
  }
});
