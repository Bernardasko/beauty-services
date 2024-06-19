const express = require("express");
const categoryController = require("../controllers/categoryController");

const router = express.Router();

const { getAllCategories, createCategory, getCategory, updateCategory, deleteCategory } = categoryController

router.route("/").get(getAllCategories).post(createCategory);
router.route("/:id").get(getCategory).patch(updateCategory).delete(deleteCategory);

module.exports = router;