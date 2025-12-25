// backend/src/routes/projectRoutes.js
const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

// Apply middleware to all routes here (Must be logged in)
router.use(authMiddleware);

// Project Endpoints
router.post('/', projectController.createProject);
router.get('/', projectController.getProjects);

// Task Endpoints (Nested under projects)
// POST /api/projects/:projectId/tasks
router.post('/:projectId/tasks', taskController.createTask);
router.get('/:projectId/tasks', taskController.getTasks);

module.exports = router;