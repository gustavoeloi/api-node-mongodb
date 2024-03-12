const express = require("express");
const moongose = require("mongoose");

const app = express();
const port = 3000;

require("dotenv").config();
app.use(express.json());

const Product = require("./models/product.model.js");

moongose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@backenddb.od0lu0s.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB`
  )
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => console.log(err));

// Get All Products
app.get("/api/products", async (req, res) => {
  try {
    products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ status: err.message });
  }
});

// Post Products
app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(200).json({ status: "Product created!", product: product });
  } catch (err) {
    res.status(500).json({ status: err.message });
  }
});

// Get by ID
app.get("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ status: err.message });
  }
});

// Update by ID
app.put("/api/product/:id", async (req, res) => {
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
});

// Delete by ID
app.delete("/api/product/:id", async (req, res) => {
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
});
