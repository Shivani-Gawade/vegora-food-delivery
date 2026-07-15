const express = require("express");
const router = express.Router();
const {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
  searchRestaurant,
} = require("../controllers/restaurantController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/", verifyToken, createRestaurant);
router.get("/", getRestaurants);
router.get("/search", searchRestaurant);
router.get("/:id", getRestaurantById);
router.put("/:id", verifyToken, updateRestaurant);
router.delete("/:id", verifyToken, deleteRestaurant);

module.exports = router;
