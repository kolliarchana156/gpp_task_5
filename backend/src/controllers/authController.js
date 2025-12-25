// backend/src/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/db');
const tenantModel = require('../models/tenantModel');
const userModel = require('../models/userModel');

const generateToken = (user) => {
    return jwt.sign(
        { 
            userId: user.id, 
            tenantId: user.tenant_id, 
            role: user.role 
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
};

exports.login = async (req, res) => {
    const { email, password, tenantSubdomain } = req.body;

    try {
        let user;

        // SCENARIO 1: Super Admin Login (No Subdomain needed usually, but logic must be robust)
        if (!tenantSubdomain) {
            user = await userModel.findSuperAdmin(email);
            if (!user) {
                return res.status(401).json({ success: false, message: 'Invalid credentials' });
            }
        } 
        // SCENARIO 2: Tenant User Login
        else {
            // 1. Find Tenant
            const tenant = await tenantModel.findBySubdomain(tenantSubdomain);
            if (!tenant) {
                return res.status(404).json({ success: false, message: 'Tenant not found' });
            }
            if (tenant.status !== 'active') {
                return res.status(403).json({ success: false, message: 'Tenant is suspended' });
            }

            // 2. Find User in that Tenant
            user = await userModel.findByEmailAndTenant(email, tenant.id);
        }

        // 3. Verify Password
        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        // 4. Generate Token
        const token = generateToken(user);

        res.status(200).json({
            success: true,
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    fullName: user.full_name,
                    role: user.role,
                    tenantId: user.tenant_id
                },
                token
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.registerTenant = async (req, res) => {
    const { tenantName, subdomain, adminEmail, adminPassword, adminFullName } = req.body;
    
    const client = await pool.connect();
    
    try {
        await client.query('BEGIN'); // Start Transaction

        // 1. Check if subdomain exists
        const existingTenant = await tenantModel.findBySubdomain(subdomain);
        if (existingTenant) {
            await client.query('ROLLBACK');
            return res.status(409).json({ success: false, message: 'Subdomain already exists' });
        }

        // 2. Create Tenant
        const tenantRes = await client.query(
            `INSERT INTO tenants (name, subdomain, status, subscription_plan)
             VALUES ($1, $2, 'active', 'free') RETURNING id`,
            [tenantName, subdomain]
        );
        const tenantId = tenantRes.rows[0].id;

        // 3. Create Admin User
        const passwordHash = await bcrypt.hash(adminPassword, 10);
        await client.query(
            `INSERT INTO users (tenant_id, email, password_hash, full_name, role)
             VALUES ($1, $2, $3, $4, 'tenant_admin')`,
            [tenantId, adminEmail, passwordHash, adminFullName]
        );

        await client.query('COMMIT'); // Commit Transaction

        res.status(201).json({
            success: true,
            message: 'Tenant registered successfully'
        });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error(error);
        res.status(500).json({ success: false, message: 'Registration failed' });
    } finally {
        client.release();
    }
};