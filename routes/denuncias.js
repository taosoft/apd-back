const express = require("express");
const router = express.Router();
const DenunciaController = require("../controllers/denuncias.controller");

router.get("/:documento", DenunciaController.getDenuncias);
router.get("/:id", DenunciaController.getDenuncia);
router.post("/", DenunciaController.createDenuncia);

// Export the Router
module.exports = router;
