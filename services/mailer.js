const nodemailer = require("nodemailer");

// Se crea una sola vez y se reutiliza en cada envío
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );

exports.sendContactEmail = ({ name, email, description }) =>
  transporter.sendMail({
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: "Node Contact Request",
    text: `Name: ${name}\nEmail: ${email}\nDescription: ${description}`,
    html: `
      <ul>
        <li><strong>Name:</strong> ${escapeHtml(name)}</li>
        <li><strong>Email:</strong> ${escapeHtml(email)}</li>
        <li><strong>Description:</strong> ${escapeHtml(description)}</li>
      </ul>
    `,
  });
