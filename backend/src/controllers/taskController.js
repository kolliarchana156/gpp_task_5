// backend/src/controllers/taskController.js
const taskModel = require('../models/taskModel');
const { pool } = require('../config/db');

exports.createTask = async (req, res) => {
    try {
        const { projectId } = req.params; // Get ID from URL
        const { title, description, assignedTo, priority } = req.body;
        const tenantId = req.user.tenantId;

        // SECURITY CRITICAL: Verify project belongs to this tenant first!
        const projectCheck = await pool.query(
            'SELECT * FROM projects WHERE id = $1 AND tenant_id = $2',
            [projectId, tenantId]
        );

        if (projectCheck.rows.length === 0) {
            return res.status(404).json({ success: false, message: 'Project not found or access denied' });
        }

        const newTask = await taskModel.create({
            projectId,
            tenantId, // Store tenantId on task for easy filtering later
            title,
            description,
            assignedTo,
            priority
        });

        res.status(201).json({ success: true, data: newTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const { projectId } = req.params;
        const tasks = await taskModel.findByProject(projectId, req.user.tenantId);
        res.status(200).json({ success: true, data: tasks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};