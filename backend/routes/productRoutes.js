const express = require("express");
const {
  getProducts,
  createProduct,
} = require("../controllers/productController");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");

router.route("/").get(getProducts).post(protect, admin, createProduct);

module.exports = router;
