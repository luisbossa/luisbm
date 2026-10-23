const form = document.getElementById("contactForm");
const statusMessage = document.getElementById("successMessage");
const submitBtn = document.getElementById("submitBtn");
const messageInput = document.getElementById("message");
const charCount = document.querySelector("[data-count]");

const fields = {
  name: { input: document.getElementById("name"), error: document.getElementById("errorName") },
  email: { input: document.getElementById("email"), error: document.getElementById("errorEmail") },
  description: { input: messageInput, error: document.getElementById("errorMessage") },
};

// Textos en el idioma de la página (los define el layout en window.I18N)
const TEXT = {
  success: "Message sent successfully! I'll get back to you soon.",
  error: "Error sending email. Please try again later.",
  copy: "Copy",
  copied: "Copied",
  copyFailed: "Copy failed",
  ...window.I18N,
};

let hideTimeout;

function showStatus(text, type) {
  clearTimeout(hideTimeout);
  statusMessage.textContent = text;
  statusMessage.classList.toggle("is-error", type === "error");
  statusMessage.classList.remove("hide");
  statusMessage.classList.add("show");

  hideTimeout = setTimeout(() => statusMessage.classList.add("hide"), 5000);
}

function setFieldError(field, text) {
  field.error.textContent = text;
  field.error.classList.toggle("show", Boolean(text));
  field.input.classList.toggle("is-invalid", Boolean(text));
}

// Contador de caracteres del mensaje
function updateCount() {
  charCount.textContent = messageInput.value.length;
}

messageInput.addEventListener("input", updateCount);

// El error de un campo desaparece en cuanto se corrige
Object.values(fields).forEach((field) => {
  field.input.addEventListener("input", () => setFieldError(field, ""));
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  Object.values(fields).forEach((field) => setFieldError(field, ""));
  statusMessage.classList.remove("show");

  const data = {
    name: fields.name.input.value.trim(),
    email: fields.email.input.value.trim(),
    description: fields.description.input.value.trim(),
  };

  submitBtn.classList.add("loading");

  try {
    const response = await fetch("/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result.success) {
      form.reset();
      updateCount();
      showStatus(TEXT.success, "success");
      return;
    }

    Object.entries(fields).forEach(([key, field]) => {
      if (result.errors[key]) setFieldError(field, result.errors[key]);
    });
    if (result.errors.send) showStatus(result.errors.send, "error");

    const firstInvalid = form.querySelector(".is-invalid");
    if (firstInvalid) firstInvalid.focus();
  } catch (err) {
    console.error("Error sending form:", err);
    showStatus(TEXT.error, "error");
  } finally {
    submitBtn.classList.remove("loading");
  }
});

// Copiar el email al portapapeles.
// La Clipboard API exige HTTPS y foco; si falla se usa el método clásico.
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const helper = document.createElement("textarea");
    helper.value = text;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.select();
    const copied = document.execCommand("copy");
    helper.remove();
    return copied;
  }
}

document.querySelectorAll("[data-copy]").forEach((button) => {
  const label = button.querySelector("span");

  button.addEventListener("click", async () => {
    if (await copyText(button.dataset.copy)) {
      label.textContent = TEXT.copied;
      button.classList.add("copied");
    } else {
      label.textContent = TEXT.copyFailed;
    }

    setTimeout(() => {
      label.textContent = TEXT.copy;
      button.classList.remove("copied");
    }, 2000);
  });
});
