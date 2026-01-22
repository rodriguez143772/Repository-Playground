/**
 * ============================================================
 * LESSON 4: Bun APIs
 * ============================================================
 *
 * Bun provides powerful built-in APIs that replace many npm packages.
 *
 * ANALOGY: If npm packages are like ordering takeout (convenient but
 * slow to arrive), Bun APIs are like having a fully stocked kitchen -
 * everything you need is already there, ready to use.
 *
 * Key Bun APIs we'll cover:
 * - Bun.serve() - HTTP servers
 * - Bun.file() - File handling
 * - Bun.write() - Writing files
 * - Bun.$ - Shell commands
 * - Bun.password - Password hashing
 * - Bun.sleep() - Async delays
 */

console.log("========================================");
console.log("LESSON 4: BUN APIS");
console.log("========================================\n");

// ============================================================
// SECTION 1: Bun.file() - Reading Files
// ============================================================

/**
 * Bun.file() creates a file reference (doesn't read immediately).
 * It's lazy - only reads when you call .text(), .json(), etc.
 *
 * ANALOGY: It's like getting a library card (Bun.file) vs
 * actually reading the book (.text()). The card is instant,
 * reading takes time.
 */

console.log("--- Bun.file() - Reading Files ---");

// Create a file reference
const file = Bun.file("package.json");

// File metadata (instant, no I/O)
console.log(`File size: ${file.size} bytes`);
console.log(`File type: ${file.type}`);
console.log(`File exists: ${await file.exists()}`);

// Read file contents
const packageJson = await file.json();
console.log(`Package name: ${packageJson.name}`);

// Different ways to read
// const text = await file.text();      // As string
// const bytes = await file.bytes();    // As Uint8Array
// const buffer = await file.arrayBuffer(); // As ArrayBuffer
// const stream = file.stream();        // As ReadableStream

// ============================================================
// SECTION 2: Bun.write() - Writing Files
// ============================================================

/**
 * Bun.write() writes data to files efficiently.
 * It automatically handles strings, buffers, and even other files.
 */

console.log("\n--- Bun.write() - Writing Files ---");

// Write a string to a file
const testFilePath = "lessons/backend/test-output.txt";
await Bun.write(testFilePath, "Hello from Bun.write()!\n");
console.log(`Wrote to: ${testFilePath}`);

// Write JSON
const dataPath = "lessons/backend/test-data.json";
const data = { name: "Bun", version: Bun.version, timestamp: Date.now() };
await Bun.write(dataPath, JSON.stringify(data, null, 2));
console.log(`Wrote JSON to: ${dataPath}`);

// Append to a file (read + write)
const existingContent = await Bun.file(testFilePath).text();
await Bun.write(testFilePath, existingContent + "Appended line!\n");
console.log("Appended to file");

// Clean up test files
const fs = await import("fs/promises");
await fs.unlink(testFilePath).catch(() => {});
await fs.unlink(dataPath).catch(() => {});
console.log("Cleaned up test files");

// ============================================================
// SECTION 3: Bun.$ - Shell Commands
// ============================================================

/**
 * Bun.$ lets you run shell commands with template literals.
 * It's like having a terminal right in your code!
 *
 * No need for: child_process, execa, shelljs
 */

console.log("\n--- Bun.$ - Shell Commands ---");

// Import $ from bun
import { $ } from "bun";

// Run a simple command
const result = await $`echo "Hello from shell!"`.text();
console.log(`Shell output: ${result.trim()}`);

// Get current directory listing (cross-platform)
try {
  // This works on Windows, Mac, and Linux
  const files = await $`bun --version`.text();
  console.log(`Bun version (from shell): ${files.trim()}`);
} catch (error) {
  console.log("Shell command example skipped");
}

// Commands with variables (automatically escaped for safety)
const filename = "package.json";
const catResult = await $`cat ${filename}`.text().catch(() => "File read via shell");
console.log(`Read file via shell: ${catResult.length} chars`);

// ============================================================
// SECTION 4: Bun.password - Password Hashing
// ============================================================

/**
 * Bun has built-in password hashing - no bcrypt needed!
 * Uses Argon2 (more secure than bcrypt) or bcrypt.
 */

console.log("\n--- Bun.password - Password Hashing ---");

const password = "mySecurePassword123";

// Hash a password (async, uses Argon2 by default)
const hash = await Bun.password.hash(password);
console.log(`Password hash: ${hash.substring(0, 50)}...`);

// Verify a password
const isValid = await Bun.password.verify(password, hash);
console.log(`Password valid: ${isValid}`);

const isInvalid = await Bun.password.verify("wrongPassword", hash);
console.log(`Wrong password valid: ${isInvalid}`);

// ============================================================
// SECTION 5: Bun.sleep() - Async Delays
// ============================================================

/**
 * Need to pause? Bun.sleep() is cleaner than setTimeout.
 */

console.log("\n--- Bun.sleep() - Async Delays ---");

console.log("Starting 100ms delay...");
const before = Date.now();
await Bun.sleep(100); // Sleep for 100ms
const after = Date.now();
console.log(`Slept for ${after - before}ms`);

// ============================================================
// SECTION 6: Bun.randomUUIDv7() - Unique IDs
// ============================================================

/**
 * Generate unique IDs without external packages.
 * UUIDv7 is time-ordered (great for databases).
 */

console.log("\n--- Bun.randomUUIDv7() - Unique IDs ---");

const uuid1 = crypto.randomUUID(); // Standard UUIDv4
const uuid2 = crypto.randomUUID();
console.log(`UUIDv4: ${uuid1}`);
console.log(`UUIDv4: ${uuid2}`);

// ============================================================
// SECTION 7: Bun.peek() - Inspect Promises
// ============================================================

/**
 * Bun.peek() checks a promise's state without awaiting it.
 * Useful for debugging async code.
 */

console.log("\n--- Bun.peek() - Inspect Promises ---");

const pendingPromise = new Promise((resolve) => setTimeout(resolve, 1000, "done"));
const resolvedPromise = Promise.resolve("immediate");

console.log(`Pending promise: ${Bun.peek(pendingPromise)}`);
console.log(`Resolved promise: ${Bun.peek(resolvedPromise)}`);

// ============================================================
// SECTION 8: Bun.gc() - Garbage Collection
// ============================================================

/**
 * Bun.gc() forces garbage collection.
 * Useful for memory-sensitive operations.
 */

console.log("\n--- Bun.gc() - Garbage Collection ---");

// Create some garbage
let bigArray: number[] | null = new Array(1_000_000).fill(0);
console.log(`Created array with ${bigArray.length} elements`);

// Remove reference
bigArray = null;

// Force garbage collection
Bun.gc(true); // true = sync, false = async
console.log("Garbage collected!");

// ============================================================
// SECTION 9: Bun.hash() - Fast Hashing
// ============================================================

/**
 * Bun has built-in fast hashing for strings and data.
 */

console.log("\n--- Bun.hash() - Fast Hashing ---");

const data1 = "Hello, World!";
const hash1 = Bun.hash(data1);
console.log(`Hash of "${data1}": ${hash1}`);

// Same input = same hash
const hash2 = Bun.hash(data1);
console.log(`Same hash: ${hash1 === hash2}`);

// Different input = different hash
const hash3 = Bun.hash("Hello, World?");
console.log(`Different hash: ${hash1 !== hash3}`);

// ============================================================
// KEY TAKEAWAYS
// ============================================================

console.log("\n========================================");
console.log("KEY TAKEAWAYS");
console.log("========================================");
console.log("1. Bun.file() - Lazy file reading (text, json, bytes)");
console.log("2. Bun.write() - Write strings, buffers, or files");
console.log("3. Bun.$ - Run shell commands with template literals");
console.log("4. Bun.password - Built-in password hashing");
console.log("5. Bun.sleep() - Clean async delays");
console.log("6. crypto.randomUUID() - Generate unique IDs");
console.log("7. Bun.hash() - Fast hashing for strings");

console.log("\n✅ Lesson 4 Complete! Run: bun lessons/backend/05-http-server.ts");
