// backend/src/models/projectModel.js
const { pool } = require('../config/db');

// Create Project
const create = async (projectData) => {
    const { tenantId, name, description, createdBy } = projectData;
    const result = await pool.query(
        `INSERT INTO projects (tenant_id, name, description, created_by)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [tenantId, name, description, createdBy]
    );
    return result.rows[0];
};

// Find All by Tenant
const findAllByTenant = async (tenantId) => {
    const result = await pool.query(
        `SELECT p.*, u.full_name as creator_name 
         FROM projects p
         LEFT JOIN users u ON p.created_by = u.id
         WHERE p.tenant_id = $1 
         ORDER BY p.created_at DESC`,
        [tenantId]
    );
    return result.rows;
};

module.exports = { create, findAllByTenant };