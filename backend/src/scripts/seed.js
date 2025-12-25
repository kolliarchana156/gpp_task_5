// backend/src/scripts/seed.js
const { pool } = require('../config/db');
const bcrypt = require('bcryptjs');

const seed = async () => {
    const client = await pool.connect();
    try {
        console.log('Starting seed...');

        // 1. Clean existing data (Optional: helps avoid duplicates on restart)
        // Note: CASCADE deletes child records automatically
        await client.query('TRUNCATE TABLE users, tenants, projects, tasks CASCADE');

        // 2. Create Super Admin
        const superAdminPass = await bcrypt.hash('Admin@123', 10);
        await client.query(`
            INSERT INTO users (email, password_hash, full_name, role, tenant_id)
            VALUES ($1, $2, $3, $4, NULL)
        `, ['superadmin@system.com', superAdminPass, 'Super Admin', 'super_admin']);
        console.log('Super Admin created');

        // 3. Create Tenant
        const tenantRes = await client.query(`
            INSERT INTO tenants (name, subdomain, status, subscription_plan)
            VALUES ($1, $2, $3, $4) RETURNING id
        `, ['Demo Company', 'demo', 'active', 'pro']);
        const tenantId = tenantRes.rows[0].id;
        console.log('Tenant created:', tenantId);

        // 4. Create Tenant Admin
        const adminPass = await bcrypt.hash('Demo@123', 10);
        await client.query(`
            INSERT INTO users (tenant_id, email, password_hash, full_name, role)
            VALUES ($1, $2, $3, $4, $5)
        `, [tenantId, 'admin@demo.com', adminPass, 'Demo Admin', 'tenant_admin']);

        // 5. Create Regular User
        const userPass = await bcrypt.hash('User@123', 10);
        const userRes = await client.query(`
            INSERT INTO users (tenant_id, email, password_hash, full_name, role)
            VALUES ($1, $2, $3, $4, $5) RETURNING id
        `, [tenantId, 'user1@demo.com', userPass, 'Demo User 1', 'user']);
        const userId = userRes.rows[0].id;

        // 6. Create Project
        const projectRes = await client.query(`
            INSERT INTO projects (tenant_id, name, description, created_by)
            VALUES ($1, $2, $3, $4) RETURNING id
        `, [tenantId, 'Project Alpha', 'First demo project', userId]);
        
        console.log('Seed completed successfully');

    } catch (err) {
        console.error('Seed failed:', err);
        process.exit(1);
    } finally {
        client.release();
        if (require.main === module) {
            pool.end();
        }
    }
};

if (require.main === module) {
    seed();
}

module.exports = seed;