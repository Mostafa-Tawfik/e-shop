const express = require("express");
const cloudinary = require("cloudinary").v2;
const upload = require("../utils/multer");
const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

router.post("/", upload.single("file"), async (req, res) => {
  let fileResponse;
  try {
    fileResponse = await cloudinary.uploader.unsigned_upload(
      req.file.path,
      "ad6ujxsp",
      (error, result) => {
        console.log(result, error);
      }
    );
  } catch (error) {
    res.status(400).json({ error });
  }
  // in the future edit to fileResponse.secure_url
  res.status(200).json(fileResponse);
});

module.exports = router;
