const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const { uploadAndDistribute } = require("../controllers/uploadController");

router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  uploadAndDistribute
);

module.exports = router;