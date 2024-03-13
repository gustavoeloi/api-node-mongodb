const express = require("express");
const moongose = require("mongoose");
const productRoute = require("./routes/Products/product.route");

const app = express();
const port = 3000;

require("dotenv").config();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/products", productRoute);

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
