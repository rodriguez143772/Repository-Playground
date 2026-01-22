/**
 * ============================================================
 * LESSON 12: Utility Types
 * ============================================================
 * 
 * TypeScript provides built-in "utility types" - ready-made type
 * transformations that solve common problems. Instead of writing
 * complex type manipulations yourself, you can use these tools.
 * 
 * Think of utility types as:
 * - Power tools in your workshop (saves time and effort)
 * - Kitchen gadgets (specialized tools for common tasks)
 * - Photoshop filters (transform the input in specific ways)
 * 
 * These are essential for writing clean, maintainable TypeScript!
 */

// ============================================================
// SECTION 1: Partial<T>
// ============================================================

console.log("========================================");
console.log("Partial<T>");
console.log("========================================\n");

/**
 * Partial<T> makes all properties optional.
 * Useful for update functions where you only change some fields.
 */

interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// All properties are now optional
type PartialUser = Partial<User>;

function updateUser(user: User, updates: Partial<User>): User {
  return { ...user, ...updates };
}

const user: User = { id: 1, name: "Alice", email: "alice@example.com", age: 30 };
const updated = updateUser(user, { name: "Alicia" });  // Only update name

console.log("Original:", user);
console.log("Updated:", updated);

// ============================================================
// SECTION 2: Required<T>
// ============================================================

console.log("\n========================================");
console.log("Required<T>");
console.log("========================================\n");

/**
 * Required<T> makes all properties required.
 * Opposite of Partial<T>.
 */

interface Config {
  host?: string;
  port?: number;
  secure?: boolean;
}

// All properties are now required
type RequiredConfig = Required<Config>;

function createServer(config: RequiredConfig): void {
  console.log(`Server: ${config.secure ? "https" : "http"}://${config.host}:${config.port}`);
}

createServer({
  host: "localhost",
  port: 3000,
  secure: true
});

// ============================================================
// SECTION 3: Readonly<T>
// ============================================================

console.log("\n========================================");
console.log("Readonly<T>");
console.log("========================================\n");

/**
 * Readonly<T> makes all properties readonly.
 * Prevents modification after creation.
 */

interface Point {
  x: number;
  y: number;
}

const origin: Readonly<Point> = { x: 0, y: 0 };
// origin.x = 10;  // Error! Cannot assign to 'x' because it is a read-only property

console.log("Readonly origin:", origin);

// Useful for function parameters
function printPoint(point: Readonly<Point>): void {
  // point.x = 100;  // Error! Ensures function doesn't modify input
  console.log(`Point: (${point.x}, ${point.y})`);
}

printPoint({ x: 5, y: 10 });

// ============================================================
// SECTION 4: Pick<T, K>
// ============================================================

console.log("\n========================================");
console.log("Pick<T, K>");
console.log("========================================\n");

/**
 * Pick<T, K> creates a type with only the specified keys.
 * Like selecting columns from a table.
 */

interface Article {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
}

// Only pick these properties
type ArticlePreview = Pick<Article, "id" | "title" | "author">;

const preview: ArticlePreview = {
  id: 1,
  title: "TypeScript Tips",
  author: "Alice"
};

console.log("Article preview:", preview);

// ============================================================
// SECTION 5: Omit<T, K>
// ============================================================

console.log("\n========================================");
console.log("Omit<T, K>");
console.log("========================================\n");

/**
 * Omit<T, K> creates a type without the specified keys.
 * Opposite of Pick<T, K>.
 */

// Remove these properties
type ArticleInput = Omit<Article, "id" | "createdAt" | "updatedAt">;

const newArticle: ArticleInput = {
  title: "New Article",
  content: "Article content...",
  author: "Bob"
};

console.log("Article input (no id/timestamps):", newArticle);

// Combine with Pick
type ArticleSummary = Omit<Pick<Article, "id" | "title" | "author" | "createdAt">, "createdAt">;

// ============================================================
// SECTION 6: Record<K, T>
// ============================================================

console.log("\n========================================");
console.log("Record<K, T>");
console.log("========================================\n");

/**
 * Record<K, T> creates an object type with keys of type K
 * and values of type T.
 */

// String keys, number values
type Scores = Record<string, number>;

const gameScores: Scores = {
  alice: 100,
  bob: 85,
  charlie: 92
};

console.log("Game scores:", gameScores);

// Specific keys with literal types
type Role = "admin" | "user" | "guest";

type Permissions = Record<Role, string[]>;

const rolePermissions: Permissions = {
  admin: ["read", "write", "delete", "manage"],
  user: ["read", "write"],
  guest: ["read"]
};

console.log("Role permissions:", rolePermissions);

// ============================================================
// SECTION 7: Exclude<T, U>
// ============================================================

console.log("\n========================================");
console.log("Exclude<T, U>");
console.log("========================================\n");

/**
 * Exclude<T, U> removes types from a union that are assignable to U.
 */

type AllColors = "red" | "green" | "blue" | "yellow" | "purple";

// Remove "yellow" and "purple"
type PrimaryColors = Exclude<AllColors, "yellow" | "purple">;
// Result: "red" | "green" | "blue"

const primary: PrimaryColors = "red";  // OK
// const invalid: PrimaryColors = "yellow";  // Error!

console.log("Primary color:", primary);

// Exclude null and undefined
type MaybeString = string | null | undefined;
type DefiniteString = Exclude<MaybeString, null | undefined>;
// Result: string

// ============================================================
// SECTION 8: Extract<T, U>
// ============================================================

console.log("\n========================================");
console.log("Extract<T, U>");
console.log("========================================\n");

/**
 * Extract<T, U> keeps only types from a union that are assignable to U.
 * Opposite of Exclude<T, U>.
 */

type AllTypes = string | number | boolean | null | undefined;

// Keep only string and number
type Primitives = Extract<AllTypes, string | number>;
// Result: string | number

// Extract function types
type Mixed = string | (() => void) | number | (() => string);
type Functions = Extract<Mixed, Function>;
// Result: (() => void) | (() => string)

console.log("Extract keeps matching types");

// ============================================================
// SECTION 9: NonNullable<T>
// ============================================================

console.log("\n========================================");
console.log("NonNullable<T>");
console.log("========================================\n");

/**
 * NonNullable<T> removes null and undefined from a type.
 */

type MaybeUser = User | null | undefined;

// Remove null and undefined
type DefiniteUser = NonNullable<MaybeUser>;

function greetUser(user: MaybeUser): void {
  if (user) {
    // user is NonNullable<MaybeUser> here
    console.log(`Hello, ${user.name}!`);
  } else {
    console.log("No user provided");
  }
}

greetUser({ id: 1, name: "Alice", email: "a@b.com", age: 30 });
greetUser(null);

// ============================================================
// SECTION 10: ReturnType<T>
// ============================================================

console.log("\n========================================");
console.log("ReturnType<T>");
console.log("========================================\n");

/**
 * ReturnType<T> extracts the return type of a function.
 */

function createUser(name: string, age: number) {
  return { id: Math.random(), name, age, createdAt: new Date() };
}

// Get the return type of createUser
type CreatedUser = ReturnType<typeof createUser>;
// Result: { id: number; name: string; age: number; createdAt: Date; }

const testUser: CreatedUser = {
  id: 0.123,
  name: "Test",
  age: 25,
  createdAt: new Date()
};

console.log("Created user type:", testUser);

// Works with any function
type StringReturn = ReturnType<() => string>;  // string
type VoidReturn = ReturnType<() => void>;      // void

// ============================================================
// SECTION 11: Parameters<T>
// ============================================================

console.log("\n========================================");
console.log("Parameters<T>");
console.log("========================================\n");

/**
 * Parameters<T> extracts the parameter types as a tuple.
 */

function greet(name: string, age: number, greeting?: string): string {
  return `${greeting || "Hello"}, ${name}! You are ${age}.`;
}

// Get parameter types as tuple
type GreetParams = Parameters<typeof greet>;
// Result: [name: string, age: number, greeting?: string]

// Use with spread
const params: GreetParams = ["Alice", 30, "Hi"];
console.log(greet(...params));

// Get individual parameter type
type FirstParam = Parameters<typeof greet>[0];  // string
type SecondParam = Parameters<typeof greet>[1]; // number

// ============================================================
// SECTION 12: Awaited<T>
// ============================================================

console.log("\n========================================");
console.log("Awaited<T>");
console.log("========================================\n");

/**
 * Awaited<T> unwraps the type inside a Promise.
 */

type PromiseString = Promise<string>;
type ResolvedString = Awaited<PromiseString>;
// Result: string

// Works with nested promises
type NestedPromise = Promise<Promise<number>>;
type ResolvedNumber = Awaited<NestedPromise>;
// Result: number

async function fetchData(): Promise<{ data: string }> {
  return { data: "Hello" };
}

type FetchResult = Awaited<ReturnType<typeof fetchData>>;
// Result: { data: string }

console.log("Awaited unwraps Promise types");

// ============================================================
// SECTION 13: Combining Utility Types
// ============================================================

console.log("\n========================================");
console.log("COMBINING UTILITY TYPES");
console.log("========================================\n");

// Real-world example: API types

interface FullUser {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date | null;
}

// For creating users (no id, timestamps, or hash)
type CreateUserDTO = Omit<FullUser, "id" | "passwordHash" | "createdAt" | "updatedAt" | "lastLogin"> & {
  password: string;  // Add password instead of hash
};

// For updating users (all optional except id)
type UpdateUserDTO = Partial<Omit<FullUser, "id" | "passwordHash" | "createdAt">> & {
  id: number;  // ID is required
};

// For public profile (safe to show)
type PublicUser = Pick<FullUser, "id" | "username" | "createdAt">;

// For admin view (everything except passwordHash)
type AdminUser = Omit<FullUser, "passwordHash">;

const createUserInput: CreateUserDTO = {
  username: "alice",
  email: "alice@example.com",
  password: "secret123"
};

const updateUserInput: UpdateUserDTO = {
  id: 1,
  email: "newemail@example.com"
};

console.log("Create user input:", createUserInput);
console.log("Update user input:", updateUserInput);

// ============================================================
// SECTION 14: Custom Utility Types
// ============================================================

console.log("\n========================================");
console.log("CUSTOM UTILITY TYPES");
console.log("========================================\n");

// Make specific properties optional
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

interface Post {
  id: number;
  title: string;
  content: string;
  published: boolean;
}

// Make 'published' optional
type DraftPost = PartialBy<Post, "published">;

const draft: DraftPost = {
  id: 1,
  title: "Draft",
  content: "..."
  // published is optional
};

// Make specific properties required
type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Deep partial (all nested properties optional too)
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface NestedConfig {
  database: {
    host: string;
    port: number;
    credentials: {
      username: string;
      password: string;
    };
  };
}

type PartialConfig = DeepPartial<NestedConfig>;

const partialConfig: PartialConfig = {
  database: {
    host: "localhost"
    // All other properties are optional
  }
};

console.log("Deep partial config:", partialConfig);

// ============================================================
// QUICK REFERENCE
// ============================================================

console.log("\n========================================");
console.log("QUICK REFERENCE");
console.log("========================================\n");

/**
 * Object transformations:
 * - Partial<T>     - All properties optional
 * - Required<T>    - All properties required
 * - Readonly<T>    - All properties readonly
 * - Pick<T, K>     - Only specified keys
 * - Omit<T, K>     - All except specified keys
 * - Record<K, T>   - Object with keys K and values T
 * 
 * Union transformations:
 * - Exclude<T, U>  - Remove types from union
 * - Extract<T, U>  - Keep only matching types
 * - NonNullable<T> - Remove null and undefined
 * 
 * Function utilities:
 * - ReturnType<T>  - Get return type
 * - Parameters<T>  - Get parameter types as tuple
 * - Awaited<T>     - Unwrap Promise type
 * 
 * Other utilities:
 * - InstanceType<T>       - Get instance type of constructor
 * - ThisParameterType<T>  - Get 'this' parameter type
 * - OmitThisParameter<T>  - Remove 'this' parameter
 * - ConstructorParameters<T> - Get constructor parameter types
 */

console.log("See the quick reference above for all utility types!");

// ============================================================
// KEY TAKEAWAYS
// ============================================================

/**
 * 1. Utility types are built-in type transformations
 * 2. They save time and reduce code duplication
 * 3. Combine them for complex type transformations
 * 4. Create your own custom utility types
 * 
 * Most Common Uses:
 * - Partial<T>: Update functions (change only some fields)
 * - Pick<T, K>: API responses (only send needed data)
 * - Omit<T, K>: Input types (exclude generated fields)
 * - Record<K, T>: Dictionary/map types
 * - ReturnType<T>: Infer types from functions
 * 
 * Now try the practice problems!
 * Run: bun lessons/practice/12-utility-types-practice.ts
 */

console.log("\n✅ Lesson 12 Complete! Now try the practice problems.");
console.log("\n🎉 Congratulations! You've completed the TypeScript curriculum!");
