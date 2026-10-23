// CARRUSEL DE PROYECTOS
// Avanza solo cada INTERVAL ms y también se controla con flechas,
// teclado o deslizando. El autoplay se pausa con el cursor encima,
// con foco de teclado o cuando el carrusel no está en pantalla.
const carousel = document.querySelector("[data-carousel]");

if (carousel) {
  const INTERVAL = 5000;

  const track = carousel.querySelector(".carousel-track");
  const slides = [...track.children];
  const currentLabel = carousel.querySelector("[data-current]");
  const progressBar = carousel.querySelector(".carousel-progress span");
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  let index = 0;
  let elapsed = 0;
  let lastTime = null;
  let hovered = false;
  let focused = false;
  let visible = false;
  // Destino del scroll lanzado por el propio carrusel (null si no hay ninguno)
  let targetLeft = null;

  const pad = (n) => String(n).padStart(2, "0");

  function setActive(i) {
    index = i;
    currentLabel.textContent = pad(i + 1);
    slides.forEach((slide, n) => slide.classList.toggle("is-active", n === i));
  }

  function goTo(i) {
    const target = (i + slides.length) % slides.length;
    const slide = slides[target];
    targetLeft = Math.max(
      0,
      Math.min(
        slide.offsetLeft + slide.offsetWidth / 2 - track.clientWidth / 2,
        track.scrollWidth - track.clientWidth,
      ),
    );
    track.scrollTo({ left: targetLeft });
    setActive(target);
    elapsed = 0;
  }

  // Sincroniza el índice cuando el usuario desliza a mano
  let scrollTimeout;
  track.addEventListener(
    "scroll",
    () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        // Scroll propio: no recalcular hasta que llegue a su destino
        if (targetLeft !== null) {
          if (Math.abs(track.scrollLeft - targetLeft) > 2) return;
          targetLeft = null;
          return;
        }

        const center = track.scrollLeft + track.clientWidth / 2;
        let nearest = 0;
        slides.forEach((slide, n) => {
          const distance = Math.abs(
            slide.offsetLeft + slide.offsetWidth / 2 - center,
          );
          const best = Math.abs(
            slides[nearest].offsetLeft +
              slides[nearest].offsetWidth / 2 -
              center,
          );
          if (distance < best) nearest = n;
        });
        if (nearest !== index) {
          setActive(nearest);
          elapsed = 0;
        }
      }, 120);
    },
    { passive: true },
  );

  // Si el usuario interviene (rueda, arrastre, toque) manda su scroll
  ["wheel", "pointerdown", "touchstart"].forEach((type) =>
    track.addEventListener(type, () => (targetLeft = null), { passive: true }),
  );

  carousel
    .querySelector("[data-prev]")
    .addEventListener("click", () => goTo(index - 1));
  carousel
    .querySelector("[data-next]")
    .addEventListener("click", () => goTo(index + 1));

  track.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(index - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(index + 1);
    }
  });

  // Pausas del autoplay
  carousel.addEventListener("pointerenter", (e) => {
    if (e.pointerType === "mouse") hovered = true;
  });
  carousel.addEventListener("pointerleave", () => (hovered = false));
  // Solo el foco de teclado pausa; un clic en las flechas no
  carousel.addEventListener(
    "focusin",
    (e) => (focused = e.target.matches(":focus-visible")),
  );
  carousel.addEventListener("keydown", () => (focused = true));
  carousel.addEventListener("focusout", () => (focused = false));

  new IntersectionObserver(
    ([entry]) => (visible = entry.isIntersecting),
    { threshold: 0.4 },
  ).observe(carousel);

  // Bucle de autoplay: el tiempo solo corre cuando no está pausado
  function tick(time) {
    const delta = lastTime === null ? 0 : time - lastTime;
    lastTime = time;

    const paused = hovered || focused || !visible || document.hidden;
    if (!paused) {
      elapsed += delta;
      if (elapsed >= INTERVAL) goTo(index + 1);
    }

    progressBar.style.transform = `scaleX(${Math.min(elapsed / INTERVAL, 1)})`;
    requestAnimationFrame(tick);
  }

  setActive(0);
  if (!prefersReducedMotion) requestAnimationFrame(tick);
}
