/**
 * ============================================================
 * PRACTICE: Hono Framework (Module 2.2)
 * ============================================================
 *
 * Build a complete REST API with Hono!
 *
 * Instructions:
 * 1. Complete each TODO to build a Book API
 * 2. Run: bun lessons/backend/practice/02-hono-practice.ts
 * 3. Check if all tests pass!
 */

import { Hono } from "hono";

console.log("========================================");
console.log("PRACTICE: HONO FRAMEWORK");
console.log("========================================\n");

// ============================================================
// Data Models
// ============================================================

interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  genre: string;
}

// In-memory database
const books: Book[] = [
  { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, genre: "fiction" },
  { id: 2, title: "1984", author: "George Orwell", year: 1949, genre: "dystopian" },
  { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960, genre: "fiction" },
];

let nextId = 4;

// ============================================================
// TODO: Create the Hono App
// ============================================================

const app = new Hono();

// ============================================================
// PROBLEM 1: Logger Middleware
// ============================================================

/**
 * Add middleware that logs all requests.
 * Format: [METHOD] /path
 */

// TODO: Implement logging middleware
// app.use("*", async (c, next) => { ... });

// ============================================================
// PROBLEM 2: GET /books - List all books
// ============================================================

/**
 * Return all books.
 * Support query params:
 * - ?genre=fiction (filter by genre)
 * - ?author=Orwell (filter by author, partial match)
 * - ?year=1949 (filter by year)
 */

// TODO: Implement GET /books
// app.get("/books", (c) => { ... });

// ============================================================
// PROBLEM 3: GET /books/:id - Get single book
// ============================================================

/**
 * Return a single book by ID.
 * Return 404 if not found.
 */

// TODO: Implement GET /books/:id
// app.get("/books/:id", (c) => { ... });

// ============================================================
// PROBLEM 4: POST /books - Create a book
// ============================================================

/**
 * Create a new book from JSON body.
 * Required fields: title, author, year, genre
 * Return 400 if any field is missing.
 * Return 201 with the created book.
 */

// TODO: Implement POST /books
// app.post("/books", async (c) => { ... });

// ============================================================
// PROBLEM 5: PUT /books/:id - Update a book
// ============================================================

/**
 * Update a book by ID.
 * Return 404 if not found.
 * Return updated book.
 */

// TODO: Implement PUT /books/:id
// app.put("/books/:id", async (c) => { ... });

// ============================================================
// PROBLEM 6: DELETE /books/:id - Delete a book
// ============================================================

/**
 * Delete a book by ID.
 * Return 404 if not found.
 * Return 204 on success.
 */

// TODO: Implement DELETE /books/:id
// app.delete("/books/:id", (c) => { ... });

// ============================================================
// PROBLEM 7: Error Handler
// ============================================================

/**
 * Add global error handler.
 * Return JSON with error message and 500 status.
 */

// TODO: Implement error handler
// app.onError((err, c) => { ... });

// ============================================================
// PROBLEM 8: Not Found Handler
// ============================================================

/**
 * Handle 404 for unknown routes.
 */

// TODO: Implement 404 handler
// app.notFound((c) => { ... });

// ============================================================
// TESTS
// ============================================================

console.log("Running tests...\n");

let passed = 0;
let failed = 0;

// Reset books for each test
function resetBooks() {
  books.length = 0;
  books.push(
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, genre: "fiction" },
    { id: 2, title: "1984", author: "George Orwell", year: 1949, genre: "dystopian" },
    { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960, genre: "fiction" }
  );
  nextId = 4;
}

// Test 1: List all books
resetBooks();
const listRes = await app.request("/books");
if (listRes.status === 200) {
  const data = await listRes.json();
  if (Array.isArray(data) && data.length === 3) {
    console.log("✅ Problem 2: GET /books works");
    passed++;
  } else {
    console.log("❌ Problem 2: GET /books returned wrong data");
    failed++;
  }
} else {
  console.log("❌ Problem 2: GET /books failed");
  failed++;
}

// Test 2: Filter by genre
resetBooks();
const genreRes = await app.request("/books?genre=fiction");
if (genreRes.status === 200) {
  const data = await genreRes.json();
  if (Array.isArray(data) && data.length === 2) {
    console.log("✅ Problem 2: Genre filter works");
    passed++;
  } else {
    console.log("❌ Problem 2: Genre filter failed");
    failed++;
  }
} else {
  console.log("❌ Problem 2: Genre filter request failed");
  failed++;
}

// Test 3: Get single book
resetBooks();
const singleRes = await app.request("/books/1");
if (singleRes.status === 200) {
  const book = await singleRes.json();
  if (book.id === 1 && book.title === "The Great Gatsby") {
    console.log("✅ Problem 3: GET /books/:id works");
    passed++;
  } else {
    console.log("❌ Problem 3: GET /books/:id wrong data");
    failed++;
  }
} else {
  console.log("❌ Problem 3: GET /books/:id failed");
  failed++;
}

// Test 4: Get non-existent book
resetBooks();
const notFoundRes = await app.request("/books/999");
if (notFoundRes.status === 404) {
  console.log("✅ Problem 3: 404 for non-existent book");
  passed++;
} else {
  console.log("❌ Problem 3: Should return 404");
  failed++;
}

// Test 5: Create book
resetBooks();
const createRes = await app.request("/books", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title: "New Book",
    author: "New Author",
    year: 2024,
    genre: "test",
  }),
});
if (createRes.status === 201) {
  const book = await createRes.json();
  if (book.title === "New Book" && book.id) {
    console.log("✅ Problem 4: POST /books works");
    passed++;
  } else {
    console.log("❌ Problem 4: POST /books wrong response");
    failed++;
  }
} else {
  console.log("❌ Problem 4: POST /books failed");
  failed++;
}

// Test 6: Create book with missing fields
resetBooks();
const invalidRes = await app.request("/books", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Only Title" }),
});
if (invalidRes.status === 400) {
  console.log("✅ Problem 4: Validation rejects incomplete data");
  passed++;
} else {
  console.log("❌ Problem 4: Should return 400 for incomplete data");
  failed++;
}

// Test 7: Update book
resetBooks();
const updateRes = await app.request("/books/1", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Updated Title", author: "Updated Author", year: 2000, genre: "updated" }),
});
if (updateRes.status === 200) {
  const book = await updateRes.json();
  if (book.title === "Updated Title") {
    console.log("✅ Problem 5: PUT /books/:id works");
    passed++;
  } else {
    console.log("❌ Problem 5: PUT didn't update correctly");
    failed++;
  }
} else {
  console.log("❌ Problem 5: PUT /books/:id failed");
  failed++;
}

// Test 8: Delete book
resetBooks();
const deleteRes = await app.request("/books/1", { method: "DELETE" });
if (deleteRes.status === 204) {
  // Verify it's deleted
  const checkRes = await app.request("/books/1");
  if (checkRes.status === 404) {
    console.log("✅ Problem 6: DELETE /books/:id works");
    passed++;
  } else {
    console.log("❌ Problem 6: Book not actually deleted");
    failed++;
  }
} else {
  console.log("❌ Problem 6: DELETE /books/:id failed");
  failed++;
}

// Test 9: 404 handler
resetBooks();
const unknownRes = await app.request("/unknown/route");
if (unknownRes.status === 404) {
  console.log("✅ Problem 8: 404 handler works");
  passed++;
} else {
  console.log("❌ Problem 8: 404 handler missing");
  failed++;
}

// Results
console.log(`\n${passed}/${passed + failed} tests passed`);
if (failed === 0) {
  console.log("\n🎉 All Hono practice problems complete!");
}
