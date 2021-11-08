const express = require("express");
const router = express.Router();
const MovimientoReclamoController = require("../controllers/movimientoReclamo.controller");
const Authorization = require("../authorization/authorization");

router.get("/:id", Authorization, MovimientoReclamoController.getMovimientosReclamos);
router.post("/:id", Authorization, MovimientoReclamoController.createMovimientoReclamo);

// Export the Router
module.exports = router;
