/**
 * ============================================================
 * LESSON 1: Docker Essentials
 * ============================================================
 *
 * Before we build backend applications, we need databases and
 * services to work with. Docker makes this easy and consistent.
 *
 * ANALOGY: Think of Docker like a shipping container system.
 *
 * Before shipping containers, loading cargo was chaos - every port
 * handled things differently. Containers standardized everything:
 * same size, same handling, works everywhere.
 *
 * Docker does the same for software:
 * - Instead of installing PostgreSQL differently on Mac, Windows, Linux
 * - You run ONE container that works identically everywhere
 * - "It works on my machine" becomes "It works in the container"
 */

// ============================================================
// SECTION 1: Why Docker?
// ============================================================

console.log("========================================");
console.log("LESSON 1: DOCKER ESSENTIALS");
console.log("========================================\n");

/**
 * Traditional approach (painful):
 * 1. Download PostgreSQL installer for your OS
 * 2. Run through installation wizard
 * 3. Configure paths, users, permissions
 * 4. Hope it doesn't conflict with other versions
 * 5. Repeat for Redis, MongoDB, etc.
 * 6. Cry when it works differently on your teammate's machine
 *
 * Docker approach (simple):
 * 1. docker run postgres
 * 2. Done. Same everywhere.
 */

console.log("--- Why Use Docker? ---");
console.log("Without Docker:");
console.log("  - Install software differently on each OS");
console.log("  - Version conflicts with existing installations");
console.log("  - 'Works on my machine' problems");
console.log("  - Complex cleanup when removing software");
console.log("");
console.log("With Docker:");
console.log("  - One command to run any software");
console.log("  - Isolated from your system");
console.log("  - Identical on every machine");
console.log("  - Clean removal: just delete the container");

// ============================================================
// SECTION 2: Images vs Containers
// ============================================================

console.log("\n--- Images vs Containers ---");

/**
 * ANALOGY: Recipe vs Meal
 *
 * IMAGE = Recipe
 * - A blueprint/template
 * - Downloaded from Docker Hub (like a cookbook)
 * - Read-only, never changes
 * - Examples: postgres:16, redis:7, node:20
 *
 * CONTAINER = Meal
 * - A running instance of an image
 * - Created from an image
 * - Can be started, stopped, deleted
 * - Has its own isolated state
 *
 * One image can make many containers, just like
 * one recipe can make many meals!
 */

const imageVsContainer = `
+------------------+     +------------------+
|      IMAGE       |     |    CONTAINER     |
+------------------+     +------------------+
| - Blueprint      |     | - Running        |
| - Read-only      | --> | - Writable       |
| - From registry  |     | - From image     |
| - Shared/Reused  |     | - Isolated       |
+------------------+     +------------------+

One recipe (image) -> Many meals (containers)

Example:
  postgres:16 (image) -> my-postgres-1 (container)
                      -> my-postgres-2 (container)
                      -> test-database (container)
`;

console.log(imageVsContainer);

// ============================================================
// SECTION 3: Essential Docker Commands
// ============================================================

console.log("\n--- Essential Docker Commands ---");

const dockerCommands = `
IMAGES:
  docker pull <image>         Download an image from Docker Hub
  docker images               List downloaded images
  docker rmi <image>          Remove an image

CONTAINERS:
  docker run <image>          Create and start a container
  docker ps                   List running containers
  docker ps -a                List ALL containers (including stopped)
  docker stop <container>     Stop a running container
  docker start <container>    Start a stopped container
  docker rm <container>       Remove a container
  docker logs <container>     View container output/logs
  docker exec -it <c> <cmd>   Run a command inside container

CLEANUP:
  docker system prune         Remove unused data
  docker container prune      Remove stopped containers
`;

console.log(dockerCommands);

// ============================================================
// SECTION 4: Running PostgreSQL with Docker
// ============================================================

console.log("\n--- Running PostgreSQL with Docker ---");

/**
 * Let's break down a real Docker command:
 *
 * docker run -d --name my-postgres -e POSTGRES_PASSWORD=secret -p 5432:5432 postgres:16
 *
 * Piece by piece:
 */

const postgresCommand = `
docker run \\
  -d \\                              # Detached mode (run in background)
  --name my-postgres \\              # Give it a name (easier to reference)
  -e POSTGRES_PASSWORD=secret \\     # Environment variable (required for postgres)
  -e POSTGRES_USER=myuser \\         # Custom username (optional, default: postgres)
  -e POSTGRES_DB=mydb \\             # Create this database (optional)
  -p 5432:5432 \\                    # Port mapping: HOST:CONTAINER
  postgres:16                        # Image name:tag

FLAGS EXPLAINED:
  -d, --detach     Run in background (you get your terminal back)
  --name           Give container a friendly name
  -e, --env        Set environment variables
  -p, --publish    Map ports from container to host
  -v, --volume     Mount storage (covered below)
  --rm             Auto-remove container when stopped
`;

console.log(postgresCommand);

// ============================================================
// SECTION 5: Port Mapping
// ============================================================

console.log("\n--- Port Mapping ---");

/**
 * Containers are isolated - they have their own network.
 * Port mapping creates a tunnel from your machine to the container.
 *
 * -p HOST_PORT:CONTAINER_PORT
 *
 * Example: -p 5432:5432
 * - PostgreSQL inside container listens on 5432
 * - We map our machine's 5432 to container's 5432
 * - Now localhost:5432 reaches PostgreSQL
 */

const portMapping = `
Your Machine (Host)              Container
+-------------------+           +-------------------+
|                   |           |                   |
|   localhost:5432  | --------> |  postgres:5432    |
|                   |   tunnel  |                   |
+-------------------+           +-------------------+

Common port mappings:
  PostgreSQL:  -p 5432:5432
  Redis:       -p 6379:6379
  MySQL:       -p 3306:3306
  MongoDB:     -p 27017:27017

You can use different host ports to avoid conflicts:
  -p 5433:5432   # Access on localhost:5433
  -p 15432:5432  # Access on localhost:15432
`;

console.log(portMapping);

// ============================================================
// SECTION 6: Volumes for Persistent Data
// ============================================================

console.log("\n--- Volumes for Persistent Data ---");

/**
 * PROBLEM: Containers are temporary. Delete a container = lose all data!
 *
 * SOLUTION: Volumes - storage that persists outside the container.
 *
 * ANALOGY: Think of a container like a rental car.
 * When you return it, everything inside is gone.
 * A volume is like your own trunk that you can attach to any rental car.
 */

const volumeExplanation = `
WITHOUT VOLUME:
  Container deleted -> Data gone forever!

WITH VOLUME:
  Container deleted -> Data safe in volume
  New container -> Attach same volume -> Data restored!

Creating volumes:
  docker volume create my-data         # Create named volume
  docker volume ls                     # List volumes
  docker volume rm my-data             # Remove volume

Using volumes in docker run:
  -v my-data:/var/lib/postgresql/data

  This means:
  my-data                      = volume name on your machine
  /var/lib/postgresql/data     = path inside container

Example - PostgreSQL with persistent storage:
  docker run -d \\
    --name my-postgres \\
    -e POSTGRES_PASSWORD=secret \\
    -p 5432:5432 \\
    -v pgdata:/var/lib/postgresql/data \\
    postgres:16
`;

console.log(volumeExplanation);

// ============================================================
// SECTION 7: Quick Reference - Daily Workflow
// ============================================================

console.log("\n--- Quick Reference: Daily Workflow ---");

const dailyWorkflow = `
+-------------------+------------------------------------------+
| Task              | Command                                  |
+-------------------+------------------------------------------+
| Start work        | docker start my-postgres                 |
| Check running     | docker ps                                |
| View logs         | docker logs my-postgres                  |
| Connect to DB     | docker exec -it my-postgres psql -U user |
| Stop work         | docker stop my-postgres                  |
| Problems?         | docker logs my-postgres                  |
| Start fresh       | docker rm my-postgres && docker run ...  |
+-------------------+------------------------------------------+

COMMON ISSUES:
  "Port already in use"   -> Another container or app using that port
                             Solution: docker ps, then stop the other container
                             Or use a different port: -p 5433:5432

  "Container not found"   -> Container was removed, need to docker run again

  "Connection refused"    -> Container not running (docker ps to check)
                             Or wrong port mapping
`;

console.log(dailyWorkflow);

// ============================================================
// SECTION 8: Docker Hub - Finding Images
// ============================================================

console.log("\n--- Docker Hub: Finding Images ---");

const dockerHub = `
Docker Hub (hub.docker.com) is like npm for containers.

OFFICIAL IMAGES (maintained by Docker team):
  postgres       - PostgreSQL database
  redis          - Redis cache/database
  mysql          - MySQL database
  mongo          - MongoDB database
  node           - Node.js runtime

IMAGE TAGS (versions):
  postgres:16         - PostgreSQL version 16
  postgres:16-alpine  - Version 16, smaller Alpine Linux base
  postgres:latest     - Most recent version (avoid in production)
  redis:7             - Redis version 7
  redis:7-alpine      - Smaller Alpine variant

BEST PRACTICES:
  - Always specify a version tag (not :latest)
  - Use -alpine variants for smaller images
  - Check the image page for environment variables
`;

console.log(dockerHub);

// ============================================================
// SECTION 9: Verification - Check Docker Installation
// ============================================================

console.log("\n========================================");
console.log("VERIFICATION: Checking Docker Installation");
console.log("========================================\n");

async function checkDockerInstallation(): Promise<void> {
  try {
    // Check if Docker is installed and running
    const proc = Bun.spawn(["docker", "--version"], {
      stdout: "pipe",
      stderr: "pipe",
    });

    const exitCode = await proc.exited;

    if (exitCode === 0) {
      const output = await new Response(proc.stdout).text();
      console.log("[OK] Docker is installed!");
      console.log(`     ${output.trim()}`);

      // Check if Docker daemon is running
      const daemonProc = Bun.spawn(["docker", "info"], {
        stdout: "pipe",
        stderr: "pipe",
      });

      const daemonExitCode = await daemonProc.exited;

      if (daemonExitCode === 0) {
        console.log("[OK] Docker daemon is running!");
      } else {
        console.log("[WARNING] Docker is installed but not running.");
        console.log("         Start Docker Desktop or the Docker service.");
      }
    } else {
      console.log("[ERROR] Docker command failed.");
      console.log("        Make sure Docker is installed and in your PATH.");
    }
  } catch (error) {
    console.log("[ERROR] Docker is not installed or not in PATH.");
    console.log("");
    console.log("To install Docker:");
    console.log("  1. Go to https://www.docker.com/products/docker-desktop");
    console.log("  2. Download Docker Desktop for your OS");
    console.log("  3. Install and start Docker Desktop");
    console.log("  4. Run this lesson again to verify");
  }
}

// Run the verification
await checkDockerInstallation();

// ============================================================
// KEY TAKEAWAYS
// ============================================================

console.log("\n========================================");
console.log("KEY TAKEAWAYS");
console.log("========================================");
console.log("1. Docker runs software in isolated containers");
console.log("2. Image = blueprint, Container = running instance");
console.log("3. docker run creates containers from images");
console.log("4. Port mapping (-p) connects your machine to containers");
console.log("5. Volumes (-v) persist data beyond container lifetime");
console.log("6. Use docker ps, logs, stop, start for daily work");

console.log("\nNEXT STEPS:");
console.log("1. Install Docker Desktop if you haven't already");
console.log("2. Try running: docker run hello-world");
console.log("3. Continue to Lesson 2: Docker Compose Setup");

console.log("\n[OK] Lesson 1 Complete! Run: bun lessons/backend/02-docker-compose-setup.ts");

// Export to make this an ES module (fixes IDE warnings about top-level await)
export {};
