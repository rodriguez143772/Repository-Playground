/**
 * ============================================================
 * LESSON 10: Middleware
 * ============================================================
 *
 * Middleware are functions that run before (or after) your route handlers.
 * They can modify requests, responses, or short-circuit the pipeline.
 *
 * ANALOGY: Think of middleware like airport security checkpoints.
 * Each checkpoint (middleware) checks something specific:
 * - Ticket check (authentication)
 * - ID verification (authorization)
 * - Baggage scan (validation)
 * - Logging who passed through
 *
 * If any checkpoint fails, you don't reach your gate (route handler).
 */

import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { secureHeaders } from "hono/secure-headers";
import { timing } from "hono/timing";
import { prettyJSON } from "hono/pretty-json";

console.log("========================================");
console.log("LESSON 10: MIDDLEWARE");
console.log("========================================\n");

// ============================================================
// SECTION 1: Using Middleware with app.use()
// ============================================================

/**
 * Middleware is added with app.use().
 * It runs for all matching routes.
 */

console.log("--- Basic Middleware ---");

const app = new Hono();

// Middleware that logs every request
app.use("*", async (c, next) => {
  const start = Date.now();
  console.log(`[${c.req.method}] ${c.req.path} - started`);

  await next(); // Call the next middleware/handler

  const ms = Date.now() - start;
  console.log(`[${c.req.method}] ${c.req.path} - ${c.res.status} (${ms}ms)`);
});

// Routes
app.get("/", (c) => c.text("Home"));
app.get("/about", (c) => c.text("About"));

// Test (middleware logs will appear)
console.log("Testing with logging middleware:");
await app.request("/");
await app.request("/about");

// ============================================================
// SECTION 2: The next() Function
// ============================================================

/**
 * next() passes control to the next middleware/handler.
 * Code BEFORE next() runs on the way IN.
 * Code AFTER next() runs on the way OUT.
 */

console.log("\n--- The next() Function ---");

const nextApp = new Hono();

nextApp.use("*", async (c, next) => {
  console.log("1. Before next()");
  await next();
  console.log("4. After next()");
});

nextApp.use("*", async (c, next) => {
  console.log("2. Second middleware before");
  await next();
  console.log("3. Second middleware after");
});

nextApp.get("/test", (c) => {
  console.log("   Route handler");
  return c.text("Hello");
});

// Test to see the order
console.log("Request flow:");
await nextApp.request("/test");

// ============================================================
// SECTION 3: Built-in Middleware
// ============================================================

/**
 * Hono comes with many useful built-in middleware.
 * Import them from 'hono/*'.
 */

console.log("\n--- Built-in Middleware ---");

const builtinApp = new Hono();

// Logger - logs requests
builtinApp.use("*", logger());

// CORS - handle cross-origin requests
builtinApp.use(
  "*",
  cors({
    origin: "*", // Allow all origins (be more specific in production)
    allowMethods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Secure Headers - adds security headers
builtinApp.use("*", secureHeaders());

// Pretty JSON - formats JSON responses
builtinApp.use("*", prettyJSON());

// Timing - adds Server-Timing header
builtinApp.use("*", timing());

builtinApp.get("/", (c) => c.json({ message: "Hello with middleware!" }));

// Test
const builtinRes = await builtinApp.request("/");
console.log("Response headers:");
console.log(`  Content-Type: ${builtinRes.headers.get("Content-Type")}`);
console.log(`  X-Content-Type-Options: ${builtinRes.headers.get("X-Content-Type-Options")}`);

// ============================================================
// SECTION 4: Path-Specific Middleware
// ============================================================

/**
 * Middleware can be applied to specific paths only.
 */

console.log("\n--- Path-Specific Middleware ---");

const pathApp = new Hono();

// Runs for ALL routes
pathApp.use("*", async (c, next) => {
  c.header("X-App-Name", "MyApp");
  await next();
});

// Runs only for /api/* routes
pathApp.use("/api/*", async (c, next) => {
  c.header("X-API-Version", "1.0");
  await next();
});

// Runs only for /admin/* routes
pathApp.use("/admin/*", async (c, next) => {
  // Check for admin token
  const token = c.req.header("Authorization");
  if (token !== "Bearer admin-secret") {
    return c.json({ error: "Unauthorized" }, 401);
  }
  await next();
});

pathApp.get("/", (c) => c.text("Public"));
pathApp.get("/api/users", (c) => c.json({ users: [] }));
pathApp.get("/admin/dashboard", (c) => c.json({ stats: {} }));

// Test path-specific middleware
console.log("Testing path-specific middleware:");

const publicRes = await pathApp.request("/");
console.log(`GET / -> headers: X-App-Name=${publicRes.headers.get("X-App-Name")}`);

const apiRes = await pathApp.request("/api/users");
console.log(
  `GET /api/users -> headers: X-API-Version=${apiRes.headers.get("X-API-Version")}`
);

const adminNoAuth = await pathApp.request("/admin/dashboard");
console.log(`GET /admin/dashboard (no auth) -> ${adminNoAuth.status}`);

const adminWithAuth = await pathApp.request("/admin/dashboard", {
  headers: { Authorization: "Bearer admin-secret" },
});
console.log(`GET /admin/dashboard (with auth) -> ${adminWithAuth.status}`);

// ============================================================
// SECTION 5: Custom Middleware
// ============================================================

/**
 * Create reusable middleware functions.
 */

console.log("\n--- Custom Middleware ---");

import { createMiddleware } from "hono/factory";

// Middleware that adds request ID
const requestId = createMiddleware(async (c, next) => {
  const id = crypto.randomUUID();
  c.set("requestId", id);
  c.header("X-Request-ID", id);
  await next();
});

// Middleware that measures timing
const timer = createMiddleware(async (c, next) => {
  const start = performance.now();
  await next();
  const duration = performance.now() - start;
  c.header("X-Response-Time", `${duration.toFixed(2)}ms`);
});

// Middleware factory (configurable middleware)
function rateLimit(maxRequests: number, windowMs: number) {
  const requests = new Map<string, number[]>();

  return createMiddleware(async (c, next) => {
    const ip = c.req.header("x-forwarded-for") ?? "unknown";
    const now = Date.now();
    const windowStart = now - windowMs;

    // Get request timestamps for this IP
    const timestamps = requests.get(ip) ?? [];
    const recentRequests = timestamps.filter((t) => t > windowStart);

    if (recentRequests.length >= maxRequests) {
      return c.json({ error: "Rate limit exceeded" }, 429);
    }

    recentRequests.push(now);
    requests.set(ip, recentRequests);

    await next();
  });
}

const customApp = new Hono();
customApp.use("*", requestId);
customApp.use("*", timer);
customApp.use("/api/*", rateLimit(5, 60000)); // 5 requests per minute

customApp.get("/", (c) => c.json({ requestId: c.get("requestId") }));
customApp.get("/api/data", (c) => c.json({ data: "limited" }));

// Test
const customRes = await customApp.request("/");
console.log(`Request ID: ${customRes.headers.get("X-Request-ID")}`);
console.log(`Response Time: ${customRes.headers.get("X-Response-Time")}`);

// ============================================================
// SECTION 6: Sharing Data Between Middleware
// ============================================================

/**
 * Use c.set() and c.get() to share data between middleware and handlers.
 */

console.log("\n--- Sharing Data ---");

// Type-safe context variables
type Variables = {
  user: { id: number; name: string; role: string };
  startTime: number;
};

const shareApp = new Hono<{ Variables: Variables }>();

// Authentication middleware
shareApp.use("*", async (c, next) => {
  c.set("startTime", Date.now());

  // Simulate auth lookup
  const token = c.req.header("Authorization");
  if (token === "Bearer user-token") {
    c.set("user", { id: 1, name: "Alice", role: "user" });
  } else if (token === "Bearer admin-token") {
    c.set("user", { id: 2, name: "Admin", role: "admin" });
  }

  await next();
});

// Route that uses shared data
shareApp.get("/profile", (c) => {
  const user = c.get("user");
  if (!user) {
    return c.json({ error: "Not authenticated" }, 401);
  }
  return c.json(user);
});

shareApp.get("/admin", (c) => {
  const user = c.get("user");
  if (!user || user.role !== "admin") {
    return c.json({ error: "Admin access required" }, 403);
  }
  return c.json({ message: `Welcome, ${user.name}!` });
});

// Test sharing data
const noAuth = await shareApp.request("/profile");
console.log(`GET /profile (no auth) -> ${noAuth.status}`);

const userAuth = await shareApp.request("/profile", {
  headers: { Authorization: "Bearer user-token" },
});
console.log(`GET /profile (user) -> ${await userAuth.text()}`);

const adminPage = await shareApp.request("/admin", {
  headers: { Authorization: "Bearer user-token" },
});
console.log(`GET /admin (as user) -> ${adminPage.status}`);

const adminAuth = await shareApp.request("/admin", {
  headers: { Authorization: "Bearer admin-token" },
});
console.log(`GET /admin (as admin) -> ${await adminAuth.text()}`);

// ============================================================
// SECTION 7: Error Handling Middleware
// ============================================================

/**
 * Catch errors in middleware to handle them gracefully.
 */

console.log("\n--- Error Handling Middleware ---");

const errorApp = new Hono();

// Error handling middleware
errorApp.use("*", async (c, next) => {
  try {
    await next();
  } catch (error) {
    console.error("Error caught:", error);

    if (error instanceof Error) {
      return c.json(
        {
          error: error.message,
          status: 500,
        },
        500
      );
    }

    return c.json({ error: "Unknown error" }, 500);
  }
});

// Route that throws
errorApp.get("/error", (c) => {
  throw new Error("Something went wrong!");
});

errorApp.get("/ok", (c) => c.text("All good!"));

// Test error handling
const okRes = await errorApp.request("/ok");
console.log(`GET /ok -> ${okRes.status}`);

const errorRes = await errorApp.request("/error");
console.log(`GET /error -> ${errorRes.status}: ${await errorRes.text()}`);

// ============================================================
// SECTION 8: Middleware Order
// ============================================================

/**
 * Middleware runs in the order it's defined.
 * Order matters!
 */

console.log("\n--- Middleware Order Matters ---");

const orderExample = `
// CORRECT ORDER:
app.use("*", errorHandler);  // 1. Catch errors (outermost)
app.use("*", logger);        // 2. Log requests
app.use("*", cors);          // 3. Handle CORS
app.use("*", auth);          // 4. Authenticate
app.use("/api/*", rateLimit); // 5. Rate limit API

// WRONG ORDER:
app.use("*", auth);          // Auth runs first
app.use("*", errorHandler);  // Errors in auth won't be caught!
`;
console.log(orderExample);

// ============================================================
// KEY TAKEAWAYS
// ============================================================

console.log("\n========================================");
console.log("KEY TAKEAWAYS");
console.log("========================================");
console.log("1. Middleware runs before route handlers");
console.log("2. Call next() to continue to the next middleware");
console.log("3. Code before next() = request phase");
console.log("4. Code after next() = response phase");
console.log("5. Use path patterns to scope middleware");
console.log("6. Use c.set()/c.get() to share data");
console.log("7. Middleware order matters!");
console.log("8. Built-in: logger, cors, secureHeaders, etc.");

console.log("\n✅ Lesson 10 Complete! Run: bun lessons/backend/11-request-response.ts");
