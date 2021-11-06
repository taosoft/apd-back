const express = require("express");
const router = express.Router();
const MovimientoDenunciaController = require("../controllers/movimientoDenuncia.controller");

router.get("/:id", MovimientoDenunciaController.getMovimientosDenuncias);
router.post("/:id", MovimientoDenunciaController.createMovimientoDenuncia);

// Export the Router
module.exports = router;
