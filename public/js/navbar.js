// Top animation / Header
window.onscroll = function () {
  const header = document.querySelector("header");

  if (window.scrollY > 50) {
    header.setAttribute("data-aos", "none");
  } else {
    header.setAttribute("data-aos", "fade-down");
  }
};

// links active / Spy Navbar
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".menu li a");

function setActiveLinkOnScroll() {
  let currentSectionId = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (pageYOffset >= sectionTop - sectionHeight * 0.6) {
      currentSectionId = section.getAttribute("id");
    }
  });

  if (!currentSectionId) {
    currentSectionId = "home";
  }

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `/#${currentSectionId}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("load", setActiveLinkOnScroll);
window.addEventListener("scroll", setActiveLinkOnScroll);

// RESPONSIVE MENU
const checkIcon = document.getElementById("check-icon");
const responsiveMenu = document.querySelector(".menu_responsive_box");
const menuLinks = responsiveMenu.querySelectorAll("a");

checkIcon.addEventListener("change", () => {
  if (checkIcon.checked) {
    responsiveMenu.style.height = responsiveMenu.scrollHeight + "px";
    responsiveMenu.style.border = "1px solid var(--c-line)";
    responsiveMenu.style.borderTop = "none";
  } else {
    responsiveMenu.style.height = "0";
    responsiveMenu.style.border = "none";
  }
});

menuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    checkIcon.checked = false;
    responsiveMenu.style.height = "0";
    responsiveMenu.style.border = "none";
  });
});
