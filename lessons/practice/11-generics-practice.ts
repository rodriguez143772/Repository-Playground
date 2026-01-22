/**
 * ============================================================
 * PRACTICE: Generics
 * ============================================================
 * 
 * Instructions:
 * 1. Implement each generic function/type
 * 2. Run: bun lessons/practice/11-generics-practice.ts
 * 3. Check if all tests pass!
 */

// ============================================================
// PROBLEM 1: Basic Generic Function
// ============================================================
/**
 * Create a generic function that wraps a value in an array.
 * wrapInArray(42) → [42]
 * wrapInArray("hello") → ["hello"]
 */

function wrapInArray<T>(value: T): T[] {
  // TODO: Implement
  return [];
}

// ============================================================
// PROBLEM 2: Generic Pair
// ============================================================
/**
 * Create a generic function that returns an object with 'first' and 'second'.
 * createPair(1, "one") → { first: 1, second: "one" }
 */

interface Pair<T, U> {
  first: T;
  second: U;
}

function createPair<T, U>(first: T, second: U): Pair<T, U> {
  // TODO: Implement
  return { first: undefined as any, second: undefined as any };
}

// ============================================================
// PROBLEM 3: Generic Constraint
// ============================================================
/**
 * Create a function that gets the 'id' property from any object that has one.
 * The constraint ensures the object has an 'id' property.
 */

interface HasId {
  id: number | string;
}

function getId<T extends HasId>(item: T): number | string {
  // TODO: Implement
  return "";
}

// ============================================================
// PROBLEM 4: Generic Array Utilities
// ============================================================
/**
 * Implement these generic array utilities:
 * - lastElement: Get last element of array
 * - prependElement: Add element to beginning
 * - dropFirst: Remove first element and return rest
 */

function lastElement<T>(arr: T[]): T | undefined {
  // TODO: Implement
  return undefined;
}

function prependElement<T>(arr: T[], element: T): T[] {
  // TODO: Implement
  return [];
}

function dropFirst<T>(arr: T[]): T[] {
  // TODO: Implement
  return [];
}

// ============================================================
// PROBLEM 5: Generic Map Function
// ============================================================
/**
 * Create a generic map function that transforms array elements.
 * Like Array.prototype.map but as a standalone function.
 */

function map<T, U>(arr: T[], fn: (item: T) => U): U[] {
  // TODO: Implement
  return [];
}

// ============================================================
// PROBLEM 6: Generic Filter Function
// ============================================================
/**
 * Create a generic filter function.
 * Like Array.prototype.filter but as a standalone function.
 */

function filter<T>(arr: T[], predicate: (item: T) => boolean): T[] {
  // TODO: Implement
  return [];
}

// ============================================================
// PROBLEM 7: Generic Reduce Function
// ============================================================
/**
 * Create a generic reduce function.
 * Like Array.prototype.reduce but as a standalone function.
 */

function reduce<T, U>(
  arr: T[],
  fn: (accumulator: U, current: T) => U,
  initial: U
): U {
  // TODO: Implement
  return initial;
}

// ============================================================
// PROBLEM 8: Key-Value Store
// ============================================================
/**
 * Create a generic class for a key-value store.
 * Methods: get, set, has, delete, clear, keys, values
 */

class KeyValueStore<K, V> {
  private store = new Map<K, V>();

  set(key: K, value: V): void {
    // TODO: Implement
  }

  get(key: K): V | undefined {
    // TODO: Implement
    return undefined;
  }

  has(key: K): boolean {
    // TODO: Implement
    return false;
  }

  delete(key: K): boolean {
    // TODO: Implement
    return false;
  }

  clear(): void {
    // TODO: Implement
  }

  keys(): K[] {
    // TODO: Implement
    return [];
  }

  values(): V[] {
    // TODO: Implement
    return [];
  }
}

// ============================================================
// PROBLEM 9: Generic Type Alias
// ============================================================
/**
 * Create a Result type that represents either success or failure.
 * - Success: { ok: true, value: T }
 * - Failure: { ok: false, error: E }
 */

// TODO: Define the Result type alias
type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };

function divide(a: number, b: number): Result<number, string> {
  // TODO: Return success or failure result
  return { ok: false, error: "" };
}

// ============================================================
// PROBLEM 10: Generic Merge Function
// ============================================================
/**
 * Create a function that merges two objects into one.
 * Properties from the second object override the first.
 */

function merge<T extends object, U extends object>(obj1: T, obj2: U): T & U {
  // TODO: Implement
  return {} as T & U;
}

// ============================================================
// PROBLEM 11: Generic Pick Function
// ============================================================
/**
 * Create a function that picks specified keys from an object.
 * pick({ a: 1, b: 2, c: 3 }, ["a", "c"]) → { a: 1, c: 3 }
 */

function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  // TODO: Implement
  return {} as Pick<T, K>;
}

// ============================================================
// PROBLEM 12: Generic Event Handler
// ============================================================
/**
 * Create a type-safe event handler system.
 * Define events with their payload types, then create functions
 * to add handlers and emit events.
 */

class TypedEventEmitter<Events extends Record<string, any>> {
  private handlers: { [K in keyof Events]?: ((data: Events[K]) => void)[] } = {};

  on<K extends keyof Events>(event: K, handler: (data: Events[K]) => void): void {
    // TODO: Add handler for event
  }

  emit<K extends keyof Events>(event: K, data: Events[K]): void {
    // TODO: Call all handlers for event
  }

  off<K extends keyof Events>(event: K, handler: (data: Events[K]) => void): void {
    // TODO: Remove handler for event
  }
}

// ============================================================
// TEST YOUR ANSWERS
// ============================================================

console.log("========================================");
console.log("TESTING YOUR ANSWERS");
console.log("========================================\n");

// Problem 1
console.log("--- Problem 1: Wrap in Array ---");
if (JSON.stringify(wrapInArray(42)) === "[42]" &&
    JSON.stringify(wrapInArray("hello")) === '["hello"]') {
  console.log("✅ Problem 1 PASSED!\n");
} else {
  console.log(`❌ wrapInArray results incorrect\n`);
}

// Problem 2
console.log("--- Problem 2: Create Pair ---");
const pair = createPair(1, "one");
if (pair.first === 1 && pair.second === "one") {
  console.log("✅ Problem 2 PASSED!\n");
} else {
  console.log(`❌ Pair: ${JSON.stringify(pair)}\n`);
}

// Problem 3
console.log("--- Problem 3: Get ID ---");
if (getId({ id: 123, name: "test" }) === 123 &&
    getId({ id: "abc", value: 42 }) === "abc") {
  console.log("✅ Problem 3 PASSED!\n");
} else {
  console.log(`❌ getId results incorrect\n`);
}

// Problem 4
console.log("--- Problem 4: Array Utilities ---");
if (lastElement([1, 2, 3]) === 3 &&
    JSON.stringify(prependElement([2, 3], 1)) === "[1,2,3]" &&
    JSON.stringify(dropFirst([1, 2, 3])) === "[2,3]") {
  console.log("✅ Problem 4 PASSED!\n");
} else {
  console.log(`❌ Array utilities incorrect\n`);
}

// Problem 5
console.log("--- Problem 5: Map Function ---");
const mapped = map([1, 2, 3], x => x * 2);
if (JSON.stringify(mapped) === "[2,4,6]") {
  console.log("✅ Problem 5 PASSED!\n");
} else {
  console.log(`❌ Mapped: ${JSON.stringify(mapped)}\n`);
}

// Problem 6
console.log("--- Problem 6: Filter Function ---");
const filtered = filter([1, 2, 3, 4, 5], x => x % 2 === 0);
if (JSON.stringify(filtered) === "[2,4]") {
  console.log("✅ Problem 6 PASSED!\n");
} else {
  console.log(`❌ Filtered: ${JSON.stringify(filtered)}\n`);
}

// Problem 7
console.log("--- Problem 7: Reduce Function ---");
const sum = reduce([1, 2, 3, 4], (acc, x) => acc + x, 0);
if (sum === 10) {
  console.log("✅ Problem 7 PASSED!\n");
} else {
  console.log(`❌ Sum: ${sum}\n`);
}

// Problem 8
console.log("--- Problem 8: Key-Value Store ---");
const store = new KeyValueStore<string, number>();
store.set("a", 1);
store.set("b", 2);
if (store.get("a") === 1 && store.has("b") && !store.has("c")) {
  store.delete("a");
  if (!store.has("a")) {
    console.log("✅ Problem 8 PASSED!\n");
  } else {
    console.log(`❌ Delete failed\n`);
  }
} else {
  console.log(`❌ Store operations failed\n`);
}

// Problem 9
console.log("--- Problem 9: Result Type ---");
const success = divide(10, 2);
const failure = divide(10, 0);
if (success.ok && success.value === 5 && !failure.ok) {
  console.log("✅ Problem 9 PASSED!\n");
} else {
  console.log(`❌ Result type incorrect\n`);
}

// Problem 10
console.log("--- Problem 10: Merge Function ---");
const merged = merge({ a: 1, b: 2 }, { b: 3, c: 4 });
if (merged.a === 1 && merged.b === 3 && merged.c === 4) {
  console.log("✅ Problem 10 PASSED!\n");
} else {
  console.log(`❌ Merged: ${JSON.stringify(merged)}\n`);
}

// Problem 11
console.log("--- Problem 11: Pick Function ---");
const picked = pick({ a: 1, b: 2, c: 3 }, ["a", "c"]);
if (picked.a === 1 && picked.c === 3 && !("b" in picked)) {
  console.log("✅ Problem 11 PASSED!\n");
} else {
  console.log(`❌ Picked: ${JSON.stringify(picked)}\n`);
}

// Problem 12
console.log("--- Problem 12: Event Emitter ---");
interface TestEvents {
  greet: { name: string };
  count: { value: number };
}

const emitter = new TypedEventEmitter<TestEvents>();
let received = "";
emitter.on("greet", (data) => { received = data.name; });
emitter.emit("greet", { name: "Alice" });
if (received === "Alice") {
  console.log("✅ Problem 12 PASSED!\n");
} else {
  console.log(`❌ Event not received correctly\n`);
}

console.log("========================================");
console.log("Practice complete!");
console.log("========================================");
