const header = document.querySelector("header");
const headerWrap = document.querySelector(".header_div");
const progressBar = document.querySelector(".scroll-progress");
// Solo las secciones enlazadas desde el menú (tienen id)
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".menu li a");

// Top animation / Header
function updateHeaderAnimation() {
  header.setAttribute("data-aos", window.scrollY > 50 ? "none" : "fade-down");
}

// Header "glass" + barra de progreso
function updateScrollState() {
  headerWrap.classList.toggle("scrolled", window.scrollY > 50);

  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  progressBar.style.setProperty("--progress", progress.toFixed(4));
}

// links active / Spy Navbar
function setActiveLinkOnScroll() {
  // Páginas sin secciones (detalle de proyecto): ningún enlace activo
  if (!sections.length) {
    navLinks.forEach((link) => link.classList.remove("active"));
    return;
  }

  let currentSectionId = "home";

  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - section.offsetHeight * 0.6) {
      currentSectionId = section.id || currentSectionId;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === `/#${currentSectionId}`,
    );
  });
}

// Agrupa el trabajo del scroll en un solo frame
let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    updateHeaderAnimation();
    updateScrollState();
    setActiveLinkOnScroll();
    ticking = false;
  });
}

window.addEventListener("load", () => {
  updateScrollState();
  setActiveLinkOnScroll();
});
window.addEventListener("scroll", onScroll, { passive: true });

// RESPONSIVE MENU
const checkIcon = document.getElementById("check-icon");
const responsiveMenu = document.querySelector(".menu_responsive_box");

function toggleResponsiveMenu(open) {
  checkIcon.checked = open;
  responsiveMenu.style.height = open ? `${responsiveMenu.scrollHeight}px` : "0";
  responsiveMenu.style.border = open ? "1px solid var(--c-line)" : "none";
  if (open) responsiveMenu.style.borderTop = "none";
}

checkIcon.addEventListener("change", () =>
  toggleResponsiveMenu(checkIcon.checked),
);

responsiveMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => toggleResponsiveMenu(false));
});

// IDIOMA: al cambiar se conserva la sección actual (#ancla)
document.querySelectorAll("[data-lang-link]").forEach((link) => {
  link.addEventListener("click", () => {
    link.href = link.getAttribute("href").split("#")[0] + window.location.hash;
  });
});
