# System Architecture

## 1. High-Level Architecture
[Client Browser] <---> [React Frontend (Port 3000)] <---> [Express Backend (Port 5000)] <---> [PostgreSQL DB (Port 5432)]
                                      ^
                                      |
                               [Docker Network]

## 2. API Endpoints

### Authentication
* `POST /api/auth/register-tenant` - Register new organization
* `POST /api/auth/login` - Login and receive JWT

### Projects
* `GET /api/projects` - List all projects for current tenant
* `POST /api/projects` - Create new project
* `GET /api/projects/:id` - Get project details
* `PUT /api/projects/:id` - Update project
* `DELETE /api/projects/:id` - Delete project

### Tasks
* `GET /api/projects/:projectId/tasks` - Get tasks for a project
* `POST /api/projects/:projectId/tasks` - Create task
* `PUT /api/tasks/:id` - Update task details
* `PATCH /api/tasks/:id/status` - Update task status

### Health
* `GET /api/health` - System status check (Database connection verification)