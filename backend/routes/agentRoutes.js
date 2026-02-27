const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getAgents,
  addAgent,
  deleteAgent,
  updateAgent,
} = require("../controllers/agentController");

router.get("/", authMiddleware, getAgents);
router.post("/add", authMiddleware, addAgent);
router.delete("/:id", authMiddleware, deleteAgent);
router.put("/:id", authMiddleware, updateAgent);

module.exports = router;