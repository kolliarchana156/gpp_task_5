// backend/src/models/tenantModel.js
const { pool } = require('../config/db');

const findBySubdomain = async (subdomain) => {
    const result = await pool.query(
        'SELECT * FROM tenants WHERE subdomain = $1', 
        [subdomain]
    );
    return result.rows[0];
};

const create = async (client, tenantData) => {
    const { name, subdomain, email, plan } = tenantData;
    const result = await client.query(
        `INSERT INTO tenants (name, subdomain, subscription_plan)
         VALUES ($1, $2, $3) RETURNING *`,
        [name, subdomain, plan || 'free']
    );
    return result.rows[0];
};

module.exports = { findBySubdomain, create };