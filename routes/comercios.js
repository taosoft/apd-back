const express = require("express");
const router = express.Router();
const ComercioController = require("../controllers/comercios.controller");
const Authorization = require("../authorization/authorization");

router.get("/", ComercioController.getComercios);
router.get("/:id", ComercioController.getComercio);
router.post("/", Authorization, ComercioController.createComercio);
router.patch("/aprobar/:id", ComercioController.updateComercio);

// Export the Router
module.exports = router;
