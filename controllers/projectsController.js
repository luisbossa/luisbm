const { getProjects } = require("../services/projects");

const DAY = 24 * 60 * 60 * 1000;

// "9 days" / "3 semanas"... a partir de las fechas de inicio y fin (ambas incluidas)
function formatDuration(start, end, t) {
  const days = Math.round((new Date(end) - new Date(start)) / DAY) + 1;
  if (!Number.isFinite(days) || days < 1) return null;
  if (days < 14) return `${days} ${t("project.days")}`;
  return `${Math.round(days / 7)} ${t("project.weeks")}`;
}

// "May 2, 2025" -> "2 de mayo de 2025" según el idioma
function formatDate(value, lang) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(lang, { dateStyle: "long" }).format(date);
}

exports.show = (req, res, next) => {
  const projects = getProjects(req.lang);
  const index = projects.findIndex((p) => p.id === Number(req.params.id));

  // Si el proyecto no existe, pasa al manejador 404
  if (index === -1) return next();

  const project = projects[index];
  const { t } = res.locals;

  res.render("project", {
    project,
    total: projects.length,
    prev: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
    startDate: formatDate(project.startDate, req.lang),
    endDate: formatDate(project.endDate, req.lang),
    duration: formatDuration(project.startDate, project.endDate, t),
    year: new Date(project.endDate).getFullYear(),
    domain: new URL(project.demoUrl).hostname,
    title: `${project.title} | Luis Bossa`,
  });
};
