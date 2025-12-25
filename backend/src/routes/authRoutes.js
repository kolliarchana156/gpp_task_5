// backend/src/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/auth/login
router.post('/login', authController.login);

// POST /api/auth/register-tenant
router.post('/register-tenant', authController.registerTenant);

module.exports = router;