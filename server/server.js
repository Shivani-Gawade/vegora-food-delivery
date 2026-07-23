const express = require("express");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

connectDB();
app.use(express.json());

//route
app.use("/auth", require("./routes/authRoute"));
app.use("/api/restaurants", require("./routes/restaurantRoutes"));
app.use("/api/food", require("./routes/foodRoutes"));
app.use("/api/wishlist", require("./routes/wishlistRoutes"));

app.listen(process.env.PORT, () => {
  console.log("server running");
});
