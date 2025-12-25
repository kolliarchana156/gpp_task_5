// backend/src/models/taskModel.js
const { pool } = require('../config/db');

const create = async (taskData) => {
    const { projectId, tenantId, title, description, assignedTo, priority } = taskData;
    const result = await pool.query(
        `INSERT INTO tasks (project_id, tenant_id, title, description, assigned_to, priority)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [projectId, tenantId, title, description, assignedTo, priority || 'medium']
    );
    return result.rows[0];
};

const findByProject = async (projectId, tenantId) => {
    const result = await pool.query(
        `SELECT t.*, u.full_name as assignee_name 
         FROM tasks t
         LEFT JOIN users u ON t.assigned_to = u.id
         WHERE t.project_id = $1 AND t.tenant_id = $2
         ORDER BY t.priority DESC`,
        [projectId, tenantId]
    );
    return result.rows;
};

module.exports = { create, findByProject };