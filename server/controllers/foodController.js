const Food = require("../models/Food");
const Restaurant = require("../models/Restaurant");

const createFood = async (req, res) => {
  try {
    const { foodName, description, price, category, availability } = req.body;
    const existingFood = await Food.findOne({ foodName });
    if (existingFood) {
      return res.status(400).json({ message: "Food Already Exist" });
    }

    const { restaurant } = req.body;
    const existRes = await Restaurant.findById(restaurant);

    if (!existRes) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const food = await Food.create({
      foodName,
      description,
      price,
      category,
      restaurant,
      availability,
    });

    res.status(201).json({
      success: true,
      food,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getFood = async (req, res) => {
  try {
    const food = await Food.find();
    if (food.length === 0) {
      return res.status(400).json({ message: "Does Not Exist" });
    }

    res.status(200).json({
      success: true,
      food,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getFoodById = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await Food.findById(id);
    if (food.length === 0) {
      return res.status(400).json({ message: "Does Not Exist" });
    }

    res.status(200).json({
      success: true,
      food,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const food = await Food.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });
    if (food.length === 0) {
      return res.status(400).json({ message: "Does Not Exist" });
    }

    res.status(200).json({
      success: true,
      food,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await Food.findByIdAndDelete(id);
    if (food.length === 0) {
      return res.status(400).json({ message: "Does Not Exist" });
    }

    res.status(200).json({
      success: true,
      food,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createFood, getFood, getFoodById, updateFood, deleteFood };
