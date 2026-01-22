/**
 * ============================================================
 * LESSON 12: Error Handling
 * ============================================================
 *
 * Proper error handling makes APIs robust and developer-friendly.
 *
 * ANALOGY: Error handling is like a car's safety features:
 * - Try/catch = Seatbelts (protect from impact)
 * - Error middleware = Airbags (handle the crash)
 * - Custom errors = Warning lights (specific alerts)
 * - Error responses = Accident reports (details for fixing)
 *
 * Key concepts:
 * - Hono's onError handler
 * - Custom error classes
 * - HTTP error helpers
 * - Validation errors
 * - Structured error responses
 */

import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

console.log("========================================");
console.log("LESSON 12: ERROR HANDLING");
console.log("========================================\n");

// ============================================================
// SECTION 1: Basic Error Handling with onError
// ============================================================

/**
 * Hono's onError catches errors thrown in handlers.
 */

console.log("--- Basic onError Handler ---");

const app = new Hono();

// Global error handler
app.onError((err, c) => {
  console.error(`Error: ${err.message}`);

  // Return JSON error response
  return c.json(
    {
      error: err.message || "Internal Server Error",
      status: 500,
    },
    500
  );
});

// Route that throws
app.get("/throw", () => {
  throw new Error("Something went wrong!");
});

// Test
const errorRes = await app.request("/throw");
console.log(`GET /throw -> ${errorRes.status}: ${await errorRes.text()}`);

// ============================================================
// SECTION 2: HTTPException
// ============================================================

/**
 * HTTPException is Hono's built-in way to throw HTTP errors.
 * It includes status code and message.
 */

console.log("\n--- HTTPException ---");

const httpApp = new Hono();

httpApp.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json(
      {
        error: err.message,
        status: err.status,
      },
      err.status
    );
  }

  return c.json({ error: "Internal Server Error", status: 500 }, 500);
});

// Use HTTPException for controlled errors
httpApp.get("/users/:id", (c) => {
  const id = parseInt(c.req.param("id"));

  if (isNaN(id)) {
    throw new HTTPException(400, { message: "ID must be a number" });
  }

  if (id === 404) {
    throw new HTTPException(404, { message: "User not found" });
  }

  if (id === 403) {
    throw new HTTPException(403, { message: "Access denied" });
  }

  return c.json({ id, name: `User ${id}` });
});

// Test HTTPException
const validRes = await httpApp.request("/users/123");
console.log(`GET /users/123 -> ${validRes.status}`);

const badIdRes = await httpApp.request("/users/abc");
console.log(`GET /users/abc -> ${badIdRes.status}: ${await badIdRes.text()}`);

const notFoundRes = await httpApp.request("/users/404");
console.log(`GET /users/404 -> ${notFoundRes.status}: ${await notFoundRes.text()}`);

// ============================================================
// SECTION 3: Custom Error Classes
// ============================================================

/**
 * Create custom errors for different error types.
 */

console.log("\n--- Custom Error Classes ---");

// Base API Error
class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Specific error types
class NotFoundError extends ApiError {
  constructor(resource: string, id?: string | number) {
    super(404, id ? `${resource} with ID ${id} not found` : `${resource} not found`, "NOT_FOUND");
  }
}

class ValidationError extends ApiError {
  constructor(
    message: string,
    public details?: Record<string, string>
  ) {
    super(422, message, "VALIDATION_ERROR");
  }
}

class UnauthorizedError extends ApiError {
  constructor(message = "Authentication required") {
    super(401, message, "UNAUTHORIZED");
  }
}

class ForbiddenError extends ApiError {
  constructor(message = "Access denied") {
    super(403, message, "FORBIDDEN");
  }
}

class ConflictError extends ApiError {
  constructor(message: string) {
    super(409, message, "CONFLICT");
  }
}

// App with custom errors
const customApp = new Hono();

customApp.onError((err, c) => {
  if (err instanceof ApiError) {
    const response: Record<string, unknown> = {
      error: err.message,
      code: err.code,
      status: err.statusCode,
    };

    // Include validation details if present
    if (err instanceof ValidationError && err.details) {
      response.details = err.details;
    }

    return c.json(response, err.statusCode as 400);
  }

  // Unknown errors
  console.error("Unexpected error:", err);
  return c.json({ error: "Internal Server Error", status: 500 }, 500);
});

// Example routes using custom errors
customApp.get("/posts/:id", (c) => {
  const id = parseInt(c.req.param("id"));

  // Simulate not found
  if (id === 999) {
    throw new NotFoundError("Post", id);
  }

  return c.json({ id, title: `Post ${id}` });
});

customApp.post("/posts", async (c) => {
  const body = await c.req.json<{ title?: string; content?: string }>();

  const errors: Record<string, string> = {};
  if (!body.title) errors.title = "Title is required";
  if (!body.content) errors.content = "Content is required";

  if (Object.keys(errors).length > 0) {
    throw new ValidationError("Validation failed", errors);
  }

  return c.json({ id: 1, ...body }, 201);
});

customApp.get("/admin", (c) => {
  const auth = c.req.header("Authorization");
  if (!auth) {
    throw new UnauthorizedError();
  }
  if (auth !== "Bearer admin-token") {
    throw new ForbiddenError();
  }
  return c.json({ message: "Welcome, admin!" });
});

// Test custom errors
console.log("Testing custom errors:");

const postNotFound = await customApp.request("/posts/999");
console.log(`GET /posts/999 -> ${await postNotFound.text()}`);

const validationFail = await customApp.request("/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "" }),
});
console.log(`POST /posts (invalid) -> ${await validationFail.text()}`);

const noAuth = await customApp.request("/admin");
console.log(`GET /admin (no auth) -> ${noAuth.status}`);

// ============================================================
// SECTION 4: Not Found Handler
// ============================================================

/**
 * Handle 404 errors for unmatched routes.
 */

console.log("\n--- Not Found Handler ---");

const notFoundApp = new Hono();

notFoundApp.get("/exists", (c) => c.text("Found!"));

// Custom 404 handler
notFoundApp.notFound((c) => {
  return c.json(
    {
      error: "Not Found",
      message: `Route ${c.req.method} ${c.req.path} does not exist`,
      status: 404,
    },
    404
  );
});

// Test not found
const existsRes = await notFoundApp.request("/exists");
console.log(`GET /exists -> ${existsRes.status}`);

const notExistsRes = await notFoundApp.request("/does-not-exist");
console.log(`GET /does-not-exist -> ${await notExistsRes.text()}`);

// ============================================================
// SECTION 5: Async Error Handling
// ============================================================

/**
 * Async errors are caught automatically in Hono.
 */

console.log("\n--- Async Error Handling ---");

const asyncApp = new Hono();

asyncApp.onError((err, c) => {
  return c.json({ error: err.message, status: 500 }, 500);
});

// Async operation that may fail
async function fetchExternalData(id: number): Promise<{ data: string }> {
  await Bun.sleep(10);
  if (id === 0) {
    throw new Error("External service unavailable");
  }
  return { data: `Data for ${id}` };
}

asyncApp.get("/external/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  const result = await fetchExternalData(id);
  return c.json(result);
});

// Test async errors
const asyncSuccess = await asyncApp.request("/external/1");
console.log(`GET /external/1 -> ${await asyncSuccess.text()}`);

const asyncFail = await asyncApp.request("/external/0");
console.log(`GET /external/0 -> ${await asyncFail.text()}`);

// ============================================================
// SECTION 6: Error Response Format
// ============================================================

/**
 * Standardized error response format.
 */

console.log("\n--- Standardized Error Format ---");

// RFC 7807 Problem Details format
interface ProblemDetails {
  type: string;
  title: string;
  status: number;
  detail?: string;
  instance?: string;
  [key: string]: unknown;
}

function problemDetails(
  type: string,
  title: string,
  status: number,
  detail?: string,
  extra?: Record<string, unknown>
): ProblemDetails {
  return {
    type: `https://api.example.com/errors/${type}`,
    title,
    status,
    detail,
    instance: `/errors/${Date.now()}`,
    ...extra,
  };
}

const problemApp = new Hono();

problemApp.onError((err, c) => {
  if (err instanceof ApiError) {
    const problem = problemDetails(err.code ?? "error", err.message, err.statusCode, err.message);

    return c.json(problem, err.statusCode as 400);
  }

  const problem = problemDetails("internal-error", "Internal Server Error", 500, err.message);

  return c.json(problem, 500);
});

problemApp.get("/resource/:id", (c) => {
  const id = c.req.param("id");
  if (id === "missing") {
    throw new NotFoundError("Resource", id);
  }
  return c.json({ id });
});

// Test problem details format
const problemRes = await problemApp.request("/resource/missing");
console.log(`RFC 7807 format: ${await problemRes.text()}`);

// ============================================================
// SECTION 7: Try/Catch in Handlers
// ============================================================

/**
 * Sometimes you want to handle errors locally, not globally.
 */

console.log("\n--- Local Try/Catch ---");

const localApp = new Hono();

localApp.get("/data/:id", async (c) => {
  const id = c.req.param("id");

  try {
    // Try to parse as number
    const numId = parseInt(id);
    if (isNaN(numId)) {
      return c.json({ error: "ID must be numeric" }, 400);
    }

    // Simulate database lookup
    if (numId === 0) {
      return c.json({ error: "Resource not found" }, 404);
    }

    // Success
    return c.json({ id: numId, data: "..." });
  } catch {
    // Catch unexpected errors
    return c.json({ error: "Failed to process request" }, 500);
  }
});

// ============================================================
// SECTION 8: Complete Error Handling Setup
// ============================================================

console.log("\n--- Complete Error Handling Setup ---");

const completeApp = new Hono();

// Error handler
completeApp.onError((err, c) => {
  // Log all errors
  console.error(`[ERROR] ${c.req.method} ${c.req.path}:`, err.message);

  // Handle known errors
  if (err instanceof HTTPException) {
    return c.json(
      {
        success: false,
        error: {
          message: err.message,
          status: err.status,
        },
      },
      err.status
    );
  }

  if (err instanceof ApiError) {
    return c.json(
      {
        success: false,
        error: {
          message: err.message,
          code: err.code,
          status: err.statusCode,
        },
      },
      err.statusCode as 400
    );
  }

  // Unknown errors (don't expose details in production)
  const isDev = process.env.NODE_ENV === "development";
  return c.json(
    {
      success: false,
      error: {
        message: isDev ? err.message : "Internal Server Error",
        status: 500,
      },
    },
    500
  );
});

// 404 handler
completeApp.notFound((c) => {
  return c.json(
    {
      success: false,
      error: {
        message: "Endpoint not found",
        status: 404,
      },
    },
    404
  );
});

// Routes
completeApp.get("/", (c) => c.json({ success: true, message: "API is running" }));

completeApp.get("/users/:id", (c) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) {
    throw new HTTPException(400, { message: "Invalid user ID" });
  }
  if (id === 0) {
    throw new NotFoundError("User", id);
  }
  return c.json({ success: true, data: { id, name: `User ${id}` } });
});

// Test complete setup
console.log("Testing complete error handling:");
console.log(`GET / -> ${await (await completeApp.request("/")).text()}`);
console.log(`GET /users/1 -> ${await (await completeApp.request("/users/1")).text()}`);
console.log(`GET /users/abc -> ${await (await completeApp.request("/users/abc")).text()}`);
console.log(`GET /users/0 -> ${await (await completeApp.request("/users/0")).text()}`);
console.log(`GET /unknown -> ${await (await completeApp.request("/unknown")).text()}`);

// ============================================================
// KEY TAKEAWAYS
// ============================================================

console.log("\n========================================");
console.log("KEY TAKEAWAYS");
console.log("========================================");
console.log("1. Use app.onError() for global error handling");
console.log("2. Use HTTPException for HTTP-specific errors");
console.log("3. Create custom error classes for different error types");
console.log("4. Use app.notFound() for 404 responses");
console.log("5. Standardize error response format (e.g., RFC 7807)");
console.log("6. Log errors for debugging");
console.log("7. Don't expose internal errors in production");

console.log("\n✅ Lesson 12 Complete! Run: bun lessons/backend/13-openapi-swagger.ts");
