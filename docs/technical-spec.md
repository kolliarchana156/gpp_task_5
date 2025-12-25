# Technical Specification

## 1. Project Structure

The project follows a monorepo structure with Docker orchestration.

```text
multi-tenant-saas/
├── docker-compose.yml       # Orchestrates DB, Backend, Frontend
├── backend/                 # Node.js Application
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # MVC Controllers
│   │   ├── middleware/      # Auth & Tenant Middleware
│   │   ├── models/          # Database Access Layer
│   │   └── routes/          # Express Routes
│   └── Dockerfile           # Backend Container Config
├── frontend/                # React Application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   └── pages/           # Application views
│   └── Dockerfile           # Frontend Container Config
└── docs/                    # Project Documentation