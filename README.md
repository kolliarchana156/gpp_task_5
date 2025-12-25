# Multi-Tenant SaaS Platform

A production-ready, containerized Multi-Tenant SaaS application for Project & Task Management. This system allows multiple organizations (tenants) to register, manage their teams, and track projects with complete data isolation.

## 🚀 Features

* **Multi-Tenancy:** Complete data isolation using Shared Database, Shared Schema architecture.
* **Authentication:** JWT-based stateless authentication with Role-Based Access Control (RBAC).
* **User Roles:** Super Admin, Tenant Admin, and Regular Users.
* **Subscription Management:** Enforced limits on Users and Projects based on plans (Free, Pro, Enterprise).
* **Automated DevOps:** Fully Dockerized with automatic database migrations and seed data.
* **Security:** Password hashing (Bcrypt), JWT validation, and Tenant Isolation Middleware.

## 🛠️ Technology Stack

* **Backend:** Node.js, Express.js (MVC Architecture)
* **Frontend:** React.js, Vite
* **Database:** PostgreSQL 15
* **Containerization:** Docker, Docker Compose

## 📦 Installation & Setup

Prerequisites: Docker Desktop installed and running.

1.  **Clone the repository**
    ```bash
    git clone <your-repo-url>
    cd multi-tenant-saas
    ```

2.  **Start the Application**
    Run the following command to build and start all services (Database, Backend, Frontend):
    ```bash
    docker-compose up -d --build
    ```

3.  **Access the Application**
    * **Frontend:** [http://localhost:3000](http://localhost:3000)
    * **Backend API:** [http://localhost:5000](http://localhost:5000)
    * **Health Check:** [http://localhost:5000/api/health](http://localhost:5000/api/health)

## 🧪 Test Credentials

The database is automatically seeded with these credentials on startup:

| Role | Email | Password | Subdomain |
| :--- | :--- | :--- | :--- |
| **Tenant Admin** | `admin@demo.com` | `Demo@123` | `demo` |
| **Super Admin** | `superadmin@system.com` | `Admin@123` | N/A |

## 📂 Project Structure

```text
multi-tenant-saas/
├── backend/            # Express.js API
│   ├── src/
│   │   ├── controllers/# Business logic
│   │   ├── middleware/ # Tenant isolation & Auth
│   │   ├── models/     # Database queries
│   │   └── routes/     # API endpoints
├── frontend/           # React.js App
├── docs/               # Architecture & Requirements documentation
└── docker-compose.yml  # Container orchestration

