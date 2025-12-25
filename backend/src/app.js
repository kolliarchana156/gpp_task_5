// backend/src/app.js
// Main Application Entry Point
const express = require('express');
const cors = require('cors');
const { pool } = require('./config/db'); // Import DB connection
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MANDATORY: Health Check Endpoint
app.get('/api/health', async (req, res) => {
    try {
        // Check DB connection
        await pool.query('SELECT 1');
        res.status(200).json({ 
            status: 'ok', 
            database: 'connected', 
            timestamp: new Date().toISOString() 
        });
    } catch (error) {
        res.status(500).json({ 
            status: 'error', 
            database: 'disconnected', 
            error: error.message 
        });
    }
});

// Basic Root Route
app.get('/', (req, res) => {
    res.send('Multi-Tenant SaaS API is running');
});
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});