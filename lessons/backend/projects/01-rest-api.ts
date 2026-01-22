/**
 * ============================================================
 * PROJECT: REST API - Task Manager
 * Required Knowledge: Bun, Hono, Zod, Drizzle
 * ============================================================
 *
 * Build a complete Task Manager REST API with:
 * - CRUD operations for tasks
 * - Input validation with Zod
 * - Proper error handling
 * - Query filtering and pagination
 * - PostgreSQL persistence with Drizzle ORM
 *
 * Setup: Run `bun db:push` before running this project
 * Run: bun lessons/backend/projects/01-rest-api.ts
 *
 * INSTRUCTIONS:
 * 1. The Zod schemas and types are provided for you
 * 2. Implement each route handler marked with TODO
 * 3. Use the `db` object from "../src/db" for database operations
 * 4. Use the `projectTasks` table from "../src/db/schema"
 * 5. Use the `dbTaskToApi` helper to convert database rows to API responses
 * 6. Run the tests at the bottom to verify your implementation
 */

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { eq, and, ilike, desc } from "drizzle-orm";
import { db } from "../src/db";
import { projectTasks, type ProjectTask, type NewProjectTask } from "../src/db/schema";

console.log("========================================");
console.log("PROJECT: TASK MANAGER REST API");
console.log("========================================\n");

// ============================================================
// Zod Schemas for Validation
// ============================================================

const TaskStatus = z.enum(["todo", "in_progress", "done"]);
const TaskPriority = z.enum(["low", "medium", "high"]);

const TaskSchema = z.object({
  id: z.number(),
  title: z.string().min(1).max(100),
  description: z.string().max(500).optional().nullable(),
  status: TaskStatus,
  priority: TaskPriority,
  dueDate: z.string().datetime().optional().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

type Task = z.infer<typeof TaskSchema>;

const CreateTaskSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  status: TaskStatus.default("todo"),
  priority: TaskPriority.default("medium"),
  dueDate: z.string().datetime().optional(),
});

const UpdateTaskSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
  status: TaskStatus.optional(),
  priority: TaskPriority.optional(),
  dueDate: z.string().datetime().optional().nullable(),
});

const ListTasksQuerySchema = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
  status: TaskStatus.optional(),
  priority: TaskPriority.optional(),
  search: z.string().optional(),
});

const UpdateStatusSchema = z.object({
  status: TaskStatus,
});

// ============================================================
// Helper: Convert DB row to API response
// ============================================================

function dbTaskToApi(task: ProjectTask): Task {
  return {
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status as "todo" | "in_progress" | "done",
    priority: task.priority as "low" | "medium" | "high",
    dueDate: task.dueDate?.toISOString() ?? null,
    createdAt: task.createdAt.toISOString(),
    updatedAt: task.updatedAt.toISOString(),
  };
}

// ============================================================
// TODO: Implement API Routes
// ============================================================

const app = new Hono();

// Logging middleware (provided - no changes needed)
app.use("*", async (c, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${c.req.method} ${c.req.path} - ${c.res.status} (${ms}ms)`);
});

// TODO: GET /tasks - List all tasks with filtering and pagination
// Query params: ?status=todo&priority=high&search=keyword&page=1&limit=10
// Requirements:
// - Extract page, limit, status, priority, search from validated query params
// - Build filter conditions using eq(), ilike(), and() from drizzle-orm
// - If status is provided, filter by status
// - If priority is provided, filter by priority
// - If search is provided, filter by title using ilike (case-insensitive)
// - Order by createdAt descending
// - Apply pagination with limit and offset
// - Return: { data: Task[], page, limit }
app.get("/tasks", zValidator("query", ListTasksQuerySchema), async (c) => {
  // Your implementation here
  return c.json({ data: [], page: 1, limit: 10 });
});

// TODO: GET /tasks/stats - Get task statistics
// Note: This route must be defined BEFORE /tasks/:id to avoid conflicts
// Requirements:
// - Fetch all tasks from the database
// - Calculate statistics:
//   - total: total number of tasks
//   - byStatus: { todo: count, in_progress: count, done: count }
//   - byPriority: { low: count, medium: count, high: count }
// - Return the stats object
app.get("/tasks/stats", async (c) => {
  // Your implementation here
  return c.json({
    total: 0,
    byStatus: { todo: 0, in_progress: 0, done: 0 },
    byPriority: { low: 0, medium: 0, high: 0 },
  });
});

// TODO: GET /tasks/:id - Get a single task by ID
// Requirements:
// - Parse the id from route params (use parseInt)
// - Return 400 if id is not a valid number
// - Query the database for the task with matching id
// - Return 404 if task not found
// - Return the task converted with dbTaskToApi()
app.get("/tasks/:id", async (c) => {
  // Your implementation here
  return c.json({ error: "Not implemented" }, 501);
});

// TODO: POST /tasks - Create a new task
// Body: { title, description?, status?, priority?, dueDate? }
// Requirements:
// - Get validated data from c.req.valid("json")
// - Build insert data object (NewProjectTask type)
// - Handle dueDate conversion: if provided, convert to Date object
// - Insert into database and return the created task
// - Return with 201 status code
app.post("/tasks", zValidator("json", CreateTaskSchema), async (c) => {
  // Your implementation here
  return c.json({ error: "Not implemented" }, 501);
});

// TODO: PUT /tasks/:id - Update a task (full update)
// Body: { title?, description?, status?, priority?, dueDate? }
// Requirements:
// - Parse and validate the id from route params
// - Return 400 if id is not a valid number
// - Check if task exists, return 404 if not found
// - Build update data object with updatedAt set to new Date()
// - Only include fields that are provided in the request
// - Handle dueDate: can be a string (convert to Date) or null (clear it)
// - Update the task and return the updated task
app.put("/tasks/:id", zValidator("json", UpdateTaskSchema), async (c) => {
  // Your implementation here
  return c.json({ error: "Not implemented" }, 501);
});

// TODO: PATCH /tasks/:id/status - Update task status only
// Body: { status: "todo" | "in_progress" | "done" }
// Requirements:
// - Parse and validate the id from route params
// - Return 400 if id is not a valid number
// - Check if task exists, return 404 if not found
// - Update only status and updatedAt fields
// - Return the updated task
app.patch(
  "/tasks/:id/status",
  zValidator("json", UpdateStatusSchema),
  async (c) => {
    // Your implementation here
    return c.json({ error: "Not implemented" }, 501);
  }
);

// TODO: DELETE /tasks/:id - Delete a task
// Requirements:
// - Parse and validate the id from route params
// - Return 400 if id is not a valid number
// - Delete the task and check if it was found (use .returning())
// - Return 404 if task was not found
// - Return 204 (no content) on successful deletion
app.delete("/tasks/:id", async (c) => {
  // Your implementation here
  return c.json({ error: "Not implemented" }, 501);
});

// Error handler (provided - no changes needed)
app.onError((err, c) => {
  console.error("Error:", err);
  return c.json({ error: "Internal server error" }, 500);
});

// 404 handler (provided - no changes needed)
app.notFound((c) => {
  return c.json({ error: "Not found" }, 404);
});

// ============================================================
// TESTS
// ============================================================

console.log("Running tests...\n");

let passed = 0;
let failed = 0;

// Helper to reset data in database
async function resetTasks() {
  // Clear all tasks
  await db.delete(projectTasks);

  // Insert test data
  await db.insert(projectTasks).values([
    {
      title: "Task 1",
      status: "todo",
      priority: "high",
    },
    {
      title: "Task 2",
      status: "in_progress",
      priority: "medium",
    },
    {
      title: "Task 3",
      status: "done",
      priority: "low",
    },
  ]);
}

// Test: List tasks
await resetTasks();
const listRes = await app.request("/tasks");
if (listRes.status === 200) {
  const data = (await listRes.json()) as { data: Task[] };
  if (Array.isArray(data.data) && data.data.length >= 3) {
    console.log("  GET /tasks works");
    passed++;
  } else {
    console.log("X GET /tasks should return tasks array");
    failed++;
  }
} else {
  console.log("X GET /tasks failed");
  failed++;
}

// Test: Filter by status
await resetTasks();
const filterRes = await app.request("/tasks?status=todo");
if (filterRes.status === 200) {
  const data = (await filterRes.json()) as { data: Task[] };
  const tasks = data.data;
  if (Array.isArray(tasks) && tasks.every((t: Task) => t.status === "todo")) {
    console.log("  GET /tasks?status filter works");
    passed++;
  } else {
    console.log("X GET /tasks?status filter failed");
    failed++;
  }
} else {
  console.log("X GET /tasks?status request failed");
  failed++;
}

// Test: Get single task
await resetTasks();
// Get the first task's ID
const allTasksRes = await app.request("/tasks");
const allTasksData = (await allTasksRes.json()) as { data: Task[] };
const firstTaskId = allTasksData.data[0]?.id;

if (firstTaskId) {
  const getRes = await app.request(`/tasks/${firstTaskId}`);
  if (getRes.status === 200) {
    const task = (await getRes.json()) as Task;
    if (task.id === firstTaskId) {
      console.log("  GET /tasks/:id works");
      passed++;
    } else {
      console.log("X GET /tasks/:id wrong data");
      failed++;
    }
  } else {
    console.log("X GET /tasks/:id failed");
    failed++;
  }
} else {
  console.log("X Could not get task for single task test");
  failed++;
}

// Test: Get non-existent task
await resetTasks();
const notFoundRes = await app.request("/tasks/999999");
if (notFoundRes.status === 404) {
  console.log("  GET /tasks/:id returns 404 for missing");
  passed++;
} else {
  console.log("X GET /tasks/:id should return 404");
  failed++;
}

// Test: Create task
await resetTasks();
const createRes = await app.request("/tasks", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "New Task", priority: "high" }),
});
if (createRes.status === 201) {
  const task = (await createRes.json()) as Task;
  if (task.id && task.title === "New Task") {
    console.log("  POST /tasks works");
    passed++;
  } else {
    console.log("X POST /tasks wrong response");
    failed++;
  }
} else {
  console.log("X POST /tasks failed");
  failed++;
}

// Test: Create task validation
await resetTasks();
const invalidCreateRes = await app.request("/tasks", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({}),
});
if (invalidCreateRes.status === 400) {
  console.log("  POST /tasks validates input");
  passed++;
} else {
  console.log("X POST /tasks should validate required fields");
  failed++;
}

// Test: Update task
await resetTasks();
const tasksForUpdate = await app.request("/tasks");
const tasksForUpdateData = (await tasksForUpdate.json()) as { data: Task[] };
const updateTaskId = tasksForUpdateData.data[0]?.id;

if (updateTaskId) {
  const updateRes = await app.request(`/tasks/${updateTaskId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: "Updated Task" }),
  });
  if (updateRes.status === 200) {
    const task = (await updateRes.json()) as Task;
    if (task.title === "Updated Task") {
      console.log("  PUT /tasks/:id works");
      passed++;
    } else {
      console.log("X PUT /tasks/:id didn't update");
      failed++;
    }
  } else {
    console.log("X PUT /tasks/:id failed");
    failed++;
  }
} else {
  console.log("X Could not get task for update test");
  failed++;
}

// Test: Update task status
await resetTasks();
const tasksForStatus = await app.request("/tasks");
const tasksForStatusData = (await tasksForStatus.json()) as { data: Task[] };
const statusTaskId = tasksForStatusData.data[0]?.id;

if (statusTaskId) {
  const statusRes = await app.request(`/tasks/${statusTaskId}/status`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status: "done" }),
  });
  if (statusRes.status === 200) {
    const task = (await statusRes.json()) as Task;
    if (task.status === "done") {
      console.log("  PATCH /tasks/:id/status works");
      passed++;
    } else {
      console.log("X PATCH /tasks/:id/status didn't update");
      failed++;
    }
  } else {
    console.log("X PATCH /tasks/:id/status failed");
    failed++;
  }
} else {
  console.log("X Could not get task for status update test");
  failed++;
}

// Test: Delete task
await resetTasks();
const tasksForDelete = await app.request("/tasks");
const tasksForDeleteData = (await tasksForDelete.json()) as { data: Task[] };
const deleteTaskId = tasksForDeleteData.data[0]?.id;

if (deleteTaskId) {
  const deleteRes = await app.request(`/tasks/${deleteTaskId}`, {
    method: "DELETE",
  });
  if (deleteRes.status === 204) {
    const checkRes = await app.request(`/tasks/${deleteTaskId}`);
    if (checkRes.status === 404) {
      console.log("  DELETE /tasks/:id works");
      passed++;
    } else {
      console.log("X DELETE /tasks/:id didn't delete");
      failed++;
    }
  } else {
    console.log("X DELETE /tasks/:id failed");
    failed++;
  }
} else {
  console.log("X Could not get task for delete test");
  failed++;
}

// Test: Stats endpoint
await resetTasks();
const statsRes = await app.request("/tasks/stats");
if (statsRes.status === 200) {
  const stats = (await statsRes.json()) as {
    total: number;
    byStatus: Record<string, number>;
    byPriority: Record<string, number>;
  };
  if (stats.total === 3 && stats.byStatus && stats.byPriority) {
    console.log("  GET /tasks/stats works");
    passed++;
  } else {
    console.log("X GET /tasks/stats wrong format");
    failed++;
  }
} else {
  console.log("X GET /tasks/stats failed");
  failed++;
}

// Test: 404 for unknown route
await resetTasks();
const unknownRes = await app.request("/unknown");
if (unknownRes.status === 404) {
  console.log("  404 handler works");
  passed++;
} else {
  console.log("X 404 handler missing");
  failed++;
}

// Results
console.log(`\n${passed}/${passed + failed} tests passed`);
if (failed === 0) {
  console.log("\nProject complete! You've built a REST API with PostgreSQL!");
}
