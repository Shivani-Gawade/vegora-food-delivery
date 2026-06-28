const express = require("express");
const connectDB = require("./config/db");
const router = require("./routes/authRoute");
const app = express();

connectDB();
app.use(express.json());

//route
app.use("/", router);
// app.use("/auth", require("./routes/authRoute"));

app.listen(3000, () => {
  console.log("Server is running on 3000");
});
