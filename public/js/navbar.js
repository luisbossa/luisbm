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
