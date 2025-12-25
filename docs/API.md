# API Documentation

## Authentication

### 1. Register Tenant
* **Endpoint:** `POST /api/auth/register-tenant`
* **Description:** Registers a new organization and creates the admin user.
* **Body:** `{ "tenantName": "Acme", "subdomain": "acme", "adminEmail": "admin@acme.com", "adminPassword": "password", "adminFullName": "John Doe" }`

### 2. Login
* **Endpoint:** `POST /api/auth/login`
* **Description:** Authenticates a user and returns a JWT.
* **Body:** `{ "email": "admin@acme.com", "password": "password", "tenantSubdomain": "acme" }`
* **Response:** `{ "success": true, "data": { "token": "...", "user": {...} } }`

## Projects

### 3. List Projects
* **Endpoint:** `GET /api/projects`
* **Headers:** `Authorization: Bearer <token>`
* **Description:** Returns all projects belonging to the logged-in user's tenant.

### 4. Create Project
* **Endpoint:** `POST /api/projects`
* **Headers:** `Authorization: Bearer <token>`
* **Body:** `{ "name": "New Website", "description": "Redesign" }`
* **Description:** Creates a new project linked to the user's tenant.

## Tasks

### 5. List Tasks
* **Endpoint:** `GET /api/projects/:projectId/tasks`
* **Headers:** `Authorization: Bearer <token>`
* **Description:** Returns tasks for a specific project.

### 6. Create Task
* **Endpoint:** `POST /api/projects/:projectId/tasks`
* **Headers:** `Authorization: Bearer <token>`
* **Body:** `{ "title": "Fix Header", "priority": "high" }`
* **Description:** Creates a task linked to the project and tenant.

## System

### 7. Health Check
* **Endpoint:** `GET /api/health`
* **Description:** Returns system and database status.
* **Response:** `{ "status": "ok", "database": "connected" }`
* Note: All endpoints require JSON.