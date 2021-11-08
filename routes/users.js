const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users.controller");
const Authorization = require("../authorization/authorization");

router.get("/:id", Authorization, UserController.getUser);
router.put("/:id", Authorization, UserController.updateUser);
router.post("/", UserController.createUser);
router.post("/login", UserController.loginUser);

// Export the Router
module.exports = router;
