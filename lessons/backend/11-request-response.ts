/**
 * ============================================================
 * LESSON 11: Request & Response Handling
 * ============================================================
 *
 * Deep dive into handling HTTP requests and crafting responses.
 *
 * ANALOGY: Think of request/response like a restaurant order:
 * - Request = Customer's order (what they want, dietary restrictions, etc.)
 * - Response = The meal you prepare (food, presentation, sides)
 *
 * Key topics:
 * - Parsing request bodies (JSON, form data, files)
 * - Setting response headers
 * - Content negotiation
 * - Streaming responses
 */

import { Hono } from "hono";

console.log("========================================");
console.log("LESSON 11: REQUEST & RESPONSE HANDLING");
console.log("========================================\n");

// ============================================================
// SECTION 1: Parsing JSON Bodies
// ============================================================

/**
 * Most APIs send/receive JSON.
 * Use c.req.json() to parse JSON request bodies.
 */

console.log("--- Parsing JSON Bodies ---");

const app = new Hono();

// Handle JSON POST request
app.post("/users", async (c) => {
  try {
    // Parse JSON body
    const body = await c.req.json();

    // Validate (basic - we'll use Zod in later lessons)
    if (!body.name || !body.email) {
      return c.json({ error: "Name and email are required" }, 400);
    }

    // Create user
    const user = {
      id: Date.now(),
      name: body.name,
      email: body.email,
      createdAt: new Date().toISOString(),
    };

    return c.json(user, 201);
  } catch (error) {
    return c.json({ error: "Invalid JSON" }, 400);
  }
});

// Test JSON parsing
const jsonRequest = new Request("http://localhost/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Alice", email: "alice@example.com" }),
});

const jsonRes = await app.request(jsonRequest);
console.log(`POST /users (JSON) -> ${await jsonRes.text()}`);

// ============================================================
// SECTION 2: Form Data
// ============================================================

/**
 * Handle HTML form submissions with c.req.formData().
 */

console.log("\n--- Form Data ---");

const formApp = new Hono();

formApp.post("/contact", async (c) => {
  // Parse form data
  const formData = await c.req.formData();

  const name = formData.get("name")?.toString();
  const email = formData.get("email")?.toString();
  const message = formData.get("message")?.toString();

  if (!name || !email || !message) {
    return c.json({ error: "All fields are required" }, 400);
  }

  return c.json({
    success: true,
    received: { name, email, message },
  });
});

// Test form data
const formRequest = new Request("http://localhost/contact", {
  method: "POST",
  body: new URLSearchParams({
    name: "Bob",
    email: "bob@example.com",
    message: "Hello!",
  }),
});

const formRes = await formApp.request(formRequest);
console.log(`POST /contact (form) -> ${await formRes.text()}`);

// ============================================================
// SECTION 3: Multipart Form Data (File Uploads)
// ============================================================

/**
 * Handle file uploads with multipart form data.
 */

console.log("\n--- File Uploads ---");

const uploadApp = new Hono();

uploadApp.post("/upload", async (c) => {
  const formData = await c.req.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return c.json({ error: "No file uploaded" }, 400);
  }

  // File properties
  const fileInfo = {
    name: file.name,
    type: file.type,
    size: file.size,
  };

  // Read file content (for text files)
  // const content = await file.text();

  // For binary files, use file.arrayBuffer() or file.stream()

  return c.json({
    success: true,
    file: fileInfo,
  });
});

// Test file upload
const formDataBody = new FormData();
formDataBody.append("file", new File(["Hello, World!"], "hello.txt", { type: "text/plain" }));

const uploadRes = await uploadApp.request("/upload", {
  method: "POST",
  body: formDataBody,
});
console.log(`POST /upload -> ${await uploadRes.text()}`);

// ============================================================
// SECTION 4: Request Headers
// ============================================================

/**
 * Access request headers with c.req.header().
 */

console.log("\n--- Request Headers ---");

const headerApp = new Hono();

headerApp.get("/headers", (c) => {
  // Get specific header
  const userAgent = c.req.header("User-Agent");
  const contentType = c.req.header("Content-Type");
  const authorization = c.req.header("Authorization");
  const customHeader = c.req.header("X-Custom-Header");

  // Get all headers
  const allHeaders: Record<string, string> = {};
  c.req.raw.headers.forEach((value, key) => {
    allHeaders[key] = value;
  });

  return c.json({
    userAgent,
    contentType,
    authorization: authorization ? "***" : null,
    customHeader,
    allHeaders,
  });
});

// Test headers
const headerRes = await headerApp.request("/headers", {
  headers: {
    "User-Agent": "MyApp/1.0",
    "X-Custom-Header": "my-value",
    Authorization: "Bearer secret",
  },
});
console.log(`Headers received: ${await headerRes.text()}`);

// ============================================================
// SECTION 5: Response Headers
// ============================================================

/**
 * Set response headers with c.header().
 */

console.log("\n--- Response Headers ---");

const responseApp = new Hono();

responseApp.get("/download", (c) => {
  // Set headers for file download
  c.header("Content-Type", "application/octet-stream");
  c.header("Content-Disposition", 'attachment; filename="data.json"');
  c.header("Content-Length", "100");

  return c.json({ data: "file content would go here" });
});

responseApp.get("/cache", (c) => {
  // Set caching headers
  c.header("Cache-Control", "public, max-age=3600");
  c.header("ETag", '"abc123"');

  return c.json({ data: "cached content" });
});

responseApp.get("/cors-custom", (c) => {
  // Custom CORS headers
  c.header("Access-Control-Allow-Origin", "https://example.com");
  c.header("Access-Control-Allow-Methods", "GET, POST");
  c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  return c.json({ data: "CORS enabled" });
});

// Test response headers
const downloadRes = await responseApp.request("/download");
console.log(`Content-Disposition: ${downloadRes.headers.get("Content-Disposition")}`);

// ============================================================
// SECTION 6: Response Status Codes
// ============================================================

/**
 * Common HTTP status codes and when to use them.
 */

console.log("\n--- Status Codes ---");

const statusApp = new Hono();

// Success codes
statusApp.get("/ok", (c) => c.text("OK", 200)); // Default
statusApp.post("/created", (c) => c.json({ id: 1 }, 201));
statusApp.delete("/deleted", (c) => c.body(null, 204)); // No content

// Client error codes
statusApp.get("/bad-request", (c) => c.json({ error: "Invalid input" }, 400));
statusApp.get("/unauthorized", (c) => c.json({ error: "Login required" }, 401));
statusApp.get("/forbidden", (c) => c.json({ error: "Access denied" }, 403));
statusApp.get("/not-found", (c) => c.json({ error: "Resource not found" }, 404));
statusApp.get("/conflict", (c) => c.json({ error: "Already exists" }, 409));
statusApp.get("/unprocessable", (c) => c.json({ error: "Validation failed" }, 422));
statusApp.get("/rate-limited", (c) => c.json({ error: "Too many requests" }, 429));

// Server error codes
statusApp.get("/server-error", (c) => c.json({ error: "Internal error" }, 500));
statusApp.get("/unavailable", (c) => c.json({ error: "Service unavailable" }, 503));

// Test status codes
const createdRes = await statusApp.request("/created", { method: "POST" });
console.log(`POST /created -> ${createdRes.status}`);

const notFoundRes = await statusApp.request("/not-found");
console.log(`GET /not-found -> ${notFoundRes.status}`);

// ============================================================
// SECTION 7: Content Negotiation
// ============================================================

/**
 * Return different formats based on Accept header.
 */

console.log("\n--- Content Negotiation ---");

const negotiateApp = new Hono();

interface DataType {
  name: string;
  value: number;
}

const data: DataType = { name: "example", value: 42 };

negotiateApp.get("/data", (c) => {
  const accept = c.req.header("Accept") ?? "application/json";

  if (accept.includes("text/html")) {
    return c.html(`<h1>${data.name}</h1><p>Value: ${data.value}</p>`);
  }

  if (accept.includes("text/plain")) {
    return c.text(`${data.name}: ${data.value}`);
  }

  if (accept.includes("application/xml")) {
    return c.text(`<data><name>${data.name}</name><value>${data.value}</value></data>`, 200, {
      "Content-Type": "application/xml",
    });
  }

  // Default to JSON
  return c.json(data);
});

// Test content negotiation
const jsonAccept = await negotiateApp.request("/data", {
  headers: { Accept: "application/json" },
});
console.log(`Accept: application/json -> ${await jsonAccept.text()}`);

const htmlAccept = await negotiateApp.request("/data", {
  headers: { Accept: "text/html" },
});
console.log(`Accept: text/html -> ${await htmlAccept.text()}`);

// ============================================================
// SECTION 8: Streaming Responses
// ============================================================

/**
 * Stream large responses for better memory efficiency.
 */

console.log("\n--- Streaming Responses ---");

const streamApp = new Hono();

// Stream a large dataset
streamApp.get("/stream", (c) => {
  const stream = new ReadableStream({
    start(controller) {
      // Simulate streaming data
      for (let i = 0; i < 5; i++) {
        controller.enqueue(new TextEncoder().encode(`Chunk ${i + 1}\n`));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain" },
  });
});

// Server-Sent Events (SSE)
streamApp.get("/events", (c) => {
  const stream = new ReadableStream({
    async start(controller) {
      for (let i = 0; i < 3; i++) {
        const event = `data: Event ${i + 1}\n\n`;
        controller.enqueue(new TextEncoder().encode(event));
        await new Promise((r) => setTimeout(r, 100));
      }
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
    },
  });
});

// Test streaming
const streamRes = await streamApp.request("/stream");
console.log(`Streamed: ${await streamRes.text()}`);

// ============================================================
// SECTION 9: Practical Example - API with Full Request/Response
// ============================================================

console.log("--- Practical Example: Todo API ---");

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const todos: Todo[] = [
  { id: 1, title: "Learn Hono", completed: true },
  { id: 2, title: "Build API", completed: false },
];

const todoApp = new Hono();

// List todos
todoApp.get("/todos", (c) => {
  // Check for filter query param
  const completed = c.req.query("completed");

  let result = todos;
  if (completed === "true") {
    result = todos.filter((t) => t.completed);
  } else if (completed === "false") {
    result = todos.filter((t) => !t.completed);
  }

  return c.json(result);
});

// Get single todo
todoApp.get("/todos/:id", (c) => {
  const id = parseInt(c.req.param("id"));
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return c.json({ error: "Todo not found" }, 404);
  }

  return c.json(todo);
});

// Create todo
todoApp.post("/todos", async (c) => {
  const body = await c.req.json<{ title: string }>();

  if (!body.title) {
    return c.json({ error: "Title is required" }, 400);
  }

  const newTodo: Todo = {
    id: todos.length + 1,
    title: body.title,
    completed: false,
  };

  todos.push(newTodo);

  // Return 201 Created with Location header
  c.header("Location", `/todos/${newTodo.id}`);
  return c.json(newTodo, 201);
});

// Update todo
todoApp.put("/todos/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return c.json({ error: "Todo not found" }, 404);
  }

  const body = await c.req.json<{ title?: string; completed?: boolean }>();

  if (body.title !== undefined) todo.title = body.title;
  if (body.completed !== undefined) todo.completed = body.completed;

  return c.json(todo);
});

// Delete todo
todoApp.delete("/todos/:id", (c) => {
  const id = parseInt(c.req.param("id"));
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) {
    return c.json({ error: "Todo not found" }, 404);
  }

  todos.splice(index, 1);
  return c.body(null, 204);
});

// Test the API
console.log("Testing Todo API:");

const listRes = await todoApp.request("/todos");
console.log(`GET /todos -> ${await listRes.text()}`);

const createRes = await todoApp.request("/todos", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "New todo" }),
});
console.log(`POST /todos -> ${createRes.status}, Location: ${createRes.headers.get("Location")}`);

const updateRes = await todoApp.request("/todos/2", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ completed: true }),
});
console.log(`PUT /todos/2 -> ${await updateRes.text()}`);

// ============================================================
// KEY TAKEAWAYS
// ============================================================

console.log("\n========================================");
console.log("KEY TAKEAWAYS");
console.log("========================================");
console.log("1. JSON body: await c.req.json()");
console.log("2. Form data: await c.req.formData()");
console.log("3. Headers: c.req.header('name'), c.header('name', 'value')");
console.log("4. Status codes: c.json(data, 201)");
console.log("5. Use proper status codes (200, 201, 400, 404, etc.)");
console.log("6. Set Location header for created resources");
console.log("7. Use streams for large responses");

console.log("\n✅ Lesson 11 Complete! Run: bun lessons/backend/12-error-handling.ts");
