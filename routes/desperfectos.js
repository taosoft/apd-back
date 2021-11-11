const express = require("express");
const router = express.Router();
const DesperfectosController = require("../controllers/desperfectos.controller");
const Authorization = require("../authorization/authorization");

router.get("/", Authorization, DesperfectosController.getDesperfectos);
router.get("/:id", Authorization, DesperfectosController.getDesperfecto);

// Export the Router
module.exports = router;
