# My portfolio
A personal portfolio developed with Node.js and deployed on Vercel highlights my skills and projects in a sleek, modern interface.

## Getting started
1. Install dependencies: `npm install`
2. Create a `.env` file with the contact form credentials:
   ```
   EMAIL_USER=your-gmail-address
   EMAIL_PASS=your-gmail-app-password
   ```
3. Run in development: `npm run dev` (or `npm start` in production)

## Project structure
```
app.js                  Express setup, middlewares, routes and 404
data/projects.js        Content for every project (English)
data/projects.es.js     Spanish translation of each project's texts
locales/                UI texts in English (en.js) and Spanish (es.js)
middleware/i18n.js      Picks the language (cookie > browser > English)
controllers/            Request handlers (home + contact form, projects)
routes/                 Route definitions
services/mailer.js      Nodemailer transport for the contact form
services/projects.js    Returns the projects in the requested language
views/
  layout.ejs            Base layout
  index.ejs             Home page
  project.ejs           Project detail template (/project1 ... /projectN)
  404.ejs
  partials/             Header, nav links, footer, project card
public/                 Static assets (css, js, images, videos)
```

## Adding a project
Add an entry to `data/projects.js` with the next `id` and drop its image, poster
and video into `public/`. The home card and the `/project<id>` page are generated
automatically.

## Languages (English / Spanish)
The site is rendered in English or Spanish. The visitor can switch with the
EN / ES toggle in the header; the choice is saved in a `lang` cookie. Without a
saved choice, the browser language is used.

- UI texts live in `locales/en.js` and `locales/es.js` (same keys in both).
- Project texts are in `data/projects.js` (English) and `data/projects.es.js`
  (Spanish, only the text fields). A missing Spanish text falls back to English.
