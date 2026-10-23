const { getProjects } = require("../services/projects");
const { sendContactEmail } = require("../services/mailer");

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.home = (req, res) => {
  res.render("index", { projects: getProjects(req.lang) });
};

exports.send = async (req, res) => {
  const { t } = res.locals;
  const name = String(req.body.name ?? "").trim();
  const email = String(req.body.email ?? "").trim();
  const description = String(req.body.description ?? "").trim();

  // --- VALIDACIONES ---
  const errors = {};
  if (!name) errors.name = t("errors.name");
  if (!EMAIL_REGEX.test(email)) errors.email = t("errors.email");
  if (!description) errors.description = t("errors.description");
  else if (description.length > 1000) errors.description = t("errors.tooLong");

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  // --- ENVIAR EL CORREO ---
  try {
    await sendContactEmail({ name, email, description });
    return res.json({ success: true });
  } catch (err) {
    console.error("Error sending email:", err);
    return res.status(500).json({
      success: false,
      errors: { send: t("errors.send") },
    });
  }
};
