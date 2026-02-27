const Agent = require("../models/Agent");
const Task = require("../models/Task");
const bcrypt = require("bcryptjs");

// GET ALL AGENTS WITH TASKS
const getAgents = async (req, res) => {
  try {
    const agents = await Agent.find();

    const agentsWithTasks = await Promise.all(
      agents.map(async (agent) => {
        const tasks = await Task.find({ assignedTo: agent._id });
        return {
          ...agent._doc,
          tasks,
        };
      })
    );

    res.status(200).json(agentsWithTasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch agents" });
  }
};

// ADD AGENT
const addAgent = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    const existing = await Agent.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Agent already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAgent = new Agent({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    await newAgent.save();

    res.status(201).json({ message: "Agent added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add agent" });
  }
};

// DELETE AGENT
const deleteAgent = async (req, res) => {
  try {
    const { id } = req.params;

    await Task.deleteMany({ assignedTo: id });
    await Agent.findByIdAndDelete(id);

    res.status(200).json({ message: "Agent deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};

// UPDATE AGENT
const updateAgent = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Agent.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};

module.exports = {
  getAgents,
  addAgent,
  deleteAgent,
  updateAgent,
};