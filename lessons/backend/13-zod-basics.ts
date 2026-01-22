/**
 * ============================================================
 * LESSON 13: Zod Basics
 * ============================================================
 *
 * Zod is a TypeScript-first schema validation library.
 * It validates data AND infers TypeScript types automatically!
 *
 * ANALOGY: Zod is like a strict bouncer at a club:
 * - Checks if you meet requirements (validation)
 * - Gives you a wristband (typed data)
 * - Tells you exactly why you can't enter (error messages)
 *
 * Why Zod?
 * - TypeScript types from schemas (no duplication)
 * - Runtime validation
 * - Excellent error messages
 * - Works everywhere (browser, Node, Bun, Deno)
 *
 * Install: bun add zod
 */

import { z } from "zod";

console.log("========================================");
console.log("LESSON 13: ZOD BASICS");
console.log("========================================\n");

// ============================================================
// SECTION 1: Primitive Schemas
// ============================================================

/**
 * Zod has schemas for all JavaScript primitives.
 */

console.log("--- Primitive Schemas ---");

// String
const stringSchema = z.string();
console.log(`"hello" is string: ${stringSchema.safeParse("hello").success}`);
console.log(`123 is string: ${stringSchema.safeParse(123).success}`);

// Number
const numberSchema = z.number();
console.log(`42 is number: ${numberSchema.safeParse(42).success}`);
console.log(`"42" is number: ${numberSchema.safeParse("42").success}`);

// Boolean
const boolSchema = z.boolean();
console.log(`true is boolean: ${boolSchema.safeParse(true).success}`);

// Null and Undefined
const nullSchema = z.null();
const undefinedSchema = z.undefined();
console.log(`null is null: ${nullSchema.safeParse(null).success}`);

// BigInt
const bigintSchema = z.bigint();
console.log(`BigInt is bigint: ${bigintSchema.safeParse(BigInt(100)).success}`);

// Date
const dateSchema = z.date();
console.log(`new Date() is date: ${dateSchema.safeParse(new Date()).success}`);

// ============================================================
// SECTION 2: Parse vs SafeParse
// ============================================================

/**
 * - parse(): Throws if invalid
 * - safeParse(): Returns result object (never throws)
 */

console.log("\n--- Parse vs SafeParse ---");

const emailSchema = z.string().email();

// parse() - throws on failure
try {
  const email = emailSchema.parse("user@example.com");
  console.log(`Parsed email: ${email}`);
} catch (error) {
  console.log("Parse failed");
}

// safeParse() - returns result object
const result = emailSchema.safeParse("not-an-email");
if (result.success) {
  console.log(`Email: ${result.data}`);
} else {
  console.log(`Validation error: ${result.error.issues[0].message}`);
}

// ============================================================
// SECTION 3: String Validations
// ============================================================

/**
 * Zod provides many string-specific validations.
 */

console.log("\n--- String Validations ---");

// Common string validations
const userSchema = z.object({
  email: z.string().email(),
  url: z.string().url(),
  uuid: z.string().uuid(),
  username: z.string().min(3).max(20),
  bio: z.string().optional(),
});

// Test
const validUser = {
  email: "user@example.com",
  url: "https://example.com",
  uuid: "550e8400-e29b-41d4-a716-446655440000",
  username: "alice",
};

const userResult = userSchema.safeParse(validUser);
console.log(`Valid user: ${userResult.success}`);

// More string validations
const stringValidations = z.object({
  starts: z.string().startsWith("Hello"),
  ends: z.string().endsWith("!"),
  contains: z.string().includes("world"),
  regex: z.string().regex(/^[a-z]+$/),
  length: z.string().length(5),
  trim: z.string().trim(), // Auto-trims whitespace
  lower: z.string().toLowerCase(),
  upper: z.string().toUpperCase(),
});

console.log("String methods: email, url, min, max, regex, trim, etc.");

// ============================================================
// SECTION 4: Number Validations
// ============================================================

/**
 * Number-specific validations.
 */

console.log("\n--- Number Validations ---");

const ageSchema = z.number().int().min(0).max(150);
const priceSchema = z.number().positive().multipleOf(0.01);
const ratingSchema = z.number().min(1).max(5);

console.log(`Age 25: ${ageSchema.safeParse(25).success}`);
console.log(`Age -5: ${ageSchema.safeParse(-5).success}`);
console.log(`Price 19.99: ${priceSchema.safeParse(19.99).success}`);
console.log(`Rating 4.5: ${ratingSchema.safeParse(4.5).success}`);

// All number validations
const numberMethods = `
z.number()
  .int()           // Integer only
  .positive()      // > 0
  .negative()      // < 0
  .nonnegative()   // >= 0
  .nonpositive()   // <= 0
  .min(5)          // >= 5
  .max(10)         // <= 10
  .multipleOf(5)   // Divisible by 5
  .finite()        // Not Infinity
  .safe()          // Safe integer range
`;
console.log(numberMethods);

// ============================================================
// SECTION 5: Object Schemas
// ============================================================

/**
 * Define object shapes with z.object().
 */

console.log("\n--- Object Schemas ---");

// Simple object
const personSchema = z.object({
  name: z.string(),
  age: z.number().int().positive(),
  email: z.string().email(),
});

// Parse object
const person = personSchema.parse({
  name: "Alice",
  age: 30,
  email: "alice@example.com",
});
console.log(`Parsed person: ${JSON.stringify(person)}`);

// Nested objects
const companySchema = z.object({
  name: z.string(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  }),
  employees: z.number().int().nonnegative(),
});

const company = companySchema.parse({
  name: "TechCorp",
  address: {
    street: "123 Main St",
    city: "San Francisco",
    country: "USA",
  },
  employees: 100,
});
console.log(`Company: ${company.name} in ${company.address.city}`);

// ============================================================
// SECTION 6: Array Schemas
// ============================================================

/**
 * Validate arrays with z.array().
 */

console.log("\n--- Array Schemas ---");

// Array of strings
const tagsSchema = z.array(z.string());
console.log(`Tags valid: ${tagsSchema.safeParse(["a", "b", "c"]).success}`);

// Array with constraints
const scoresSchema = z.array(z.number()).min(1).max(10);
console.log(`Scores [1,2,3]: ${scoresSchema.safeParse([1, 2, 3]).success}`);
console.log(`Scores []: ${scoresSchema.safeParse([]).success}`);

// Array of objects
const usersSchema = z.array(personSchema);
const users = usersSchema.parse([
  { name: "Alice", age: 30, email: "alice@example.com" },
  { name: "Bob", age: 25, email: "bob@example.com" },
]);
console.log(`Parsed ${users.length} users`);

// Non-empty array
const nonEmptySchema = z.array(z.string()).nonempty();
console.log(`Non-empty []: ${nonEmptySchema.safeParse([]).success}`);
console.log(`Non-empty ["a"]: ${nonEmptySchema.safeParse(["a"]).success}`);

// ============================================================
// SECTION 7: Optional and Nullable
// ============================================================

/**
 * Handle optional and nullable values.
 */

console.log("\n--- Optional and Nullable ---");

// Optional (can be undefined or missing)
const optionalSchema = z.object({
  required: z.string(),
  optional: z.string().optional(), // string | undefined
});

console.log(`With optional: ${optionalSchema.safeParse({ required: "yes" }).success}`);
console.log(
  `With optional value: ${optionalSchema.safeParse({ required: "yes", optional: "maybe" }).success}`
);

// Nullable (can be null)
const nullableSchema = z.object({
  value: z.string().nullable(), // string | null
});

console.log(`Nullable null: ${nullableSchema.safeParse({ value: null }).success}`);
console.log(`Nullable string: ${nullableSchema.safeParse({ value: "text" }).success}`);

// Nullish (optional + nullable = undefined | null)
const nullishSchema = z.string().nullish(); // string | null | undefined
console.log(`Nullish undefined: ${nullishSchema.safeParse(undefined).success}`);
console.log(`Nullish null: ${nullishSchema.safeParse(null).success}`);

// ============================================================
// SECTION 8: Default Values
// ============================================================

/**
 * Provide default values for missing fields.
 */

console.log("\n--- Default Values ---");

const settingsSchema = z.object({
  theme: z.string().default("light"),
  pageSize: z.number().default(10),
  notifications: z.boolean().default(true),
});

// Parse with defaults
const settings = settingsSchema.parse({});
console.log(`Defaults: ${JSON.stringify(settings)}`);

const partialSettings = settingsSchema.parse({ theme: "dark" });
console.log(`Partial: ${JSON.stringify(partialSettings)}`);

// ============================================================
// SECTION 9: Type Inference
// ============================================================

/**
 * Get TypeScript types from Zod schemas!
 * This is the killer feature - no type duplication.
 */

console.log("\n--- Type Inference ---");

// Define schema
const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number().positive(),
  inStock: z.boolean(),
  tags: z.array(z.string()),
});

// Infer type from schema
type Product = z.infer<typeof ProductSchema>;

// Now Product is:
// {
//   id: number;
//   name: string;
//   price: number;
//   inStock: boolean;
//   tags: string[];
// }

// Use the type
const product: Product = {
  id: 1,
  name: "Widget",
  price: 29.99,
  inStock: true,
  tags: ["electronics", "gadget"],
};

console.log(`Product type inferred: ${JSON.stringify(product)}`);
console.log("Type inference: z.infer<typeof Schema>");

// ============================================================
// SECTION 10: Practical Example
// ============================================================

console.log("\n--- Practical Example: User Registration ---");

// Registration schema with all validations
const RegistrationSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),

  email: z.string().email("Invalid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),

  age: z.number().int().min(13, "Must be at least 13 years old").optional(),

  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms" }),
  }),
});

type Registration = z.infer<typeof RegistrationSchema>;

// Valid registration
const validReg = RegistrationSchema.safeParse({
  username: "john_doe",
  email: "john@example.com",
  password: "SecurePass123",
  acceptTerms: true,
});
console.log(`Valid registration: ${validReg.success}`);

// Invalid registration
const invalidReg = RegistrationSchema.safeParse({
  username: "jo",
  email: "not-an-email",
  password: "weak",
  acceptTerms: false,
});
console.log(`Invalid registration: ${invalidReg.success}`);
if (!invalidReg.success) {
  console.log("Errors:");
  invalidReg.error.issues.forEach((issue) => {
    console.log(`  - ${issue.path.join(".")}: ${issue.message}`);
  });
}

// ============================================================
// KEY TAKEAWAYS
// ============================================================

console.log("\n========================================");
console.log("KEY TAKEAWAYS");
console.log("========================================");
console.log("1. Zod validates data at runtime");
console.log("2. Use safeParse() for non-throwing validation");
console.log("3. Chain validations: z.string().email().min(5)");
console.log("4. Use z.object() for object schemas");
console.log("5. Use z.array() for array schemas");
console.log("6. .optional() for undefined, .nullable() for null");
console.log("7. z.infer<typeof Schema> gets TypeScript types");
console.log("8. Custom error messages: z.string().min(3, 'message')");

console.log("\n Lesson 13 Complete! Run: bun lessons/backend/14-zod-transformations.ts");
