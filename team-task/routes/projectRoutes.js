const express = require("express");
const Project = require("../models/Project");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

/**
 * CREATE PROJECT (Admin only)
 */
router.post("/", authMiddleware, roleMiddleware("Admin"), async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) return res.status(400).json({ message: "Project name required" });

    const project = await Project.create({
      name,
      description,
      createdBy: req.user.id,
    });

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * GET ALL PROJECTS (Admin + Member both can see)
 */
router.get("/", authMiddleware, async (req, res) => {
  try {
    const projects = await Project.find().populate(
      "createdBy",
      "name email role"
    );
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;