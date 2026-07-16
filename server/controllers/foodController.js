const Food = require("../models/Food");
const Restaurant = require("../models/Restaurant");
const cloudinary = require("../config/cloudinary");

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

    const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path, {
      folder: "VEGORA_IMAGE",
    });

    // console.log(cloudinaryResponse);

    const food = await Food.create({
      foodName,
      description,
      price,
      category,
      restaurant,
      availability,
      image: cloudinaryResponse.secure_url,
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
    if (!food) {
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
    if (!food) {
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
    if (!food) {
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
    if (!food) {
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

//search food

const searchFood = async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({
        message: "keyword is required",
      });
    }

    const food = await Food.find({
      foodName: {
        $regex: keyword,
        $options: "i",
      },
    });

    res.status(200).json({
      success: true,
      food,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//filter by category

const filterByCatgory = async (req, res) => {
  try {
    const { category } = req.query;
    if (!category) {
      return res.status(400).json({ message: "category is required" });
    }

    const food = await Food.find({
      category: {
        $regex: category,
        $options: "i",
      },
    });

    res.status(200).json({
      success: true,
      food,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//filter by price

const filterByPrice = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.query;

    if (!minPrice & maxPrice) {
      return res.status(400).json({ message: "price is required" });
    }

    const food = await Food.find({
      price: {
        $gte: minPrice,
        $lte: maxPrice,
      },
    });

    res.status(200).json({
      success: true,
      food,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//pagination

const paginateFood = async (req, res) => {
  try {
    const { pageNum } = req.query;

    if (!pageNum) {
      return res.status(400).json({ message: "pageNum is required" });
    }

    const page = Number(pageNum);
    const skip = (page - 1) * 10;
    const food = await Food.find().skip(skip).limit(10);

    res.status(200).json({
      success: true,
      food,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createFood,
  getFood,
  getFoodById,
  updateFood,
  deleteFood,
  searchFood,
  filterByCatgory,
  filterByPrice,
  paginateFood,
};
