const express = require("express");
const router = express.Router();
const {
  createFood,
  getFood,
  getFoodById,
  updateFood,
  deleteFood,
  searchFood,
  filterByCatgory,
  filterByPrice,
} = require("../controllers/foodController");
const verifyToken = require("../middleware/authMiddleware");
const upload = require("../middleware/multer");

router.post("/", verifyToken, upload.single("foodImage"), createFood);
router.get("/", getFood);
router.get("/search", searchFood);
router.get("/filter/category", filterByCatgory);
router.get("/filter/price", filterByPrice);
router.get("/:id", getFoodById);
router.put("/:id", verifyToken, updateFood);
router.delete("/:id", verifyToken, deleteFood);

module.exports = router;
