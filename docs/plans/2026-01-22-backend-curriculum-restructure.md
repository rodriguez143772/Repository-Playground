# Backend Curriculum Restructure - Integrated Docker & PostgreSQL

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Restructure Phase 2-4 into a single integrated Phase 2 that teaches Docker, PostgreSQL, Bun, Hono, Zod, and Drizzle together with real database persistence from day one.

**Architecture:** Collapse the artificial separation between backend concepts (Phase 2), Docker (Phase 3), and databases (Phase 4) into a unified "Backend Development" phase. Start with minimal Docker setup, then layer in Bun, Hono, Zod, and Drizzle progressively. All projects use real PostgreSQL from the start.

**Tech Stack:** Bun, Hono, Zod, Drizzle ORM, PostgreSQL (via Docker), Docker Compose

---

## New Phase 2 Structure

```
lessons/backend/
├── README.md                          # Updated overview
├── docker-compose.yml                 # PostgreSQL + Redis
│
├── Module 2.1: Environment Setup
│   ├── 01-docker-essentials.ts        # NEW: Docker basics for devs
│   └── 02-docker-compose-setup.ts     # NEW: Running Postgres & Redis
│
├── Module 2.2: Bun Runtime (existing, renumbered)
│   ├── 03-bun-basics.ts
│   ├── 04-bun-apis.ts
│   ├── 05-http-server.ts
│   ├── 06-file-system.ts
│   └── 07-bun-testing.ts
│
├── Module 2.3: Hono Framework (existing, renumbered)
│   ├── 08-hono-basics.ts
│   ├── 09-route-parameters.ts
│   ├── 10-middleware.ts
│   ├── 11-request-response.ts
│   └── 12-error-handling.ts
│
├── Module 2.4: Zod Validation (existing, renumbered)
│   ├── 13-zod-basics.ts
│   ├── 14-zod-transformations.ts
│   ├── 15-zod-error-handling.ts
│   └── 16-zod-advanced.ts
│
├── Module 2.5: Database with Drizzle (NEW)
│   ├── 17-drizzle-setup.ts            # Connection, config
│   ├── 18-schema-definition.ts        # Tables, columns, types
│   ├── 19-crud-operations.ts          # Insert, select, update, delete
│   ├── 20-relations-joins.ts          # One-to-many, many-to-many
│   └── 21-migrations.ts               # Generate, push, migrate
│
├── Module 2.6: Full Stack Integration (NEW)
│   ├── 22-hono-zod-drizzle.ts         # Combining all pieces
│   └── 23-openapi-swagger.ts          # API documentation (moved)
│
├── practice/
│   ├── 01-bun-practice.ts             # existing
│   ├── 02-hono-practice.ts            # existing
│   ├── 03-zod-practice.ts             # existing
│   ├── 04-drizzle-practice.ts         # NEW
│   └── 05-integration-practice.ts     # NEW
│
└── projects/
    ├── 01-rest-api.ts                 # UPDATED: Uses PostgreSQL
    ├── 02-file-upload.ts              # existing (file-based, no DB needed)
    └── 03-url-shortener.ts            # UPDATED: Uses PostgreSQL + click tracking
```

---

## Task 1: Create Docker Compose Configuration

**Files:**
- Create: `lessons/backend/docker-compose.yml`

**Step 1: Write docker-compose.yml**

```yaml
# lessons/backend/docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: learn-postgres
    environment:
      POSTGRES_USER: learn
      POSTGRES_PASSWORD: learn
      POSTGRES_DB: learn_db
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U learn -d learn_db"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    container_name: learn-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

**Step 2: Test the configuration**

Run: `cd lessons/backend && docker compose up -d`
Expected: Both containers start successfully

**Step 3: Verify connectivity**

Run: `docker exec learn-postgres pg_isready -U learn -d learn_db`
Expected: "accepting connections"

**Step 4: Commit**

```bash
git add lessons/backend/docker-compose.yml
git commit -m "feat(backend): add Docker Compose for PostgreSQL and Redis"
```

---

## Task 2: Create Environment Setup Lessons

**Files:**
- Create: `lessons/backend/01-docker-essentials.ts`
- Create: `lessons/backend/02-docker-compose-setup.ts`

**Step 1: Write 01-docker-essentials.ts**

```typescript
/**
 * ============================================================
 * LESSON 1: Docker Essentials for Developers
 * ============================================================
 *
 * Docker lets you run services (databases, caches, etc.) in isolated
 * containers. Think of containers as lightweight virtual machines
 * that share your computer's resources.
 *
 * ANALOGY: If your computer is an apartment building:
 * - Without Docker: You install PostgreSQL directly (like renovating the lobby)
 * - With Docker: PostgreSQL runs in a container (like a food truck parked outside)
 *   - Easy to start/stop
 *   - Doesn't affect other "residents"
 *   - Can run multiple versions simultaneously
 *
 * WHY DOCKER FOR DEVELOPMENT?
 * - Consistent environment (works the same on Windows/Mac/Linux)
 * - No "polluting" your system with database installations
 * - Easy to reset (delete container, start fresh)
 * - Match production environment locally
 *
 * PREREQUISITES:
 * Install Docker Desktop: https://www.docker.com/products/docker-desktop/
 */

console.log("========================================");
console.log("LESSON 1: DOCKER ESSENTIALS");
console.log("========================================\n");

// ============================================================
// SECTION 1: Core Concepts
// ============================================================

console.log("--- Core Concepts ---\n");

const concepts = `
IMAGE vs CONTAINER:
┌─────────────────────────────────────────────────────────┐
│  IMAGE (Blueprint)         CONTAINER (Running Instance) │
│  ─────────────────         ──────────────────────────── │
│  • Recipe/Template         • The actual meal            │
│  • Downloaded once         • Created from image         │
│  • Read-only               • Has state (data)           │
│  • postgres:16             • "my-postgres-db"           │
└─────────────────────────────────────────────────────────┘

You PULL an image, then RUN it to create a container.
One image can create multiple containers.
`;

console.log(concepts);

// ============================================================
// SECTION 2: Essential Commands
// ============================================================

console.log("--- Essential Docker Commands ---\n");

const commands = `
IMAGES:
  docker pull postgres:16     # Download an image
  docker images               # List downloaded images
  docker rmi postgres:16      # Remove an image

CONTAINERS:
  docker run postgres:16      # Create & start container
  docker ps                   # List running containers
  docker ps -a                # List ALL containers (including stopped)
  docker stop <name>          # Stop a container
  docker start <name>         # Start a stopped container
  docker rm <name>            # Remove a container
  docker logs <name>          # View container logs
  docker exec -it <name> sh   # Open shell inside container

CLEANUP:
  docker system prune         # Remove unused data
  docker volume prune         # Remove unused volumes
`;

console.log(commands);

// ============================================================
// SECTION 3: Running PostgreSQL
// ============================================================

console.log("--- Running PostgreSQL with Docker ---\n");

const postgresExample = `
# Basic PostgreSQL container:
docker run --name my-postgres \\
  -e POSTGRES_PASSWORD=secret \\
  -p 5432:5432 \\
  -d postgres:16

Breaking it down:
  --name my-postgres     # Container name (for easy reference)
  -e POSTGRES_PASSWORD   # Environment variable (required for Postgres)
  -p 5432:5432          # Map port: host:container
  -d                    # Detached mode (runs in background)
  postgres:16           # Image name:tag

Connect with:
  psql -h localhost -U postgres -d postgres
  Password: secret
`;

console.log(postgresExample);

// ============================================================
// SECTION 4: Volumes (Persistent Data)
// ============================================================

console.log("--- Volumes: Keeping Your Data ---\n");

const volumeExample = `
WITHOUT VOLUME:
  Container deleted → Data gone forever!

WITH VOLUME:
  Container deleted → Data persists in volume

# Create with named volume:
docker run --name my-postgres \\
  -e POSTGRES_PASSWORD=secret \\
  -v postgres_data:/var/lib/postgresql/data \\
  -p 5432:5432 \\
  -d postgres:16

The -v flag maps:
  postgres_data (named volume on host)
  ↓
  /var/lib/postgresql/data (inside container)

Now you can delete/recreate the container
and your database data survives!
`;

console.log(volumeExample);

// ============================================================
// SECTION 5: Port Mapping
// ============================================================

console.log("--- Port Mapping ---\n");

const portExample = `
-p HOST_PORT:CONTAINER_PORT

PostgreSQL default port: 5432
Redis default port: 6379

Examples:
  -p 5432:5432    # Standard mapping
  -p 5433:5432    # Use 5433 on host (if 5432 is taken)
  -p 6379:6379    # Redis standard

Your app connects to localhost:HOST_PORT
Docker forwards to container's CONTAINER_PORT
`;

console.log(portExample);

// ============================================================
// SECTION 6: Quick Reference
// ============================================================

console.log("--- Quick Reference ---\n");

const quickRef = `
┌────────────────────────────────────────────────────────┐
│  DAILY WORKFLOW                                        │
├────────────────────────────────────────────────────────┤
│  Start work:    docker compose up -d                   │
│  Check status:  docker ps                              │
│  View logs:     docker logs <container-name>           │
│  Stop work:     docker compose down                    │
│  Reset data:    docker compose down -v                 │
└────────────────────────────────────────────────────────┘
`;

console.log(quickRef);

// ============================================================
// VERIFICATION
// ============================================================

console.log("--- Verification ---\n");

// Check if Docker is available by checking for the CLI
const checkDocker = async () => {
  try {
    const proc = Bun.spawn(["docker", "--version"], {
      stdout: "pipe",
      stderr: "pipe",
    });
    const output = await new Response(proc.stdout).text();
    console.log(`✅ Docker installed: ${output.trim()}`);
    return true;
  } catch {
    console.log("❌ Docker not found. Please install Docker Desktop.");
    console.log("   https://www.docker.com/products/docker-desktop/");
    return false;
  }
};

await checkDocker();

console.log(`
NEXT STEPS:
1. Install Docker Desktop if you haven't
2. Run: docker pull postgres:16-alpine
3. Run: docker pull redis:7-alpine
4. Continue to Lesson 2: Docker Compose Setup
`);
```

**Step 2: Write 02-docker-compose-setup.ts**

```typescript
/**
 * ============================================================
 * LESSON 2: Docker Compose Setup
 * ============================================================
 *
 * Docker Compose lets you define and run multiple containers
 * with a single configuration file.
 *
 * ANALOGY: If Docker is hiring individual contractors:
 * - "Hey PostgreSQL, come work on port 5432"
 * - "Hey Redis, come work on port 6379"
 *
 * Docker Compose is like a staffing agency:
 * - One file defines your whole team
 * - One command starts everyone
 * - They're pre-configured to work together
 *
 * For this curriculum, we'll use:
 * - PostgreSQL: Our main database
 * - Redis: For caching (later lessons)
 */

console.log("========================================");
console.log("LESSON 2: DOCKER COMPOSE SETUP");
console.log("========================================\n");

// ============================================================
// SECTION 1: The docker-compose.yml File
// ============================================================

console.log("--- Understanding docker-compose.yml ---\n");

const composeExplained = `
Our docker-compose.yml (in this folder):

services:           # Define each container
  postgres:         # Service name (we pick this)
    image: postgres:16-alpine    # Which image to use
    container_name: learn-postgres  # Container name
    environment:    # Environment variables
      POSTGRES_USER: learn
      POSTGRES_PASSWORD: learn
      POSTGRES_DB: learn_db
    ports:
      - "5432:5432"   # host:container
    volumes:
      - postgres_data:/var/lib/postgresql/data  # Persist data

  redis:
    image: redis:7-alpine
    container_name: learn-redis
    ports:
      - "6379:6379"

volumes:            # Named volumes (for data persistence)
  postgres_data:
  redis_data:
`;

console.log(composeExplained);

// ============================================================
// SECTION 2: Essential Commands
// ============================================================

console.log("--- Docker Compose Commands ---\n");

const composeCommands = `
Run these from the lessons/backend/ folder:

START SERVICES:
  docker compose up -d          # Start all services (detached)
  docker compose up postgres    # Start only postgres

STOP SERVICES:
  docker compose down           # Stop and remove containers
  docker compose down -v        # Also remove volumes (reset data!)
  docker compose stop           # Stop but keep containers

STATUS & LOGS:
  docker compose ps             # Show running services
  docker compose logs           # View all logs
  docker compose logs postgres  # View postgres logs
  docker compose logs -f        # Follow logs (live)

RESTART:
  docker compose restart        # Restart all services
`;

console.log(composeCommands);

// ============================================================
// SECTION 3: Start the Services
// ============================================================

console.log("--- Starting Our Development Stack ---\n");

const startServices = async () => {
  console.log("Checking Docker Compose status...\n");

  try {
    // Check if containers are running
    const proc = Bun.spawn(
      ["docker", "compose", "ps", "--format", "json"],
      {
        cwd: import.meta.dir,
        stdout: "pipe",
        stderr: "pipe",
      }
    );

    const output = await new Response(proc.stdout).text();
    const exitCode = await proc.exited;

    if (exitCode !== 0 || !output.trim()) {
      console.log("Services not running. Starting them now...");
      console.log("Run: cd lessons/backend && docker compose up -d\n");
      return false;
    }

    // Parse the status
    const lines = output.trim().split("\n").filter(Boolean);
    let allRunning = true;

    for (const line of lines) {
      try {
        const container = JSON.parse(line);
        const status = container.State === "running" ? "✅" : "❌";
        console.log(`${status} ${container.Service}: ${container.State}`);
        if (container.State !== "running") allRunning = false;
      } catch {
        // Fallback for different docker compose versions
        console.log(line);
      }
    }

    return allRunning;
  } catch (error) {
    console.log("Could not check Docker status.");
    console.log("Make sure Docker Desktop is running.");
    return false;
  }
};

const servicesRunning = await startServices();

// ============================================================
// SECTION 4: Connection Details
// ============================================================

console.log("\n--- Connection Details ---\n");

const connectionDetails = `
POSTGRESQL:
  Host:     localhost
  Port:     5432
  User:     learn
  Password: learn
  Database: learn_db

  Connection URL:
  postgresql://learn:learn@localhost:5432/learn_db

REDIS:
  Host:     localhost
  Port:     6379

  Connection URL:
  redis://localhost:6379
`;

console.log(connectionDetails);

// ============================================================
// SECTION 5: Test Connections
// ============================================================

console.log("--- Testing Connections ---\n");

// Test PostgreSQL
const testPostgres = async () => {
  try {
    const proc = Bun.spawn(
      ["docker", "exec", "learn-postgres", "pg_isready", "-U", "learn", "-d", "learn_db"],
      { stdout: "pipe", stderr: "pipe" }
    );
    await proc.exited;
    const output = await new Response(proc.stdout).text();

    if (output.includes("accepting connections")) {
      console.log("✅ PostgreSQL is accepting connections");
      return true;
    }
  } catch {}
  console.log("❌ PostgreSQL not ready");
  return false;
};

// Test Redis
const testRedis = async () => {
  try {
    const proc = Bun.spawn(
      ["docker", "exec", "learn-redis", "redis-cli", "ping"],
      { stdout: "pipe", stderr: "pipe" }
    );
    await proc.exited;
    const output = await new Response(proc.stdout).text();

    if (output.trim() === "PONG") {
      console.log("✅ Redis is responding");
      return true;
    }
  } catch {}
  console.log("❌ Redis not ready");
  return false;
};

if (servicesRunning) {
  await testPostgres();
  await testRedis();
} else {
  console.log("Start services first: docker compose up -d");
}

// ============================================================
// SECTION 6: Troubleshooting
// ============================================================

console.log("\n--- Troubleshooting ---\n");

const troubleshooting = `
PROBLEM: "Port already in use"
SOLUTION: Something else is using port 5432/6379
  - Stop other PostgreSQL/Redis instances
  - Or change ports in docker-compose.yml

PROBLEM: "Cannot connect to Docker daemon"
SOLUTION: Docker Desktop isn't running
  - Start Docker Desktop application

PROBLEM: "Container keeps restarting"
SOLUTION: Check logs for errors
  - docker compose logs postgres

PROBLEM: "Permission denied"
SOLUTION: Docker needs permissions
  - Windows: Run terminal as Administrator
  - Mac/Linux: Add user to docker group
`;

console.log(troubleshooting);

// ============================================================
// VERIFICATION
// ============================================================

console.log("--- Lesson Complete ---\n");

if (servicesRunning) {
  console.log("✅ Your development environment is ready!");
  console.log("\nYou can now:");
  console.log("  - Connect to PostgreSQL at localhost:5432");
  console.log("  - Connect to Redis at localhost:6379");
  console.log("\nNext: Lesson 3 - Bun Basics");
} else {
  console.log("⚠️  Complete these steps:");
  console.log("  1. Make sure Docker Desktop is running");
  console.log("  2. cd lessons/backend");
  console.log("  3. docker compose up -d");
  console.log("  4. Run this lesson again to verify");
}
```

**Step 3: Commit**

```bash
git add lessons/backend/01-docker-essentials.ts lessons/backend/02-docker-compose-setup.ts
git commit -m "feat(backend): add Docker essentials lessons (01-02)"
```

---

## Task 3: Renumber Existing Bun Lessons (03-07)

**Files:**
- Rename: `01-bun-basics.ts` → `03-bun-basics.ts`
- Rename: `02-bun-apis.ts` → `04-bun-apis.ts`
- Rename: `03-http-server.ts` → `05-http-server.ts`
- Rename: `04-file-system.ts` → `06-file-system.ts`
- Rename: `05-bun-testing.ts` → `07-bun-testing.ts`

**Step 1: Rename files**

```bash
cd lessons/backend
git mv 01-bun-basics.ts 03-bun-basics.ts
git mv 02-bun-apis.ts 04-bun-apis.ts
git mv 03-http-server.ts 05-http-server.ts
git mv 04-file-system.ts 06-file-system.ts
git mv 05-bun-testing.ts 07-bun-testing.ts
```

**Step 2: Update lesson numbers in file headers**

Update the lesson title comment at the top of each file:
- `03-bun-basics.ts`: "LESSON 3: Bun Basics"
- `04-bun-apis.ts`: "LESSON 4: Bun APIs"
- `05-http-server.ts`: "LESSON 5: HTTP Server"
- `06-file-system.ts`: "LESSON 6: File System"
- `07-bun-testing.ts`: "LESSON 7: Testing with Bun"

**Step 3: Commit**

```bash
git add -A
git commit -m "refactor(backend): renumber Bun lessons to 03-07"
```

---

## Task 4: Renumber Existing Hono Lessons (08-12)

**Files:**
- Rename: `06-hono-basics.ts` → `08-hono-basics.ts`
- Rename: `07-route-parameters.ts` → `09-route-parameters.ts`
- Rename: `08-middleware.ts` → `10-middleware.ts`
- Rename: `09-request-response.ts` → `11-request-response.ts`
- Rename: `10-error-handling.ts` → `12-error-handling.ts`

**Step 1: Rename files**

```bash
cd lessons/backend
git mv 06-hono-basics.ts 08-hono-basics.ts
git mv 07-route-parameters.ts 09-route-parameters.ts
git mv 08-middleware.ts 10-middleware.ts
git mv 09-request-response.ts 11-request-response.ts
git mv 10-error-handling.ts 12-error-handling.ts
```

**Step 2: Update lesson numbers in file headers**

**Step 3: Commit**

```bash
git add -A
git commit -m "refactor(backend): renumber Hono lessons to 08-12"
```

---

## Task 5: Renumber Existing Zod Lessons (13-16)

**Files:**
- Rename: `12-zod-basics.ts` → `13-zod-basics.ts`
- Rename: `13-zod-transformations.ts` → `14-zod-transformations.ts`
- Rename: `14-zod-error-handling.ts` → `15-zod-error-handling.ts`
- Rename: `15-zod-advanced.ts` → `16-zod-advanced.ts`
- Delete: `11-openapi-swagger.ts` (will be moved to lesson 23)
- Delete: `16-zod-integration.ts` (will be replaced by lesson 22)

**Step 1: Rename and reorganize files**

```bash
cd lessons/backend
git mv 12-zod-basics.ts 13-zod-basics.ts
git mv 13-zod-transformations.ts 14-zod-transformations.ts
git mv 14-zod-error-handling.ts 15-zod-error-handling.ts
git mv 15-zod-advanced.ts 16-zod-advanced.ts
# Keep 11 and 16 for now, we'll handle them in later tasks
```

**Step 2: Update lesson numbers in file headers**

**Step 3: Commit**

```bash
git add -A
git commit -m "refactor(backend): renumber Zod lessons to 13-16"
```

---

## Task 6: Add Drizzle Dependencies

**Files:**
- Modify: `package.json`

**Step 1: Add Drizzle packages**

```bash
bun add drizzle-orm postgres
bun add -d drizzle-kit
```

**Step 2: Verify package.json has new dependencies**

Expected additions:
```json
{
  "dependencies": {
    "drizzle-orm": "^0.x",
    "postgres": "^3.x"
  },
  "devDependencies": {
    "drizzle-kit": "^0.x"
  }
}
```

**Step 3: Commit**

```bash
git add package.json bun.lockb
git commit -m "feat(backend): add Drizzle ORM dependencies"
```

---

## Task 7: Create Drizzle Lessons (17-21)

**Files:**
- Create: `lessons/backend/17-drizzle-setup.ts`
- Create: `lessons/backend/18-schema-definition.ts`
- Create: `lessons/backend/19-crud-operations.ts`
- Create: `lessons/backend/20-relations-joins.ts`
- Create: `lessons/backend/21-migrations.ts`

These lessons teach Drizzle ORM with PostgreSQL. Each lesson should:
- Follow the same teaching style as existing lessons (analogies, sections, examples)
- Use the Docker PostgreSQL instance (learn:learn@localhost:5432/learn_db)
- Include runnable examples
- Build on previous lessons

**Step 1: Write 17-drizzle-setup.ts**

Content outline:
- What is an ORM and why Drizzle
- Setting up drizzle.config.ts
- Creating a database connection
- Testing the connection
- Environment variables for connection strings

**Step 2: Write 18-schema-definition.ts**

Content outline:
- Defining tables with pgTable
- Column types (text, integer, boolean, timestamp, etc.)
- Primary keys and auto-increment
- Default values
- NOT NULL constraints

**Step 3: Write 19-crud-operations.ts**

Content outline:
- INSERT with db.insert()
- SELECT with db.select()
- UPDATE with db.update()
- DELETE with db.delete()
- WHERE clauses and operators

**Step 4: Write 20-relations-joins.ts**

Content outline:
- Foreign keys
- One-to-many relations
- Many-to-many relations
- JOIN queries
- Nested selects

**Step 5: Write 21-migrations.ts**

Content outline:
- What are migrations and why
- Generating migrations with drizzle-kit
- Applying migrations
- Push vs migrate
- Rollback strategies

**Step 6: Commit each lesson**

```bash
git add lessons/backend/17-drizzle-setup.ts
git commit -m "feat(backend): add Drizzle setup lesson (17)"
# Repeat for each lesson
```

---

## Task 8: Create Integration Lessons (22-23)

**Files:**
- Create: `lessons/backend/22-hono-zod-drizzle.ts`
- Move/Update: `11-openapi-swagger.ts` → `23-openapi-swagger.ts`

**Step 1: Write 22-hono-zod-drizzle.ts**

Content outline:
- Project structure for a real API
- Zod schemas that match Drizzle tables
- drizzle-zod for automatic schema generation
- Request validation → Database → Response pattern
- Error handling across the stack
- Transaction examples

**Step 2: Update OpenAPI lesson**

Move and update to use real database examples.

**Step 3: Delete old files**

```bash
rm lessons/backend/11-openapi-swagger.ts
rm lessons/backend/16-zod-integration.ts
```

**Step 4: Commit**

```bash
git add -A
git commit -m "feat(backend): add integration lessons (22-23)"
```

---

## Task 9: Create New Practice Files

**Files:**
- Create: `lessons/backend/practice/04-drizzle-practice.ts`
- Create: `lessons/backend/practice/05-integration-practice.ts`

**Step 1: Write 04-drizzle-practice.ts**

Practice exercises for:
- Creating schemas
- CRUD operations
- Relations and joins
- All using real PostgreSQL

**Step 2: Write 05-integration-practice.ts**

Practice exercises for:
- Building a mini API with validation and persistence
- Error handling
- Testing endpoints

**Step 3: Commit**

```bash
git add lessons/backend/practice/04-drizzle-practice.ts lessons/backend/practice/05-integration-practice.ts
git commit -m "feat(backend): add Drizzle and integration practice files"
```

---

## Task 10: Update Projects to Use PostgreSQL

**Files:**
- Modify: `lessons/backend/projects/01-rest-api.ts`
- Modify: `lessons/backend/projects/03-url-shortener.ts`

**Step 1: Update 01-rest-api.ts**

Replace in-memory array with:
- Drizzle schema for tasks table
- Real database operations
- Keep the same API interface and tests

**Step 2: Update 03-url-shortener.ts**

Replace in-memory array with:
- Drizzle schema for urls table
- Real database operations
- Add click tracking with timestamps

**Step 3: Commit**

```bash
git add lessons/backend/projects/01-rest-api.ts lessons/backend/projects/03-url-shortener.ts
git commit -m "feat(backend): update projects to use PostgreSQL"
```

---

## Task 11: Update Backend README

**Files:**
- Modify: `lessons/backend/README.md`

**Step 1: Rewrite README**

Update to reflect new structure:
- New prerequisites (Docker Desktop)
- New module structure (6 modules, 23 lessons)
- Updated run commands with new lesson numbers
- Docker Compose quick start section
- Connection details section

**Step 2: Commit**

```bash
git add lessons/backend/README.md
git commit -m "docs(backend): update README for integrated curriculum"
```

---

## Task 12: Update CURRICULUM.md

**Files:**
- Modify: `CURRICULUM.md`

**Step 1: Update Phase 2 section**

- Mark as integrated (Bun + Hono + Zod + Docker + Drizzle)
- Update lesson list with new numbers
- Remove Phase 3 (Docker) - absorbed into Phase 2
- Remove Phase 4 (Database) - absorbed into Phase 2
- Renumber remaining phases (React becomes Phase 3, etc.)

**Step 2: Update progress tracking section**

**Step 3: Commit**

```bash
git add CURRICULUM.md
git commit -m "docs: update curriculum for integrated backend phase"
```

---

## Task 13: Create Drizzle Configuration

**Files:**
- Create: `lessons/backend/drizzle.config.ts`
- Create: `lessons/backend/src/db/index.ts`
- Create: `lessons/backend/src/db/schema.ts`

**Step 1: Write drizzle.config.ts**

```typescript
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgresql://learn:learn@localhost:5432/learn_db",
  },
});
```

**Step 2: Write src/db/index.ts**

```typescript
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL || "postgresql://learn:learn@localhost:5432/learn_db";

const client = postgres(connectionString);
export const db = drizzle(client, { schema });
```

**Step 3: Write src/db/schema.ts**

```typescript
import { pgTable, serial, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";

// Example schema - lessons will build on this
export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status").notNull().default("todo"),
  priority: text("priority").notNull().default("medium"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const urls = pgTable("urls", {
  id: serial("id").primaryKey(),
  shortCode: text("short_code").notNull().unique(),
  originalUrl: text("original_url").notNull(),
  clicks: integer("clicks").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at"),
});
```

**Step 4: Commit**

```bash
git add lessons/backend/drizzle.config.ts lessons/backend/src/
git commit -m "feat(backend): add Drizzle configuration and base schema"
```

---

## Summary

| Task | Description | Files |
|------|-------------|-------|
| 1 | Docker Compose config | docker-compose.yml |
| 2 | Docker lessons | 01, 02 |
| 3 | Renumber Bun | 03-07 |
| 4 | Renumber Hono | 08-12 |
| 5 | Renumber Zod | 13-16 |
| 6 | Add Drizzle deps | package.json |
| 7 | Drizzle lessons | 17-21 |
| 8 | Integration lessons | 22-23 |
| 9 | New practice files | practice/04, 05 |
| 10 | Update projects | projects/01, 03 |
| 11 | Update backend README | README.md |
| 12 | Update CURRICULUM.md | CURRICULUM.md |
| 13 | Drizzle config | drizzle.config.ts, src/db/* |

**Total: 13 tasks, ~23 files to create/modify**

---

## Post-Implementation Verification

After completing all tasks:

1. Start Docker services: `cd lessons/backend && docker compose up -d`
2. Run each lesson in order to verify they work
3. Complete practice exercises
4. Build and test projects with real database
5. Verify all tests pass: `bun test lessons/backend/`
