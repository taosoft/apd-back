const express = require("express");
const router = express.Router();
const RubroController = require("../controllers/rubros.controller");

router.get("/", RubroController.getRubros);

// Export the Router
module.exports = router;
