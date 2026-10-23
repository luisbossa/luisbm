require("dotenv").config();
const express = require("express");
const path = require("path");
const expressLayout = require("express-ejs-layouts");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.locals.title = "Luis Bossa";

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressLayout);
app.use(
  express.static(path.join(__dirname, "public"), {
    maxAge: process.env.NODE_ENV === "production" ? "7d" : 0,
  }),
);

// Idioma (después de los estáticos: solo afecta a las páginas)
app.use(require("./middleware/i18n"));

// Routes
app.use(require("./routes/homeRoute"));
app.use(require("./routes/projectsRoute"));

// 404
app.use((req, res) => {
  res
    .status(404)
    .render("404", { title: `${res.locals.t("meta.notFound")} | Luis Bossa` });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;
