const express = require("express");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// CREATE TASK
router.post("/", authMiddleware, roleMiddleware("Admin"), async (req, res) => {
  try {
    const { title, project, assignedTo, dueDate } = req.body;

    if (!title || !project) {
      return res.status(400).json({ message: "Title and project required" });
    }

    const task = await Task.create({
      title,
      project,
      assignedTo,
      dueDate,
    });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ALL TASKS
router.get("/", authMiddleware, async (req, res) => {
  try {
    let filter = {};

    // If user is Member, show only their assigned tasks
    if (req.user.role === "Member") {
      filter.assignedTo = req.user.id;
    }

    const tasks = await Task.find(filter)
      .populate("assignedTo", "name email role")
      .populate("project", "name");

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE TASK STATUS
router.put("/:id/status", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // If Member, allow update only if task assigned to him
    if (req.user.role === "Member") {
      if (!task.assignedTo || task.assignedTo.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not allowed" });
      }
    }

    task.status = status;
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DASHBOARD SUMMARY
router.get("/dashboard/summary", authMiddleware, async (req, res) => {
  try {
    const total = await Task.countDocuments();
    const pending = await Task.countDocuments({ status: "Pending" });
    const inProgress = await Task.countDocuments({ status: "In Progress" });
    const completed = await Task.countDocuments({ status: "Completed" });

    const overdue = await Task.countDocuments({
      dueDate: { $lt: new Date() },
      status: { $ne: "Completed" }
    });

    res.json({
      total,
      pending,
      inProgress,
      completed,
      overdue
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;