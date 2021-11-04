const express = require("express");
const router = express.Router();
const ReclamoController = require("../controllers/sitios.controller");

router.get("/", ReclamoController.getSitios);
router.get("/:id", ReclamoController.getSitio);

// Export the Router
module.exports = router;
