const Restaurant = require("../models/Restaurant");

exports.createRestaurant = async (req, res) => {
  try {
    const { restaurantName, description, address, phoneNumber, cuisine } =
      req.body;
    const existingRestaurant = await Restaurant.findOne({ phoneNumber });

    if (existingRestaurant) {
      return res.status(400).json({ message: "Restaurant Already Exist" });
    }

    const restaurant = await Restaurant.create({
      restaurantName,
      description,
      address,
      phoneNumber,
      cuisine,
    });

    res.status(201).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getRestaurants = async (req, res) => {
  try {
    const restaurant = await Restaurant.find();
    if (restaurant.length === 0) {
      return res.status(400).json({ message: "Does Not Exist" });
    }
    res.status(200).json({
      success: true,
      count: restaurant.length,
      restaurant,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findById(id);
    if (restaurant.length === 0) {
      return res.status(400).json({ message: "Does Not Exist" });
    }
    res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const restaurant = await Restaurant.findByIdAndUpdate(id, updateData, {
      new: true, //return upadted doc
      runValidators: true, //validate the updated data
    });
    if (restaurant.length === 0) {
      return res.status(400).json({ message: "Does Not Exist" });
    }
    res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findByIdAndDelete(id);
    if (restaurant.length === 0) {
      return res.status(404).json({ message: "Does Not Exist" });
    }
    res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
