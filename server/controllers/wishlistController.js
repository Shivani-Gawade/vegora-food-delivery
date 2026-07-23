const Wishlist = require("../models/Wishlist");
const Food = require("../models/Food");

//add wishlist

const addWishlist = async (req, res) => {
  try {
    const { foodId } = req.body;
    const { userId } = req.user;

    const wishFood = await Food.findById(foodId);
    if (!wishFood) {
      return res.status(400).json({ message: "Food Not Found" });
    }

    const exsitingWish = await Wishlist.findOne({ user: userId, food: foodId });
    if (exsitingWish) {
      return res
        .status(404)
        .json({ success: false, message: "Food already in wishlist" });
    }

    const wishlist = await Wishlist.create({ user: userId, food: foodId });
    res.status(201).json({
      success: true,
      message: "Food added to wishlist",
      wishlist,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addWishlist };
