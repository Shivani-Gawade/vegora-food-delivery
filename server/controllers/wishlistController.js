const Wishlist = require("../models/Wishlist");
const Food = require("../models/Food");

//add wishlist

const addWishlist = async (req, res) => {
  try {
    const { foodId } = req.body;
    const { id } = req.user;

    const wishFood = await Food.findById(foodId);
    if (!wishFood) {
      return res.status(400).json({ message: "Food Not Found" });
    }

    const exsitingWish = await Wishlist.findOne({ user: id, food: foodId });
    if (exsitingWish) {
      return res
        .status(400)
        .json({ success: false, message: "Food already in wishlist" });
    }

    const wishlist = await Wishlist.create({ user: id, food: foodId });
    res.status(201).json({
      success: true,
      message: "Food added to wishlist",
      wishlist,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//get wishlist

const getWishlist = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const wishlist = await Wishlist.find({ user: userId }).populate("food");
    if (!wishlist) {
      return res
        .status(400)
        .json({ success: false, message: "Food doesn't exist" });
    }

    res.status(200).json({
      success: true,
      wishlist,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//remove wishlist

const removeWishlist = async (req, res) => {
  try {
    const { foodId } = req.params;
    const { id: userId } = req.user;
    const deleteFood = await Wishlist.findOneAndDelete({
      user: userId,
      food: foodId,
    });
    if (!deleteFood) {
      return res
        .status(400)
        .json({ success: false, message: "Food is not in wishlist" });
    }

    res.status(200).json({
      success: true,
      deleteFood,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { addWishlist, getWishlist, removeWishlist };
