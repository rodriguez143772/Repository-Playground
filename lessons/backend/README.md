# Phase 2: Backend Development (Integrated)

Build production-ready backend APIs using Docker, Bun, Hono, Zod, and Drizzle - the modern TypeScript stack with real databases.

## Prerequisites

- Complete Phase 1: TypeScript Fundamentals
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- Bun installed (`curl -fsSL https://bun.sh/install | bash` or `powershell -c "irm bun.sh/install.ps1|iex"`)

## Quick Start

Start the development environment with Docker Compose:

```bash
# Start PostgreSQL and Redis containers
cd lessons/backend
docker compose up -d

# Verify containers are running
docker compose ps

# Install dependencies (from project root)
cd ../..
bun install

# Run your first lesson
bun lessons/backend/01-docker-essentials.ts
```

---

## Database Commands

Drizzle Kit provides commands to manage your database schema. Run these from the **project root**:

| Command | Description |
|---------|-------------|
| `bun db:push` | Push schema changes directly to database (development) |
| `bun db:generate` | Generate SQL migration files from schema changes |
| `bun db:migrate` | Run pending migrations (production) |
| `bun db:studio` | Open Drizzle Studio GUI to browse your database |

### When to Use Each

```bash
# During development - quick iteration
bun db:push        # Syncs schema.ts → database instantly

# For production - controlled migrations
bun db:generate    # Creates migration file in /drizzle
bun db:migrate     # Applies migration files to database
```

### First Time Setup

Before running any lessons or projects that use the database:

```bash
# 1. Start Docker containers
cd lessons/backend && docker compose up -d

# 2. Push the schema to create tables
cd ../.. && bun db:push

# 3. Now you can run lessons/projects
bun lessons/backend/17-drizzle-setup.ts
```

---

## Modules Overview

### Module 2.1: Environment Setup

Set up your development environment with Docker for consistent, reproducible infrastructure.

| # | Lesson | Topic | Run Command |
|---|--------|-------|-------------|
| 01 | [Docker Essentials](./01-docker-essentials.ts) | Containers, images, basic commands | `bun lessons/backend/01-docker-essentials.ts` |
| 02 | [Docker Compose Setup](./02-docker-compose-setup.ts) | Multi-container orchestration | `bun lessons/backend/02-docker-compose-setup.ts` |

### Module 2.2: Bun Runtime

Master the Bun runtime - a fast JavaScript/TypeScript runtime that replaces Node.js.

| # | Lesson | Topic | Run Command |
|---|--------|-------|-------------|
| 03 | [Bun Basics](./03-bun-basics.ts) | Installation, running files, packages | `bun lessons/backend/03-bun-basics.ts` |
| 04 | [Bun APIs](./04-bun-apis.ts) | Bun.serve(), Bun.file(), Bun.$ | `bun lessons/backend/04-bun-apis.ts` |
| 05 | [HTTP Server](./05-http-server.ts) | Creating servers, handling requests | `bun lessons/backend/05-http-server.ts` |
| 06 | [File System](./06-file-system.ts) | Reading, writing, watching files | `bun lessons/backend/06-file-system.ts` |
| 07 | [Testing](./07-bun-testing.ts) | bun:test, assertions, mocking | `bun test lessons/backend/07-bun-testing.ts` |

### Module 2.3: Hono Framework

Build fast, lightweight APIs with Hono - a web framework designed for the edge.

| # | Lesson | Topic | Run Command |
|---|--------|-------|-------------|
| 08 | [Hono Basics](./08-hono-basics.ts) | App creation, routing | `bun lessons/backend/08-hono-basics.ts` |
| 09 | [Route Parameters](./09-route-parameters.ts) | Path params, query strings | `bun lessons/backend/09-route-parameters.ts` |
| 10 | [Middleware](./10-middleware.ts) | Built-in and custom middleware | `bun lessons/backend/10-middleware.ts` |
| 11 | [Request/Response](./11-request-response.ts) | Parsing bodies, headers | `bun lessons/backend/11-request-response.ts` |
| 12 | [Error Handling](./12-error-handling.ts) | Error middleware, status codes | `bun lessons/backend/12-error-handling.ts` |

### Module 2.4: Zod Validation

Type-safe schema validation that integrates perfectly with TypeScript.

| # | Lesson | Topic | Run Command |
|---|--------|-------|-------------|
| 13 | [Zod Basics](./13-zod-basics.ts) | Primitives, objects, arrays | `bun lessons/backend/13-zod-basics.ts` |
| 14 | [Transformations](./14-zod-transformations.ts) | Coercion, transforms, refinements | `bun lessons/backend/14-zod-transformations.ts` |
| 15 | [Error Handling](./15-zod-error-handling.ts) | Custom errors, formatting | `bun lessons/backend/15-zod-error-handling.ts` |
| 16 | [Advanced Patterns](./16-zod-advanced.ts) | Discriminated unions, recursive | `bun lessons/backend/16-zod-advanced.ts` |

### Module 2.5: Database with Drizzle

Type-safe database access with Drizzle ORM and PostgreSQL.

| # | Lesson | Topic | Run Command |
|---|--------|-------|-------------|
| 17 | [Drizzle Setup](./17-drizzle-setup.ts) | Installation, configuration | `bun lessons/backend/17-drizzle-setup.ts` |
| 18 | [Schema Definition](./18-schema-definition.ts) | Tables, columns, constraints | `bun lessons/backend/18-schema-definition.ts` |
| 19 | [CRUD Operations](./19-crud-operations.ts) | Insert, select, update, delete | `bun lessons/backend/19-crud-operations.ts` |
| 20 | [Relations & Joins](./20-relations-joins.ts) | Foreign keys, one-to-many, many-to-many | `bun lessons/backend/20-relations-joins.ts` |
| 21 | [Migrations](./21-migrations.ts) | Schema changes, version control | `bun lessons/backend/21-migrations.ts` |

### Module 2.6: Full Stack Integration

Combine all technologies into production-ready applications.

| # | Lesson | Topic | Run Command |
|---|--------|-------|-------------|
| 22 | [Hono + Zod + Drizzle](./22-hono-zod-drizzle.ts) | Full stack API patterns | `bun lessons/backend/22-hono-zod-drizzle.ts` |
| 23 | [OpenAPI & Swagger](./23-openapi-swagger.ts) | API documentation, schemas | `bun lessons/backend/23-openapi-swagger.ts` |

---

## Practice Files

After each module, complete the practice files to reinforce your learning:

```bash
# Module 2.2: Bun Runtime
bun lessons/backend/practice/01-bun-practice.ts

# Module 2.3: Hono Framework
bun lessons/backend/practice/02-hono-practice.ts

# Module 2.4: Zod Validation
bun lessons/backend/practice/03-zod-practice.ts

# Module 2.5: Drizzle Database
bun lessons/backend/practice/04-drizzle-practice.ts

# Module 2.6: Integration
bun lessons/backend/practice/05-integration-practice.ts
```

---

## Projects

Apply your backend skills with real-world projects that use the full stack.

### Before Running Projects

```bash
# 1. Make sure Docker is running
cd lessons/backend && docker compose up -d

# 2. Push schema to create database tables
cd ../.. && bun db:push

# 3. Run any project
bun lessons/backend/projects/01-rest-api.ts
```

### Available Projects

| # | Project | Skills | Run Command |
|---|---------|--------|-------------|
| 01 | [Task Manager API](./projects/01-rest-api.ts) | CRUD, validation, filtering, pagination | `bun lessons/backend/projects/01-rest-api.ts` |
| 02 | [Contact Book](./projects/02-contact-book.ts) | Relations, search, groups, foreign keys | `bun lessons/backend/projects/02-contact-book.ts` |
| 03 | [URL Shortener](./projects/03-url-shortener.ts) | Custom codes, redirects, click tracking | `bun lessons/backend/projects/03-url-shortener.ts` |

All projects use PostgreSQL with Drizzle ORM. Each includes a full test suite that runs automatically.

---

## Database Connection Details

### PostgreSQL

```
Host:     localhost
Port:     5432
Database: learn_db
Username: learn
Password: learn

Connection URL: postgresql://learn:learn@localhost:5432/learn_db
```

### Redis

```
Host: localhost
Port: 6379

Connection URL: redis://localhost:6379
```

### Connecting in Code

```typescript
// Option 1: Import the shared db instance (recommended for projects)
import { db } from "./src/db";
import { users } from "./src/db/schema";

const allUsers = await db.select().from(users);

// Option 2: Create your own connection (for lessons/learning)
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const client = postgres("postgresql://learn:learn@localhost:5432/learn_db");
const db = drizzle(client);
```

---

## Installing Dependencies

Before starting, install the required packages:

```bash
bun add hono @hono/zod-validator @hono/swagger-ui zod drizzle-orm postgres
bun add -d drizzle-kit
```

---

## Key Concepts

### Why Docker?
- **Consistency**: Same environment locally and in production
- **Isolation**: Each service runs in its own container
- **Reproducibility**: Anyone can spin up the same environment
- **Easy cleanup**: Remove containers without affecting your system

### Why Bun?
- **Fast**: 4x faster than Node.js for many operations
- **Native TypeScript**: No compilation step needed
- **Built-in tools**: Package manager, bundler, test runner
- **Node.js compatible**: Most npm packages just work

### Why Hono?
- **Lightweight**: ~14KB, no dependencies
- **Fast**: Optimized for edge and serverless
- **TypeScript-first**: Excellent type inference
- **Familiar**: Express-like API

### Why Zod?
- **Type inference**: Schema to TypeScript types automatically
- **Validation**: Runtime validation with detailed errors
- **Composable**: Build complex schemas from simple ones
- **Integration**: Works great with Hono and Drizzle

### Why Drizzle?
- **Type-safe**: Full TypeScript support with inference
- **SQL-like**: Familiar syntax for SQL developers
- **Lightweight**: No heavy abstractions or magic
- **Migrations**: Built-in schema migration support

---

## Quick Reference

```typescript
// Docker Compose commands
docker compose up -d       // Start containers
docker compose down        // Stop containers
docker compose logs -f     // View logs
docker compose ps          // List running containers

// Bun HTTP Server
Bun.serve({
  port: 3000,
  fetch(req) {
    return new Response("Hello!");
  }
});

// Hono App
import { Hono } from "hono";
const app = new Hono();
app.get("/", (c) => c.text("Hello!"));

// Zod Schema
import { z } from "zod";
const UserSchema = z.object({
  name: z.string(),
  email: z.string().email()
});
type User = z.infer<typeof UserSchema>;

// Drizzle Query
import { users } from "./schema";
const allUsers = await db.select().from(users);
const user = await db.insert(users).values({ name: "Alice" }).returning();
```
