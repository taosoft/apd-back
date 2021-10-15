const express = require("express");
const router = express.Router();
const ReclamoController = require("../controllers/reclamos.controller");

router.get("/", ReclamoController.getReclamos);
router.get("/:id", ReclamoController.getReclamo);
router.post("/", ReclamoController.createReclamo);
router.post("/unificar", ReclamoController.unificarReclamo);
router.patch("/:id", ReclamoController.updateReclamo);

// Export the Router
module.exports = router;
