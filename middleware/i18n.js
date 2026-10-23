const locales = {
  en: require("../locales/en"),
  es: require("../locales/es"),
};

const SUPPORTED = Object.keys(locales);
const DEFAULT_LANG = "en";
const ONE_YEAR = 365 * 24 * 60 * 60 * 1000;

// Busca "a.b.0.c" dentro de un objeto
const lookup = (obj, key) =>
  key.split(".").reduce((value, part) => (value == null ? value : value[part]), obj);

function readCookie(req, name) {
  const match = (req.headers.cookie || "")
    .split(";")
    .map((part) => part.trim().split("="))
    .find(([key]) => key === name);
  return match ? decodeURIComponent(match[1]) : null;
}

module.exports = (req, res, next) => {
  // ?lang=es guarda la preferencia y redirige a la URL limpia
  // (el navegador conserva el #ancla en la redirección)
  const requested = req.query.lang;
  if (req.method === "GET" && SUPPORTED.includes(requested)) {
    res.cookie("lang", requested, { maxAge: ONE_YEAR, sameSite: "lax" });
    const url = new URL(req.originalUrl, "http://localhost");
    url.searchParams.delete("lang");
    return res.redirect(url.pathname + url.search);
  }

  // Preferencia guardada > idioma del navegador > inglés
  const saved = readCookie(req, "lang");
  const lang = SUPPORTED.includes(saved)
    ? saved
    : req.acceptsLanguages(...SUPPORTED) || DEFAULT_LANG;

  req.lang = lang;
  res.locals.lang = lang;
  res.locals.languages = SUPPORTED;
  res.locals.t = (key) => lookup(locales[lang], key) ?? lookup(locales[DEFAULT_LANG], key) ?? key;

  // JSON seguro para incrustar en <script>: cada "<" se escapa como
  // secuencia unicode (barra invertida + u003c) para que no cierre la etiqueta
  res.locals.clientStrings = JSON.stringify(res.locals.t("client")).replace(
    /</g,
    String.fromCharCode(92) + "u003c",
  );

  // La misma URL devuelve contenido distinto según el idioma
  res.vary("Cookie");
  res.vary("Accept-Language");
  next();
};
