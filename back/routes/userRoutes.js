const express = require("express");
const userControler = require("../controllers/userController");
const authControler = require("../controllers/authController");

const { signup, login } = authControler;
const { protect, restrictTo } = authControler;

const {getAllUsers, getUser, createUser, updateUser, deleteUser} = userControler;


const router = express.Router();
router.route("/").get(getAllUsers);


router.route("/signup").post(signup);
router.route("/login").post(login);


module.exports = router;