/**
 * ============================================================
 * LESSON 19: CRUD Operations with Drizzle
 * ============================================================
 *
 * CRUD = Create, Read, Update, Delete
 * These are the four fundamental database operations.
 *
 * ANALOGY: CRUD is like managing a filing cabinet:
 * - CREATE: Add a new folder to the cabinet
 * - READ: Find and open folders to view contents
 * - UPDATE: Modify the papers inside a folder
 * - DELETE: Remove folders from the cabinet
 *
 * Drizzle makes CRUD operations type-safe and intuitive.
 * If you know SQL, the syntax will feel familiar!
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { pgTable, serial, text, integer, boolean, timestamp, varchar } from "drizzle-orm/pg-core";
import { eq, ne, gt, lt, gte, lte, like, ilike, and, or, isNull, isNotNull, inArray, sql } from "drizzle-orm";

console.log("========================================");
console.log("LESSON 19: CRUD OPERATIONS");
console.log("========================================\n");

// ============================================================
// SCHEMA DEFINITION
// ============================================================

// Define a users table for our examples
const users = pgTable("lesson_users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  age: integer("age"),
  isActive: boolean("is_active").notNull().default(true),
  role: text("role").notNull().default("user"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

type User = typeof users.$inferSelect;
type NewUser = typeof users.$inferInsert;

// ============================================================
// SECTION 1: INSERT - Creating Records
// ============================================================

console.log("--- INSERT: Creating Records ---");

/**
 * INSERT adds new rows to a table.
 *
 * db.insert(table).values({ ... })
 *
 * You can insert one record or many at once.
 */

async function insertExamples(db: ReturnType<typeof drizzle>) {
  console.log("\n1. Single Insert:");
  console.log(`
  const user = await db.insert(users).values({
    name: "Alice",
    email: "alice@example.com",
    age: 28,
  }).returning();
  `);

  console.log("\n2. Insert Multiple:");
  console.log(`
  const newUsers = await db.insert(users).values([
    { name: "Bob", email: "bob@example.com", age: 32 },
    { name: "Charlie", email: "charlie@example.com", age: 25 },
  ]).returning();
  `);

  console.log("\n3. Insert with Defaults:");
  console.log(`
  // isActive defaults to true, role defaults to "user"
  const user = await db.insert(users).values({
    name: "Diana",
    email: "diana@example.com",
  }).returning();
  `);

  console.log("\n4. Insert On Conflict (Upsert):");
  console.log(`
  const user = await db.insert(users)
    .values({ name: "Alice", email: "alice@example.com" })
    .onConflictDoUpdate({
      target: users.email,
      set: { name: "Alice Updated" }
    })
    .returning();
  `);
}

// ============================================================
// SECTION 2: SELECT - Reading Records
// ============================================================

console.log("\n--- SELECT: Reading Records ---");

/**
 * SELECT retrieves data from a table.
 *
 * db.select().from(table)        - Get all columns
 * db.select({ name }).from(table) - Get specific columns
 */

async function selectExamples(db: ReturnType<typeof drizzle>) {
  console.log("\n1. Select All:");
  console.log(`
  const allUsers = await db.select().from(users);
  // Returns: User[]
  `);

  console.log("\n2. Select Specific Columns:");
  console.log(`
  const names = await db.select({
    name: users.name,
    email: users.email,
  }).from(users);
  // Returns: { name: string, email: string }[]
  `);

  console.log("\n3. Select with Alias:");
  console.log(`
  const result = await db.select({
    userName: users.name,
    userEmail: users.email,
  }).from(users);
  `);

  console.log("\n4. Select Distinct:");
  console.log(`
  const roles = await db.selectDistinct({
    role: users.role,
  }).from(users);
  `);

  console.log("\n5. Select with Count:");
  console.log(`
  const count = await db.select({
    count: sql\`count(*)\`.mapWith(Number),
  }).from(users);
  `);
}

// ============================================================
// SECTION 3: WHERE Clauses
// ============================================================

console.log("\n--- WHERE Clauses ---");

/**
 * WHERE filters which rows are affected by a query.
 * Drizzle provides comparison functions for type-safe filtering.
 */

async function whereExamples(db: ReturnType<typeof drizzle>) {
  console.log("\n1. Equality (eq):");
  console.log(`
  const alice = await db.select().from(users)
    .where(eq(users.name, "Alice"));
  `);

  console.log("\n2. Not Equal (ne):");
  console.log(`
  const notAdmins = await db.select().from(users)
    .where(ne(users.role, "admin"));
  `);

  console.log("\n3. Greater/Less Than (gt, lt, gte, lte):");
  console.log(`
  const adults = await db.select().from(users)
    .where(gte(users.age, 18));

  const under30 = await db.select().from(users)
    .where(lt(users.age, 30));
  `);

  console.log("\n4. LIKE Pattern Matching:");
  console.log(`
  // Case-sensitive
  const aNames = await db.select().from(users)
    .where(like(users.name, "A%"));

  // Case-insensitive
  const aliceAny = await db.select().from(users)
    .where(ilike(users.email, "%alice%"));
  `);

  console.log("\n5. NULL Checks:");
  console.log(`
  const noAge = await db.select().from(users)
    .where(isNull(users.age));

  const hasAge = await db.select().from(users)
    .where(isNotNull(users.age));
  `);

  console.log("\n6. IN Array:");
  console.log(`
  const adminsOrMods = await db.select().from(users)
    .where(inArray(users.role, ["admin", "moderator"]));
  `);

  console.log("\n7. AND / OR Combinations:");
  console.log(`
  // AND: All conditions must be true
  const activeAdults = await db.select().from(users)
    .where(and(
      eq(users.isActive, true),
      gte(users.age, 18)
    ));

  // OR: Any condition can be true
  const specialUsers = await db.select().from(users)
    .where(or(
      eq(users.role, "admin"),
      eq(users.role, "moderator")
    ));
  `);

  console.log("\n8. Complex Conditions:");
  console.log(`
  const result = await db.select().from(users)
    .where(and(
      eq(users.isActive, true),
      or(
        eq(users.role, "admin"),
        and(
          eq(users.role, "user"),
          gte(users.age, 21)
        )
      )
    ));
  `);
}

// ============================================================
// SECTION 4: UPDATE - Modifying Records
// ============================================================

console.log("\n--- UPDATE: Modifying Records ---");

/**
 * UPDATE modifies existing rows.
 *
 * db.update(table).set({ ... }).where(condition)
 *
 * ALWAYS use WHERE to avoid updating all rows!
 */

async function updateExamples(db: ReturnType<typeof drizzle>) {
  console.log("\n1. Update Single Field:");
  console.log(`
  const updated = await db.update(users)
    .set({ name: "Alice Smith" })
    .where(eq(users.email, "alice@example.com"))
    .returning();
  `);

  console.log("\n2. Update Multiple Fields:");
  console.log(`
  const updated = await db.update(users)
    .set({
      name: "Alice Johnson",
      age: 29,
      role: "admin",
    })
    .where(eq(users.id, 1))
    .returning();
  `);

  console.log("\n3. Increment a Value:");
  console.log(`
  const updated = await db.update(users)
    .set({
      age: sql\`\${users.age} + 1\`,
    })
    .where(eq(users.id, 1))
    .returning();
  `);

  console.log("\n4. Update with Condition:");
  console.log(`
  // Deactivate all users who haven't logged in
  const deactivated = await db.update(users)
    .set({ isActive: false })
    .where(and(
      eq(users.isActive, true),
      lt(users.createdAt, new Date("2024-01-01"))
    ))
    .returning();
  `);

  console.log("\n5. Update All (dangerous!):");
  console.log(`
  // This updates ALL rows - be careful!
  await db.update(users)
    .set({ role: "user" });
  // No .where() means all rows are affected!
  `);
}

// ============================================================
// SECTION 5: DELETE - Removing Records
// ============================================================

console.log("\n--- DELETE: Removing Records ---");

/**
 * DELETE removes rows from a table.
 *
 * db.delete(table).where(condition)
 *
 * ALWAYS use WHERE to avoid deleting all rows!
 */

async function deleteExamples(db: ReturnType<typeof drizzle>) {
  console.log("\n1. Delete by ID:");
  console.log(`
  const deleted = await db.delete(users)
    .where(eq(users.id, 1))
    .returning();
  `);

  console.log("\n2. Delete by Condition:");
  console.log(`
  const deleted = await db.delete(users)
    .where(eq(users.isActive, false))
    .returning();
  `);

  console.log("\n3. Delete with Complex Condition:");
  console.log(`
  const deleted = await db.delete(users)
    .where(and(
      eq(users.role, "guest"),
      lt(users.createdAt, new Date("2024-01-01"))
    ))
    .returning();
  `);

  console.log("\n4. Delete All (very dangerous!):");
  console.log(`
  // This deletes ALL rows - be very careful!
  await db.delete(users);
  // No .where() means all rows are deleted!
  `);
}

// ============================================================
// SECTION 6: Returning Data
// ============================================================

console.log("\n--- Returning Data ---");

/**
 * .returning() gets the affected rows back.
 * Very useful for getting auto-generated IDs!
 */

async function returningExamples(db: ReturnType<typeof drizzle>) {
  console.log("\n1. Return All Columns:");
  console.log(`
  const [newUser] = await db.insert(users)
    .values({ name: "Eve", email: "eve@example.com" })
    .returning();
  // newUser has id, createdAt, etc.
  console.log(newUser.id); // Auto-generated ID
  `);

  console.log("\n2. Return Specific Columns:");
  console.log(`
  const [result] = await db.insert(users)
    .values({ name: "Frank", email: "frank@example.com" })
    .returning({
      id: users.id,
      email: users.email,
    });
  // result: { id: number, email: string }
  `);

  console.log("\n3. Return from Update:");
  console.log(`
  const updated = await db.update(users)
    .set({ isActive: false })
    .where(eq(users.id, 1))
    .returning();
  // Returns updated rows
  `);

  console.log("\n4. Return from Delete:");
  console.log(`
  const deleted = await db.delete(users)
    .where(eq(users.id, 1))
    .returning();
  // Returns deleted rows (useful for soft delete patterns)
  `);
}

// ============================================================
// SECTION 7: Ordering and Limiting
// ============================================================

console.log("\n--- Ordering and Limiting ---");

async function orderLimitExamples(db: ReturnType<typeof drizzle>) {
  console.log("\n1. Order By:");
  console.log(`
  import { asc, desc } from "drizzle-orm";

  // Ascending (A-Z, 0-9)
  const usersAZ = await db.select().from(users)
    .orderBy(asc(users.name));

  // Descending (Z-A, 9-0)
  const newestFirst = await db.select().from(users)
    .orderBy(desc(users.createdAt));

  // Multiple columns
  const sorted = await db.select().from(users)
    .orderBy(asc(users.role), desc(users.createdAt));
  `);

  console.log("\n2. Limit and Offset:");
  console.log(`
  // Get first 10
  const first10 = await db.select().from(users)
    .limit(10);

  // Pagination: Page 2 (items 11-20)
  const page2 = await db.select().from(users)
    .limit(10)
    .offset(10);
  `);

  console.log("\n3. Combined Query:");
  console.log(`
  // Get the 5 newest active users
  const recentActive = await db.select().from(users)
    .where(eq(users.isActive, true))
    .orderBy(desc(users.createdAt))
    .limit(5);
  `);
}

// ============================================================
// SECTION 8: Practical Example
// ============================================================

console.log("\n--- Practical Example: User Service ---");

const userServiceExample = `
// src/services/userService.ts
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

type NewUser = typeof users.$inferInsert;

export const userService = {
  // Create
  async create(data: NewUser) {
    const [user] = await db.insert(users)
      .values(data)
      .returning();
    return user;
  },

  // Read
  async findById(id: number) {
    const [user] = await db.select()
      .from(users)
      .where(eq(users.id, id));
    return user || null;
  },

  async findByEmail(email: string) {
    const [user] = await db.select()
      .from(users)
      .where(eq(users.email, email));
    return user || null;
  },

  async findAll() {
    return db.select().from(users);
  },

  // Update
  async update(id: number, data: Partial<NewUser>) {
    const [user] = await db.update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();
    return user || null;
  },

  // Delete
  async delete(id: number) {
    const [user] = await db.delete(users)
      .where(eq(users.id, id))
      .returning();
    return user || null;
  },
};
`;

console.log(userServiceExample);

// ============================================================
// SECTION 9: Running the Examples
// ============================================================

async function main() {
  console.log("\n--- Testing Database Connection ---");

  const connectionString = "postgresql://learn:learn@localhost:5432/learn_db";

  try {
    const client = postgres(connectionString);
    const db = drizzle(client);

    // Test connection
    const result = await client`SELECT NOW()`;
    console.log("Database connected successfully!");

    // Create table if not exists
    await client`
      CREATE TABLE IF NOT EXISTS lesson_users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        age INTEGER,
        is_active BOOLEAN NOT NULL DEFAULT true,
        role TEXT NOT NULL DEFAULT 'user',
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;
    console.log("Table 'lesson_users' ready!");

    // Demo: Insert
    console.log("\n--- Live Demo: INSERT ---");
    const timestamp = Date.now();
    const [newUser] = await db
      .insert(users)
      .values({
        name: "Demo User",
        email: `demo${timestamp}@example.com`,
        age: 25,
      })
      .returning();
    console.log(`Inserted user: ${JSON.stringify(newUser)}`);

    // Demo: Select
    console.log("\n--- Live Demo: SELECT ---");
    const allUsers = await db.select().from(users).limit(3);
    console.log(`Found ${allUsers.length} users`);
    allUsers.forEach((u) => console.log(`  - ${u.name} (${u.email})`));

    // Demo: Update
    console.log("\n--- Live Demo: UPDATE ---");
    const [updated] = await db
      .update(users)
      .set({ name: "Updated Demo User" })
      .where(eq(users.id, newUser.id))
      .returning();
    console.log(`Updated: ${updated.name}`);

    // Demo: Delete
    console.log("\n--- Live Demo: DELETE ---");
    const [deleted] = await db.delete(users).where(eq(users.id, newUser.id)).returning();
    console.log(`Deleted: ${deleted.email}`);

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
console.log("1. INSERT: db.insert(table).values({...}).returning()");
console.log("2. SELECT: db.select().from(table).where(condition)");
console.log("3. UPDATE: db.update(table).set({...}).where(condition)");
console.log("4. DELETE: db.delete(table).where(condition)");
console.log("5. WHERE operators: eq, ne, gt, lt, gte, lte, like, ilike");
console.log("6. Combine with: and(), or()");
console.log("7. NULL checks: isNull(), isNotNull()");
console.log("8. .returning() gets affected rows back");
console.log("9. ALWAYS use WHERE with UPDATE/DELETE!");

main().then(() => {
  console.log("\nLesson 19 Complete! Run: bun lessons/backend/20-relations-joins.ts");
});

export {};
