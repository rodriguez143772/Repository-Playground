/**
 * ============================================================
 * LESSON 18: Schema Definition with Drizzle
 * ============================================================
 *
 * Schemas in Drizzle define the structure of your database tables.
 * They're TypeScript code that generates SQL table definitions.
 *
 * ANALOGY: Schemas are like blueprints for a house:
 * - They define rooms (tables) and their features (columns)
 * - They specify what goes where (data types)
 * - They set rules (constraints like NOT NULL, unique)
 * - The house (database) is built from these blueprints
 *
 * Why define schemas in code?
 * - Type safety: TypeScript knows your database structure
 * - Version control: Track changes alongside application code
 * - Single source of truth: Schema = TypeScript types
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
  uuid,
  index,
  uniqueIndex,
  primaryKey,
  numeric,
  json,
  jsonb,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

console.log("========================================");
console.log("LESSON 18: SCHEMA DEFINITION");
console.log("========================================\n");

// ============================================================
// SECTION 1: Defining a Basic Table
// ============================================================

/**
 * Tables are defined with pgTable() for PostgreSQL.
 * Each column has a type and optional modifiers.
 */

console.log("--- Basic Table Definition ---");

// A simple users table
const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

console.log("pgTable('users', { ... })");
console.log("- serial: Auto-incrementing integer");
console.log("- text: Variable-length string");
console.log("- varchar: String with max length");
console.log("- timestamp: Date and time");

// ============================================================
// SECTION 2: Column Types
// ============================================================

/**
 * Drizzle supports all PostgreSQL column types.
 * Here are the most commonly used ones.
 */

console.log("\n--- Column Types ---");

// Demonstration table with various column types
const columnDemo = pgTable("column_demo", {
  // Numeric types
  id: serial("id").primaryKey(), // Auto-increment integer
  count: integer("count"), // Regular integer
  price: numeric("price", { precision: 10, scale: 2 }), // Decimal

  // String types
  name: text("name"), // Unlimited text
  code: varchar("code", { length: 50 }), // Limited string
  shortCode: varchar("short_code", { length: 10 }),

  // Boolean
  isActive: boolean("is_active").default(true),

  // Date/Time types
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at"),
  scheduledFor: timestamp("scheduled_for", { withTimezone: true }),

  // UUID
  uniqueId: uuid("unique_id").defaultRandom(),

  // JSON types
  metadata: json("metadata"), // JSON (stored as text)
  settings: jsonb("settings"), // JSONB (binary, indexable)
});

console.log(`
Numeric:
  serial("id")                     - Auto-increment
  integer("count")                 - Integer
  numeric("price", {precision, scale}) - Decimal

Strings:
  text("name")                     - Unlimited text
  varchar("code", {length: 50})    - Limited string

Boolean:
  boolean("is_active")             - true/false

Date/Time:
  timestamp("created_at")          - Date and time
  timestamp("t", {withTimezone})   - With timezone

UUID:
  uuid("unique_id")                - UUID v4

JSON:
  json("metadata")                 - JSON as text
  jsonb("settings")                - Binary JSON
`);

// ============================================================
// SECTION 3: Primary Keys
// ============================================================

/**
 * Primary keys uniquely identify each row.
 * Options: serial (auto-increment) or uuid.
 */

console.log("\n--- Primary Keys ---");

// Serial primary key (most common)
const productsSerial = pgTable("products_serial", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
});

// UUID primary key (distributed systems)
const productsUuid = pgTable("products_uuid", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

// Composite primary key (junction tables)
const userRoles = pgTable(
  "user_roles",
  {
    userId: integer("user_id").notNull(),
    roleId: integer("role_id").notNull(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.roleId] })]
);

console.log(`
Serial (auto-increment):
  id: serial("id").primaryKey()
  - Simple, readable IDs: 1, 2, 3...
  - Best for: Single database, internal IDs

UUID (universally unique):
  id: uuid("id").defaultRandom().primaryKey()
  - 128-bit random: 550e8400-e29b-41d4-a716...
  - Best for: Distributed systems, public IDs

Composite (multiple columns):
  primaryKey({ columns: [userId, roleId] })
  - Best for: Junction/join tables
`);

// ============================================================
// SECTION 4: Default Values
// ============================================================

/**
 * Default values are used when no value is provided.
 */

console.log("\n--- Default Values ---");

const postsWithDefaults = pgTable("posts_with_defaults", {
  id: serial("id").primaryKey(),

  // Static default
  status: text("status").default("draft"),
  viewCount: integer("view_count").default(0),
  isPublished: boolean("is_published").default(false),

  // Dynamic defaults
  createdAt: timestamp("created_at").defaultNow(), // Current timestamp
  uniqueId: uuid("unique_id").defaultRandom(), // Random UUID

  // SQL expression default
  slug: text("slug").default(sql`gen_random_uuid()`),
});

console.log(`
Static defaults:
  .default("draft")              - String value
  .default(0)                    - Number value
  .default(false)                - Boolean value

Dynamic defaults:
  .defaultNow()                  - Current timestamp
  .defaultRandom()               - Random UUID

SQL expression:
  .default(sql\`gen_random_uuid()\`)  - Any SQL
`);

// ============================================================
// SECTION 5: NOT NULL Constraints
// ============================================================

/**
 * NOT NULL ensures a column must have a value.
 * By default, columns are nullable in PostgreSQL.
 */

console.log("\n--- NOT NULL Constraints ---");

const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),

  // Required fields (NOT NULL)
  userId: integer("user_id").notNull(),
  username: text("username").notNull(),

  // Optional fields (nullable)
  bio: text("bio"), // Can be NULL
  avatarUrl: text("avatar_url"), // Can be NULL

  // Required with default (NOT NULL + DEFAULT)
  theme: text("theme").notNull().default("light"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

console.log(`
Required (NOT NULL):
  userId: integer("user_id").notNull()
  - Database rejects NULL values
  - Must provide value on insert

Optional (nullable):
  bio: text("bio")
  - NULL is allowed
  - Field can be omitted

Required with default:
  theme: text("theme").notNull().default("light")
  - NOT NULL but has default
  - Can omit on insert, gets default
`);

// ============================================================
// SECTION 6: Unique Constraints
// ============================================================

/**
 * UNIQUE ensures no duplicate values in a column.
 */

console.log("\n--- Unique Constraints ---");

const accounts = pgTable("accounts", {
  id: serial("id").primaryKey(),

  // Column-level unique
  email: text("email").notNull().unique(),
  username: text("username").notNull().unique(),

  // Non-unique columns
  displayName: text("display_name"),
});

// Table with unique index
const memberships = pgTable(
  "memberships",
  {
    id: serial("id").primaryKey(),
    orgId: integer("org_id").notNull(),
    userId: integer("user_id").notNull(),
    role: text("role").notNull(),
  },
  (table) => [
    // Composite unique constraint
    uniqueIndex("unique_org_user").on(table.orgId, table.userId),
  ]
);

console.log(`
Column-level unique:
  email: text("email").unique()
  - No duplicate emails allowed

Composite unique (table level):
  uniqueIndex("name").on(col1, col2)
  - Combination must be unique
  - Example: User can only be in org once
`);

// ============================================================
// SECTION 7: Creating Indexes
// ============================================================

/**
 * Indexes speed up queries on frequently searched columns.
 */

console.log("\n--- Creating Indexes ---");

const articles = pgTable(
  "articles",
  {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    authorId: integer("author_id").notNull(),
    status: text("status").notNull().default("draft"),
    publishedAt: timestamp("published_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    // Single column index
    index("idx_articles_author").on(table.authorId),

    // Composite index (order matters!)
    index("idx_articles_status_published").on(table.status, table.publishedAt),

    // Unique index
    uniqueIndex("idx_articles_title_unique").on(table.title),
  ]
);

console.log(`
Single column index:
  index("name").on(table.column)
  - Speeds up: WHERE column = value

Composite index:
  index("name").on(col1, col2)
  - Speeds up: WHERE col1 = x AND col2 = y
  - Column order matters!

Unique index:
  uniqueIndex("name").on(table.column)
  - Index + unique constraint
`);

// ============================================================
// SECTION 8: Export Pattern for Schemas
// ============================================================

/**
 * Organize schemas in a central file for easy imports.
 */

console.log("\n--- Schema Export Pattern ---");

const schemaFileExample = `
// src/db/schema.ts
import { pgTable, serial, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Posts table
export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content"),
  authorId: integer("author_id").notNull(),
  published: boolean("published").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Export all tables for Drizzle
export const schema = { users, posts };
`;

console.log(schemaFileExample);

// ============================================================
// SECTION 9: Type Inference from Schema
// ============================================================

/**
 * Drizzle automatically infers TypeScript types from schemas!
 * Use $inferSelect for query results and $inferInsert for inserts.
 */

console.log("\n--- Type Inference ---");

// Infer types from schema
type User = typeof users.$inferSelect; // What you get from SELECT
type NewUser = typeof users.$inferInsert; // What you need for INSERT

console.log(`
Type inference from schema:

type User = typeof users.$inferSelect
// {
//   id: number;
//   name: string;
//   email: string;
//   createdAt: Date;
// }

type NewUser = typeof users.$inferInsert
// {
//   id?: number;        // Optional (auto-increment)
//   name: string;       // Required
//   email: string;      // Required
//   createdAt?: Date;   // Optional (has default)
// }
`);

// ============================================================
// SECTION 10: Complete Schema Example
// ============================================================

console.log("\n--- Complete Schema Example ---");

// A complete e-commerce schema example
const customers = pgTable(
  "customers",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: text("email").notNull().unique(),
    name: text("name").notNull(),
    phone: varchar("phone", { length: 20 }),
    isActive: boolean("is_active").notNull().default(true),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => [index("idx_customers_email").on(table.email)]
);

const orders = pgTable(
  "orders",
  {
    id: serial("id").primaryKey(),
    customerId: uuid("customer_id").notNull(),
    status: text("status").notNull().default("pending"),
    total: numeric("total", { precision: 10, scale: 2 }).notNull(),
    notes: text("notes"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (table) => [
    index("idx_orders_customer").on(table.customerId),
    index("idx_orders_status").on(table.status),
  ]
);

const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").notNull(),
  productName: text("product_name").notNull(),
  quantity: integer("quantity").notNull().default(1),
  unitPrice: numeric("unit_price", { precision: 10, scale: 2 }).notNull(),
});

// Type exports
type Customer = typeof customers.$inferSelect;
type NewCustomer = typeof customers.$inferInsert;
type Order = typeof orders.$inferSelect;
type NewOrder = typeof orders.$inferInsert;

console.log("E-commerce schema with:");
console.log("- customers: UUID PK, email unique, jsonb metadata");
console.log("- orders: serial PK, foreign key to customer, status index");
console.log("- order_items: serial PK, belongs to order");

// ============================================================
// SECTION 11: Testing Schema
// ============================================================

async function main() {
  console.log("\n--- Testing Schema Creation ---");

  const connectionString = "postgresql://learn:learn@localhost:5432/learn_db";

  try {
    const client = postgres(connectionString);
    const db = drizzle(client);

    // Test query (won't create tables, just validates connection)
    const result = await client`SELECT NOW()`;
    console.log("Database connection successful!");
    console.log("Schema is ready to be pushed with drizzle-kit");

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
console.log("1. pgTable() defines PostgreSQL tables");
console.log("2. Column types: serial, text, varchar, integer, boolean, timestamp, uuid");
console.log("3. .notNull() makes columns required");
console.log("4. .default() and .defaultNow() set defaults");
console.log("5. .unique() prevents duplicates");
console.log("6. index() and uniqueIndex() for performance");
console.log("7. $inferSelect and $inferInsert for TypeScript types");
console.log("8. Export schemas from a central schema.ts file");

main().then(() => {
  console.log("\nLesson 18 Complete! Run: bun lessons/backend/19-crud-operations.ts");
});

export {};
