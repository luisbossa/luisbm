const inputs = document.querySelectorAll(".tab-input");
const labels = document.querySelectorAll(".tab-label");
const contents = document.querySelectorAll(".tab-content");

inputs.forEach((input) => {
  input.addEventListener("click", () => {
    // Quitar clase activa de todos los labels
    labels.forEach((label) => label.classList.remove("active"));

    // Agregar clase activa al label actual
    const label = document.querySelector(`label[for="${input.id}"]`);
    label.classList.add("active");

    // Mostrar el contenido correspondiente
    contents.forEach((content) => content.classList.remove("active"));

    const contentId = input.id === "tab1" ? "education" : "experience";
    document.getElementById(contentId).classList.add("active");
  });
});

document.querySelectorAll(".btn-label").forEach((label) => {
  const likeCounter = label.querySelector(".like-text-content");
  const inputCheckbox = label.querySelector(".input-box");
  const solidIcon = label.querySelector("#icon-like-solid");
  const regularIcon = label.querySelector("#icon-like-regular");
  const maxLikes = 5;
  const key = `likeCount_${inputCheckbox.id}`;

  // Cargar el estado desde localStorage
  let storedData = localStorage.getItem(key);
  let count = storedData ? parseInt(storedData) : 0;
  likeCounter.textContent = count;

  if (count > 0) {
    inputCheckbox.checked = true;
    solidIcon.style.display = "inline";
    regularIcon.style.display = "none";
  } else {
    inputCheckbox.checked = false;
    solidIcon.style.display = "none";
    regularIcon.style.display = "inline";
  }

  if (count >= maxLikes) {
    label.classList.add("disabled");
    label.style.pointerEvents = "none";
  }

  label.addEventListener("click", (e) => {
    if (e.target.tagName === "INPUT") return;

    let count = parseInt(likeCounter.textContent);

    // Si ya alcanzó el máximo y no está activado, salir
    if (count >= maxLikes && !inputCheckbox.checked) {
      return;
    }

    // Activar
    if (!inputCheckbox.checked && count < maxLikes) {
      inputCheckbox.checked = true;
      count++;
      likeCounter.textContent = count;
      solidIcon.style.display = "inline";
      regularIcon.style.display = "none";
      localStorage.setItem(key, count);

      if (count >= maxLikes) {
        label.classList.add("disabled");
        label.style.pointerEvents = "none";
      }
    }

    // Desactivar
    else if (inputCheckbox.checked && count > 0) {
      inputCheckbox.checked = false;
      count--;
      likeCounter.textContent = count;
      solidIcon.style.display = "none";
      regularIcon.style.display = "inline";
      localStorage.setItem(key, count);
    }
  });
});
