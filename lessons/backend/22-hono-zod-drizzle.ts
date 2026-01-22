/**
 * ============================================================
 * LESSON 22: Full Stack Integration - Hono + Zod + Drizzle
 * ============================================================
 *
 * This capstone lesson brings together everything you've learned:
 * - Hono for routing and middleware
 * - Zod for request/response validation
 * - Drizzle for database operations
 *
 * ANALOGY: Building a restaurant operation:
 * - Hono = The front-of-house (takes orders, serves food)
 * - Zod = The quality control (checks orders are valid)
 * - Drizzle = The kitchen (actually prepares the food)
 * - drizzle-zod = Recipe cards (auto-generated from ingredients list)
 *
 * This lesson covers:
 * - Project structure for real APIs
 * - Using drizzle-zod to generate schemas
 * - Request validation -> Database -> Response pattern
 * - Error handling across the stack
 * - Transaction examples
 * - Full User CRUD API example
 *
 * Install: bun add hono zod drizzle-orm drizzle-zod postgres
 */

import { Hono } from "hono";
import { z } from "zod";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  boolean,
  integer,
} from "drizzle-orm/pg-core";
import { eq, and, desc, sql } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

console.log("========================================");
console.log("LESSON 22: FULL STACK INTEGRATION");
console.log("========================================\n");

// ============================================================
// SECTION 1: Project Structure Overview
// ============================================================

console.log("--- Project Structure for Real APIs ---");

const projectStructure = `
Recommended structure for a production API:

my-api/
├── src/
│   ├── index.ts              # Application entry point
│   ├── routes/
│   │   ├── index.ts          # Route aggregator
│   │   ├── users.ts          # User routes
│   │   ├── posts.ts          # Post routes
│   │   └── auth.ts           # Auth routes
│   ├── db/
│   │   ├── index.ts          # Database connection
│   │   ├── schema.ts         # All table definitions
│   │   └── migrate.ts        # Migration runner
│   ├── validators/
│   │   ├── users.ts          # User validation schemas
│   │   └── posts.ts          # Post validation schemas
│   ├── middleware/
│   │   ├── auth.ts           # Authentication middleware
│   │   ├── validate.ts       # Validation middleware
│   │   └── error.ts          # Error handling middleware
│   └── utils/
│       ├── errors.ts         # Custom error classes
│       └── response.ts       # Response helpers
├── drizzle/                  # Generated migrations
├── drizzle.config.ts         # Drizzle Kit config
├── .env                      # Environment variables
└── package.json
`;

console.log(projectStructure);

// ============================================================
// SECTION 2: Database Schema Definition
// ============================================================

console.log("--- Database Schema (src/db/schema.ts) ---");

/**
 * Define your database tables with Drizzle.
 * These become the source of truth for both DB and validation.
 */

// Users table
const users = pgTable("integration_users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  username: varchar("username", { length: 50 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  displayName: varchar("display_name", { length: 100 }),
  bio: text("bio"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Posts table (for relations example)
const posts = pgTable("integration_posts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  published: boolean("published").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

console.log("Tables defined: users, posts");
console.log("Note: Real project would export these from src/db/schema.ts");

// ============================================================
// SECTION 3: drizzle-zod Integration
// ============================================================

console.log("\n--- drizzle-zod: Auto-Generated Schemas ---");

/**
 * drizzle-zod generates Zod schemas from your Drizzle tables.
 * This eliminates the need to maintain separate validation schemas!
 *
 * Install: bun add drizzle-zod
 */

// Auto-generate schemas from Drizzle table definitions
const insertUserSchema = createInsertSchema(users);
const selectUserSchema = createSelectSchema(users);

// Customize the generated schemas for specific use cases
const createUserSchema = createInsertSchema(users, {
  // Override specific fields with custom validation
  email: z.string().email("Invalid email format"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must be at most 50 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  passwordHash: z.string().min(8, "Password must be at least 8 characters"),
  displayName: z.string().min(1).max(100).optional(),
  bio: z.string().max(500, "Bio must be at most 500 characters").optional(),
}).omit({
  // Remove auto-generated fields
  id: true,
  createdAt: true,
  updatedAt: true,
  isActive: true,
});

// Schema for updating users (all fields optional)
const updateUserSchema = createUserSchema.partial().omit({
  passwordHash: true, // Don't allow password updates through this schema
});

// Schema for user response (exclude sensitive data)
const userResponseSchema = selectUserSchema.omit({
  passwordHash: true,
});

console.log(`
drizzle-zod functions:
- createInsertSchema(table) -> Schema for INSERT operations
- createSelectSchema(table) -> Schema matching SELECT results

Customization:
- Pass overrides as second argument
- Use .omit() to exclude fields
- Use .partial() for update operations
`);

// Type inference from schemas
type CreateUser = z.infer<typeof createUserSchema>;
type UpdateUser = z.infer<typeof updateUserSchema>;
type UserResponse = z.infer<typeof userResponseSchema>;

console.log("Types inferred: CreateUser, UpdateUser, UserResponse");

// ============================================================
// SECTION 4: Custom Error Classes
// ============================================================

console.log("\n--- Error Classes (src/utils/errors.ts) ---");

/**
 * Custom error classes for different error types.
 * This creates a consistent error handling pattern.
 */

class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

class ValidationError extends ApiError {
  constructor(
    message: string,
    public details: z.ZodIssue[]
  ) {
    super(422, message, "VALIDATION_ERROR");
  }
}

class NotFoundError extends ApiError {
  constructor(resource: string, id?: string | number) {
    super(
      404,
      id ? `${resource} with ID ${id} not found` : `${resource} not found`,
      "NOT_FOUND"
    );
  }
}

class ConflictError extends ApiError {
  constructor(message: string) {
    super(409, message, "CONFLICT");
  }
}

class DatabaseError extends ApiError {
  constructor(message: string) {
    super(500, message, "DATABASE_ERROR");
  }
}

console.log("Error classes: ApiError, ValidationError, NotFoundError, ConflictError, DatabaseError");

// ============================================================
// SECTION 5: Validation Middleware
// ============================================================

console.log("\n--- Validation Middleware (src/middleware/validate.ts) ---");

/**
 * Create reusable validation middleware using Zod schemas.
 */

import type { Context, Next, MiddlewareHandler } from "hono";

// Validation middleware factory
function validate<T extends z.ZodType>(
  schema: T,
  target: "json" | "query" | "param" = "json"
): MiddlewareHandler {
  return async (c: Context, next: Next) => {
    let data: unknown;

    switch (target) {
      case "json":
        data = await c.req.json().catch(() => ({}));
        break;
      case "query":
        data = c.req.query();
        break;
      case "param":
        data = c.req.param();
        break;
    }

    const result = schema.safeParse(data);

    if (!result.success) {
      throw new ValidationError("Validation failed", result.error.issues);
    }

    // Store validated data in context for handler to use
    c.set("validated", result.data);
    await next();
  };
}

console.log(`
Validation middleware:
- validate(schema, 'json')  -> Validate request body
- validate(schema, 'query') -> Validate query parameters
- validate(schema, 'param') -> Validate URL parameters

Usage:
  app.post('/users', validate(createUserSchema), handler);

In handler:
  const data = c.get('validated');
`);

// ============================================================
// SECTION 6: Database Connection Setup
// ============================================================

console.log("\n--- Database Connection (src/db/index.ts) ---");

// Connection string for Docker PostgreSQL
const connectionString = "postgresql://learn:learn@localhost:5432/learn_db";

// Create postgres client
const queryClient = postgres(connectionString);

// Create Drizzle instance with schema
const db = drizzle(queryClient, {
  schema: { users, posts },
});

console.log("Database connected with Drizzle ORM");

// ============================================================
// SECTION 7: Building the API
// ============================================================

console.log("\n--- Building the User API ---");

const app = new Hono();

// ----------------------
// Global Error Handler
// ----------------------

app.onError((err, c) => {
  console.error(`[ERROR] ${c.req.method} ${c.req.path}:`, err.message);

  // Handle Zod validation errors
  if (err instanceof ValidationError) {
    return c.json(
      {
        success: false,
        error: {
          message: err.message,
          code: err.code,
          details: err.details.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
      },
      err.statusCode
    );
  }

  // Handle known API errors
  if (err instanceof ApiError) {
    return c.json(
      {
        success: false,
        error: {
          message: err.message,
          code: err.code,
        },
      },
      err.statusCode as 400
    );
  }

  // Handle database errors
  if (err.message?.includes("duplicate key") || err.message?.includes("unique constraint")) {
    return c.json(
      {
        success: false,
        error: {
          message: "A record with this value already exists",
          code: "CONFLICT",
        },
      },
      409
    );
  }

  // Unknown errors
  return c.json(
    {
      success: false,
      error: {
        message: "Internal server error",
        code: "INTERNAL_ERROR",
      },
    },
    500
  );
});

// ----------------------
// Query Parameter Schema
// ----------------------

const listUsersQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  active: z.enum(["true", "false"]).optional(),
});

// ----------------------
// API Routes
// ----------------------

// GET /users - List all users
app.get("/users", async (c) => {
  // Parse and validate query parameters
  const query = listUsersQuerySchema.safeParse(c.req.query());
  if (!query.success) {
    throw new ValidationError("Invalid query parameters", query.error.issues);
  }

  const { page, limit, active } = query.data;
  const offset = (page - 1) * limit;

  try {
    // Build query with optional filter
    let whereClause = undefined;
    if (active !== undefined) {
      whereClause = eq(users.isActive, active === "true");
    }

    const userList = await db
      .select({
        id: users.id,
        email: users.email,
        username: users.username,
        displayName: users.displayName,
        isActive: users.isActive,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(whereClause)
      .limit(limit)
      .offset(offset)
      .orderBy(desc(users.createdAt));

    // Get total count for pagination
    const countResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(users)
      .where(whereClause);

    const total = Number(countResult[0]?.count ?? 0);

    return c.json({
      success: true,
      data: userList,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    throw new DatabaseError("Failed to fetch users");
  }
});

// GET /users/:id - Get single user
app.get("/users/:id", async (c) => {
  const id = parseInt(c.req.param("id"));

  if (isNaN(id)) {
    throw new ValidationError("Invalid ID", [
      { path: ["id"], message: "ID must be a number", code: "invalid_type", expected: "number", received: "nan" },
    ]);
  }

  try {
    const user = await db
      .select({
        id: users.id,
        email: users.email,
        username: users.username,
        displayName: users.displayName,
        bio: users.bio,
        isActive: users.isActive,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    if (user.length === 0) {
      throw new NotFoundError("User", id);
    }

    return c.json({
      success: true,
      data: user[0],
    });
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new DatabaseError("Failed to fetch user");
  }
});

// POST /users - Create user
app.post("/users", async (c) => {
  // Parse and validate request body
  const body = await c.req.json().catch(() => ({}));
  const result = createUserSchema.safeParse(body);

  if (!result.success) {
    throw new ValidationError("Validation failed", result.error.issues);
  }

  const data = result.data;

  try {
    // Hash password (in real app, use bcrypt or argon2)
    const passwordHash = `hashed_${data.passwordHash}`;

    const newUser = await db
      .insert(users)
      .values({
        email: data.email,
        username: data.username,
        passwordHash,
        displayName: data.displayName ?? null,
        bio: data.bio ?? null,
      })
      .returning({
        id: users.id,
        email: users.email,
        username: users.username,
        displayName: users.displayName,
        isActive: users.isActive,
        createdAt: users.createdAt,
      });

    return c.json(
      {
        success: true,
        data: newUser[0],
      },
      201
    );
  } catch (error) {
    // Re-throw to let error handler deal with duplicate key errors
    throw error;
  }
});

// PATCH /users/:id - Update user
app.patch("/users/:id", async (c) => {
  const id = parseInt(c.req.param("id"));

  if (isNaN(id)) {
    throw new ValidationError("Invalid ID", [
      { path: ["id"], message: "ID must be a number", code: "invalid_type", expected: "number", received: "nan" },
    ]);
  }

  // Parse and validate request body
  const body = await c.req.json().catch(() => ({}));
  const result = updateUserSchema.safeParse(body);

  if (!result.success) {
    throw new ValidationError("Validation failed", result.error.issues);
  }

  const data = result.data;

  // Check if there's anything to update
  if (Object.keys(data).length === 0) {
    throw new ValidationError("No fields to update", [
      { path: [], message: "At least one field must be provided", code: "custom" },
    ]);
  }

  try {
    // Check if user exists
    const existing = await db.select({ id: users.id }).from(users).where(eq(users.id, id)).limit(1);

    if (existing.length === 0) {
      throw new NotFoundError("User", id);
    }

    // Update user
    const updated = await db
      .update(users)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning({
        id: users.id,
        email: users.email,
        username: users.username,
        displayName: users.displayName,
        bio: users.bio,
        isActive: users.isActive,
        updatedAt: users.updatedAt,
      });

    return c.json({
      success: true,
      data: updated[0],
    });
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw error; // Re-throw for duplicate key handling
  }
});

// DELETE /users/:id - Delete user
app.delete("/users/:id", async (c) => {
  const id = parseInt(c.req.param("id"));

  if (isNaN(id)) {
    throw new ValidationError("Invalid ID", [
      { path: ["id"], message: "ID must be a number", code: "invalid_type", expected: "number", received: "nan" },
    ]);
  }

  try {
    const deleted = await db.delete(users).where(eq(users.id, id)).returning({ id: users.id });

    if (deleted.length === 0) {
      throw new NotFoundError("User", id);
    }

    return c.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new DatabaseError("Failed to delete user");
  }
});

console.log("Routes created: GET/POST /users, GET/PATCH/DELETE /users/:id");

// ============================================================
// SECTION 8: Transaction Examples
// ============================================================

console.log("\n--- Database Transactions ---");

/**
 * Transactions ensure multiple operations succeed or fail together.
 * Essential for maintaining data integrity.
 */

// Example: Create user with initial post (atomic operation)
async function createUserWithPost(
  userData: CreateUser,
  postData: { title: string; content: string }
) {
  // Use transaction to ensure both user and post are created
  return await db.transaction(async (tx) => {
    // Create user
    const newUser = await tx
      .insert(users)
      .values({
        ...userData,
        passwordHash: `hashed_${userData.passwordHash}`,
      })
      .returning();

    // Create post for the new user
    const newPost = await tx
      .insert(posts)
      .values({
        userId: newUser[0].id,
        title: postData.title,
        content: postData.content,
      })
      .returning();

    return {
      user: newUser[0],
      post: newPost[0],
    };
  });
}

// Example: Transfer "credits" between users (if you had a credits column)
async function safeOperation(fromUserId: number, toUserId: number) {
  return await db.transaction(async (tx) => {
    // Verify both users exist
    const fromUser = await tx.select().from(users).where(eq(users.id, fromUserId));
    const toUser = await tx.select().from(users).where(eq(users.id, toUserId));

    if (fromUser.length === 0 || toUser.length === 0) {
      throw new NotFoundError("User");
    }

    // Perform operations...
    // If any operation fails, all changes are rolled back

    return { success: true };
  });
}

const transactionExample = `
Transaction usage:

// Simple transaction
await db.transaction(async (tx) => {
  await tx.insert(users).values({ ... });
  await tx.insert(posts).values({ ... });
  // If any fails, both are rolled back
});

// Transaction with error handling
try {
  await db.transaction(async (tx) => {
    const user = await tx.insert(users).values({ ... }).returning();

    if (someCondition) {
      throw new Error('Rollback!');
    }

    await tx.insert(posts).values({ userId: user[0].id, ... });
  });
} catch (error) {
  // Transaction was rolled back
  console.error('Transaction failed:', error);
}
`;

console.log(transactionExample);

// ============================================================
// SECTION 9: Testing the API
// ============================================================

console.log("\n--- Testing the API ---");

async function runTests() {
  console.log("Testing User CRUD API:\n");

  // First, set up the table
  try {
    await queryClient`
      CREATE TABLE IF NOT EXISTS integration_users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        username VARCHAR(50) NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        display_name VARCHAR(100),
        bio TEXT,
        is_active BOOLEAN NOT NULL DEFAULT true,
        created_at TIMESTAMP NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;
    console.log("Table created/verified");
  } catch (error) {
    console.log("Table setup (may already exist)");
  }

  // Clean up any existing test data
  await queryClient`DELETE FROM integration_users WHERE email LIKE '%@test.com'`;

  // Test 1: Create user (valid)
  console.log("\n1. POST /users (valid):");
  const createRes = await app.request("/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "john@test.com",
      username: "johndoe",
      passwordHash: "SecurePass123",
      displayName: "John Doe",
    }),
  });
  const createData = await createRes.json();
  console.log(`   Status: ${createRes.status}`);
  console.log(`   Response: ${JSON.stringify(createData, null, 2).split("\n").join("\n   ")}`);
  const userId = createData.data?.id;

  // Test 2: Create user (validation error)
  console.log("\n2. POST /users (invalid - short username):");
  const invalidRes = await app.request("/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "bad@test.com",
      username: "ab", // Too short
      passwordHash: "Pass123",
    }),
  });
  console.log(`   Status: ${invalidRes.status}`);
  console.log(`   Response: ${await invalidRes.text()}`);

  // Test 3: Get user
  if (userId) {
    console.log(`\n3. GET /users/${userId}:`);
    const getRes = await app.request(`/users/${userId}`);
    console.log(`   Status: ${getRes.status}`);
    console.log(`   Response: ${await getRes.text()}`);
  }

  // Test 4: List users
  console.log("\n4. GET /users?page=1&limit=5:");
  const listRes = await app.request("/users?page=1&limit=5");
  console.log(`   Status: ${listRes.status}`);
  const listData = await listRes.json();
  console.log(`   Users found: ${listData.data?.length}`);
  console.log(`   Pagination: ${JSON.stringify(listData.pagination)}`);

  // Test 5: Update user
  if (userId) {
    console.log(`\n5. PATCH /users/${userId}:`);
    const updateRes = await app.request(`/users/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        displayName: "Johnny Doe",
        bio: "Updated bio!",
      }),
    });
    console.log(`   Status: ${updateRes.status}`);
    console.log(`   Response: ${await updateRes.text()}`);
  }

  // Test 6: Delete user
  if (userId) {
    console.log(`\n6. DELETE /users/${userId}:`);
    const deleteRes = await app.request(`/users/${userId}`, {
      method: "DELETE",
    });
    console.log(`   Status: ${deleteRes.status}`);
    console.log(`   Response: ${await deleteRes.text()}`);
  }

  // Test 7: Get deleted user (should 404)
  if (userId) {
    console.log(`\n7. GET /users/${userId} (after delete):`);
    const notFoundRes = await app.request(`/users/${userId}`);
    console.log(`   Status: ${notFoundRes.status}`);
    console.log(`   Response: ${await notFoundRes.text()}`);
  }

  // Clean up
  await queryClient`DELETE FROM integration_users WHERE email LIKE '%@test.com'`;
}

// ============================================================
// SECTION 10: Best Practices Summary
// ============================================================

console.log("\n--- Best Practices Summary ---");

const bestPractices = `
1. PROJECT STRUCTURE
   - Separate routes, db, validators, middleware
   - Single source of truth: Drizzle schema
   - Generate Zod schemas with drizzle-zod

2. VALIDATION
   - Validate ALL input (body, query, params)
   - Use drizzle-zod for consistency
   - Return detailed error messages

3. ERROR HANDLING
   - Custom error classes for different types
   - Global error handler in Hono
   - Don't expose internal errors to clients

4. DATABASE
   - Use transactions for multi-step operations
   - Handle unique constraint violations gracefully
   - Always validate before database operations

5. RESPONSE FORMAT
   - Consistent structure: { success, data, error }
   - Include pagination for list endpoints
   - Omit sensitive fields (passwordHash)

6. TYPE SAFETY
   - Infer types from Zod schemas
   - Drizzle provides typed queries
   - End-to-end type safety from DB to API
`;

console.log(bestPractices);

// ============================================================
// SECTION 11: Complete File Examples
// ============================================================

console.log("\n--- Complete File Examples ---");

const dbIndexExample = `
// src/db/index.ts
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;

const queryClient = postgres(connectionString);

export const db = drizzle(queryClient, { schema });

export { schema };
`;

const validatorExample = `
// src/validators/users.ts
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { users } from "../db/schema";

export const createUserSchema = createInsertSchema(users, {
  email: z.string().email(),
  username: z.string().min(3).max(50),
}).omit({ id: true, createdAt: true, updatedAt: true });

export const updateUserSchema = createUserSchema.partial();

export const userResponseSchema = createSelectSchema(users).omit({
  passwordHash: true,
});

export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
`;

const routeExample = `
// src/routes/users.ts
import { Hono } from "hono";
import { db } from "../db";
import { users } from "../db/schema";
import { createUserSchema, updateUserSchema } from "../validators/users";
import { eq } from "drizzle-orm";
import { NotFoundError, ValidationError } from "../utils/errors";

export const usersRouter = new Hono();

usersRouter.get("/", async (c) => {
  const userList = await db.select().from(users);
  return c.json({ success: true, data: userList });
});

usersRouter.post("/", async (c) => {
  const body = await c.req.json();
  const result = createUserSchema.safeParse(body);

  if (!result.success) {
    throw new ValidationError("Validation failed", result.error.issues);
  }

  const newUser = await db.insert(users).values(result.data).returning();
  return c.json({ success: true, data: newUser[0] }, 201);
});

// Export to use in main app
`;

console.log("Example files shown above demonstrate the full integration pattern.");

// ============================================================
// KEY TAKEAWAYS
// ============================================================

console.log("\n========================================");
console.log("KEY TAKEAWAYS");
console.log("========================================");
console.log("1. Use drizzle-zod to generate Zod schemas from Drizzle tables");
console.log("2. Validate ALL input: request body, query params, URL params");
console.log("3. Create custom error classes for different error types");
console.log("4. Use global error handler to catch and format all errors");
console.log("5. Use transactions for operations that must succeed together");
console.log("6. Omit sensitive fields from responses (passwords, tokens)");
console.log("7. Return consistent response format: { success, data, error }");
console.log("8. Infer TypeScript types from Zod schemas for end-to-end safety");

// Run the tests
async function main() {
  try {
    await runTests();
    console.log("\nLesson 22 Complete!");
    console.log("Next: bun lessons/backend/23-openapi-swagger.ts");
  } catch (error) {
    console.log("\nTests require Docker PostgreSQL to be running.");
    console.log("Run: docker compose up -d");
    if (error instanceof Error) {
      console.log(`Error: ${error.message}`);
    }
  } finally {
    await queryClient.end();
  }
}

main();

export {};
