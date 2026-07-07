const User = require("../models/User");
const generateToken = require("../utils/generateToken");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return await res
        .status(400)
        .json({ message: "Email Already Registered" });
    }

    const user = await User.create({ name, email, password, role });

    const token = generateToken(user._id);
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Creaditial" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Creaditial" });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    res.status(201).json({ success: true, user: req.user });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
