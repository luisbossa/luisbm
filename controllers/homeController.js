const nodemailer = require("nodemailer");

exports.home = (req, res) => {
  // Siempre definimos message, errors y old
  res.render("index", {
    message: null,
    errors: {},
    old: {},
  });
};

exports.send = async (req, res) => {
  const { name, email, description } = req.body;
  let errors = {};

  // --- VALIDACIONES ---
  if (!name || name.trim() === "") {
    errors.name = "Please enter your name";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = "Please enter a valid email";
  }

  if (!description || description.trim() === "") {
    errors.description = "Please enter your message";
  }

  // --- SI HAY ERRORES, ENVIAR JSON ---
  if (Object.keys(errors).length > 0) {
    return res.json({ success: false, errors });
  }

  // --- CONFIGURAR NODEMAILER ---
  const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const output = `
    <ul>
      <li><strong>Name:</strong> ${name}</li>
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>Description:</strong> ${description}</li>
    </ul>
  `;

  const mailOptions = {
    to: process.env.EMAIL_USER,
    subject: "Node Contact Request",
    text: "Thanks for contacting me!",
    html: output,
  };

  // --- ENVIAR EL CORREO ---
  try {
    await transporter.sendMail(mailOptions);

    // Éxito
    return res.json({ success: true });
  } catch (err) {
    console.error("Error sending email:", err);
    return res.json({
      success: false,
      errors: { send: "Error sending email. Please try again later." },
    });
  }
};
