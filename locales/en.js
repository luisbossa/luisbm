// Textos en inglés (idioma por defecto).
// Las claves marcadas como "HTML" se imprimen sin escapar en la plantilla.
module.exports = {
  meta: {
    description:
      "Luis Bossa — Frontend developer and UI designer from Costa Rica. Portfolio of web projects built with HTML, CSS, JavaScript, React and Node.js.",
    notFound: "Page not found",
  },

  nav: {
    home: "Home",
    about: "About",
    resume: "Resume",
    portfolio: "Portfolio",
    contact: "Contact",
    language: "Language",
    footer: "Footer",
    backToTop: "Back to top",
  },

  hero: {
    title: "UI DEVELOPER",
    // HTML
    experience: '<span class="accent">+4 </span>YEARS<br>Of<br>EXPERIENCE',
    // HTML
    bio: 'I CREATE <span class="accent">CONSISTENT WEB DESIGNS</span> WITH A <span class="accent">CLEAN USER EXPERIENCE</span>.',
    scroll: "Scroll down",
  },

  services: {
    label: "01 / Services",
    title: "What I Do",
    intro: "Frontend work with a designer’s eye, from the first layout to the last pixel.",
    items: [
      {
        title: "Frontend Development",
        text: "I build modern and responsive web pages that work well on any device.",
        tags: ["Responsive layouts", "React & Next.js", "Accessible markup"],
      },
      {
        title: "Problem Solving",
        text: "With focus and clear ideas, I fix UI issues and improve performance, helping users navigate with ease and satisfaction.",
        tags: ["UI debugging", "Performance", "Clean refactors"],
      },
      {
        title: "Attention to Detail",
        text: "I pay close attention to all details to make sure the final product looks great and works perfectly.",
        tags: ["Pixel-accurate UI", "Cross-device testing", "Consistent design"],
      },
    ],
  },

  about: {
    label: "02 / About",
    title: "About Me",
    intro: "A frontend developer from Costa Rica who cares about how a site looks as much as how it works.",
    kicker: "Web design meets code",
    statement: "I turn ideas into unique websites.",
    text: "The way a website looks is essential, because it’s what catches the user’s attention. That’s why, in my work, design and code go hand in hand.",
    facts: {
      years: "Years of experience",
      projects: "Projects in this portfolio",
      location: "Based in Costa Rica",
    },
    role: "Frontend Developer / UI Designer",
    linkedinLabel: "View LinkedIn profile",
    creativityTitle: "Creativity & discipline",
    // HTML
    creativityText:
      "I work out frequently, which helps me clear my mind and come up with new ideas.<br><br>Fitness has taught me discipline and patience, qualities I apply to frontend development to keep improving and focus on the details.",
    connectTitle: "Have questions or want to connect?",
    connectText:
      "If you want to know more, feel free to reach out. I’m open to new frontend opportunities.",
    contactMe: "Contact me",
    toolboxTitle: "Development toolbox",
    toolbox: [
      ["Core", "HTML, CSS, JavaScript, TypeScript, PHP"],
      ["Frameworks & Libraries", "Next, React, Laravel, Tailwind CSS, Bootstrap, Sass"],
      ["Backend & Templating", "Node.js, Express, EJS, Pug"],
      ["Page Builders", "WordPress, Elementor, Webflow"],
      ["Version Control", "Git, GitHub"],
    ],
  },

  resume: {
    label: "03 / Resume",
    title: "Professional Journey",
    education: "Education",
    experience: "Experience",
    educationItems: [
      {
        date: "2024",
        title: "Self-taught in programming technologies",
        org: "Independent learning",
        text: "Since the beginning of my career, I have complemented my academic education with independent learning, modern tools, languages, and frameworks driven by curiosity.",
      },
      {
        date: "2020 — 2023",
        title: "Technological University of Costa Rica (UTC)",
        text: "Bachelor's Degree in Computer Engineering.",
      },
    ],
    experienceItems: [
      {
        date: "Jan 2024 — Oct 2025",
        title: "Frontend Developer / UI Designer",
        org: "CCSS · Costa Rican Social Security Fund",
        text: "I worked on frontend projects for the Costa Rican Social Security Fund (CCSS), creating screens that show medical information from the server in real time. I also developed several freelance and personal web projects.",
      },
      {
        date: "Feb 2023 — Jul 2023",
        title: "Full-Stack Developer",
        org: "Servicios Integrales JV & JA",
        text: "I was instrumental in designing and managing databases using Laravel and PHP for efficient data storage and retrieval. This included creating database schemas, writing optimized SQL queries, and implementing strategies for data migration.",
      },
      {
        date: "Mar 2022 — Nov 2022",
        title: "Frontend Developer",
        org: "EJE Digital",
        text: "A key part of my role involved creating responsive applications. I made sure that all the web applications I worked on were fully optimized for different devices and screen sizes, ensuring a smooth user experience on smartphones, tablets, and desktops.",
      },
    ],
  },

  skills: "Skills",

  portfolio: {
    label: "04 / Selected work",
    title: "My Projects",
    carousel: "Projects",
    previous: "Previous project",
    next: "Next project",
    readMore: "Read more",
  },

  contact: {
    label: "05 / Contact",
    title: "Get in Touch",
    intro: "Looking to grow your business? I’m here to help. Freelance projects welcome too!",
    infoTitle: "Contact info",
    infoIntro: "Write to me directly or use the form, whichever is easier for you.",
    email: "Email",
    phone: "Phone",
    location: "Location",
    copy: "Copy",
    copyLabel: "Copy email address",
    findMe: "Find me on",
    formTitle: "Send a message",
    name: "Name",
    namePlaceholder: "Jane Doe",
    emailPlaceholder: "jane@company.com",
    message: "Message",
    messagePlaceholder: "Tell me a bit about your project, timeline and goals.",
    note: "Your details are only used to reply to you.",
    send: "Send message",
  },

  // Textos que usa el JavaScript del navegador
  client: {
    success: "Message sent successfully! I'll get back to you soon.",
    error: "Error sending email. Please try again later.",
    copy: "Copy",
    copied: "Copied",
    copyFailed: "Copy failed",
  },

  // Mensajes de validación del servidor
  errors: {
    name: "Please enter your name",
    email: "Please enter a valid email",
    description: "Please enter your message",
    tooLong: "Your message is too long (max. 1000 characters)",
    send: "Error sending email. Please try again later.",
  },

  project: {
    allProjects: "All projects",
    caseStudy: "Case study",
    viewDemo: "View Demo",
    viewCode: "View Code",
    timeline: "Timeline",
    duration: "Duration",
    year: "Year",
    stack: "Stack",
    days: "days",
    weeks: "weeks",
    scrollHint: "Scroll inside the window to see the full page",
    features: "Main features",
    challenges: "Challenges",
    performance: "Performance & deployment",
    seo: "SEO & accessibility",
    role: "Role",
    previous: "Previous",
    next: "Next",
    moreProjects: "More projects",
  },

  notFound: {
    title: "Page not found",
    text: "The page you are looking for does not exist.",
    goHome: "Go Home",
  },
};
