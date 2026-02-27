const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { deleteTask } = require("../controllers/taskController");

router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;