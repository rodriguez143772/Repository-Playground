/**
 * ============================================================
 * LESSON 11: Generics
 * ============================================================
 * 
 * Generics are like fill-in-the-blank templates for types.
 * Instead of writing the same function for strings, numbers,
 * and objects separately, you write it once with a placeholder.
 * 
 * Think of generics as:
 * - A shipping box: Can hold any item, but once you put books in,
 *   it's a "box of books"
 * - A recipe template: "Make a salad with [vegetable]" works for
 *   any vegetable you choose
 * - A parking spot: Fits any car, but one car at a time
 * 
 * Generics provide TYPE SAFETY while maintaining FLEXIBILITY!
 */

// ============================================================
// SECTION 1: The Problem Generics Solve
// ============================================================

console.log("========================================");
console.log("WHY GENERICS?");
console.log("========================================\n");

// Without generics, we'd need separate functions or use 'any'

// Option 1: Separate functions (repetitive!)
function getFirstString(arr: string[]): string | undefined {
  return arr[0];
}

function getFirstNumber(arr: number[]): number | undefined {
  return arr[0];
}

// Option 2: Use 'any' (loses type safety!)
function getFirstAny(arr: any[]): any {
  return arr[0];
}

const result = getFirstAny([1, 2, 3]);
// result is 'any' - TypeScript can't help us!

console.log("Using 'any' loses type information");

// ============================================================
// SECTION 2: Basic Generic Function
// ============================================================

console.log("\n========================================");
console.log("BASIC GENERIC FUNCTION");
console.log("========================================\n");

// Generic function with type parameter <T>
function getFirst<T>(arr: T[]): T | undefined {
  return arr[0];
}

// TypeScript infers the type from usage
const firstNumber = getFirst([1, 2, 3]);        // number
const firstString = getFirst(["a", "b", "c"]);   // string
const firstBool = getFirst([true, false]);       // boolean

console.log("First number:", firstNumber);
console.log("First string:", firstString);
console.log("First boolean:", firstBool);

// Explicit type argument
const explicit = getFirst<string>(["hello", "world"]);
console.log("Explicit type:", explicit);

// ============================================================
// SECTION 3: Multiple Type Parameters
// ============================================================

console.log("\n========================================");
console.log("MULTIPLE TYPE PARAMETERS");
console.log("========================================\n");

// Two type parameters
function makePair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}

const pair1 = makePair("hello", 42);     // [string, number]
const pair2 = makePair(true, [1, 2, 3]); // [boolean, number[]]

console.log("Pair 1:", pair1);
console.log("Pair 2:", pair2);

// Swap function
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}

const swapped = swap(["hello", 42]);
console.log("Swapped:", swapped);  // [42, "hello"]

// ============================================================
// SECTION 4: Generic Constraints
// ============================================================

console.log("\n========================================");
console.log("GENERIC CONSTRAINTS");
console.log("========================================\n");

// Constrain T to types that have a 'length' property
interface HasLength {
  length: number;
}

function logLength<T extends HasLength>(item: T): void {
  console.log(`Length: ${item.length}`);
}

logLength("hello");      // String has length
logLength([1, 2, 3]);    // Array has length
logLength({ length: 10 }); // Object with length property
// logLength(42);        // Error! Number doesn't have length

// Constrain to object keys
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: "Alice", age: 30, city: "NYC" };
const name = getProperty(person, "name");   // string
const age = getProperty(person, "age");     // number
// getProperty(person, "email");           // Error! "email" is not a key

console.log("Name:", name);
console.log("Age:", age);

// ============================================================
// SECTION 5: Generic Interfaces
// ============================================================

console.log("\n========================================");
console.log("GENERIC INTERFACES");
console.log("========================================\n");

// Generic interface
interface Container<T> {
  value: T;
  getValue(): T;
  setValue(value: T): void;
}

// Implement the interface
class Box<T> implements Container<T> {
  constructor(public value: T) {}

  getValue(): T {
    return this.value;
  }

  setValue(value: T): void {
    this.value = value;
  }
}

const stringBox = new Box<string>("Hello");
console.log("String box:", stringBox.getValue());

const numberBox = new Box<number>(42);
console.log("Number box:", numberBox.getValue());

// Generic interface for API responses
interface ApiResponse<T> {
  data: T;
  status: number;
  timestamp: Date;
}

interface User {
  id: number;
  name: string;
}

const userResponse: ApiResponse<User> = {
  data: { id: 1, name: "Alice" },
  status: 200,
  timestamp: new Date()
};

console.log("API Response:", userResponse);

// ============================================================
// SECTION 6: Generic Type Aliases
// ============================================================

console.log("\n========================================");
console.log("GENERIC TYPE ALIASES");
console.log("========================================\n");

// Generic type alias
type Nullable<T> = T | null;
type Optional<T> = T | undefined;
type Maybe<T> = T | null | undefined;

let nullableName: Nullable<string> = "Alice";
nullableName = null;  // OK

let optionalAge: Optional<number> = 30;
optionalAge = undefined;  // OK

// Result type for operations
type Result<T, E = Error> = 
  | { success: true; value: T }
  | { success: false; error: E };

function divide(a: number, b: number): Result<number, string> {
  if (b === 0) {
    return { success: false, error: "Division by zero" };
  }
  return { success: true, value: a / b };
}

const result1 = divide(10, 2);
const result2 = divide(10, 0);

console.log("10 / 2:", result1);
console.log("10 / 0:", result2);

// ============================================================
// SECTION 7: Generic Classes
// ============================================================

console.log("\n========================================");
console.log("GENERIC CLASSES");
console.log("========================================\n");

// Generic Stack class
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}

const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
numberStack.push(3);

console.log("Stack peek:", numberStack.peek());
console.log("Stack pop:", numberStack.pop());
console.log("Stack size:", numberStack.size());

// Generic Map/Dictionary
class Dictionary<K, V> {
  private items: Map<K, V> = new Map();

  set(key: K, value: V): void {
    this.items.set(key, value);
  }

  get(key: K): V | undefined {
    return this.items.get(key);
  }

  has(key: K): boolean {
    return this.items.has(key);
  }

  delete(key: K): boolean {
    return this.items.delete(key);
  }
}

const ages = new Dictionary<string, number>();
ages.set("Alice", 30);
ages.set("Bob", 25);
console.log("Alice's age:", ages.get("Alice"));

// ============================================================
// SECTION 8: Default Type Parameters
// ============================================================

console.log("\n========================================");
console.log("DEFAULT TYPE PARAMETERS");
console.log("========================================\n");

// Generic with default type
interface ResponseData<T = string> {
  data: T;
  status: number;
}

// Uses default (string)
const stringResponse: ResponseData = {
  data: "Hello, world!",
  status: 200
};

// Override default
const numberResponse: ResponseData<number> = {
  data: 42,
  status: 200
};

console.log("String response:", stringResponse);
console.log("Number response:", numberResponse);

// Multiple defaults
type Pagination<T, PageInfo = { page: number; total: number }> = {
  items: T[];
  pageInfo: PageInfo;
};

const userPage: Pagination<User> = {
  items: [{ id: 1, name: "Alice" }],
  pageInfo: { page: 1, total: 100 }
};

console.log("Paginated users:", userPage);

// ============================================================
// SECTION 9: Generic Utility Functions
// ============================================================

console.log("\n========================================");
console.log("GENERIC UTILITY FUNCTIONS");
console.log("========================================\n");

// Identity function (returns what it receives)
function identity<T>(value: T): T {
  return value;
}

console.log(identity(42));
console.log(identity("hello"));

// Array utilities
function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

function last<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

function reverse<T>(arr: T[]): T[] {
  return [...arr].reverse();
}

function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)];
}

const numbers = [1, 2, 2, 3, 3, 3];
console.log("First:", first(numbers));
console.log("Last:", last(numbers));
console.log("Reversed:", reverse(numbers));
console.log("Unique:", unique(numbers));

// Filter by type
function filterByType<T, U extends T>(
  arr: T[],
  guard: (item: T) => item is U
): U[] {
  return arr.filter(guard);
}

const mixed: (string | number)[] = [1, "a", 2, "b", 3];
const strings = filterByType(mixed, (x): x is string => typeof x === "string");
console.log("Strings only:", strings);

// ============================================================
// SECTION 10: Mapped Types with Generics
// ============================================================

console.log("\n========================================");
console.log("MAPPED TYPES");
console.log("========================================\n");

// Make all properties optional
type Partial2<T> = {
  [K in keyof T]?: T[K];
};

// Make all properties required
type Required2<T> = {
  [K in keyof T]-?: T[K];
};

// Make all properties readonly
type Readonly2<T> = {
  readonly [K in keyof T]: T[K];
};

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type PartialTodo = Partial2<Todo>;
// { title?: string; description?: string; completed?: boolean; }

type ReadonlyTodo = Readonly2<Todo>;
// { readonly title: string; readonly description: string; readonly completed: boolean; }

const partialTodo: PartialTodo = { title: "Learn TypeScript" };
console.log("Partial todo:", partialTodo);

// ============================================================
// SECTION 11: Conditional Types
// ============================================================

console.log("\n========================================");
console.log("CONDITIONAL TYPES");
console.log("========================================\n");

// Basic conditional type
type IsString<T> = T extends string ? true : false;

type A = IsString<string>;  // true
type B = IsString<number>;  // false

// Extract type from array
type ArrayElement<T> = T extends (infer E)[] ? E : never;

type NumElement = ArrayElement<number[]>;  // number
type StrElement = ArrayElement<string[]>;  // string

// Flatten type
type Flatten<T> = T extends any[] ? T[number] : T;

type FlatNumber = Flatten<number[]>;  // number
type FlatString = Flatten<string>;    // string

// NonNullable implementation
type NonNullable2<T> = T extends null | undefined ? never : T;

type MaybeString = string | null | undefined;
type DefiniteString = NonNullable2<MaybeString>;  // string

console.log("Conditional types are evaluated at compile time");

// ============================================================
// SECTION 12: Real-World Examples
// ============================================================

console.log("\n========================================");
console.log("REAL-WORLD EXAMPLES");
console.log("========================================\n");

// Generic HTTP client
class HttpClient {
  async get<T>(url: string): Promise<T> {
    // Simulated fetch
    console.log(`GET ${url}`);
    return {} as T;
  }

  async post<T, R>(url: string, body: T): Promise<R> {
    console.log(`POST ${url}`, body);
    return {} as R;
  }
}

interface CreateUserRequest {
  name: string;
  email: string;
}

interface CreateUserResponse {
  id: number;
  name: string;
  email: string;
}

const client = new HttpClient();

// Type-safe API calls
async function demo() {
  const user = await client.get<User>("/api/users/1");
  const newUser = await client.post<CreateUserRequest, CreateUserResponse>(
    "/api/users",
    { name: "Alice", email: "alice@example.com" }
  );
}

// Event emitter
class EventEmitter<Events extends Record<string, any>> {
  private handlers: Partial<{
    [K in keyof Events]: ((data: Events[K]) => void)[];
  }> = {};

  on<K extends keyof Events>(event: K, handler: (data: Events[K]) => void): void {
    if (!this.handlers[event]) {
      this.handlers[event] = [];
    }
    this.handlers[event]!.push(handler);
  }

  emit<K extends keyof Events>(event: K, data: Events[K]): void {
    const eventHandlers = this.handlers[event];
    if (eventHandlers) {
      eventHandlers.forEach(handler => handler(data));
    }
  }
}

// Define event types
interface AppEvents {
  login: { userId: string; timestamp: Date };
  logout: { userId: string };
  error: { message: string; code: number };
}

const emitter = new EventEmitter<AppEvents>();

emitter.on("login", (data) => {
  console.log(`User ${data.userId} logged in`);
});

emitter.emit("login", { userId: "user-123", timestamp: new Date() });

// ============================================================
// KEY TAKEAWAYS
// ============================================================

/**
 * Generics Basics:
 * - <T> is a type parameter (placeholder)
 * - Provides type safety with flexibility
 * - TypeScript infers types from usage
 * 
 * Constraints:
 * - T extends Type - limits what T can be
 * - K extends keyof T - limits to object keys
 * 
 * Common Patterns:
 * - Generic functions: function fn<T>(arg: T): T
 * - Generic interfaces: interface Container<T>
 * - Generic classes: class Box<T>
 * - Generic type aliases: type Nullable<T> = T | null
 * 
 * Advanced Features:
 * - Default type parameters: <T = string>
 * - Multiple type parameters: <T, U, V>
 * - Mapped types: { [K in keyof T]: ... }
 * - Conditional types: T extends X ? Y : Z
 * 
 * Now try the practice problems!
 * Run: bun lessons/practice/11-generics-practice.ts
 */

console.log("\n✅ Lesson 11 Complete! Now try the practice problems.");
