const express = require("express");

const {
  getAllUsers,
  createNewUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const router = express.Router();

router.route("/").get(getAllUsers).post(createNewUser);
router.route("/:id").get(getUserById).patch(updateUser).delete(deleteUser);

module.exports = router;
