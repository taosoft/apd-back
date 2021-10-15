const express = require("express");
const router = express.Router();
const ServicioController = require("../controllers/servicio.controller");

router.get("/", ServicioController.getServicios);
router.get("/:id", ServicioController.getServicio);
router.post("/", ServicioController.createServicio);

// Export the Router
module.exports = router;
