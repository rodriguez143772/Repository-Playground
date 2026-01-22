/**
 * ============================================================
 * LESSON 8: Hono Basics
 * ============================================================
 *
 * Hono is a fast, lightweight web framework for building APIs.
 * It works great with Bun, Deno, Cloudflare Workers, and more.
 *
 * ANALOGY: If Bun.serve() is like a simple food truck (one chef
 * doing everything), Hono is like a well-organized restaurant
 * with a host (router), waiters (middleware), and chefs (handlers).
 *
 * Why Hono?
 * - Tiny: ~14KB, zero dependencies
 * - Fast: Optimized for edge and serverless
 * - TypeScript-first: Excellent type inference
 * - Familiar: Express-like API
 *
 * Install: bun add hono
 */

import { Hono } from "hono";

console.log("========================================");
console.log("LESSON 8: HONO BASICS");
console.log("========================================\n");

// ============================================================
// SECTION 1: Creating a Hono App
// ============================================================

/**
 * Create a Hono app and define routes.
 * Each route has a method (GET, POST, etc.) and a path.
 */

console.log("--- Creating a Hono App ---");

// Create the app
const app = new Hono();

// Define routes
app.get("/", (c) => {
  return c.text("Hello, Hono!");
});

app.get("/json", (c) => {
  return c.json({ message: "Hello, JSON!" });
});

app.get("/html", (c) => {
  return c.html("<h1>Hello, HTML!</h1>");
});

console.log("Created app with routes: /, /json, /html");

// ============================================================
// SECTION 2: The Context Object (c)
// ============================================================

/**
 * Every handler receives a Context object (usually called 'c').
 * It provides methods for:
 * - Reading the request
 * - Sending responses
 * - Accessing request data
 */

console.log("\n--- The Context Object ---");

const contextExample = `
app.get("/example", (c) => {
  // Request info
  c.req.method       // HTTP method
  c.req.url          // Full URL
  c.req.path         // URL path
  c.req.query("key") // Query parameter
  c.req.header("X-Custom") // Header value
  
  // Response helpers
  c.text("Hello")     // Text response
  c.json({ ok: true }) // JSON response
  c.html("<h1>Hi</h1>") // HTML response
  c.redirect("/other")  // Redirect
  c.notFound()          // 404 response
});
`;
console.log(contextExample);

// ============================================================
// SECTION 3: HTTP Methods
// ============================================================

/**
 * Hono supports all HTTP methods.
 */

console.log("--- HTTP Methods ---");

// Define routes for different methods
app.get("/users", (c) => c.json({ method: "GET", action: "list users" }));
app.post("/users", (c) => c.json({ method: "POST", action: "create user" }));
app.put("/users/:id", (c) => c.json({ method: "PUT", action: "update user" }));
app.patch("/users/:id", (c) => c.json({ method: "PATCH", action: "partial update" }));
app.delete("/users/:id", (c) => c.json({ method: "DELETE", action: "delete user" }));

// Handle multiple methods
app.on(["GET", "POST"], "/multi", (c) => {
  return c.json({ method: c.req.method });
});

// Handle all methods
app.all("/any", (c) => {
  return c.json({ method: c.req.method, message: "Any method works" });
});

console.log("Registered routes: GET/POST/PUT/PATCH/DELETE /users");

// ============================================================
// SECTION 4: Testing Routes (Without Starting a Server)
// ============================================================

/**
 * Hono apps can be tested without starting a real server.
 * Use app.request() to simulate requests.
 */

console.log("\n--- Testing Routes ---");

// Test GET /
const res1 = await app.request("/");
console.log(`GET / -> ${res1.status}: ${await res1.text()}`);

// Test GET /json
const res2 = await app.request("/json");
console.log(`GET /json -> ${res2.status}: ${await res2.text()}`);

// Test GET /users
const res3 = await app.request("/users");
console.log(`GET /users -> ${res3.status}: ${JSON.stringify(await res3.json())}`);

// Test POST /users
const res4 = await app.request("/users", { method: "POST" });
console.log(`POST /users -> ${res4.status}: ${JSON.stringify(await res4.json())}`);

// ============================================================
// SECTION 5: Response Types
// ============================================================

/**
 * Hono provides convenient response helpers.
 */

console.log("\n--- Response Types ---");

const responseApp = new Hono();

// Text response
responseApp.get("/text", (c) => c.text("Plain text"));

// JSON response
responseApp.get("/json", (c) => c.json({ status: "ok", data: [1, 2, 3] }));

// JSON with status
responseApp.get("/created", (c) => c.json({ id: 1 }, 201));

// HTML response
responseApp.get("/html", (c) => c.html("<h1>Title</h1><p>Content</p>"));

// Redirect
responseApp.get("/old", (c) => c.redirect("/new"));
responseApp.get("/new", (c) => c.text("New location"));

// Custom response
responseApp.get("/custom", (c) => {
  return new Response("Custom response", {
    status: 202,
    headers: { "X-Custom": "value" },
  });
});

// Not found
responseApp.get("/check/:id", (c) => {
  const id = parseInt(c.req.param("id"));
  if (id <= 0) {
    return c.notFound();
  }
  return c.json({ id });
});

// Test responses
console.log(`/text -> ${await (await responseApp.request("/text")).text()}`);
console.log(`/json -> ${await (await responseApp.request("/json")).text()}`);
console.log(`/created -> status ${(await responseApp.request("/created")).status}`);

// ============================================================
// SECTION 6: Chaining Routes
// ============================================================

/**
 * Routes can be chained for cleaner code.
 */

console.log("\n--- Chaining Routes ---");

const chainApp = new Hono()
  .get("/", (c) => c.text("Home"))
  .get("/about", (c) => c.text("About"))
  .get("/contact", (c) => c.text("Contact"))
  .post("/contact", (c) => c.text("Message sent"));

console.log("Chained routes: /, /about, GET|POST /contact");

// ============================================================
// SECTION 7: Route Groups with basePath
// ============================================================

/**
 * Group routes under a common prefix.
 */

console.log("\n--- Route Groups ---");

// Create a sub-app for /api routes
const apiRoutes = new Hono()
  .get("/users", (c) => c.json({ users: [] }))
  .get("/posts", (c) => c.json({ posts: [] }))
  .get("/comments", (c) => c.json({ comments: [] }));

// Mount under /api
const mainApp = new Hono();
mainApp.route("/api", apiRoutes);

// Test
const apiRes = await mainApp.request("/api/users");
console.log(`/api/users -> ${await apiRes.text()}`);

// ============================================================
// SECTION 8: Starting the Server
// ============================================================

/**
 * To run a Hono app with Bun, export it or use Bun.serve().
 */

console.log("\n--- Starting the Server ---");

const serverCode = `
// Method 1: Export default (recommended)
export default app;
// Then run: bun --hot src/index.ts

// Method 2: Explicit Bun.serve()
export default {
  port: 3000,
  fetch: app.fetch,
};

// Method 3: More control
Bun.serve({
  port: 3000,
  fetch: app.fetch,
});
`;
console.log(serverCode);

// ============================================================
// SECTION 9: Complete Example
// ============================================================

console.log("--- Complete Example ---");

const completeApp = new Hono();

// In-memory data
const todos = [
  { id: 1, text: "Learn Hono", done: true },
  { id: 2, text: "Build an API", done: false },
];

// List all todos
completeApp.get("/todos", (c) => {
  return c.json(todos);
});

// Get single todo
completeApp.get("/todos/:id", (c) => {
  const id = parseInt(c.req.param("id"));
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return c.json({ error: "Todo not found" }, 404);
  }

  return c.json(todo);
});

// Create todo (we'll handle body parsing in next lessons)
completeApp.post("/todos", async (c) => {
  const body = await c.req.json();
  const newTodo = {
    id: todos.length + 1,
    text: body.text,
    done: false,
  };
  todos.push(newTodo);
  return c.json(newTodo, 201);
});

// Test the complete app
console.log("Testing todo API:");
const listRes = await completeApp.request("/todos");
console.log(`GET /todos -> ${await listRes.text()}`);

const getRes = await completeApp.request("/todos/1");
console.log(`GET /todos/1 -> ${await getRes.text()}`);

const notFoundRes = await completeApp.request("/todos/999");
console.log(`GET /todos/999 -> status ${notFoundRes.status}`);

// ============================================================
// KEY TAKEAWAYS
// ============================================================

console.log("\n========================================");
console.log("KEY TAKEAWAYS");
console.log("========================================");
console.log("1. Create app with: const app = new Hono()");
console.log("2. Define routes: app.get('/path', handler)");
console.log("3. Handler receives context: (c) => c.json({...})");
console.log("4. Response helpers: c.text(), c.json(), c.html()");
console.log("5. Test with: app.request('/path')");
console.log("6. Group routes with: app.route('/prefix', subApp)");
console.log("7. Export app for Bun to serve");

console.log("\n✅ Lesson 8 Complete! Run: bun lessons/backend/09-route-parameters.ts");
