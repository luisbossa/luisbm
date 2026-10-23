const projects = require("../data/projects");

const translations = {
  es: require("../data/projects.es"),
};

// Devuelve los proyectos con los textos en el idioma pedido.
// Si falta alguna traducción se usa el texto original en inglés.
exports.getProjects = (lang) => {
  const texts = translations[lang];
  if (!texts) return projects;

  return projects.map((project) => {
    const translated = texts[project.id] || {};
    return {
      ...project,
      ...translated,
      card: { ...project.card, ...translated.card },
    };
  });
};
