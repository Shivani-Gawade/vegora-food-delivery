const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

connectDB();
app.use(express.json());

//route
app.use("/auth", require("./routes/authRoute"));

app.listen(3000, () => {
  console.log("Server is running on 3000");
});
