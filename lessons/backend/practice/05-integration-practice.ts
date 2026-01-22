/**
 * ============================================================
 * PRACTICE: Full-Stack Integration (Module 2.5)
 * ============================================================
 *
 * Build a complete mini API with Hono + Zod + Drizzle patterns!
 *
 * Instructions:
 * 1. Complete each TODO to build a Task Management API
 * 2. Run: bun lessons/backend/practice/05-integration-practice.ts
 * 3. Check if all tests pass!
 *
 * This practice combines:
 * - Hono for routing
 * - Zod for validation
 * - Drizzle-style schemas (mocked)
 * - Proper error handling
 */

import { Hono } from "hono";
import { z } from "zod";
import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
} from "drizzle-orm/pg-core";

console.log("========================================");
console.log("PRACTICE: FULL-STACK INTEGRATION");
console.log("========================================\n");

// ============================================================
// SECTION 1: Schema Definition
// ============================================================

/**
 * We'll build a Task Management API with:
 * - Tasks (id, title, description, priority, status, dueDate, createdAt)
 * - Proper validation for all inputs
 * - Error handling for all edge cases
 */

// Drizzle schema for reference (we'll mock the database)
const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  priority: text("priority").notNull().default("medium"),
  status: text("status").notNull().default("todo"),
  dueDate: timestamp("due_date"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

type Task = typeof tasks.$inferSelect;

// ============================================================
// PROBLEM 1: Create Zod Validation Schemas
// ============================================================

/**
 * Create validation schemas for the Task API:
 *
 * createTaskSchema:
 * - title: required, 1-255 chars, trim whitespace
 * - description: optional string, max 1000 chars
 * - priority: optional enum ('low', 'medium', 'high'), default 'medium'
 * - status: optional enum ('todo', 'in_progress', 'done'), default 'todo'
 * - dueDate: optional, must be a valid ISO date string in the future
 *
 * updateTaskSchema:
 * - Same as create but all fields optional (for PATCH)
 * - At least one field must be provided
 *
 * listTasksQuerySchema:
 * - page: optional, coerce to positive integer, default 1
 * - limit: optional, coerce to integer 1-50, default 10
 * - status: optional enum ('todo', 'in_progress', 'done')
 * - priority: optional enum ('low', 'medium', 'high')
 * - sortBy: optional enum ('createdAt', 'dueDate', 'priority'), default 'createdAt'
 * - order: optional enum ('asc', 'desc'), default 'desc'
 */

// TODO: Implement createTaskSchema
const createTaskSchema = z.object({
  title: z.string(), // Fix: add trim(), min(1), max(255)
  description: z.string().optional(), // Fix: add max(1000)
  priority: z.string().optional(), // Fix: use enum and default
  status: z.string().optional(), // Fix: use enum and default
  dueDate: z.string().optional(), // Fix: validate as ISO date, must be future
});

// TODO: Implement updateTaskSchema
const updateTaskSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  priority: z.string().optional(),
  status: z.string().optional(),
  dueDate: z.string().optional(),
});
// TODO: Add refinement to ensure at least one field is provided

// TODO: Implement listTasksQuerySchema
const listTasksQuerySchema = z.object({
  page: z.number().default(1), // Fix: coerce from string
  limit: z.number().default(10), // Fix: coerce from string, min/max
  status: z.string().optional(), // Fix: use enum
  priority: z.string().optional(), // Fix: use enum
  sortBy: z.string().default("createdAt"), // Fix: use enum
  order: z.string().default("desc"), // Fix: use enum
});

// ============================================================
// PROBLEM 2: Create Custom Error Classes
// ============================================================

/**
 * Create error classes for:
 * - ApiError: base class with statusCode, message, code
 * - ValidationError: 422 status, includes Zod issues
 * - NotFoundError: 404 status, for missing resources
 * - BadRequestError: 400 status, for invalid requests
 */

// TODO: Implement ApiError class
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

// TODO: Implement ValidationError class
class ValidationError extends ApiError {
  constructor(
    message: string,
    public details: z.ZodIssue[]
  ) {
    // TODO: Call super with correct arguments (422, message, "VALIDATION_ERROR")
    super(400, message, "ERROR"); // Fix this
  }
}

// TODO: Implement NotFoundError class
class NotFoundError extends ApiError {
  constructor(resource: string, id?: number | string) {
    // TODO: Call super with correct arguments
    super(400, "Not found", "ERROR"); // Fix this
  }
}

// TODO: Implement BadRequestError class
class BadRequestError extends ApiError {
  constructor(message: string) {
    // TODO: Call super with correct arguments
    super(500, message, "ERROR"); // Fix this
  }
}

// ============================================================
// PROBLEM 3: Mock Database Layer
// ============================================================

/**
 * Implement the mock database functions.
 */

let mockTasks: Task[] = [];
let nextTaskId = 1;

type CreateTaskInput = z.infer<typeof createTaskSchema>;
type UpdateTaskInput = z.infer<typeof updateTaskSchema>;

// TODO: Implement createTask
function createTask(data: CreateTaskInput): Task {
  // Create a task with:
  // - Generated id
  // - Applied defaults for priority and status
  // - createdAt and updatedAt set to now
  // - dueDate parsed from string to Date if provided

  return {} as Task; // Replace with implementation
}

// TODO: Implement getTaskById
function getTaskById(id: number): Task | null {
  // Find and return task by id, or null if not found

  return null; // Replace with implementation
}

// TODO: Implement updateTask
function updateTask(id: number, data: UpdateTaskInput): Task | null {
  // Find task by id
  // If not found, return null
  // Update only the provided fields
  // Update updatedAt timestamp
  // Return updated task

  return null; // Replace with implementation
}

// TODO: Implement deleteTask
function deleteTask(id: number): boolean {
  // Delete task by id
  // Return true if deleted, false if not found

  return false; // Replace with implementation
}

// TODO: Implement listTasks
function listTasks(query: z.infer<typeof listTasksQuerySchema>): {
  tasks: Task[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
} {
  // Filter by status and priority if provided
  // Sort by sortBy field in order direction
  // Paginate with page and limit
  // Return tasks with pagination info

  return {
    tasks: [],
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  }; // Replace with implementation
}

// ============================================================
// PROBLEM 4: Build the Hono API
// ============================================================

const app = new Hono();

/**
 * Implement the global error handler.
 * Should handle:
 * - ValidationError: return 422 with details
 * - NotFoundError: return 404
 * - BadRequestError: return 400
 * - ApiError: return appropriate status
 * - Unknown errors: return 500
 */

// TODO: Implement error handler
app.onError((err, c) => {
  // Handle different error types and return appropriate JSON responses
  // Format: { success: false, error: { message, code, details? } }

  return c.json(
    {
      success: false,
      error: { message: "Internal server error", code: "INTERNAL_ERROR" },
    },
    500
  );
});

/**
 * GET /tasks
 * List tasks with filtering, sorting, and pagination.
 */

// TODO: Implement GET /tasks
app.get("/tasks", async (c) => {
  // Parse and validate query parameters
  // Call listTasks with validated query
  // Return success response with data and pagination

  return c.json({ success: false, error: { message: "Not implemented" } }, 501);
});

/**
 * GET /tasks/:id
 * Get a single task by ID.
 */

// TODO: Implement GET /tasks/:id
app.get("/tasks/:id", async (c) => {
  // Parse ID from params
  // Validate ID is a number
  // Get task by ID
  // Return 404 if not found
  // Return success response with task

  return c.json({ success: false, error: { message: "Not implemented" } }, 501);
});

/**
 * POST /tasks
 * Create a new task.
 */

// TODO: Implement POST /tasks
app.post("/tasks", async (c) => {
  // Parse request body
  // Validate with createTaskSchema
  // Create task
  // Return 201 with created task

  return c.json({ success: false, error: { message: "Not implemented" } }, 501);
});

/**
 * PATCH /tasks/:id
 * Update an existing task.
 */

// TODO: Implement PATCH /tasks/:id
app.patch("/tasks/:id", async (c) => {
  // Parse ID from params
  // Validate ID is a number
  // Parse and validate request body with updateTaskSchema
  // Ensure at least one field is provided
  // Update task
  // Return 404 if not found
  // Return success response with updated task

  return c.json({ success: false, error: { message: "Not implemented" } }, 501);
});

/**
 * DELETE /tasks/:id
 * Delete a task.
 */

// TODO: Implement DELETE /tasks/:id
app.delete("/tasks/:id", async (c) => {
  // Parse ID from params
  // Validate ID is a number
  // Delete task
  // Return 404 if not found
  // Return success response

  return c.json({ success: false, error: { message: "Not implemented" } }, 501);
});

// ============================================================
// PROBLEM 5: Add a Bulk Operations Endpoint
// ============================================================

/**
 * POST /tasks/bulk
 * Create multiple tasks at once.
 *
 * Request body: { tasks: CreateTaskInput[] }
 * - Validate each task
 * - If any task is invalid, reject the entire batch with details
 * - Return all created tasks
 */

// TODO: Define bulkCreateSchema
const bulkCreateSchema = z.object({
  tasks: z.array(createTaskSchema), // Add min(1) and max(100) constraints
});

// TODO: Implement POST /tasks/bulk
app.post("/tasks/bulk", async (c) => {
  // Parse and validate request body
  // Create all tasks
  // Return 201 with all created tasks

  return c.json({ success: false, error: { message: "Not implemented" } }, 501);
});

/**
 * PATCH /tasks/bulk/status
 * Update status of multiple tasks at once.
 *
 * Request body: { ids: number[], status: 'todo' | 'in_progress' | 'done' }
 * - Validate all IDs exist
 * - Update all tasks atomically
 * - Return updated tasks
 */

// TODO: Define bulkUpdateStatusSchema
const bulkUpdateStatusSchema = z.object({
  ids: z.array(z.number()), // Add min(1) constraint
  status: z.string(), // Use proper enum
});

// TODO: Implement PATCH /tasks/bulk/status
app.patch("/tasks/bulk/status", async (c) => {
  // Parse and validate request body
  // Check all tasks exist
  // Update all task statuses
  // Return updated tasks

  return c.json({ success: false, error: { message: "Not implemented" } }, 501);
});

// ============================================================
// TESTS
// ============================================================

console.log("Running tests...\n");

let passed = 0;
let failed = 0;

// Reset mock data
function resetMockData() {
  mockTasks = [];
  nextTaskId = 1;
}

// Test 1: Create task validation - valid input
resetMockData();
const createValidRes = await app.request("/tasks", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "Test Task",
    description: "A test task description",
    priority: "high",
    status: "todo",
  }),
});

if (createValidRes.status === 201) {
  const data = await createValidRes.json();
  if (data.success && data.data?.title === "Test Task" && data.data?.priority === "high") {
    console.log("✅ Problem 4: POST /tasks works with valid input");
    passed++;
  } else {
    console.log("❌ Problem 4: POST /tasks returned wrong data");
    failed++;
  }
} else {
  console.log("❌ Problem 4: POST /tasks failed");
  failed++;
}

// Test 2: Create task validation - invalid input
const createInvalidRes = await app.request("/tasks", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "", // Empty title should fail
    priority: "invalid", // Invalid priority should fail
  }),
});

if (createInvalidRes.status === 422) {
  const data = await createInvalidRes.json();
  if (!data.success && data.error?.code === "VALIDATION_ERROR") {
    console.log("✅ Problem 1-2: Validation error handling works");
    passed++;
  } else {
    console.log("❌ Problem 1-2: Validation error format wrong");
    failed++;
  }
} else {
  console.log("❌ Problem 1-2: Should return 422 for invalid input");
  failed++;
}

// Test 3: Get task by ID
resetMockData();
// First create a task
await app.request("/tasks", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Find Me Task" }),
});

const getRes = await app.request("/tasks/1");
if (getRes.status === 200) {
  const data = await getRes.json();
  if (data.success && data.data?.id === 1 && data.data?.title === "Find Me Task") {
    console.log("✅ Problem 4: GET /tasks/:id works");
    passed++;
  } else {
    console.log("❌ Problem 4: GET /tasks/:id returned wrong data");
    failed++;
  }
} else {
  console.log("❌ Problem 4: GET /tasks/:id failed");
  failed++;
}

// Test 4: Get task - not found
const notFoundRes = await app.request("/tasks/999");
if (notFoundRes.status === 404) {
  const data = await notFoundRes.json();
  if (!data.success && data.error?.code === "NOT_FOUND") {
    console.log("✅ Problem 2: NotFoundError handling works");
    passed++;
  } else {
    console.log("❌ Problem 2: NotFoundError format wrong");
    failed++;
  }
} else {
  console.log("❌ Problem 2: Should return 404 for missing task");
  failed++;
}

// Test 5: Update task
const updateRes = await app.request("/tasks/1", {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "Updated Task",
    status: "in_progress",
  }),
});

if (updateRes.status === 200) {
  const data = await updateRes.json();
  if (
    data.success &&
    data.data?.title === "Updated Task" &&
    data.data?.status === "in_progress"
  ) {
    console.log("✅ Problem 4: PATCH /tasks/:id works");
    passed++;
  } else {
    console.log("❌ Problem 4: PATCH /tasks/:id returned wrong data");
    failed++;
  }
} else {
  console.log("❌ Problem 4: PATCH /tasks/:id failed");
  failed++;
}

// Test 6: Update task - empty body
const emptyUpdateRes = await app.request("/tasks/1", {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({}),
});

if (emptyUpdateRes.status === 422 || emptyUpdateRes.status === 400) {
  console.log("✅ Problem 1: Update rejects empty body");
  passed++;
} else {
  console.log("❌ Problem 1: Should reject empty update body");
  failed++;
}

// Test 7: Delete task
const deleteRes = await app.request("/tasks/1", { method: "DELETE" });
if (deleteRes.status === 200) {
  const data = await deleteRes.json();
  if (data.success) {
    // Verify it's actually deleted
    const checkRes = await app.request("/tasks/1");
    if (checkRes.status === 404) {
      console.log("✅ Problem 4: DELETE /tasks/:id works");
      passed++;
    } else {
      console.log("❌ Problem 4: Task not actually deleted");
      failed++;
    }
  } else {
    console.log("❌ Problem 4: DELETE should return success");
    failed++;
  }
} else {
  console.log("❌ Problem 4: DELETE /tasks/:id failed");
  failed++;
}

// Test 8: List tasks with filtering
resetMockData();
// Create several tasks
await app.request("/tasks", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Task 1", status: "todo", priority: "low" }),
});
await app.request("/tasks", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Task 2", status: "in_progress", priority: "high" }),
});
await app.request("/tasks", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Task 3", status: "done", priority: "high" }),
});

const listRes = await app.request("/tasks?status=in_progress&priority=high");
if (listRes.status === 200) {
  const data = await listRes.json();
  if (
    data.success &&
    data.data?.length === 1 &&
    data.data[0]?.title === "Task 2" &&
    data.pagination
  ) {
    console.log("✅ Problem 4: GET /tasks with filters works");
    passed++;
  } else {
    console.log("❌ Problem 4: GET /tasks filtering failed");
    failed++;
  }
} else {
  console.log("❌ Problem 4: GET /tasks failed");
  failed++;
}

// Test 9: Pagination
const pageRes = await app.request("/tasks?page=1&limit=2");
if (pageRes.status === 200) {
  const data = await pageRes.json();
  if (
    data.success &&
    data.data?.length === 2 &&
    data.pagination?.total === 3 &&
    data.pagination?.totalPages === 2
  ) {
    console.log("✅ Problem 4: Pagination works");
    passed++;
  } else {
    console.log("❌ Problem 4: Pagination calculation wrong");
    failed++;
  }
} else {
  console.log("❌ Problem 4: GET /tasks pagination failed");
  failed++;
}

// Test 10: Bulk create
resetMockData();
const bulkCreateRes = await app.request("/tasks/bulk", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    tasks: [
      { title: "Bulk Task 1", priority: "low" },
      { title: "Bulk Task 2", priority: "high" },
      { title: "Bulk Task 3" },
    ],
  }),
});

if (bulkCreateRes.status === 201) {
  const data = await bulkCreateRes.json();
  if (data.success && data.data?.length === 3) {
    console.log("✅ Problem 5: POST /tasks/bulk works");
    passed++;
  } else {
    console.log("❌ Problem 5: POST /tasks/bulk returned wrong data");
    failed++;
  }
} else {
  console.log("❌ Problem 5: POST /tasks/bulk failed");
  failed++;
}

// Test 11: Bulk update status
const bulkUpdateRes = await app.request("/tasks/bulk/status", {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    ids: [1, 2],
    status: "done",
  }),
});

if (bulkUpdateRes.status === 200) {
  const data = await bulkUpdateRes.json();
  if (data.success && data.data?.every((t: Task) => t.status === "done")) {
    console.log("✅ Problem 5: PATCH /tasks/bulk/status works");
    passed++;
  } else {
    console.log("❌ Problem 5: PATCH /tasks/bulk/status returned wrong data");
    failed++;
  }
} else {
  console.log("❌ Problem 5: PATCH /tasks/bulk/status failed");
  failed++;
}

// Test 12: Invalid ID format
const invalidIdRes = await app.request("/tasks/not-a-number");
if (invalidIdRes.status === 400 || invalidIdRes.status === 422) {
  console.log("✅ Problem 4: Invalid ID format handled");
  passed++;
} else {
  console.log("❌ Problem 4: Should reject invalid ID format");
  failed++;
}

// Results
console.log(`\n${passed}/${passed + failed} tests passed`);
if (failed === 0) {
  console.log("\n All integration practice problems complete!");
}
