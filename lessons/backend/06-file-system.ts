/**
 * ============================================================
 * LESSON 6: File System Operations
 * ============================================================
 *
 * Bun provides fast file system operations through:
 * - Bun.file() and Bun.write() - Bun's native APIs
 * - node:fs - Node.js compatibility
 *
 * ANALOGY: Bun.file() is like a librarian who can find any book
 * instantly. You ask for a book (file), and they give you a
 * reference card. You can then read, copy, or check details
 * about the book whenever you want.
 *
 * Key concepts:
 * - Lazy loading (file references vs reading)
 * - Streaming for large files
 * - Watching for file changes
 */

console.log("========================================");
console.log("LESSON 6: FILE SYSTEM OPERATIONS");
console.log("========================================\n");

import { readdir, mkdir, rm } from "node:fs/promises";
import { join } from "node:path";

// Create a test directory for this lesson
const testDir = join(import.meta.dir, "test-files");
await mkdir(testDir, { recursive: true });

// ============================================================
// SECTION 1: Reading Files with Bun.file()
// ============================================================

/**
 * Bun.file() is LAZY - it creates a reference, not a read.
 * The actual reading happens when you call .text(), .json(), etc.
 *
 * This is efficient because you can check file properties
 * (size, type, exists) without reading the entire file.
 */

console.log("--- Reading Files ---");

// Create a test file first
const testFile = join(testDir, "sample.txt");
await Bun.write(testFile, "Hello, Bun!\nThis is line 2.\nThis is line 3.");

// Create a file reference (instant, no I/O)
const file = Bun.file(testFile);

// Check properties without reading
console.log(`File exists: ${await file.exists()}`);
console.log(`File size: ${file.size} bytes`);
console.log(`MIME type: ${file.type}`);
console.log(`File name: ${file.name}`);

// Different ways to read content
const asText = await file.text();
console.log(`\nAs text:\n${asText}`);

const asBytes = await file.bytes();
console.log(`As bytes: ${asBytes.length} bytes (Uint8Array)`);

// ============================================================
// SECTION 2: Writing Files with Bun.write()
// ============================================================

/**
 * Bun.write() can write:
 * - Strings
 * - Buffers (Uint8Array)
 * - Other BunFile objects (copy)
 * - Response bodies
 */

console.log("\n--- Writing Files ---");

// Write a string
const textPath = join(testDir, "text-file.txt");
await Bun.write(textPath, "This is written with Bun.write()");
console.log(`Wrote text file: ${textPath}`);

// Write JSON (need to stringify)
const jsonPath = join(testDir, "data.json");
const userData = {
  id: 1,
  name: "Alice",
  roles: ["admin", "user"],
};
await Bun.write(jsonPath, JSON.stringify(userData, null, 2));
console.log(`Wrote JSON file: ${jsonPath}`);

// Read it back
const jsonContent = await Bun.file(jsonPath).json();
console.log("Read back:", jsonContent);

// Write bytes
const bytesPath = join(testDir, "bytes.bin");
const bytes = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f]); // "Hello"
await Bun.write(bytesPath, bytes);
console.log(`Wrote binary file: ${bytesPath}`);

// Copy a file using Bun.file()
const copyPath = join(testDir, "data-copy.json");
await Bun.write(copyPath, Bun.file(jsonPath));
console.log(`Copied file to: ${copyPath}`);

// ============================================================
// SECTION 3: Working with Directories
// ============================================================

/**
 * For directory operations, use Node.js fs/promises.
 * Bun supports the Node.js fs API fully.
 */

console.log("\n--- Directory Operations ---");

// Create nested directories
const nestedDir = join(testDir, "nested", "deep", "folder");
await mkdir(nestedDir, { recursive: true });
console.log(`Created nested directory: ${nestedDir}`);

// List directory contents
const files = await readdir(testDir);
console.log(`Files in test directory: ${files.join(", ")}`);

// List with file types
const filesWithTypes = await readdir(testDir, { withFileTypes: true });
for (const entry of filesWithTypes) {
  const type = entry.isDirectory() ? "📁" : "📄";
  console.log(`  ${type} ${entry.name}`);
}

// ============================================================
// SECTION 4: Streaming Large Files
// ============================================================

/**
 * For large files, streaming is more memory-efficient.
 * Instead of loading the entire file, process chunks at a time.
 */

console.log("\n--- Streaming Files ---");

// Create a larger test file
const largeFile = join(testDir, "large.txt");
const lines = Array.from({ length: 1000 }, (_, i) => `Line ${i + 1}: Some content here`);
await Bun.write(largeFile, lines.join("\n"));
console.log(`Created large file: ${(await Bun.file(largeFile).size)} bytes`);

// Stream the file
const stream = Bun.file(largeFile).stream();
const reader = stream.getReader();

let totalBytes = 0;
let chunks = 0;

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  totalBytes += value.length;
  chunks++;
}

console.log(`Read ${totalBytes} bytes in ${chunks} chunks`);

// ============================================================
// SECTION 5: File Watching
// ============================================================

/**
 * Watch for file changes during development.
 * Useful for auto-reload, live compile, etc.
 *
 * Note: The watcher stays open until you close it.
 */

console.log("\n--- File Watching ---");

const watchFile = join(testDir, "watched.txt");
await Bun.write(watchFile, "Initial content");

// Create a watcher (we'll close it quickly for this demo)
console.log("Starting file watcher...");

/*
// Uncomment to see file watching in action:
const watcher = require("fs").watch(watchFile, (event, filename) => {
  console.log(`File ${filename} changed: ${event}`);
});

// Trigger a change
setTimeout(async () => {
  await Bun.write(watchFile, "Updated content!");
}, 100);

// Close after 1 second
setTimeout(() => {
  watcher.close();
  console.log("Watcher closed");
}, 1000);
*/

console.log("File watching demo (uncomment code to try it)");

// ============================================================
// SECTION 6: File Paths
// ============================================================

/**
 * Use path module for cross-platform file paths.
 * Never concatenate paths with strings!
 */

console.log("\n--- File Paths ---");

import { dirname, basename, extname, resolve } from "node:path";

const examplePath = "/users/alice/documents/report.pdf";

console.log(`Full path: ${examplePath}`);
console.log(`Directory: ${dirname(examplePath)}`);
console.log(`Filename: ${basename(examplePath)}`);
console.log(`Extension: ${extname(examplePath)}`);
console.log(`Name only: ${basename(examplePath, extname(examplePath))}`);

// Current file's directory
console.log(`\nThis file's directory: ${import.meta.dir}`);
console.log(`This file's path: ${import.meta.path}`);

// Resolve relative paths
const relativePath = resolve("lessons", "backend", "test-files");
console.log(`Resolved path: ${relativePath}`);

// ============================================================
// SECTION 7: Checking File Existence and Stats
// ============================================================

/**
 * Check if files exist and get their stats.
 */

console.log("\n--- File Stats ---");

const fileToCheck = Bun.file(testFile);

if (await fileToCheck.exists()) {
  console.log(`File exists: ${testFile}`);
  console.log(`Size: ${fileToCheck.size} bytes`);
  console.log(`Type: ${fileToCheck.type}`);

  // For more stats, use Node's stat
  const { stat } = await import("node:fs/promises");
  const stats = await stat(testFile);
  console.log(`Created: ${stats.birthtime}`);
  console.log(`Modified: ${stats.mtime}`);
  console.log(`Is file: ${stats.isFile()}`);
  console.log(`Is directory: ${stats.isDirectory()}`);
}

// Check non-existent file
const missingFile = Bun.file(join(testDir, "does-not-exist.txt"));
console.log(`\nMissing file exists: ${await missingFile.exists()}`);

// ============================================================
// SECTION 8: Cleanup
// ============================================================

console.log("\n--- Cleanup ---");

// Remove the test directory
await rm(testDir, { recursive: true });
console.log(`Removed test directory: ${testDir}`);

// ============================================================
// KEY TAKEAWAYS
// ============================================================

console.log("\n========================================");
console.log("KEY TAKEAWAYS");
console.log("========================================");
console.log("1. Bun.file() creates a lazy file reference");
console.log("2. Use .text(), .json(), .bytes() to read content");
console.log("3. Bun.write() writes strings, buffers, or files");
console.log("4. Use node:fs/promises for directory operations");
console.log("5. Stream large files to save memory");
console.log("6. Use import.meta.dir for current file's directory");
console.log("7. Always use path.join() for cross-platform paths");

console.log("\n✅ Lesson 6 Complete! Run: bun test lessons/backend/07-bun-testing.ts");
