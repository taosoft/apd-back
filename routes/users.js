const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users.controller");
const Authorization = require("../authorization/authorization");

router.get("/:id", Authorization, UserController.getUser);
router.put("/", Authorization, UserController.updateUser);
router.post("/", UserController.createUser);
router.post("/login", UserController.loginUser);
router.post("/reset/:id", UserController.resetPassword);

// Export the Router
module.exports = router;
