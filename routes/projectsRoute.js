const express = require("express");
const router = express.Router();
const projectsController = require("../controllers/projectsController");

// Mantiene las URLs existentes: /project1 ... /project9
router.get("/project:id", projectsController.show);

module.exports = router;
