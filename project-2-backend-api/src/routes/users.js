const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const { validateUserPayload, validateIdParam } = require("../middleware/validate");

// GET    /users            -> list all users
// GET    /users/:id        -> get one user
// GET    /users/:id/first-name -> scoped field
// POST   /users            -> create a user
// PUT    /users/:id        -> update a user
// DELETE /users/:id        -> delete a user

router.get("/", userController.getUsers);
router.get("/:id", validateIdParam, userController.getUserById);
router.get("/:id/first-name", validateIdParam, userController.getUserFirstName);
router.post("/", validateUserPayload, userController.createUser);
router.put("/:id", validateIdParam, validateUserPayload, userController.updateUser);
router.delete("/:id", validateIdParam, userController.deleteUser);

module.exports = router;