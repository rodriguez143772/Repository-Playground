/**
 * ============================================================
 * PRACTICE: Objects
 * ============================================================
 * 
 * Instructions:
 * 1. Implement each function
 * 2. Run: bun lessons/practice/07-objects-practice.ts
 * 3. Check if all tests pass!
 */

// ============================================================
// PROBLEM 1: Create a Person Object
// ============================================================
/**
 * Create a function that returns a person object with
 * name, age, and a greet method that returns "Hello, I'm {name}"
 */

interface Person {
  name: string;
  age: number;
  greet(): string;
}

function createPerson(name: string, age: number): Person {
  // TODO: Return a person object with greet method
  return { name: "", age: 0, greet: () => "" };
}

// ============================================================
// PROBLEM 2: Merge Objects
// ============================================================
/**
 * Merge two objects, with properties from the second
 * overriding properties from the first.
 */

function mergeObjects<T extends object, U extends object>(obj1: T, obj2: U): T & U {
  // TODO: Merge obj2 into obj1
  return {} as T & U;
}

// ============================================================
// PROBLEM 3: Get Nested Value
// ============================================================
/**
 * Safely get a nested value from an object using a path string.
 * Path is dot-separated: "user.address.city"
 * Return undefined if path doesn't exist.
 */

function getNestedValue(obj: Record<string, any>, path: string): any {
  // TODO: Navigate the path and return the value
  return undefined;
}

// ============================================================
// PROBLEM 4: Count Properties
// ============================================================
/**
 * Count the number of properties in an object.
 */

function countProperties(obj: object): number {
  // TODO: Count properties
  return 0;
}

// ============================================================
// PROBLEM 5: Filter Object
// ============================================================
/**
 * Create a new object containing only properties that pass the test.
 */

function filterObject<T>(
  obj: Record<string, T>,
  predicate: (value: T, key: string) => boolean
): Record<string, T> {
  // TODO: Filter object properties
  return {};
}

// ============================================================
// PROBLEM 6: Map Object Values
// ============================================================
/**
 * Transform all values in an object using a mapper function.
 */

function mapObjectValues<T, U>(
  obj: Record<string, T>,
  mapper: (value: T) => U
): Record<string, U> {
  // TODO: Transform all values
  return {};
}

// ============================================================
// PROBLEM 7: Invert Object
// ============================================================
/**
 * Swap keys and values in an object.
 * { a: 1, b: 2 } becomes { 1: "a", 2: "b" }
 */

function invertObject(obj: Record<string, string | number>): Record<string, string> {
  // TODO: Invert keys and values
  return {};
}

// ============================================================
// PROBLEM 8: Deep Clone
// ============================================================
/**
 * Create a deep copy of an object (nested objects too).
 * Don't use JSON.parse/stringify (handle it manually for practice).
 */

function deepClone<T>(obj: T): T {
  // TODO: Deep clone the object
  return obj;
}

// ============================================================
// PROBLEM 9: Omit Properties
// ============================================================
/**
 * Create a new object without the specified keys.
 */

function omit<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  // TODO: Return object without specified keys
  return {} as Omit<T, K>;
}

// ============================================================
// PROBLEM 10: Flatten Object
// ============================================================
/**
 * Flatten a nested object into a single level.
 * { a: { b: { c: 1 } } } becomes { "a.b.c": 1 }
 */

function flattenObject(
  obj: Record<string, any>,
  prefix = ""
): Record<string, any> {
  // TODO: Flatten nested object
  return {};
}

// ============================================================
// PROBLEM 11: Find Key by Value
// ============================================================
/**
 * Find the first key that has the given value.
 * Return undefined if not found.
 */

function findKeyByValue<T>(obj: Record<string, T>, value: T): string | undefined {
  // TODO: Find key with matching value
  return undefined;
}

// ============================================================
// PROBLEM 12: Object Difference
// ============================================================
/**
 * Find properties that are different between two objects.
 * Return an object with the differing properties from obj2.
 */

function objectDiff<T extends Record<string, any>>(
  obj1: T,
  obj2: T
): Partial<T> {
  // TODO: Find differences
  return {};
}

// ============================================================
// TEST YOUR ANSWERS
// ============================================================

console.log("========================================");
console.log("TESTING YOUR ANSWERS");
console.log("========================================\n");

// Problem 1
console.log("--- Problem 1: Create Person ---");
const person = createPerson("Alice", 30);
if (person.name === "Alice" && person.age === 30 && person.greet() === "Hello, I'm Alice") {
  console.log("✅ Problem 1 PASSED!\n");
} else {
  console.log(`❌ Person incorrect: ${JSON.stringify(person)}\n`);
}

// Problem 2
console.log("--- Problem 2: Merge Objects ---");
const m = mergeObjects({ a: 1, b: 2 }, { b: 3, c: 4 });
if (m.a === 1 && m.b === 3 && m.c === 4) {
  console.log("✅ Problem 2 PASSED!\n");
} else {
  console.log(`❌ Merged: ${JSON.stringify(m)}\n`);
}

// Problem 3
console.log("--- Problem 3: Get Nested Value ---");
const nested = { user: { address: { city: "NYC" } } };
if (getNestedValue(nested, "user.address.city") === "NYC" && 
    getNestedValue(nested, "user.phone") === undefined) {
  console.log("✅ Problem 3 PASSED!\n");
} else {
  console.log(`❌ getNestedValue failed\n`);
}

// Problem 4
console.log("--- Problem 4: Count Properties ---");
if (countProperties({ a: 1, b: 2, c: 3 }) === 3 && countProperties({}) === 0) {
  console.log("✅ Problem 4 PASSED!\n");
} else {
  console.log(`❌ countProperties failed\n`);
}

// Problem 5
console.log("--- Problem 5: Filter Object ---");
const filtered = filterObject({ a: 1, b: 2, c: 3 }, v => v > 1);
if (JSON.stringify(filtered) === JSON.stringify({ b: 2, c: 3 })) {
  console.log("✅ Problem 5 PASSED!\n");
} else {
  console.log(`❌ Filtered: ${JSON.stringify(filtered)}\n`);
}

// Problem 6
console.log("--- Problem 6: Map Object Values ---");
const mapped = mapObjectValues({ a: 1, b: 2 }, v => v * 10);
if (mapped.a === 10 && mapped.b === 20) {
  console.log("✅ Problem 6 PASSED!\n");
} else {
  console.log(`❌ Mapped: ${JSON.stringify(mapped)}\n`);
}

// Problem 7
console.log("--- Problem 7: Invert Object ---");
const inverted = invertObject({ a: "1", b: "2" });
if (inverted["1"] === "a" && inverted["2"] === "b") {
  console.log("✅ Problem 7 PASSED!\n");
} else {
  console.log(`❌ Inverted: ${JSON.stringify(inverted)}\n`);
}

// Problem 8
console.log("--- Problem 8: Deep Clone ---");
const original = { a: 1, nested: { b: 2 } };
const cloned = deepClone(original);
cloned.nested.b = 999;
if (original.nested.b === 2) {
  console.log("✅ Problem 8 PASSED!\n");
} else {
  console.log(`❌ Deep clone failed - original was modified\n`);
}

// Problem 9
console.log("--- Problem 9: Omit Properties ---");
const omitted = omit({ a: 1, b: 2, c: 3 }, ["b"]);
if (omitted.a === 1 && omitted.c === 3 && !("b" in omitted)) {
  console.log("✅ Problem 9 PASSED!\n");
} else {
  console.log(`❌ Omitted: ${JSON.stringify(omitted)}\n`);
}

// Problem 10
console.log("--- Problem 10: Flatten Object ---");
const flat = flattenObject({ a: { b: { c: 1 } }, d: 2 });
if (flat["a.b.c"] === 1 && flat["d"] === 2) {
  console.log("✅ Problem 10 PASSED!\n");
} else {
  console.log(`❌ Flattened: ${JSON.stringify(flat)}\n`);
}

// Problem 11
console.log("--- Problem 11: Find Key by Value ---");
if (findKeyByValue({ a: 1, b: 2, c: 3 }, 2) === "b" &&
    findKeyByValue({ a: 1 }, 5) === undefined) {
  console.log("✅ Problem 11 PASSED!\n");
} else {
  console.log(`❌ findKeyByValue failed\n`);
}

// Problem 12
console.log("--- Problem 12: Object Difference ---");
const diff = objectDiff({ a: 1, b: 2, c: 3 }, { a: 1, b: 99, c: 3 });
if (JSON.stringify(diff) === JSON.stringify({ b: 99 })) {
  console.log("✅ Problem 12 PASSED!\n");
} else {
  console.log(`❌ Diff: ${JSON.stringify(diff)}\n`);
}

console.log("========================================");
console.log("Practice complete!");
console.log("========================================");
