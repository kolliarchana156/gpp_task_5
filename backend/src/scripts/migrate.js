// backend/src/scripts/migrate.js
const fs = require('fs');
const path = require('path');
const { pool } = require('../config/db');

const migrate = async () => {
    const client = await pool.connect();
    try {
        console.log('Starting migrations...');
        
        // List of migration files in order
        const files = [
            '001_create_tenants.sql',
            '002_create_users.sql',
            '003_create_projects.sql',
            '004_create_tasks.sql'
        ];

        for (const file of files) {
            const filePath = path.join(__dirname, '../../migrations', file);
            const sql = fs.readFileSync(filePath, 'utf8');
            console.log(`Running migration: ${file}`);
            await client.query(sql);
        }

        console.log('All migrations completed successfully.');
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    } finally {
        client.release();
        // Do not close pool here if running in sequence with seed
        // But for standalone script, we might exit. 
        // For docker-entry, we keep node running, so we just finish this function.
        if (require.main === module) {
            pool.end();
        }
    }
};

// If run directly: node migrate.js
if (require.main === module) {
    migrate();
}

module.exports = migrate;