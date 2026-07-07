const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ success: false, message: "Not Authorized" });
  }

  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ success: false, message: "Not Authorized" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).json({ sucess: false, message: "Token invalid" });
  }
};

module.exports = verifyToken;
