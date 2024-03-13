const Product = require("../models/product.model.js");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ status: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ status: err.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(200).json({ status: "Product created!", product: product });
  } catch (err) {
    res.status(500).json({ status: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!product) {
      return res.status(404).json({ status: "Product not found!" });
    }

    res.status(200).json({ status: "Product updated!", product: product });
  } catch (err) {
    res.status(500).json({ status: err.message });
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ status: "Product not found!" });
    }

    res.status(200).json({ status: "Product deleted!" });
  } catch (err) {
    res.status(500).json({ status: err.message });
  }
};

module.exports = {
  getAllProducts,
  getById,
  createProduct,
  updateProduct,
  deleteById,
};
