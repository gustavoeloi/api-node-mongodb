const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  createProduct,
  getById,
  updateProduct,
  deleteById,
} = require("../../controllers/product.controller.js");

// Get All Products
router.get("/", getAllProducts);

// Post Products
router.post("/", createProduct);

// Get by ID
router.get("/:id", getById);

// Update by ID
router.put("/:id", updateProduct);

// Delete by ID
router.delete("/:id", deleteById);

module.exports = router;
