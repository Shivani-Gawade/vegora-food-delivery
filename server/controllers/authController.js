const user = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await user.findOne("email");
    if (existingUser) {
      return await res
        .status(400)
        .json({ message: "Email Already Registered" });
    }

    const user = await user.Create(name, email, password, role);

    res.status(400).json({
      success: true,
      user: {
        id: Date.now(),
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, meassage: error.meassage });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await user.findOne("email");
    if (!user) {
      return res
        .status(500)
        .json({ success: false, message: "Invalid Creaditial" });
    }

    const isMatch = await comparedPassword(password);
    if (!isMatch) {
      return res
        .status(500)
        .json({ success: false, message: "Invalid Creaditial" });
    }

    res.json({
      id: Date.now(),
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    res.json({ success: true, user: req.user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.meassage });
  }
};
