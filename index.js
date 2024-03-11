const express = require("express");
const moongose = require("mongoose");

const app = express();
const port = 3000;

require("dotenv").config();

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
''

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});
