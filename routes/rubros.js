const express = require("express");
const router = express.Router();
const RubroController = require("../controllers/rubros.controller");
const Authorization = require("../authorization/authorization");

router.get("/", Authorization, RubroController.getRubros);

// Export the Router
module.exports = router;
