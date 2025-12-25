// backend/src/models/userModel.js
const { pool } = require('../config/db');

const findByEmailAndTenant = async (email, tenantId) => {
    // If tenantId is provided, look for that specific tenant user
    // If tenantId is NULL, we might be looking for a Super Admin
    let query = 'SELECT * FROM users WHERE email = $1 AND tenant_id = $2';
    
    // Special handling for super_admin (who has NULL tenant_id)
    if (tenantId === null) {
        query = 'SELECT * FROM users WHERE email = $1 AND tenant_id IS NULL';
    }

    const result = await pool.query(query, [email, tenantId]);
    return result.rows[0];
};

// Helper to find super admin specifically
const findSuperAdmin = async (email) => {
    const result = await pool.query(
        'SELECT * FROM users WHERE email = $1 AND role = $2', 
        [email, 'super_admin']
    );
    return result.rows[0];
};

module.exports = { findByEmailAndTenant, findSuperAdmin };