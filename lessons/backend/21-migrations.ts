/**
 * ============================================================
 * LESSON 21: Database Migrations with Drizzle
 * ============================================================
 *
 * Migrations track and apply database schema changes over time.
 * They're like version control for your database structure.
 *
 * ANALOGY: Migrations are like a recipe book for your database:
 * - Each recipe (migration) describes one change
 * - You follow recipes in order (migration history)
 * - You can add new recipes but shouldn't modify old ones
 * - The final dish (database) is built step by step
 *
 * Why migrations matter:
 * - Team collaboration: Everyone gets the same database structure
 * - Deployment: Safely update production databases
 * - History: Track what changed and when
 * - Rollback: Undo changes if something goes wrong
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { pgTable, serial, text, integer, timestamp, varchar, boolean } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

console.log("========================================");
console.log("LESSON 21: DATABASE MIGRATIONS");
console.log("========================================\n");

// ============================================================
// SECTION 1: What Are Migrations?
// ============================================================

console.log("--- What Are Migrations? ---");

/**
 * Without migrations:
 *   - Manually run SQL to change tables
 *   - Hard to track what changed
 *   - Team members have different schemas
 *   - Risky production deployments
 *
 * With migrations:
 *   - Schema changes are versioned files
 *   - Automated, repeatable process
 *   - Every environment matches
 *   - Safe rollbacks possible
 */

console.log(`
Without Migrations:
  Developer 1: ALTER TABLE users ADD COLUMN age INTEGER;
  Developer 2: What? I don't have that column!
  Production: *breaks because schema is different*

With Migrations:
  1. Create migration file: 0001_add_user_age.sql
  2. Commit to git
  3. Everyone runs: bunx drizzle-kit migrate
  4. All databases match!
`);

// ============================================================
// SECTION 2: drizzle.config.ts Setup
// ============================================================

console.log("\n--- drizzle.config.ts Setup ---");

const configExample = `
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  // Your schema files
  schema: "./src/db/schema.ts",

  // Where migrations are stored
  out: "./drizzle",

  // Database type
  dialect: "postgresql",

  // Connection settings
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },

  // Optional settings
  verbose: true,   // Show detailed output
  strict: true,    // Warn about destructive changes
});
`;

console.log(configExample);

// ============================================================
// SECTION 3: drizzle-kit Commands
// ============================================================

console.log("\n--- drizzle-kit Commands ---");

console.log(`
Three main commands:

1. GENERATE - Create migration files from schema changes
   bunx drizzle-kit generate

   - Compares your schema.ts to existing migrations
   - Creates new .sql files for changes
   - Does NOT touch the database

2. PUSH - Apply schema directly (development)
   bunx drizzle-kit push

   - Syncs schema.ts directly to database
   - No migration files created
   - Fast for development iteration
   - NOT for production!

3. MIGRATE - Run migration files (production)
   bunx drizzle-kit migrate

   - Runs pending migration files
   - Safe, versioned changes
   - Use for production deployments
`);

// ============================================================
// SECTION 4: Migration Files Structure
// ============================================================

console.log("\n--- Migration Files Structure ---");

console.log(`
After running 'bunx drizzle-kit generate':

drizzle/
├── 0000_initial_schema.sql
├── 0001_add_user_email.sql
├── 0002_create_posts_table.sql
├── meta/
│   ├── 0000_snapshot.json
│   ├── 0001_snapshot.json
│   ├── 0002_snapshot.json
│   └── _journal.json
└── _journal.json

Migration file example (0001_add_user_email.sql):

  -- Add email column to users table
  ALTER TABLE "users" ADD COLUMN "email" varchar(255) NOT NULL;
  CREATE UNIQUE INDEX "users_email_idx" ON "users" ("email");

Snapshot files (meta/*.json):
  - Store the schema state at each migration
  - Used by drizzle-kit to detect changes
  - Don't edit these manually!

Journal file (_journal.json):
  - Tracks which migrations have run
  - Contains migration order and timestamps
`);

// ============================================================
// SECTION 5: Push vs Migrate
// ============================================================

console.log("\n--- Push vs Migrate ---");

console.log(`
PUSH (Development):
  bunx drizzle-kit push

  Pros:
    + Fast iteration
    + No migration files to manage
    + Great for prototyping

  Cons:
    - No history
    - Can lose data
    - Not reproducible

  Use when:
    - Local development
    - Prototyping new features
    - Database can be reset

MIGRATE (Production):
  bunx drizzle-kit generate  # Create migration
  bunx drizzle-kit migrate   # Apply migration

  Pros:
    + Version controlled
    + Safe, incremental changes
    + Reproducible across environments
    + Audit trail

  Cons:
    - More steps
    - Need to manage migration files

  Use when:
    - Staging/production deployments
    - Team collaboration
    - Data must be preserved

Workflow:
  Development: Use 'push' for fast iteration
  Before PR:   Generate migration files
  Production:  Run migrations during deploy
`);

// ============================================================
// SECTION 6: Generating Migrations
// ============================================================

console.log("\n--- Generating Migrations ---");

console.log(`
Workflow for schema changes:

1. Modify your schema file:

   // Before
   const users = pgTable("users", {
     id: serial("id").primaryKey(),
     name: text("name"),
   });

   // After (added email column)
   const users = pgTable("users", {
     id: serial("id").primaryKey(),
     name: text("name"),
     email: text("email").notNull(),  // NEW!
   });

2. Generate migration:

   bunx drizzle-kit generate

   Output:
   [✓] Generated migration: 0003_add_user_email.sql

3. Review the generated SQL:

   -- 0003_add_user_email.sql
   ALTER TABLE "users" ADD COLUMN "email" text NOT NULL;

4. Apply to database:

   bunx drizzle-kit migrate

   Output:
   [✓] Running migration: 0003_add_user_email.sql
   [✓] Migration complete
`);

// ============================================================
// SECTION 7: Handling Schema Changes Safely
// ============================================================

console.log("\n--- Handling Schema Changes Safely ---");

console.log(`
Safe Changes (usually fine):
  ✓ Add new table
  ✓ Add nullable column
  ✓ Add column with default value
  ✓ Add index
  ✓ Rename with proper migration

Dangerous Changes (need care):
  ⚠ Add NOT NULL column (existing rows fail!)
  ⚠ Remove column (data loss!)
  ⚠ Change column type (conversion issues)
  ⚠ Drop table (data loss!)

Solutions for dangerous changes:

1. Adding NOT NULL column:

   -- Step 1: Add nullable
   ALTER TABLE users ADD COLUMN email text;

   -- Step 2: Backfill data
   UPDATE users SET email = 'unknown@example.com' WHERE email IS NULL;

   -- Step 3: Add constraint
   ALTER TABLE users ALTER COLUMN email SET NOT NULL;

2. Removing column safely:

   -- Step 1: Stop using in code
   -- Step 2: Deploy code change
   -- Step 3: Wait for old code to stop running
   -- Step 4: Drop column
   ALTER TABLE users DROP COLUMN old_column;

3. Renaming column:

   -- Use Drizzle's rename tracking or:
   ALTER TABLE users RENAME COLUMN old_name TO new_name;
`);

// ============================================================
// SECTION 8: Running Migrations Programmatically
// ============================================================

console.log("\n--- Running Migrations Programmatically ---");

const programmaticExample = `
// src/db/migrate.ts
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

async function runMigrations() {
  // Use a dedicated connection for migrations
  const migrationClient = postgres(process.env.DATABASE_URL!, {
    max: 1,  // Single connection
  });

  const db = drizzle(migrationClient);

  console.log("Running migrations...");

  await migrate(db, {
    migrationsFolder: "./drizzle",
  });

  console.log("Migrations complete!");

  await migrationClient.end();
}

runMigrations().catch(console.error);
`;

console.log(programmaticExample);

console.log(`
Run at application startup:

// src/index.ts
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db, migrationClient } from "./db";

async function main() {
  // Run migrations before starting server
  await migrate(db, { migrationsFolder: "./drizzle" });

  // Start your application
  console.log("Server starting...");
}
`);

// ============================================================
// SECTION 9: Best Practices
// ============================================================

console.log("\n--- Best Practices ---");

console.log(`
1. COMMIT MIGRATIONS TO GIT
   - Migration files are source code
   - Everyone needs the same migrations
   - Include in code review

2. NEVER EDIT EXISTING MIGRATIONS
   - Once applied, migrations are immutable
   - Create new migrations for fixes
   - Exception: pre-production only

3. TEST MIGRATIONS
   - Run on a copy of production data
   - Check for data loss
   - Verify rollback works

4. SMALL, FOCUSED MIGRATIONS
   - One logical change per migration
   - Easier to review and debug
   - Simpler rollbacks

5. USE TRANSACTIONS
   - Most migrations run in transactions
   - Failure rolls back the entire migration
   - Some operations can't be in transactions

6. BACKUP BEFORE PRODUCTION MIGRATIONS
   - Always have a way back
   - Test restore procedures
   - Document rollback steps

7. MIGRATION NAMING
   - Descriptive names help understanding
   - 0001_create_users_table.sql
   - 0002_add_email_to_users.sql

8. ENVIRONMENT PARITY
   - Dev, staging, prod should match
   - Use same migration process everywhere
   - Test migrations in staging first
`);

// ============================================================
// SECTION 10: Complete Migration Workflow
// ============================================================

console.log("\n--- Complete Migration Workflow ---");

console.log(`
Full development to production workflow:

1. LOCAL DEVELOPMENT
   # Make schema changes
   vim src/db/schema.ts

   # Quick iteration with push
   bunx drizzle-kit push

   # Test your changes
   bun test

2. BEFORE PR
   # Generate migration file
   bunx drizzle-kit generate

   # Review generated SQL
   cat drizzle/0003_my_change.sql

   # Test migration
   bunx drizzle-kit migrate

   # Commit everything
   git add .
   git commit -m "feat: add email to users"

3. CODE REVIEW
   - Review schema changes
   - Review migration SQL
   - Check for data safety

4. STAGING DEPLOYMENT
   # Deploy code
   git push staging

   # Migrations run automatically or:
   bunx drizzle-kit migrate

   # Test thoroughly!

5. PRODUCTION DEPLOYMENT
   # Backup database first!
   pg_dump -h prod-db > backup.sql

   # Deploy code
   git push production

   # Run migrations
   bunx drizzle-kit migrate

   # Verify application works
   curl https://api.example.com/health
`);

// ============================================================
// SECTION 11: Troubleshooting
// ============================================================

console.log("\n--- Troubleshooting ---");

console.log(`
Common Issues:

1. "Migration failed: column already exists"
   - Migration was partially applied
   - Solution: Check database state, fix manually

2. "Cannot add NOT NULL column"
   - Existing rows have no value
   - Solution: Add with default, or make nullable

3. "Foreign key constraint violation"
   - Data exists that violates new constraint
   - Solution: Clean data first, then add constraint

4. "Migration checksum mismatch"
   - Migration file was edited after running
   - Solution: Never edit applied migrations!

5. "Out of sync with database"
   - Schema and migrations don't match database
   - Solution: Use 'drizzle-kit introspect' to check

Useful commands:

  # See current database state
  bunx drizzle-kit introspect

  # Check migration status
  bunx drizzle-kit status

  # Generate SQL without applying (dry run)
  bunx drizzle-kit generate --dry-run
`);

// ============================================================
// SECTION 12: Example Schema Evolution
// ============================================================

console.log("\n--- Example Schema Evolution ---");

// Show how a schema might evolve over time
const usersV1 = pgTable("evolution_users", {
  id: serial("id").primaryKey(),
  name: text("name"),
});

// After migration 0001
const usersV2 = pgTable("evolution_users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 255 }),
});

// After migration 0002
const usersV3 = pgTable("evolution_users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// After migration 0003
const usersFinal = pgTable("evolution_users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  isActive: boolean("is_active").notNull().default(true),
  role: text("role").notNull().default("user"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

console.log(`
Schema evolution example:

V1 (0000_initial):
  users: id, name

V2 (0001_add_email):
  users: id, name (NOT NULL), email

V3 (0002_email_unique):
  users: id, name, email (NOT NULL, UNIQUE), created_at

V4 (0003_add_status):
  users: id, name, email, is_active, role, created_at, updated_at

Each change is a separate migration file!
`);

// ============================================================
// Running a Demo
// ============================================================

async function main() {
  console.log("\n--- Demo: Checking Migration Status ---");

  const connectionString = "postgresql://learn:learn@localhost:5432/learn_db";

  try {
    const client = postgres(connectionString);

    // Check if drizzle migration table exists
    const migrationTable = await client`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = '__drizzle_migrations'
      )
    `;

    const hasMigrations = migrationTable[0].exists;
    console.log(`Migration tracking table exists: ${hasMigrations}`);

    if (hasMigrations) {
      const migrations = await client`
        SELECT id, hash, created_at
        FROM __drizzle_migrations
        ORDER BY created_at DESC
        LIMIT 5
      `;

      if (migrations.length > 0) {
        console.log("\nRecent migrations:");
        migrations.forEach((m) => {
          console.log(`  - ${m.hash} (${m.created_at})`);
        });
      }
    } else {
      console.log("\nNo migrations have been run yet.");
      console.log("Run 'bunx drizzle-kit migrate' to apply migrations.");
    }

    // Show current tables
    const tables = await client`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;

    console.log("\nCurrent tables:");
    tables.forEach((t) => console.log(`  - ${t.table_name}`));

    await client.end();
  } catch (error) {
    console.log("Connection failed - make sure Docker is running");
    if (error instanceof Error) {
      console.log(`Error: ${error.message}`);
    }
  }
}

// ============================================================
// KEY TAKEAWAYS
// ============================================================

console.log("\n========================================");
console.log("KEY TAKEAWAYS");
console.log("========================================");
console.log("1. Migrations = version control for database schema");
console.log("2. drizzle-kit generate: Create migration from schema");
console.log("3. drizzle-kit push: Direct sync (development)");
console.log("4. drizzle-kit migrate: Run migrations (production)");
console.log("5. Never edit existing migrations");
console.log("6. Commit migrations to git");
console.log("7. Test migrations on staging before production");
console.log("8. Always backup before production migrations");

main().then(() => {
  console.log("\nLesson 21 Complete!");
  console.log("You've finished the Drizzle ORM series!");
  console.log("\nNext: Try building a full application with Drizzle!");
});

export {};
