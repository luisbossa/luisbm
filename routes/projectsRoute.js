const express = require("express");
const router = express.Router();
const projectsController = require("../controllers/projectsController");

router.get("/project1", projectsController.project1);
router.get("/project2", projectsController.project2);
router.get("/project3", projectsController.project3);
router.get("/project4", projectsController.project4);
router.get("/project5", projectsController.project5);
router.get("/project6", projectsController.project6);

module.exports = router;
