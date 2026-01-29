/**
 * ============================================================
 * PRACTICE: Bun Runtime (Module 2.1)
 * ============================================================
 *
 * Test your Bun skills with these exercises!
 *
 * Instructions:
 * 1. Complete each TODO by implementing the function
 * 2. Run: bun lessons/backend/practice/01-bun-practice.ts
 * 3. Check if all tests pass!
 */

console.log("========================================");
console.log("PRACTICE: BUN RUNTIME");
console.log("========================================\n");

// ============================================================
// PROBLEM 1: File Operations
// ============================================================

/**
 * Create a function that reads a JSON file and returns its parsed content.
 * If the file doesn't exist, return the default value.
 */

async function readJsonFile<T>(path: string, defaultValue: T): Promise<T> {

  const file = Bun.file(path);
  if(await file.exists()){
    const contents = await file.json();
    console.log(contents)
    return contents as T;
    
  }
  console.log(`Does not exist, Default: ${defaultValue}`)
  return defaultValue as T;

  
}

// ============================================================
// PROBLEM 2: Write JSON File
// ============================================================

/**
 * Write an object to a JSON file with pretty formatting.
 */

async function writeJsonFile(path: string, data: unknown): Promise<void> {

  await Bun.write(path, JSON.stringify(data, null, 2)); 
  
}

// ============================================================
// PROBLEM 3: Hash Password
// ============================================================


async function hashPassword(password: string): Promise<string> {
  // TODO: Implement using Bun.password.hash()
  const HashedPassword = await Bun.password.hash(password);
  return HashedPassword;
}



async function verifyPassword(password: string, hash: string): Promise<boolean> {


  const isVerified = await Bun.password.verify(password, hash)
  return isVerified;
  
}

// ============================================================
// PROBLEM 4: Generate Unique ID
// ============================================================

/**
 * Generate a unique identifier.
 */

function generateId(): string {

  const UUID = crypto.randomUUID();
  return UUID;
}

// ============================================================
// PROBLEM 5: Measure Execution Time
// ============================================================

/**
 * Measure how long a function takes to execute.
 * Return the result and duration in milliseconds.
 */

async function measureTime<T>(fn: () => Promise<T>): Promise<{ result: T; durationMs: number }> {
  const start = Bun.nanoseconds();
  const result = await fn();
  const end = Bun.nanoseconds();

  const durationMs = (end - start);
  return { result, durationMs };
}



// ============================================================
// PROBLEM 6: Run Shell Command
// ============================================================

/**
 * Run a shell command and return the output as a string.
 * If the command fails, return null.
 */

import { $, file } from "bun";
import { promise } from "zod/v4";

async function runCommand(command: string): Promise<string | null> {

  try{
    const shellOutput = await $`${{raw: command}}`.text();
    console.log("Output Success")
    console.log(shellOutput)
    return(shellOutput);
  }

  
  catch(err){
    console.log(err)
    return(null)
  }
}

// ============================================================
// PROBLEM 7: File Watcher Setup
// ============================================================

/**
 * Create a function that sets up file watching.
 * Returns a cleanup function to stop watching.
 */
import { watch } from 'node:fs';
function watchFile(path: string, onChange: (event: string) => void): () => void {
  // TODO: Implement using fs.watch
  // Hint: Import watch from 'node:fs'
  // Hint: Return a function that calls watcher.close()


  return () => {};
}

// ============================================================
// PROBLEM 8: Environment Variable Helper
// ============================================================

/**
 * Get an environment variable with a default value.
 * If required is true and the variable is not set, throw an error.
 */

function getEnv(name: string, options?: { default?: string; required?: boolean }): string {
  // TODO: Implement using Bun.env or process.env
  // Hint: Check if value exists
  // Hint: Return default if provided
  // Hint: Throw if required and not found

  // Takes a string (name), and an object (options), then returns a string. 
  // It can either return the environment Variable if it is defined.
    const envVar = process.env[name]

    //  if(envVar){
    //   return envVar;
    // }
    // if(options?.default){
    //   return options.default
    // }
    // if(options?.required){
    //   throw new Error("Environment Variable and Default not found")
    // }
    // else{
    //   return ""
    // }

    // if no environment variable, and there is a default, return the default
      // if(!envVar){ 
      //   if(options?.default){
      //     return options.default
      //   }
      //   if(options?.required){
      //     throw new Error(`There is no default nor environment variable with the name ${name}`)
      //   }
      //     return ""
      // }
      // return envVar

      
      return envVar !== undefined 
      ? envVar 
      : options?.default !== undefined 
      ? options.default 
      : options?.required 
      ? (() => {throw new Error("ENV Does not exist")})() 
      : ""


  }




// ============================================================
// TESTS
// ============================================================

console.log("Running tests...\n");

let passed = 0;
let failed = 0;

// Test 1: File Operations
const testDir = import.meta.dir;
const testJsonPath = `${testDir}/test-data.json`;

await writeJsonFile(testJsonPath, { name: "test", value: 42 });
const readData = await readJsonFile<{ name: string; value: number }>(testJsonPath, {
  name: "",
  value: 0,
});

if (readData.name === "test" && readData.value === 42) {
  console.log("✅ Problem 1-2: File operations work");
  passed++;
} else {
  console.log("❌ Problem 1-2: File operations failed");
  failed++;
}

// Cleanup
await Bun.file(testJsonPath).exists() &&
  (await import("node:fs/promises")).unlink(testJsonPath).catch(() => {});

// Test 3: Password hashing
const testPassword = "mySecretPassword123";
const hash = await hashPassword(testPassword);
const isValid = await verifyPassword(testPassword, hash);
const isInvalid = await verifyPassword("wrongPassword", hash);

if (hash.length > 0 && isValid && !isInvalid) {
  console.log("✅ Problem 3: Password hashing works");
  passed++;
} else {
  console.log("❌ Problem 3: Password hashing failed");
  failed++;
}

// Test 4: Generate ID
const id1 = generateId();
const id2 = generateId();
const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

if (uuidRegex.test(id1) && uuidRegex.test(id2) && id1 !== id2) {
  console.log("✅ Problem 4: ID generation works");
  passed++;
} else {
  console.log("❌ Problem 4: ID generation failed");
  failed++;
}

// Test 5: Measure time
const { result: sleepResult, durationMs } = await measureTime(async () => {
  await Bun.sleep(50);
  return "done";
});

if (sleepResult === "done" && durationMs >= 40) {
  console.log("✅ Problem 5: Time measurement works");
  passed++;
} else {
  console.log(`❌ Problem 5: Time measurement failed (got ${durationMs}ms)`);
  failed++;
}

// Test 6: Run command
const bunVersion = await runCommand("bun --version");


if (bunVersion && bunVersion.includes(".")) {
  console.log("✅ Problem 6: Shell commands work");
  passed++;
} else {
  console.log("❌ Problem 6: Shell commands failed");
  failed++;
}

// Test 7: Watch file (basic test)
let watchCalled = false;
const cleanup = watchFile(testJsonPath, () => {
  watchCalled = true;
});
cleanup();
console.log("✅ Problem 7: Watch setup works (cleanup returned)");
passed++;

// Test 8: Environment variables
process.env.TEST_VAR = "test_value";
const envValue = getEnv("TEST_VAR");
const defaultValue = getEnv("NONEXISTENT_VAR", { default: "default" });

if (envValue === "test_value" && defaultValue === "default") {
  console.log("✅ Problem 8: Environment variables work");
  passed++;
} else {
  console.log("❌ Problem 8: Environment variables failed");
  failed++;
}

// Results
console.log(`\n${passed}/${passed + failed} tests passed`);
if (failed === 0) {
  console.log("\n🎉 All Bun practice problems complete!");
}