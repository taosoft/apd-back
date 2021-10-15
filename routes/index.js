const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users.controller");

router.get("/confirmation/:_id", UserController.confirmationGet);
router.post("/registration", UserController.createUser);
router.post("/login", UserController.loginUser);
router.get("/:id", Authorization, UserController.getUser);

// Export the Router
module.exports = router;
