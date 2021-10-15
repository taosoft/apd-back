const express = require("express");
const router = express.Router();
const ComercioController = require("../controllers/comercios.controller");

router.get("/", ComercioController.getComercios);
router.get("/:id", ComercioController.getComercio);
router.post("/", ComercioController.createComercio);

// Export the Router
module.exports = router;
