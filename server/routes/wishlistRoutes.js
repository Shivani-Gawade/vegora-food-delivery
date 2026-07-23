const express = require("express");
const router = express.Router();
const {
  addWishlist,
  getWishlist,
  removeWishlist,
} = require("../controllers/wishlistController");
const verifyToken = require("../middleware/authMiddleware");

router.post("/addWishlist", verifyToken, addWishlist);
router.get("/getWishlist", verifyToken, getWishlist);
router.delete("/:foodId", verifyToken, removeWishlist);

module.exports = router;
