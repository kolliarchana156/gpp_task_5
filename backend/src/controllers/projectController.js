// backend/src/controllers/projectController.js
const projectModel = require('../models/projectModel');

exports.createProject = async (req, res) => {
    try {
        const { name, description } = req.body;
        // SECURITY: Force tenantId from the logged-in user token
        // User cannot fake this because it comes from the JWT middleware
        const tenantId = req.user.tenantId;
        const createdBy = req.user.userId;

        const newProject = await projectModel.create({
            tenantId,
            name,
            description,
            createdBy
        });

        res.status(201).json({ success: true, data: newProject });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};

exports.getProjects = async (req, res) => {
    try {
        // SECURITY: Only fetch projects for the user's tenant
        const projects = await projectModel.findAllByTenant(req.user.tenantId);
        res.status(200).json({ success: true, data: projects });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};