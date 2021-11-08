const express = require("express");
const router = express.Router();
const ServicioController = require("../controllers/servicios.controller");
const Authorization = require("../authorization/authorization");

router.get("/", ServicioController.getServicios);
router.get("/:id", ServicioController.getServicio);
router.post("/", Authorization, ServicioController.createServicio);

// Export the Router
module.exports = router;
