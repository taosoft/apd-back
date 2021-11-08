const express = require("express");
const router = express.Router();
const ReclamoController = require("../controllers/sitios.controller");
const Authorization = require("../authorization/authorization");

router.get("/", Authorization, ReclamoController.getSitios);
router.get("/:id", Authorization, ReclamoController.getSitio);

// Export the Router
module.exports = router;
