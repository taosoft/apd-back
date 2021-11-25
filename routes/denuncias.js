const express = require("express");
const router = express.Router();
const DenunciaController = require("../controllers/denuncias.controller");
const Authorization = require("../authorization/authorization");

router.get("/usuario", Authorization, DenunciaController.getDenuncias);
router.get("/:id", Authorization, DenunciaController.getDenuncia);
router.get("/detalle/:id", Authorization, DenunciaController.getDenunciaDetalle);
router.post("/", Authorization, DenunciaController.createDenuncia);
router.patch("/:id", DenunciaController.updateDenuncia);

// Export the Router
module.exports = router;
