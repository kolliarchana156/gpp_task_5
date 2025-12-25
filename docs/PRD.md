# Product Requirements Document (PRD)

## 1. User Personas

1.  **Super Admin:** The platform owner. They can see all tenants, manage subscription plans, and suspend abusive tenants. They are not bound to a specific tenant.
2.  **Tenant Admin:** The owner of a specific organization (Tenant). They can invite users, manage projects, and view all tasks within their organization.
3.  **End User:** A team member. They can view projects and manage tasks assigned to them. They cannot see administrative settings.

## 2. Functional Requirements (FR)

### Authentication Module
* **FR-001:** System shall allow organizations to register with a unique subdomain.
* **FR-002:** System shall allow users to login using email, password, and subdomain.
* **FR-003:** System shall issue a JWT token upon successful login.

### Tenant Management
* **FR-004:** System shall create a default 'Free' plan for new tenants.
* **FR-005:** System shall enforce unique email constraints *per tenant*.

### Project Management
* **FR-006:** Tenant Admins shall be able to create new projects.
* **FR-007:** System shall associate every project with a `tenant_id`.
* **FR-008:** Users shall only see projects belonging to their tenant.

### Task Management
* **FR-009:** Users shall be able to create tasks within a project.
* **FR-010:** Tasks must automatically inherit the `tenant_id` of the parent project.
* **FR-011:** Users can update task status (Todo -> In Progress -> Done).

### Security & Isolation
* **FR-012:** API shall reject requests that try to access data from a different `tenant_id`.
* **FR-013:** Passwords must be encrypted before storage.
* **FR-014:** System shall support Role-Based Access Control (RBAC).

## 3. Non-Functional Requirements (NFR)

* **NFR-001 (Performance):** API response time should be under 200ms for standard queries.
* **NFR-002 (Availability):** The system must be containerized to ensure high availability and rapid recovery.
* **NFR-003 (Security):** Database connection credentials must be injected via Environment Variables.
* **NFR-004 (Usability):** Frontend must be responsive and accessible on mobile devices.
* **NFR-005 (Scalability):** Database schema must support millions of rows with proper indexing on `tenant_id`.