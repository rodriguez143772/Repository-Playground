/**
 * ============================================================
 * LESSON 5: HTTP Server with Bun.serve()
 * ============================================================
 *
 * Bun.serve() is Bun's built-in HTTP server.
 * It's fast, simple, and supports WebSockets out of the box!
 *
 * ANALOGY: Think of Bun.serve() as a restaurant:
 * - The `fetch` function is your waiter (handles each request)
 * - The `Request` is the customer's order
 * - The `Response` is the food you serve back
 *
 * No need for: express, fastify, koa (for simple servers)
 */

console.log("========================================");
console.log("LESSON 5: HTTP SERVER WITH BUN.SERVE()");
console.log("========================================\n");

// ============================================================
// SECTION 1: Basic Server
// ============================================================

/**
 * The simplest possible server.
 * Every request gets the same response.
 */

console.log("--- Basic Server Structure ---");

// This is what a basic server looks like:
const basicServerExample = `
Bun.serve({
  port: 3000,
  fetch(request) {
    return new Response("Hello, World!");
  }
});
`;
console.log(basicServerExample);

// ============================================================
// SECTION 2: The Request Object
// ============================================================

/**
 * The Request object contains everything about the incoming request:
 * - request.url - Full URL
 * - request.method - GET, POST, PUT, DELETE, etc.
 * - request.headers - HTTP headers
 * - request.body - Request body (for POST/PUT)
 */

console.log("--- Request Object Properties ---");

// Simulating a request (normally comes from the server)
const exampleRequest = new Request("http://localhost:3000/users/123?active=true", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer token123",
  },
  body: JSON.stringify({ name: "John" }),
});

console.log(`URL: ${exampleRequest.url}`);
console.log(`Method: ${exampleRequest.method}`);
console.log(`Content-Type: ${exampleRequest.headers.get("Content-Type")}`);

// Parse URL for path and query params
const url = new URL(exampleRequest.url);
console.log(`Pathname: ${url.pathname}`);
console.log(`Search params: ${url.searchParams.get("active")}`);

// ============================================================
// SECTION 3: The Response Object
// ============================================================

/**
 * Responses can be:
 * - Text
 * - JSON
 * - HTML
 * - Files
 * - Streams
 * - Redirects
 */

console.log("\n--- Response Types ---");

// Text response
const textResponse = new Response("Hello, World!");
console.log(`Text response status: ${textResponse.status}`);

// JSON response
const jsonResponse = Response.json({ message: "Hello", count: 42 });
console.log(`JSON response type: ${jsonResponse.headers.get("Content-Type")}`);

// Response with custom status and headers
const customResponse = new Response("Created!", {
  status: 201,
  headers: {
    "X-Custom-Header": "my-value",
    "Content-Type": "text/plain",
  },
});
console.log(`Custom response status: ${customResponse.status}`);

// Redirect response
const redirectResponse = Response.redirect("https://example.com", 302);
console.log(`Redirect location: ${redirectResponse.headers.get("Location")}`);

// ============================================================
// SECTION 4: Routing with URL Patterns
// ============================================================

/**
 * For simple routing, parse the URL and use conditionals.
 * For complex apps, use Hono (next lessons).
 */

console.log("\n--- Simple Routing ---");

function handleRequest(request: Request): Response {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;

  // Route: GET /
  if (method === "GET" && path === "/") {
    return new Response("Home page");
  }

  // Route: GET /users
  if (method === "GET" && path === "/users") {
    return Response.json({ users: [] });
  }

  // Route: GET /users/:id (simple pattern matching)
  if (method === "GET" && path.startsWith("/users/")) {
    const id = path.split("/")[2];
    return Response.json({ id, name: "User " + id });
  }

  // Route: POST /users
  if (method === "POST" && path === "/users") {
    return new Response("User created", { status: 201 });
  }

  // 404 Not Found
  return new Response("Not Found", { status: 404 });
}

// Test the router
console.log("GET / ->", (await handleRequest(new Request("http://localhost/"))).status);
console.log(
  "GET /users ->",
  (await handleRequest(new Request("http://localhost/users"))).status
);
console.log(
  "GET /users/123 ->",
  await (await handleRequest(new Request("http://localhost/users/123"))).json()
);
console.log(
  "POST /users ->",
  (await handleRequest(new Request("http://localhost/users", { method: "POST" }))).status
);
console.log(
  "GET /unknown ->",
  (await handleRequest(new Request("http://localhost/unknown"))).status
);

// ============================================================
// SECTION 5: Handling JSON Bodies
// ============================================================

/**
 * For POST/PUT requests, you often need to parse the body.
 * request.json() parses JSON bodies.
 */

console.log("\n--- Handling JSON Bodies ---");

async function handleJsonPost(request: Request): Promise<Response> {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    // Parse JSON body
    const body = await request.json();
    console.log("Received:", body);

    // Validate (basic example)
    if (!body.name) {
      return Response.json({ error: "Name is required" }, { status: 400 });
    }

    // Process and respond
    return Response.json(
      { id: 1, ...body, createdAt: new Date().toISOString() },
      { status: 201 }
    );
  } catch {
    return Response.json({ error: "Invalid JSON" }, { status: 400 });
  }
}

// Test JSON handling
const postRequest = new Request("http://localhost/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Alice", email: "alice@example.com" }),
});

const response = await handleJsonPost(postRequest);
console.log("Response:", await response.json());

// ============================================================
// SECTION 6: Query Parameters
// ============================================================

/**
 * Query params are part of the URL: /users?page=2&limit=10
 * Use URLSearchParams to parse them.
 */

console.log("\n--- Query Parameters ---");

function handleWithQuery(request: Request): Response {
  const url = new URL(request.url);
  const params = url.searchParams;

  // Get individual params
  const page = parseInt(params.get("page") ?? "1");
  const limit = parseInt(params.get("limit") ?? "10");
  const sort = params.get("sort") ?? "createdAt";

  return Response.json({ page, limit, sort });
}

const queryRequest = new Request("http://localhost/users?page=2&limit=20&sort=name");
console.log("Query result:", await handleWithQuery(queryRequest).json());

// ============================================================
// SECTION 7: Server Options
// ============================================================

/**
 * Bun.serve() has many configuration options:
 */

console.log("\n--- Server Options ---");

const serverOptions = `
Bun.serve({
  port: 3000,              // Port number
  hostname: "0.0.0.0",     // Listen on all interfaces
  
  fetch(request, server) {
    // Main request handler
    // 'server' has useful properties like server.url
    return new Response("Hello!");
  },
  
  error(error) {
    // Handle errors
    console.error(error);
    return new Response("Server error", { status: 500 });
  },
  
  // Development options
  development: {
    hmr: true,      // Hot module reloading
    console: true,  // Show errors in browser
  },
});
`;
console.log(serverOptions);

// ============================================================
// SECTION 8: Starting a Real Server
// ============================================================

/**
 * Let's start a real server!
 * Note: This will keep running until you stop it (Ctrl+C).
 *
 * Uncomment the code below to run a live server.
 */

console.log("\n--- Live Server Example ---");
console.log("Uncomment the server code in this file to run a live server.");
console.log("It would listen on http://localhost:3000");

/*
const server = Bun.serve({
  port: 3000,
  
  fetch(request) {
    const url = new URL(request.url);
    
    // Log incoming requests
    console.log(`${request.method} ${url.pathname}`);
    
    // Simple router
    if (url.pathname === "/") {
      return new Response("Welcome to Bun!");
    }
    
    if (url.pathname === "/api/health") {
      return Response.json({ status: "ok", timestamp: Date.now() });
    }
    
    if (url.pathname === "/api/echo" && request.method === "POST") {
      return request.json().then(body => Response.json(body));
    }
    
    return new Response("Not Found", { status: 404 });
  },
  
  error(error) {
    console.error("Server error:", error);
    return new Response("Internal Server Error", { status: 500 });
  },
});

console.log(`Server running at ${server.url}`);
*/

// ============================================================
// KEY TAKEAWAYS
// ============================================================

console.log("\n========================================");
console.log("KEY TAKEAWAYS");
console.log("========================================");
console.log("1. Bun.serve({ fetch }) creates an HTTP server");
console.log("2. fetch(request) handles all incoming requests");
console.log("3. Return a Response object from fetch");
console.log("4. Use new URL(request.url) to parse paths/query params");
console.log("5. Use request.json() to parse JSON bodies");
console.log("6. Response.json() for JSON, Response.redirect() for redirects");
console.log("7. For complex routing, use Hono (next lessons)");

console.log("\n✅ Lesson 5 Complete! Run: bun lessons/backend/06-file-system.ts");
