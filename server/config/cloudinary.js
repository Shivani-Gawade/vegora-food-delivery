const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "qk73xd0i",
  api_key: "483134769398921",
  api_secret: process.env.API_SECRET_KEY,
});

module.exports = cloudinary;
