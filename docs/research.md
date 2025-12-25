
# Multi-Tenancy Research & Analysis

## 1. Multi-Tenancy Architecture Analysis

For this SaaS platform, we analyzed three common approaches to multi-tenancy:

### Option A: Database-per-Tenant
* **Description:** Each tenant has their own dedicated database instance.
* **Pros:** Maximum isolation, easy backup/restore per tenant, highest security.
* **Cons:** High infrastructure cost, difficult to maintain schema updates across thousands of databases.

### Option B: Schema-per-Tenant
* **Description:** Shared database, but each tenant gets a unique schema namespace.
* **Pros:** Good balance of isolation and cost.
* **Cons:** Schema migration complexity increases with tenant count; database overhead from many schemas.

### Option C: Shared Database, Shared Schema (Selected)
* **Description:** All tenants share the same tables. Data is distinguished by a `tenant_id` column (Discriminator).
* **Justification for Selection:**
    * **Cost Efficiency:** Lowest infrastructure overhead (single DB instance).
    * **Scalability:** Easier to manage migrations (one SQL script updates everyone).
    * **Suitability:** Perfect for this project scope where resource efficiency is prioritized over strict physical separation.
    * **Implementation:** Isolation is enforced via **Middleware** that injects `tenant_id` into every SQL query, ensuring logical separation.

## 2. Technology Stack Justification

* **Node.js & Express:** Chosen for its non-blocking I/O, which handles concurrent API requests efficiently. The MVC pattern allows for clean separation of concerns.
* **PostgreSQL:** Selected for its robust support for relational data, ACID compliance (crucial for tenant transactions), and JSONB support if we need flexible schema in the future.
* **React + Vite:** React provides a component-based UI essential for complex dashboards. Vite was chosen over Create-React-App for its significantly faster build times and native ESM support, making the Docker build process faster.
* **Docker:** Mandatory for ensuring the "works on my machine" guarantee. It allows the database, backend, and frontend to spin up in an isolated network with a single command.

## 3. Security Considerations

1.  **Tenant Isolation:** Implemented via a strict Middleware (`authMiddleware.js`). It extracts the `tenantId` from the JWT and forces it into every database write operation. A user cannot simply pass a different `tenantId` in the request body; the server ignores it and uses the token's truth.
2.  **Password Security:** All passwords are hashed using `bcryptjs` (Salt Rounds: 10) before storage. Plain text passwords never enter the database.
3.  **JWT Authentication:** Stateless authentication using JSON Web Tokens. Tokens expire in 24 hours. The payload contains the `tenantId`, ensuring that even if a session is hijacked, the attacker cannot cross tenant boundaries.
4.  **SQL Injection Protection:** All database queries use Parameterized Queries (Prepared Statements) via the `pg` library. This prevents attackers from injecting malicious SQL via input fields.


