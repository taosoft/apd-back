const express = require("express");
const router = express.Router();
const MovimientoReclamoController = require("../controllers/movimientoReclamo.controller");

router.get("/:id", MovimientoReclamoController.getMovimientosReclamos);
router.post("/:id", MovimientoReclamoController.createMovimientoReclamo);

// Export the Router
module.exports = router;
