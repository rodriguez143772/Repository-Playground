/**
 * ============================================================
 * LESSON 3: Bun Basics
 * ============================================================
 *
 * Welcome to backend development with Bun!
 *
 * ANALOGY: If Node.js is like a Swiss Army knife that's been around
 * for years and has every tool imaginable, Bun is like a modern
 * multi-tool that's faster, lighter, and has the most-used tools
 * built right in.
 *
 * Bun is:
 * - A JavaScript/TypeScript RUNTIME (runs your code)
 * - A PACKAGE MANAGER (like npm, but faster)
 * - A BUNDLER (like webpack, but simpler)
 * - A TEST RUNNER (like Jest, but built-in)
 *
 * All in one tool!
 */

// ============================================================
// SECTION 1: Running TypeScript Files
// ============================================================

/**
 * With Node.js, you'd need to:
 * 1. Install TypeScript
 * 2. Compile TS to JS
 * 3. Run the JS file
 *
 * With Bun, just run:
 *   bun myfile.ts
 *
 * That's it! Bun runs TypeScript natively.
 */

console.log("========================================");
console.log("LESSON 3: BUN BASICS");
console.log("========================================\n");

// This TypeScript code runs directly!
const greeting: string = "Hello from Bun!";
const version: number = 1.0;
console.log(`${greeting} (version ${version})`);

// ============================================================
// SECTION 2: Package Management
// ============================================================

/**
 * Bun replaces npm/yarn/pnpm with faster alternatives:
 *
 * Instead of:              Use:
 * npm install              bun install
 * npm install express      bun add express
 * npm uninstall express    bun remove express
 * npm run dev              bun run dev
 * npx create-react-app     bunx create-react-app
 *
 * Bun uses the same package.json format!
 */

console.log("\n--- Package Management ---");
console.log("Commands:");
console.log("  bun install          - Install all dependencies");
console.log("  bun add <package>    - Add a package");
console.log("  bun remove <package> - Remove a package");
console.log("  bun update           - Update packages");

// ============================================================
// SECTION 3: The Bun Global Object
// ============================================================

/**
 * Bun provides a global `Bun` object with useful APIs.
 * Think of it as Bun's toolbox - everything you need is here.
 */

console.log("\n--- Bun Global Object ---");

// Bun version
console.log(`Bun version: ${Bun.version}`);

// Current working directory
console.log(`Current directory: ${process.cwd()}`);

// Environment variables (Bun auto-loads .env files!)
console.log(`NODE_ENV: ${process.env.NODE_ENV ?? "not set"}`);

// ============================================================
// SECTION 4: Bun.env vs process.env
// ============================================================

/**
 * Bun automatically loads .env files - no dotenv package needed!
 *
 * .env files are loaded in this order:
 * 1. .env.local
 * 2. .env.development (or .env.production)
 * 3. .env
 */

console.log("\n--- Environment Variables ---");

// Both work, but Bun.env is preferred
const myVar = Bun.env.MY_VARIABLE ?? "not set";
console.log(`MY_VARIABLE: ${myVar}`);

// Type-safe environment access
interface Env {
  DATABASE_URL?: string;
  API_KEY?: string;
  PORT?: string;
}

const env = process.env as Env;
console.log(`DATABASE_URL: ${env.DATABASE_URL ?? "not set"}`);

// ============================================================
// SECTION 5: Running Scripts
// ============================================================

/**
 * In package.json, you can define scripts:
 *
 * {
 *   "scripts": {
 *     "dev": "bun --hot src/index.ts",
 *     "start": "bun src/index.ts",
 *     "test": "bun test"
 *   }
 * }
 *
 * Run them with: bun run dev, bun run start, etc.
 * Or shorthand: bun dev, bun start, bun test
 */

console.log("\n--- Running Scripts ---");
console.log("Define scripts in package.json:");
console.log('  "dev": "bun --hot src/index.ts"');
console.log('  "start": "bun src/index.ts"');
console.log('  "test": "bun test"');

// ============================================================
// SECTION 6: Hot Reloading
// ============================================================

/**
 * Bun supports hot reloading with the --hot flag:
 *   bun --hot myfile.ts
 *
 * When you save changes, Bun reloads without restarting.
 * This is great for development!
 *
 * For watching and restarting (like nodemon):
 *   bun --watch myfile.ts
 */

console.log("\n--- Hot Reloading ---");
console.log("Development modes:");
console.log("  bun --hot file.ts   - Hot reload (keeps state)");
console.log("  bun --watch file.ts - Watch mode (restarts)");

// ============================================================
// SECTION 7: Bun vs Node.js Compatibility
// ============================================================

/**
 * Bun aims for Node.js compatibility. Most things work:
 *
 * ✅ Works:
 * - require() and import
 * - Most Node.js APIs (fs, path, http, etc.)
 * - npm packages
 * - package.json
 *
 * ⚠️ Some differences:
 * - Some native addons may not work
 * - Some Node.js edge cases differ
 * - Bun has its own APIs that are often faster
 */

console.log("\n--- Node.js Compatibility ---");

// Node.js APIs work in Bun
import { join } from "path";
const filePath = join("lessons", "backend", "03-bun-basics.ts");
console.log(`Path example: ${filePath}`);

// ============================================================
// SECTION 8: Performance
// ============================================================

/**
 * Bun is fast because:
 * 1. Written in Zig (low-level language)
 * 2. Uses JavaScriptCore (Safari's JS engine) instead of V8
 * 3. Optimized for common use cases
 *
 * Typical speedups:
 * - Package install: 10-30x faster than npm
 * - TypeScript execution: No compile step
 * - HTTP servers: Often faster than Node.js
 */

console.log("\n--- Performance Demo ---");

// Measure execution time
const start = Bun.nanoseconds();

// Do some work
let sum = 0;
for (let i = 0; i < 1_000_000; i++) {
  sum += i;
}

const end = Bun.nanoseconds();
const durationMs = (end - start) / 1_000_000;

console.log(`Summed 1 million numbers: ${sum}`);
console.log(`Time: ${durationMs.toFixed(2)}ms`);

// ============================================================
// KEY TAKEAWAYS
// ============================================================

console.log("\n========================================");
console.log("KEY TAKEAWAYS");
console.log("========================================");
console.log("1. Bun runs TypeScript directly - no compilation");
console.log("2. Use 'bun add' instead of 'npm install'");
console.log("3. Bun auto-loads .env files");
console.log("4. Use --hot for development, --watch for restart");
console.log("5. Most Node.js code works in Bun");

console.log("\n✅ Lesson 3 Complete! Run: bun lessons/backend/04-bun-apis.ts");
