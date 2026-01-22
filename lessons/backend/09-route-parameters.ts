/**
 * ============================================================
 * LESSON 9: Route Parameters
 * ============================================================
 *
 * Route parameters let you capture values from the URL.
 * Essential for RESTful APIs: /users/:id, /posts/:slug
 *
 * ANALOGY: Think of route parameters like fill-in-the-blank forms.
 * The route "/users/:id" is like "Find user number ___".
 * When someone visits "/users/123", Hono fills in the blank with "123".
 *
 * Types of parameters:
 * - Path params: /users/:id
 * - Query params: /users?page=1&limit=10
 * - Wildcards: /files/*
 */

import { Hono } from "hono";

console.log("========================================");
console.log("LESSON 9: ROUTE PARAMETERS");
console.log("========================================\n");

// ============================================================
// SECTION 1: Path Parameters
// ============================================================

/**
 * Path parameters are defined with : prefix.
 * Access them with c.req.param("name").
 */

console.log("--- Path Parameters ---");

const app = new Hono();

// Single parameter
app.get("/users/:id", (c) => {
  const id = c.req.param("id");
  return c.json({ userId: id });
});

// Multiple parameters
app.get("/users/:userId/posts/:postId", (c) => {
  const userId = c.req.param("userId");
  const postId = c.req.param("postId");
  return c.json({ userId, postId });
});

// Get all params at once
app.get("/org/:orgId/team/:teamId/member/:memberId", (c) => {
  const params = c.req.param(); // Returns object with all params
  return c.json(params);
});

// Test path parameters
const res1 = await app.request("/users/123");
console.log(`/users/123 -> ${await res1.text()}`);

const res2 = await app.request("/users/42/posts/7");
console.log(`/users/42/posts/7 -> ${await res2.text()}`);

const res3 = await app.request("/org/acme/team/dev/member/alice");
console.log(`/org/acme/team/dev/member/alice -> ${await res3.text()}`);

// ============================================================
// SECTION 2: Type-Safe Path Parameters
// ============================================================

/**
 * Hono provides excellent TypeScript support for params.
 */

console.log("\n--- Type-Safe Parameters ---");

// TypeScript knows the param types from the route definition
const typedApp = new Hono();

typedApp.get("/items/:category/:id", (c) => {
  // TypeScript knows these exist!
  const category = c.req.param("category");
  const id = c.req.param("id");

  return c.json({ category, id });
});

// Test
const typedRes = await typedApp.request("/items/electronics/laptop-123");
console.log(`/items/electronics/laptop-123 -> ${await typedRes.text()}`);

// ============================================================
// SECTION 3: Query Parameters
// ============================================================

/**
 * Query parameters come after ? in the URL.
 * Access with c.req.query("name").
 */

console.log("\n--- Query Parameters ---");

const queryApp = new Hono();

// Single query param
queryApp.get("/search", (c) => {
  const q = c.req.query("q") ?? "";
  return c.json({ searchTerm: q });
});

// Multiple query params
queryApp.get("/users", (c) => {
  const page = parseInt(c.req.query("page") ?? "1");
  const limit = parseInt(c.req.query("limit") ?? "10");
  const sort = c.req.query("sort") ?? "createdAt";
  const order = c.req.query("order") ?? "desc";

  return c.json({ page, limit, sort, order });
});

// Get all query params
queryApp.get("/filter", (c) => {
  const allQueries = c.req.query(); // Returns object
  return c.json(allQueries);
});

// Test query parameters
const searchRes = await queryApp.request("/search?q=hono");
console.log(`/search?q=hono -> ${await searchRes.text()}`);

const usersRes = await queryApp.request("/users?page=2&limit=20&sort=name");
console.log(`/users?page=2&limit=20&sort=name -> ${await usersRes.text()}`);

const filterRes = await queryApp.request("/filter?status=active&role=admin&verified=true");
console.log(`/filter?status=active&role=admin&verified=true -> ${await filterRes.text()}`);

// ============================================================
// SECTION 4: Multiple Values (Arrays)
// ============================================================

/**
 * Query params can have multiple values: ?tag=a&tag=b&tag=c
 * Use c.req.queries("name") for arrays.
 */

console.log("\n--- Multiple Values ---");

const arrayApp = new Hono();

arrayApp.get("/posts", (c) => {
  // Get single value (first one)
  const firstTag = c.req.query("tag");

  // Get all values as array
  const allTags = c.req.queries("tag") ?? [];

  return c.json({
    firstTag,
    allTags,
    count: allTags.length,
  });
});

// Test multiple values
const multiRes = await arrayApp.request("/posts?tag=javascript&tag=typescript&tag=bun");
console.log(`/posts?tag=javascript&tag=typescript&tag=bun -> ${await multiRes.text()}`);

// ============================================================
// SECTION 5: Optional Parameters
// ============================================================

/**
 * Path params with ? are optional.
 */

console.log("\n--- Optional Parameters ---");

const optionalApp = new Hono();

// Optional format parameter
optionalApp.get("/data/:format?", (c) => {
  const format = c.req.param("format") ?? "json";

  if (format === "xml") {
    return c.text("<data><value>42</value></data>", 200, {
      "Content-Type": "application/xml",
    });
  }

  return c.json({ value: 42 });
});

// Test optional params
const jsonRes = await optionalApp.request("/data");
console.log(`/data (no format) -> ${await jsonRes.text()}`);

const xmlRes = await optionalApp.request("/data/xml");
console.log(`/data/xml -> ${await xmlRes.text()}`);

// ============================================================
// SECTION 6: Wildcards
// ============================================================

/**
 * Use * to match any path segment(s).
 * Access with c.req.param("*").
 */

console.log("\n--- Wildcards ---");

const wildcardApp = new Hono();

// Match any file path
wildcardApp.get("/files/*", (c) => {
  const path = c.req.param("*"); // Everything after /files/
  return c.json({ filePath: path });
});

// Static file example
wildcardApp.get("/static/*", (c) => {
  const filePath = c.req.param("*");
  return c.text(`Would serve: /static/${filePath}`);
});

// Test wildcards
const fileRes = await wildcardApp.request("/files/documents/report.pdf");
console.log(`/files/documents/report.pdf -> ${await fileRes.text()}`);

const staticRes = await wildcardApp.request("/static/css/styles.css");
console.log(`/static/css/styles.css -> ${await staticRes.text()}`);

// ============================================================
// SECTION 7: Regex Constraints (Pattern Matching)
// ============================================================

/**
 * You can add regex patterns to parameters for validation.
 */

console.log("\n--- Pattern Matching ---");

const regexApp = new Hono();

// Only match numeric IDs
// Note: Hono doesn't have built-in regex routes, but you can validate in handler
regexApp.get("/products/:id", (c) => {
  const id = c.req.param("id");

  // Validate numeric ID
  if (!/^\d+$/.test(id)) {
    return c.json({ error: "ID must be numeric" }, 400);
  }

  return c.json({ productId: parseInt(id) });
});

// Test pattern matching
const validId = await regexApp.request("/products/123");
console.log(`/products/123 -> ${await validId.text()}`);

const invalidId = await regexApp.request("/products/abc");
console.log(`/products/abc -> ${await invalidId.text()}`);

// ============================================================
// SECTION 8: Combining Path and Query Params
// ============================================================

/**
 * Real APIs often use both path and query params.
 */

console.log("\n--- Combining Params ---");

const combinedApp = new Hono();

// Get user's posts with filtering
combinedApp.get("/users/:userId/posts", (c) => {
  // Path param
  const userId = c.req.param("userId");

  // Query params
  const page = parseInt(c.req.query("page") ?? "1");
  const limit = parseInt(c.req.query("limit") ?? "10");
  const status = c.req.query("status");

  return c.json({
    userId,
    filters: { page, limit, status },
    results: [],
  });
});

// Test combined params
const combinedRes = await combinedApp.request("/users/42/posts?page=2&limit=5&status=published");
console.log(`/users/42/posts?page=2&limit=5&status=published`);
console.log(`  -> ${await combinedRes.text()}`);

// ============================================================
// SECTION 9: Practical Example - REST API
// ============================================================

console.log("\n--- Practical Example: Blog API ---");

interface Post {
  id: number;
  title: string;
  status: "draft" | "published";
  authorId: number;
}

const posts: Post[] = [
  { id: 1, title: "Getting Started with Hono", status: "published", authorId: 1 },
  { id: 2, title: "Advanced Routing", status: "published", authorId: 1 },
  { id: 3, title: "Draft Post", status: "draft", authorId: 2 },
];

const blogApp = new Hono();

// List posts with filtering
blogApp.get("/posts", (c) => {
  let result = [...posts];

  // Filter by status
  const status = c.req.query("status");
  if (status) {
    result = result.filter((p) => p.status === status);
  }

  // Filter by author
  const authorId = c.req.query("authorId");
  if (authorId) {
    result = result.filter((p) => p.authorId === parseInt(authorId));
  }

  // Pagination
  const page = parseInt(c.req.query("page") ?? "1");
  const limit = parseInt(c.req.query("limit") ?? "10");
  const start = (page - 1) * limit;
  const paged = result.slice(start, start + limit);

  return c.json({
    data: paged,
    pagination: {
      page,
      limit,
      total: result.length,
      totalPages: Math.ceil(result.length / limit),
    },
  });
});

// Get single post
blogApp.get("/posts/:id", (c) => {
  const id = parseInt(c.req.param("id"));
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return c.json({ error: "Post not found" }, 404);
  }

  return c.json(post);
});

// Test blog API
console.log("Blog API Examples:");

const allPosts = await blogApp.request("/posts");
console.log(`GET /posts -> ${(await allPosts.json()).data.length} posts`);

const published = await blogApp.request("/posts?status=published");
console.log(`GET /posts?status=published -> ${(await published.json()).data.length} posts`);

const byAuthor = await blogApp.request("/posts?authorId=1");
console.log(`GET /posts?authorId=1 -> ${(await byAuthor.json()).data.length} posts`);

const singlePost = await blogApp.request("/posts/1");
console.log(`GET /posts/1 -> ${(await singlePost.json()).title}`);

// ============================================================
// KEY TAKEAWAYS
// ============================================================

console.log("\n========================================");
console.log("KEY TAKEAWAYS");
console.log("========================================");
console.log("1. Path params: /users/:id -> c.req.param('id')");
console.log("2. Query params: ?page=1 -> c.req.query('page')");
console.log("3. Multiple values: ?tag=a&tag=b -> c.req.queries('tag')");
console.log("4. Optional params: /data/:format?");
console.log("5. Wildcards: /files/* -> c.req.param('*')");
console.log("6. Always provide defaults for optional params");
console.log("7. Validate numeric params before using parseInt");

console.log("\n✅ Lesson 9 Complete! Run: bun lessons/backend/10-middleware.ts");
