const express = require("express");
const router = express.Router();
const ReclamoController = require("../controllers/reclamos.controller");
const Authorization = require("../authorization/authorization");

router.get("/", Authorization, ReclamoController.getReclamos);
router.get("/:id", Authorization, ReclamoController.getReclamo);
router.get("/detalle/:id", Authorization, ReclamoController.getReclamoDetalle);
router.post("/", Authorization, ReclamoController.createReclamo);
// router.post("/unificar", ReclamoController.unificarReclamo); //Lo hace el municipio
router.patch("/:id", Authorization, ReclamoController.updateReclamo);

// Export the Router
module.exports = router;
