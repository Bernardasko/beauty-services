const express = require("express");
const beautyController = require("../controllers/beautyController");
const authControler = require("../controllers/authController");

const { getAllBeauty, getBeauty, createBeauty, updateBeauty, deleteBeauty, uploadImage, createMyBeauty, deleteMyBeauty, updateMyBeauty  } = beautyController;

const { protect, restrictTo } = authControler;

const { signup, login } = authControler;

const router = express.Router();

router.route("/").get(getAllBeauty).post(uploadImage.single("photo"), createBeauty);
router.route("/:id")
    .get(getBeauty)
    .patch(uploadImage.single("photo"), updateBeauty)
    .delete(deleteBeauty);

router.route("/my-beauties/:beautyId")
    .post(protect, createMyBeauty)
    .delete(protect, deleteMyBeauty)
    .patch(protect, updateMyBeauty);
    
module.exports = router