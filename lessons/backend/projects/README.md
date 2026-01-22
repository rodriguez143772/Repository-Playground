# Backend Projects

These projects let you practice everything you've learned by building real applications with PostgreSQL persistence.

## Before You Start

### 1. Start the Database

```bash
cd lessons/backend
docker compose up -d
```

Verify it's running:
```bash
docker compose ps
# Should show learn-postgres and learn-redis as "running"
```

### 2. Create Database Tables

From the project root:
```bash
bun db:push
```

This reads `src/db/schema.ts` and creates all the tables in PostgreSQL.

### 3. Run a Project

```bash
bun lessons/backend/projects/01-rest-api.ts
```

---

## Available Projects

### 01 - Task Manager REST API

A complete task management API demonstrating CRUD operations.

**What You'll Practice:**
- RESTful route design (GET, POST, PUT, PATCH, DELETE)
- Zod validation for request bodies and query params
- Filtering and pagination
- Drizzle ORM queries

**Endpoints:**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /tasks | List tasks (with filtering) |
| GET | /tasks/:id | Get single task |
| POST | /tasks | Create task |
| PUT | /tasks/:id | Update task |
| PATCH | /tasks/:id/status | Update status only |
| DELETE | /tasks/:id | Delete task |
| GET | /tasks/stats | Get task statistics |

**Run:** `bun lessons/backend/projects/01-rest-api.ts`

---

### 02 - Contact Book

A contact management system with groups/categories, demonstrating database relations.

**What You'll Practice:**
- Schema design with relations (contacts belong to groups)
- Foreign keys and referential integrity
- Search and filtering across related tables
- Aggregate queries (contact counts per group)

**Endpoints:**

Groups:
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /groups | List all groups |
| POST | /groups | Create group |
| GET | /groups/:id | Get group with contact count |
| PUT | /groups/:id | Update group |
| DELETE | /groups/:id | Delete group (if empty) |

Contacts:
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /contacts | List contacts (?groupId=, ?search=) |
| POST | /contacts | Create contact |
| GET | /contacts/:id | Get contact with group info |
| PUT | /contacts/:id | Update contact |
| DELETE | /contacts/:id | Delete contact |

**Run:** `bun lessons/backend/projects/02-contact-book.ts`

---

### 03 - URL Shortener

A URL shortening service with click tracking and expiration.

**What You'll Practice:**
- Unique code generation
- HTTP redirects (301/302)
- Tracking/analytics (click counts)
- Expiration logic with timestamps

**Endpoints:**
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /shorten | Create short URL |
| GET | /:code | Redirect to original URL |
| GET | /api/urls | List all URLs |
| GET | /api/urls/:code | Get URL details |
| GET | /api/urls/:code/stats | Get click statistics |
| PATCH | /api/urls/:code | Update expiration |
| DELETE | /api/urls/:code | Delete URL |

**Run:** `bun lessons/backend/projects/03-url-shortener.ts`

---

## Troubleshooting

### "Connection refused" error

The database isn't running. Start it:
```bash
cd lessons/backend && docker compose up -d
```

### "Table does not exist" error

Tables haven't been created. Run:
```bash
bun db:push
```

### "Port 5432 already in use"

Another PostgreSQL instance is running. Either:
- Stop the other instance
- Or edit `docker-compose.yml` to use a different port (e.g., `5433:5432`)

### Reset the database

To start fresh with empty tables:
```bash
cd lessons/backend
docker compose down -v   # -v removes the data volume
docker compose up -d
cd ../..
bun db:push
```

---

## Database Commands Reference

| Command | Description |
|---------|-------------|
| `bun db:push` | Sync schema to database (development) |
| `bun db:generate` | Generate migration files |
| `bun db:migrate` | Run migrations (production) |
| `bun db:studio` | Open visual database browser |

---

## Project Structure

Each project follows this pattern:

```typescript
// 1. Imports
import { db } from "../src/db";
import { tableName } from "../src/db/schema";

// 2. Zod schemas for validation
const CreateSchema = z.object({ ... });

// 3. Hono app with routes
const app = new Hono();
app.get("/", async (c) => { ... });

// 4. Tests that verify everything works
const response = await app.request("/endpoint");
```

The schema is defined in `src/db/schema.ts` and shared across all projects.
