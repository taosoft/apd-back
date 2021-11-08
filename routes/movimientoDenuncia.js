const express = require("express");
const router = express.Router();
const MovimientoDenunciaController = require("../controllers/movimientoDenuncia.controller");
const Authorization = require("../authorization/authorization");

router.get("/:id", Authorization, MovimientoDenunciaController.getMovimientosDenuncias);
router.post("/:id", Authorization, MovimientoDenunciaController.createMovimientoDenuncia);

// Export the Router
module.exports = router;
