/**
 * ============================================================
 * LESSON 2: Docker Compose Setup
 * ============================================================
 *
 * In Lesson 1, we learned to run single containers.
 * But real applications often need MULTIPLE services:
 * - A database (PostgreSQL)
 * - A cache (Redis)
 * - Maybe a message queue (RabbitMQ)
 *
 * Docker Compose lets you manage all of these with ONE file.
 *
 * ANALOGY: If Docker is like ordering individual dishes,
 * Docker Compose is like ordering a complete meal combo.
 * One order, everything arrives together, perfectly coordinated.
 */

// ============================================================
// SECTION 1: What is Docker Compose?
// ============================================================

console.log("========================================");
console.log("LESSON 2: DOCKER COMPOSE SETUP");
console.log("========================================\n");

/**
 * WITHOUT Docker Compose:
 *   docker run -d --name postgres -e POSTGRES_PASSWORD=secret -p 5432:5432 postgres:16
 *   docker run -d --name redis -p 6379:6379 redis:7
 *   docker run -d --name mongo -p 27017:27017 mongo:7
 *   ... remember all these commands forever ...
 *
 * WITH Docker Compose:
 *   docker compose up
 *   ... done! ...
 */

console.log("--- What is Docker Compose? ---");
console.log("Docker Compose is a tool for defining and running");
console.log("multi-container applications with a single YAML file.");
console.log("");
console.log("Benefits:");
console.log("  - All services defined in one file");
console.log("  - Start everything with 'docker compose up'");
console.log("  - Stop everything with 'docker compose down'");
console.log("  - Share configuration with your team via git");
console.log("  - Reproducible development environment");

// ============================================================
// SECTION 2: The docker-compose.yml File
// ============================================================

console.log("\n--- Understanding docker-compose.yml ---");

/**
 * The docker-compose.yml file is the blueprint for your services.
 * Let's look at the one in this project: lessons/backend/docker-compose.yml
 */

const dockerComposeExample = `
version: '3.8'                    # Compose file version

services:                         # Define your containers here
  postgres:                       # Service name (you choose this)
    image: postgres:16-alpine     # Docker image to use
    container_name: learn-postgres # Friendly name for the container
    environment:                  # Environment variables
      POSTGRES_USER: learn
      POSTGRES_PASSWORD: learn
      POSTGRES_DB: learn_db
    ports:
      - "5432:5432"               # HOST:CONTAINER port mapping
    volumes:
      - postgres_data:/var/lib/postgresql/data  # Named volume
    healthcheck:                  # Check if service is healthy
      test: ["CMD-SHELL", "pg_isready -U learn -d learn_db"]
      interval: 5s
      timeout: 5s
      retries: 5

  redis:                          # Another service
    image: redis:7-alpine
    container_name: learn-redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:                          # Define named volumes
  postgres_data:                  # Persists PostgreSQL data
  redis_data:                     # Persists Redis data
`;

console.log(dockerComposeExample);

// ============================================================
// SECTION 3: Breaking Down the Structure
// ============================================================

console.log("\n--- File Structure Breakdown ---");

const structureBreakdown = `
docker-compose.yml
|
+-- version: '3.8'          # Required: Compose specification version
|
+-- services:               # Required: Define your containers
|   |
|   +-- postgres:           # Service 1
|   |   +-- image           # What Docker image to use
|   |   +-- container_name  # Optional: friendly name
|   |   +-- environment     # Set env vars (like -e flag)
|   |   +-- ports           # Map ports (like -p flag)
|   |   +-- volumes         # Mount storage (like -v flag)
|   |   +-- healthcheck     # Optional: verify service health
|   |
|   +-- redis:              # Service 2
|       +-- image
|       +-- ports
|       +-- volumes
|
+-- volumes:                # Define named volumes for persistence
    +-- postgres_data
    +-- redis_data

KEY INSIGHT: Each item under 'services' becomes a container.
The indentation matters - YAML uses spaces (not tabs)!
`;

console.log(structureBreakdown);

// ============================================================
// SECTION 4: Essential Docker Compose Commands
// ============================================================

console.log("\n--- Essential Docker Compose Commands ---");

const composeCommands = `
STARTING SERVICES:
  docker compose up              Start all services (attached mode)
  docker compose up -d           Start in background (detached)
  docker compose up postgres     Start only postgres service
  docker compose up -d --build   Rebuild images before starting

STOPPING SERVICES:
  docker compose down            Stop and remove containers
  docker compose down -v         Also remove volumes (deletes data!)
  docker compose stop            Stop without removing
  docker compose start           Start stopped services

VIEWING STATUS:
  docker compose ps              List running services
  docker compose logs            View logs from all services
  docker compose logs postgres   View logs from one service
  docker compose logs -f         Follow logs (live update)

RUNNING COMMANDS:
  docker compose exec postgres psql -U learn -d learn_db
  # Runs psql inside the postgres container

IMPORTANT: Run these from the directory containing docker-compose.yml
           Or use: docker compose -f path/to/docker-compose.yml up
`;

console.log(composeCommands);

// ============================================================
// SECTION 5: Our Project's Docker Compose Setup
// ============================================================

console.log("\n--- Our Project's Setup ---");

const projectSetup = `
This project's docker-compose.yml (in lessons/backend/) provides:

+------------------+        +------------------+
|    PostgreSQL    |        |      Redis       |
+------------------+        +------------------+
| Port: 5432       |        | Port: 6379       |
| User: learn      |        | No auth          |
| Pass: learn      |        |                  |
| DB: learn_db     |        |                  |
+------------------+        +------------------+

TO START:
  cd lessons/backend
  docker compose up -d

TO STOP:
  docker compose down

TO CHECK STATUS:
  docker compose ps
`;

console.log(projectSetup);

// ============================================================
// SECTION 6: Connection Details
// ============================================================

console.log("\n--- Connection Details ---");

const connectionDetails = `
POSTGRESQL CONNECTION:
+-------------------+------------------------------+
| Property          | Value                        |
+-------------------+------------------------------+
| Host              | localhost                    |
| Port              | 5432                         |
| Username          | learn                        |
| Password          | learn                        |
| Database          | learn_db                     |
| Connection String | postgresql://learn:learn@localhost:5432/learn_db |
+-------------------+------------------------------+

REDIS CONNECTION:
+-------------------+------------------------------+
| Property          | Value                        |
+-------------------+------------------------------+
| Host              | localhost                    |
| Port              | 6379                         |
| URL               | redis://localhost:6379       |
+-------------------+------------------------------+

USE IN CODE:
  // PostgreSQL with Bun.sql (tagged template literal)
  // Set DATABASE_URL env var to: postgresql://learn:learn@localhost:5432/learn_db
  const result = await Bun.sql\`SELECT 1 as connected\`;

  // Or use postgres package (recommended with Drizzle ORM):
  import postgres from "postgres";
  const sql = postgres("postgresql://learn:learn@localhost:5432/learn_db");

  // Redis connection will be covered in caching lessons
  // (using packages like ioredis for full Redis support)
`;

console.log(connectionDetails);

// ============================================================
// SECTION 7: Testing Connections
// ============================================================

console.log("\n========================================");
console.log("TESTING: Docker Compose Status");
console.log("========================================\n");

async function checkContainerStatus(): Promise<void> {
  console.log("Checking if Docker Compose services are running...\n");

  try {
    // Check if docker compose is available
    const composeVersionProc = Bun.spawn(["docker", "compose", "version"], {
      stdout: "pipe",
      stderr: "pipe",
    });

    const composeVersionExit = await composeVersionProc.exited;

    if (composeVersionExit !== 0) {
      console.log("[WARNING] Docker Compose not available.");
      console.log("          Make sure Docker Desktop is installed.");
      return;
    }

    console.log("[OK] Docker Compose is available.");

    // Check PostgreSQL container
    const pgProc = Bun.spawn(
      ["docker", "inspect", "-f", "{{.State.Running}}", "learn-postgres"],
      { stdout: "pipe", stderr: "pipe" }
    );

    const pgExit = await pgProc.exited;
    const pgOutput = await new Response(pgProc.stdout).text();

    if (pgExit === 0 && pgOutput.trim() === "true") {
      console.log("[OK] PostgreSQL container (learn-postgres) is running.");
    } else {
      console.log("[--] PostgreSQL container (learn-postgres) is NOT running.");
      console.log("     To start: cd lessons/backend && docker compose up -d");
    }

    // Check Redis container
    const redisProc = Bun.spawn(
      ["docker", "inspect", "-f", "{{.State.Running}}", "learn-redis"],
      { stdout: "pipe", stderr: "pipe" }
    );

    const redisExit = await redisProc.exited;
    const redisOutput = await new Response(redisProc.stdout).text();

    if (redisExit === 0 && redisOutput.trim() === "true") {
      console.log("[OK] Redis container (learn-redis) is running.");
    } else {
      console.log("[--] Redis container (learn-redis) is NOT running.");
      console.log("     To start: cd lessons/backend && docker compose up -d");
    }
  } catch (error) {
    console.log("[ERROR] Could not check container status.");
    console.log("        Make sure Docker is installed and running.");
  }
}

await checkContainerStatus();

// ============================================================
// SECTION 8: Troubleshooting Common Issues
// ============================================================

console.log("\n--- Troubleshooting Common Issues ---");

const troubleshooting = `
ISSUE: "Port already in use"
CAUSE: Another service is using port 5432 or 6379
FIX:   1. Find what's using it: docker ps
       2. Stop conflicting container, OR
       3. Change port in docker-compose.yml: "5433:5432"

ISSUE: "Cannot connect to the Docker daemon"
CAUSE: Docker Desktop not running
FIX:   Start Docker Desktop application

ISSUE: "Container keeps restarting"
CAUSE: Service inside container is crashing
FIX:   Check logs: docker compose logs postgres

ISSUE: "Connection refused" when connecting to database
CAUSE: Container not running or wrong port
FIX:   1. Check status: docker compose ps
       2. Ensure container is "Up" not "Exited"
       3. Verify port mapping

ISSUE: "Data disappeared after restart"
CAUSE: Volumes not configured, or used 'down -v'
FIX:   Always use volumes in docker-compose.yml
       Avoid 'docker compose down -v' unless you want to reset

USEFUL COMMANDS FOR DEBUGGING:
  docker compose logs -f           # Follow all logs
  docker compose logs postgres     # Specific service logs
  docker compose ps                # Check service status
  docker compose exec postgres sh  # Shell into container
`;

console.log(troubleshooting);

// ============================================================
// SECTION 9: Quick Start Guide
// ============================================================

console.log("\n--- Quick Start Guide ---");

const quickStart = `
FIRST TIME SETUP:
  1. Make sure Docker Desktop is running
  2. Navigate to the backend lessons folder:
       cd lessons/backend
  3. Start the services:
       docker compose up -d
  4. Verify they're running:
       docker compose ps

DAILY WORKFLOW:
  Starting your day:
    docker compose up -d

  Ending your day (optional - containers persist):
    docker compose stop

  Checking status:
    docker compose ps

  Viewing logs:
    docker compose logs -f

  Complete reset (removes all data):
    docker compose down -v
    docker compose up -d

CONNECTING TO POSTGRESQL:
  docker compose exec postgres psql -U learn -d learn_db

  Inside psql:
    \\l          - List databases
    \\dt         - List tables
    \\q          - Quit
`;

console.log(quickStart);

// ============================================================
// KEY TAKEAWAYS
// ============================================================

console.log("\n========================================");
console.log("KEY TAKEAWAYS");
console.log("========================================");
console.log("1. docker-compose.yml defines multiple services in one file");
console.log("2. 'docker compose up -d' starts all services in background");
console.log("3. 'docker compose down' stops and removes containers");
console.log("4. 'docker compose ps' shows status of all services");
console.log("5. 'docker compose logs -f' follows logs from all services");
console.log("6. Volumes persist data between container restarts");

console.log("\nPROJECT SETUP:");
console.log("  PostgreSQL: localhost:5432 (user: learn, pass: learn)");
console.log("  Redis:      localhost:6379");

console.log("\nNEXT STEPS:");
console.log("1. Run: cd lessons/backend && docker compose up -d");
console.log("2. Verify: docker compose ps");
console.log("3. Continue to the next lesson to use these databases!");

console.log("\n[OK] Lesson 2 Complete! Your development environment is ready.");

// Export to make this an ES module (fixes IDE warnings about top-level await)
export {};
