// TABS
const labels = document.querySelectorAll(".tab-label");
const contents = document.querySelectorAll(".tab-content");

document.querySelectorAll(".tab-input").forEach((input) => {
  input.addEventListener("click", () => {
    labels.forEach((label) =>
      label.classList.toggle("active", label.htmlFor === input.id),
    );

    const contentId = input.id === "tab1" ? "education" : "experience";
    contents.forEach((content) =>
      content.classList.toggle("active", content.id === contentId),
    );
  });
});

// LIKES
const MAX_LIKES = 5;

const readLikes = (key) => {
  try {
    return parseInt(localStorage.getItem(key), 10) || 0;
  } catch {
    return 0;
  }
};

const saveLikes = (key, count) => {
  try {
    localStorage.setItem(key, count);
  } catch {
    // localStorage no disponible (modo privado, etc.)
  }
};

document.querySelectorAll(".btn-label").forEach((label) => {
  const likeCounter = label.querySelector(".like-text-content");
  const inputCheckbox = label.querySelector(".input-box");
  const solidIcon = label.querySelector("#icon-like-solid");
  const regularIcon = label.querySelector("#icon-like-regular");
  const key = `likeCount_${inputCheckbox.id}`;

  let count = readLikes(key);

  function render(liked) {
    inputCheckbox.checked = liked;
    likeCounter.textContent = count;
    solidIcon.style.display = liked ? "inline" : "none";
    regularIcon.style.display = liked ? "none" : "inline";

    if (count >= MAX_LIKES) {
      label.classList.add("disabled");
      label.style.pointerEvents = "none";
    }
  }

  render(count > 0);

  label.addEventListener("click", (e) => {
    if (e.target.tagName === "INPUT") return;

    if (!inputCheckbox.checked && count < MAX_LIKES) {
      count++;
      render(true);
    } else if (inputCheckbox.checked && count > 0) {
      count--;
      render(false);
    } else {
      return;
    }

    saveLikes(key, count);
  });
});
