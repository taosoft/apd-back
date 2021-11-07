const express = require("express");
const router = express.Router();
const DesperfectosController = require("../controllers/desperfectos.controller");

router.get("/", DesperfectosController.getDesperfectos);

// Export the Router
module.exports = router;
