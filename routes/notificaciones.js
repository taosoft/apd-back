const express = require("express");
const router = express.Router();
const NotificacionController = require("../controllers/notificaciones.controller");
const Authorization = require("../authorization/authorization");

router.get("/:id", Authorization, NotificacionController.getNotificaciones);
router.patch("/:id", Authorization, NotificacionController.updateNotification);

// Export the Router
module.exports = router;
