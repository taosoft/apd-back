const express = require("express");
const router = express.Router();
const DenunciaController = require("../controllers/denuncias.controller");
const Authorization = require("../authorization/authorization");

router.get("/usuario/:id", Authorization, DenunciaController.getDenuncias);
router.get("/:id", Authorization, DenunciaController.getDenuncia);
router.get("/detalle/:id", Authorization, DenunciaController.getDenunciaDetalle);
router.post("/", Authorization, DenunciaController.createDenuncia);

// Export the Router
module.exports = router;
