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

app.get("/api/prodcuts", async (req, res) => {
  try {
    products = await Product.find();
    res.status(200).json({ status: "Sucess", products: products });
  } catch (err) {
    res.status(500).json({ status: err.message });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);

    res.status(200).json({ status: "Product created!", product: product });
  } catch (err) {
    res.status(500).json({ status: err.message });
  }
});
