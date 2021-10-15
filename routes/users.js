const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users.controller");

router.get("/:id", UserController.getUser);
router.put("/:id", UserController.updateUser);
router.post("/", UserController.createUser);
router.post("/login", UserController.loginUser);

// Export the Router
module.exports = router;
