const express = require("express");
const router = express.Router();
const ServicioController = require("../controllers/servicios.controller");
const Authorization = require("../authorization/authorization");

router.get("/", ServicioController.getServicios);
router.get("/:id", ServicioController.getServicio);
router.get("/detalle/:id", ServicioController.getServicioDetalle);
router.post("/", Authorization, ServicioController.createServicio);
router.patch("/aprobar/:id", ServicioController.updateServicio);

// Export the Router
module.exports = router;
