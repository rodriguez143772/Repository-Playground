/**
 * ============================================================
 * LESSON 17: Drizzle ORM Setup
 * ============================================================
 *
 * Drizzle is a TypeScript ORM that's lightweight, performant, and type-safe.
 * It provides a SQL-like syntax while keeping full TypeScript support.
 *
 * ANALOGY: Drizzle is like a universal translator for databases:
 * - You speak TypeScript, the database speaks SQL
 * - Drizzle translates between them perfectly
 * - It remembers the "grammar rules" (schemas) so you never make mistakes
 *
 * Why Drizzle?
 * - Zero runtime overhead (generates SQL at build time)
 * - Full TypeScript inference
 * - SQL-like syntax (if you know SQL, you know Drizzle)
 * - Works with Bun, Node, Deno, and edge runtimes
 * - Excellent PostgreSQL support
 *
 * Install: bun add drizzle-orm postgres
 *          bun add -D drizzle-kit
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

console.log("========================================");
console.log("LESSON 17: DRIZZLE ORM SETUP");
console.log("========================================\n");

// ============================================================
// SECTION 1: What is an ORM?
// ============================================================

/**
 * ORM = Object-Relational Mapping
 *
 * Without ORM (raw SQL):
 *   const result = await sql`SELECT * FROM users WHERE id = ${id}`;
 *   // result is untyped, you have to trust the data shape
 *
 * With Drizzle ORM:
 *   const user = await db.select().from(users).where(eq(users.id, id));
 *   // user is fully typed: { id: number, name: string, email: string }[]
 *
 * Benefits:
 * - Type safety: TypeScript catches errors at compile time
 * - Autocompletion: Your editor knows all columns and their types
 * - Migrations: Track database changes in version control
 * - Portability: Same code works with different databases
 */

console.log("--- What is an ORM? ---");
console.log("ORM maps database tables to TypeScript objects");
console.log("Benefits: Type safety, autocompletion, migrations, portability");

// ============================================================
// SECTION 2: Why Drizzle Over Other ORMs?
// ============================================================

/**
 * Drizzle vs Other ORMs:
 *
 * Prisma:
 *   - Pros: Great DX, schema-first, visual studio
 *   - Cons: Heavy runtime, code generation, slower queries
 *
 * TypeORM:
 *   - Pros: Feature-rich, decorators
 *   - Cons: Complex, poor TypeScript inference, legacy patterns
 *
 * Drizzle:
 *   - Pros: Lightweight, SQL-like, best TypeScript support
 *   - Cons: Newer (smaller community), fewer features
 *
 * Drizzle philosophy: "If you know SQL, you know Drizzle"
 */

console.log("\n--- Why Drizzle? ---");
console.log("1. Lightweight: No heavy runtime");
console.log("2. Type-safe: Full TypeScript inference");
console.log("3. SQL-like: Familiar syntax for SQL users");
console.log("4. Fast: Minimal overhead, optimized queries");

// ============================================================
// SECTION 3: Installing Drizzle
// ============================================================

/**
 * Installation steps:
 *
 * 1. Install the core packages:
 *    bun add drizzle-orm postgres
 *
 * 2. Install the development toolkit:
 *    bun add -D drizzle-kit
 *
 * Package breakdown:
 * - drizzle-orm: The ORM itself (query builder, schema)
 * - postgres: PostgreSQL driver (postgres.js)
 * - drizzle-kit: CLI for migrations and schema management
 */

console.log("\n--- Installation ---");
console.log("bun add drizzle-orm postgres");
console.log("bun add -D drizzle-kit");

// ============================================================
// SECTION 4: Creating a Database Connection
// ============================================================

/**
 * Connection string format for PostgreSQL:
 * postgresql://username:password@host:port/database
 *
 * Our Docker setup:
 * postgresql://learn:learn@localhost:5432/learn_db
 */

console.log("\n--- Database Connection ---");

// Connection string (in production, use environment variables!)
const connectionString = "postgresql://learn:learn@localhost:5432/learn_db";

// Create the postgres client
const client = postgres(connectionString);

// Create the Drizzle instance
const db = drizzle(client);

console.log("Connection string: postgresql://learn:learn@localhost:5432/learn_db");
console.log("Created postgres client and Drizzle instance");

// ============================================================
// SECTION 5: Testing the Connection
// ============================================================

console.log("\n--- Testing Connection ---");

async function testConnection() {
  try {
    // Simple query to test connection
    const result = await client`SELECT NOW() as current_time`;
    console.log(`Connection successful!`);
    console.log(`Server time: ${result[0].current_time}`);

    // Get PostgreSQL version
    const version = await client`SELECT version()`;
    const versionString = String(version[0].version).split(" ").slice(0, 2).join(" ");
    console.log(`Database: ${versionString}`);

    return true;
  } catch (error) {
    console.log("Connection failed!");
    if (error instanceof Error) {
      console.log(`Error: ${error.message}`);
    }
    console.log("\nMake sure Docker is running:");
    console.log("  docker compose up -d");
    return false;
  }
}

// ============================================================
// SECTION 6: Environment Variables
// ============================================================

/**
 * NEVER hardcode credentials in production code!
 *
 * Create a .env file:
 *   DATABASE_URL=postgresql://learn:learn@localhost:5432/learn_db
 *
 * Then use it in your code:
 *   const connectionString = process.env.DATABASE_URL;
 *
 * Bun automatically loads .env files, so no need for dotenv!
 */

console.log("\n--- Environment Variables ---");
console.log("Create a .env file with DATABASE_URL");
console.log("Bun auto-loads .env files - no dotenv needed!");

const envExample = `
# .env file
DATABASE_URL=postgresql://learn:learn@localhost:5432/learn_db

# For production
DATABASE_URL=postgresql://prod_user:strong_password@db.example.com:5432/prod_db
`;
console.log(envExample);

// Example usage with env vars
function getConnectionString(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL environment variable is required");
  }
  return url;
}

console.log("Usage: const connectionString = process.env.DATABASE_URL");

// ============================================================
// SECTION 7: drizzle.config.ts Structure
// ============================================================

/**
 * drizzle.config.ts is the configuration file for drizzle-kit.
 * It tells drizzle-kit where to find your schemas and how to connect.
 */

console.log("\n--- drizzle.config.ts ---");

const configExample = `
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  // Where your schema files are located
  schema: "./src/db/schema.ts",

  // Output directory for migrations
  out: "./drizzle",

  // Database driver
  dialect: "postgresql",

  // Database connection
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },

  // Optional: Enable verbose logging
  verbose: true,

  // Optional: Strict mode for safer migrations
  strict: true,
});
`;

console.log(configExample);

// ============================================================
// SECTION 8: Project Structure
// ============================================================

/**
 * Recommended project structure for Drizzle projects:
 *
 * project/
 * ├── src/
 * │   ├── db/
 * │   │   ├── index.ts       # Database connection
 * │   │   ├── schema.ts      # Table definitions
 * │   │   └── migrations/    # Migration files
 * │   └── index.ts           # Main application
 * ├── drizzle/               # Generated migrations
 * ├── drizzle.config.ts      # Drizzle Kit config
 * └── .env                   # Environment variables
 */

console.log("\n--- Project Structure ---");
const structure = `
project/
├── src/
│   ├── db/
│   │   ├── index.ts       # Database connection
│   │   └── schema.ts      # Table definitions
│   └── index.ts           # Main application
├── drizzle/               # Generated migrations
├── drizzle.config.ts      # Drizzle Kit config
└── .env                   # Environment variables
`;
console.log(structure);

// ============================================================
// SECTION 9: Complete Setup Example
// ============================================================

console.log("\n--- Complete Setup Example ---");

const dbIndexFile = `
// src/db/index.ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Get connection string from environment
const connectionString = process.env.DATABASE_URL!;

// Create postgres connection
// For query purposes (connection pooling)
const queryClient = postgres(connectionString);

// For migrations (single connection)
export const migrationClient = postgres(connectionString, { max: 1 });

// Create drizzle instance with schema
export const db = drizzle(queryClient, { schema });

// Export for use in application
export type Database = typeof db;
`;

console.log("// src/db/index.ts");
console.log(dbIndexFile);

// ============================================================
// SECTION 10: Running the Example
// ============================================================

async function main() {
  console.log("\n--- Running Connection Test ---");

  const success = await testConnection();

  if (success) {
    // List existing tables
    const tables = await client`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;

    console.log(`\nExisting tables in database:`);
    if (tables.length === 0) {
      console.log("  (no tables yet - ready for schema!)");
    } else {
      tables.forEach((t) => console.log(`  - ${t.table_name}`));
    }
  }

  // Always close the connection
  await client.end();
  console.log("\nConnection closed.");
}

// ============================================================
// KEY TAKEAWAYS
// ============================================================

console.log("\n========================================");
console.log("KEY TAKEAWAYS");
console.log("========================================");
console.log("1. Drizzle = lightweight, type-safe TypeScript ORM");
console.log("2. Install: drizzle-orm, postgres, drizzle-kit");
console.log("3. postgres.js is the PostgreSQL driver");
console.log("4. drizzle() creates the query builder");
console.log("5. Use DATABASE_URL env var for connections");
console.log("6. drizzle.config.ts configures drizzle-kit");
console.log("7. Bun auto-loads .env files");

// Run the main function
main().then(() => {
  console.log("\nLesson 17 Complete! Run: bun lessons/backend/18-schema-definition.ts");
});

export {};
