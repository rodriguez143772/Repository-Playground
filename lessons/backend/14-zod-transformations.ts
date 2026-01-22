/**
 * ============================================================
 * LESSON 14: Zod Transformations
 * ============================================================
 *
 * Zod can not only validate data but also transform it.
 *
 * ANALOGY: Transformations are like a car wash:
 * - Your car goes in dirty (raw input)
 * - Gets processed (transformations)
 * - Comes out clean and shiny (clean data)
 *
 * Key concepts:
 * - Coercion (convert types)
 * - Transform (modify values)
 * - Preprocess (pre-validation transforms)
 * - Refine (custom validation)
 */

import { z } from "zod";

console.log("========================================");
console.log("LESSON 14: ZOD TRANSFORMATIONS");
console.log("========================================\n");

// ============================================================
// SECTION 1: Coercion - Type Conversion
// ============================================================

/**
 * Coercion automatically converts values to the target type.
 * Perfect for form data and query parameters (always strings).
 */

console.log("--- Coercion ---");

// z.coerce converts input to target type
const coerceNumber = z.coerce.number();
console.log(`"42" -> number: ${coerceNumber.parse("42")}`);
console.log(`"3.14" -> number: ${coerceNumber.parse("3.14")}`);

const coerceBoolean = z.coerce.boolean();
console.log(`"true" -> boolean: ${coerceBoolean.parse("true")}`);
console.log(`"false" -> boolean: ${coerceBoolean.parse("false")}`);
console.log(`"" -> boolean: ${coerceBoolean.parse("")}`); // false (falsy)
console.log(`"anything" -> boolean: ${coerceBoolean.parse("anything")}`); // true (truthy)

const coerceString = z.coerce.string();
console.log(`123 -> string: "${coerceString.parse(123)}"`);
console.log(`true -> string: "${coerceString.parse(true)}"`);

const coerceDate = z.coerce.date();
console.log(`"2024-01-15" -> date: ${coerceDate.parse("2024-01-15")}`);
console.log(`1705276800000 -> date: ${coerceDate.parse(1705276800000)}`);

// ============================================================
// SECTION 2: Practical Coercion - Form Data
// ============================================================

/**
 * Query params and form data are always strings.
 * Coercion handles the conversion.
 */

console.log("\n--- Form Data Example ---");

// Without coercion
const FormSchemaStrict = z.object({
  name: z.string(),
  age: z.number(), // Won't work with string "25"
});

const strictResult = FormSchemaStrict.safeParse({
  name: "Alice",
  age: "25", // This is a string from form data!
});
console.log(`Strict schema with string age: ${strictResult.success}`);

// With coercion
const FormSchemaCoerced = z.object({
  name: z.string(),
  age: z.coerce.number().int().positive(),
  subscribed: z.coerce.boolean(),
});

const coercedResult = FormSchemaCoerced.safeParse({
  name: "Alice",
  age: "25",
  subscribed: "true",
});
console.log(`Coerced schema: ${coercedResult.success}`);
if (coercedResult.success) {
  console.log(`  Parsed: ${JSON.stringify(coercedResult.data)}`);
}

// ============================================================
// SECTION 3: Transform - Modify Values
// ============================================================

/**
 * .transform() runs a function on the validated value.
 */

console.log("\n--- Transform ---");

// Simple transformation
const lowerCaseEmail = z.string().email().transform((email) => email.toLowerCase());
console.log(`Transform email: ${lowerCaseEmail.parse("USER@EXAMPLE.COM")}`);

// Trim and normalize
const normalizedString = z
  .string()
  .trim()
  .transform((s) => s.replace(/\s+/g, " "));
console.log(`Normalized: "${normalizedString.parse("  hello   world  ")}"`);

// Parse to different type
const stringToNumber = z.string().transform((s) => parseInt(s, 10));
const result = stringToNumber.parse("42");
console.log(`String to number: ${result} (type: ${typeof result})`);

// Complex transformation
const UserInputSchema = z
  .object({
    firstName: z.string().trim(),
    lastName: z.string().trim(),
    email: z.string().email(),
  })
  .transform((data) => ({
    ...data,
    fullName: `${data.firstName} ${data.lastName}`,
    email: data.email.toLowerCase(),
  }));

const user = UserInputSchema.parse({
  firstName: "  John  ",
  lastName: "  Doe  ",
  email: "JOHN@EXAMPLE.COM",
});
console.log(`Transformed user: ${JSON.stringify(user)}`);

// ============================================================
// SECTION 4: Chaining Transforms
// ============================================================

/**
 * Multiple transforms can be chained.
 */

console.log("\n--- Chaining Transforms ---");

const SlugSchema = z
  .string()
  .transform((s) => s.toLowerCase())
  .transform((s) => s.trim())
  .transform((s) => s.replace(/\s+/g, "-"))
  .transform((s) => s.replace(/[^a-z0-9-]/g, ""));

console.log(`Slug: "${SlugSchema.parse("  Hello World! @#$ 123  ")}"`);

// ============================================================
// SECTION 5: Preprocess - Transform Before Validation
// ============================================================

/**
 * z.preprocess() runs before validation.
 * Useful for normalizing input.
 */

console.log("\n--- Preprocess ---");

// Preprocess null/undefined to default
const DefaultString = z.preprocess((val) => val ?? "default", z.string());

console.log(`null -> "${DefaultString.parse(null)}"`);
console.log(`undefined -> "${DefaultString.parse(undefined)}"`);
console.log(`"value" -> "${DefaultString.parse("value")}"`);

// Preprocess string to number
const StringToInt = z.preprocess((val) => {
  if (typeof val === "string") return parseInt(val, 10);
  return val;
}, z.number().int());

console.log(`"42" preprocessed: ${StringToInt.parse("42")}`);
console.log(`42 preprocessed: ${StringToInt.parse(42)}`);

// Handle empty strings as undefined
const EmptyToUndefined = z.preprocess(
  (val) => (val === "" ? undefined : val),
  z.string().optional()
);

console.log(`"" -> ${EmptyToUndefined.parse("")}`);
console.log(`"text" -> ${EmptyToUndefined.parse("text")}`);

// ============================================================
// SECTION 6: Refine - Custom Validation
// ============================================================

/**
 * .refine() adds custom validation logic.
 */

console.log("\n--- Refine (Custom Validation) ---");

// Simple refine
const PositiveNumber = z.number().refine((n) => n > 0, {
  message: "Must be positive",
});

console.log(`5 is positive: ${PositiveNumber.safeParse(5).success}`);
console.log(`-5 is positive: ${PositiveNumber.safeParse(-5).success}`);

// Password confirmation
const PasswordSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Where to show error
  });

const matchResult = PasswordSchema.safeParse({
  password: "securepassword",
  confirmPassword: "securepassword",
});
console.log(`Passwords match: ${matchResult.success}`);

const noMatchResult = PasswordSchema.safeParse({
  password: "securepassword",
  confirmPassword: "different",
});
console.log(`Passwords don't match: ${noMatchResult.success}`);
if (!noMatchResult.success) {
  console.log(`  Error: ${noMatchResult.error.issues[0].message}`);
}

// ============================================================
// SECTION 7: SuperRefine - Advanced Validation
// ============================================================

/**
 * .superRefine() gives more control over error creation.
 */

console.log("\n--- SuperRefine (Advanced) ---");

const AgeRangeSchema = z.number().superRefine((val, ctx) => {
  if (val < 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Age cannot be negative",
    });
  }

  if (val > 150) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Age seems unrealistic",
    });
  }

  if (val < 18) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Must be 18 or older",
      fatal: true, // Stop further validation
    });
  }
});

const ageResult = AgeRangeSchema.safeParse(-5);
if (!ageResult.success) {
  console.log("Age -5 errors:");
  ageResult.error.issues.forEach((i) => console.log(`  - ${i.message}`));
}

// ============================================================
// SECTION 8: Transform + Refine Together
// ============================================================

/**
 * Combine validation and transformation.
 */

console.log("\n--- Transform + Refine ---");

const DateStringSchema = z
  .string()
  .refine((s) => !isNaN(Date.parse(s)), {
    message: "Invalid date string",
  })
  .transform((s) => new Date(s));

const dateResult = DateStringSchema.parse("2024-01-15");
console.log(`Parsed date: ${dateResult}`);
console.log(`Is Date object: ${dateResult instanceof Date}`);

// Validate, transform, then validate again
const ProcessedInput = z
  .string()
  .min(1)
  .transform((s) => s.trim().toLowerCase())
  .refine((s) => s.length >= 3, {
    message: "After trimming, must be at least 3 characters",
  });

console.log(`"  ABC  " processed: "${ProcessedInput.parse("  ABC  ")}"`);
const shortResult = ProcessedInput.safeParse("  AB  ");
console.log(`"  AB  " valid: ${shortResult.success}`);

// ============================================================
// SECTION 9: Async Refinements
// ============================================================

/**
 * Refinements can be async (e.g., checking database).
 */

console.log("\n--- Async Refinements ---");

// Simulate database check
async function isEmailUnique(email: string): Promise<boolean> {
  await Bun.sleep(10);
  const taken = ["taken@example.com", "admin@example.com"];
  return !taken.includes(email);
}

const UniqueEmailSchema = z.string().email().refine(isEmailUnique, {
  message: "Email already taken",
});

// Must use parseAsync for async refinements
const uniqueResult = await UniqueEmailSchema.safeParseAsync("new@example.com");
console.log(`new@example.com unique: ${uniqueResult.success}`);

const takenResult = await UniqueEmailSchema.safeParseAsync("taken@example.com");
console.log(`taken@example.com unique: ${takenResult.success}`);

// ============================================================
// SECTION 10: Practical Example - API Input Processing
// ============================================================

console.log("\n--- Practical Example: API Input ---");

// Define schema for creating a blog post
const CreatePostSchema = z
  .object({
    title: z
      .string()
      .min(5)
      .max(100)
      .transform((s) => s.trim()),

    content: z
      .string()
      .min(50)
      .transform((s) => s.trim()),

    tags: z.preprocess(
      // Handle comma-separated string or array
      (val) => {
        if (typeof val === "string") {
          return val
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean);
        }
        return val;
      },
      z.array(z.string()).min(1).max(5)
    ),

    publishAt: z.coerce.date().optional(),

    draft: z.coerce.boolean().default(false),
  })
  .transform((data) => ({
    ...data,
    slug: data.title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, ""),
    createdAt: new Date(),
  }));

type CreatePostInput = z.input<typeof CreatePostSchema>;
type CreatePostOutput = z.output<typeof CreatePostSchema>;

// Test with various inputs
const postInput = {
  title: "  My First Post!  ",
  content: "This is the content of my first blog post. It needs to be at least 50 characters long.",
  tags: "javascript, typescript, zod",
  publishAt: "2024-01-20",
  draft: "false",
};

const post = CreatePostSchema.parse(postInput);
console.log("Processed post:");
console.log(`  Title: "${post.title}"`);
console.log(`  Slug: "${post.slug}"`);
console.log(`  Tags: [${post.tags.join(", ")}]`);
console.log(`  Publish at: ${post.publishAt}`);
console.log(`  Draft: ${post.draft}`);

// ============================================================
// KEY TAKEAWAYS
// ============================================================

console.log("\n========================================");
console.log("KEY TAKEAWAYS");
console.log("========================================");
console.log("1. z.coerce.* converts types (strings from forms)");
console.log("2. .transform() modifies values after validation");
console.log("3. z.preprocess() runs before validation");
console.log("4. .refine() adds custom validation");
console.log("5. .superRefine() for complex validation");
console.log("6. Use parseAsync for async refinements");
console.log("7. z.input vs z.output for transform types");
console.log("8. Chain: validate -> transform -> validate again");

console.log("\n Lesson 14 Complete! Run: bun lessons/backend/15-zod-error-handling.ts");
