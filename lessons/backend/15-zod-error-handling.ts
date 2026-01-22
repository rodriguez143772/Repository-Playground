/**
 * ============================================================
 * LESSON 15: Zod Error Handling
 * ============================================================
 *
 * Good error messages make APIs user-friendly.
 * Zod provides detailed errors with paths and codes.
 *
 * ANALOGY: Error messages are like a GPS recalculating:
 * - Tells you exactly where you went wrong (path)
 * - What the problem is (message)
 * - What you should do instead (expected)
 *
 * Key concepts:
 * - ZodError structure
 * - Custom error messages
 * - Error formatting
 * - Error maps
 */

import { z, ZodError } from "zod";

console.log("========================================");
console.log("LESSON 15: ZOD ERROR HANDLING");
console.log("========================================\n");

// ============================================================
// SECTION 1: ZodError Structure
// ============================================================

/**
 * When validation fails, Zod returns a ZodError.
 * It contains an array of issues.
 */

console.log("--- ZodError Structure ---");

const UserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  age: z.number().int().positive(),
});

const result = UserSchema.safeParse({
  name: "A",
  email: "not-an-email",
  age: -5,
});

if (!result.success) {
  console.log("ZodError issues:");
  result.error.issues.forEach((issue, i) => {
    console.log(`\nIssue ${i + 1}:`);
    console.log(`  Path: ${issue.path.join(".")}`);
    console.log(`  Code: ${issue.code}`);
    console.log(`  Message: ${issue.message}`);
  });
}

// ============================================================
// SECTION 2: Issue Codes
// ============================================================

/**
 * Each issue has a code indicating the type of error.
 */

console.log("\n--- Issue Codes ---");

const codeExamples = `
Common Zod Issue Codes:
- invalid_type      - Wrong type (string vs number)
- invalid_string    - String validation failed (email, url, etc.)
- too_small         - Below minimum (min length, min value)
- too_big           - Above maximum
- invalid_enum_value - Not in enum
- invalid_union     - Doesn't match any union member
- invalid_literal   - Doesn't match literal value
- custom            - From .refine() or .superRefine()
`;
console.log(codeExamples);

// ============================================================
// SECTION 3: Custom Error Messages
// ============================================================

/**
 * Provide custom messages for better UX.
 */

console.log("--- Custom Error Messages ---");

// Inline messages
const PasswordSchema = z.string().min(8, "Password must be at least 8 characters");

const pwResult = PasswordSchema.safeParse("short");
if (!pwResult.success) {
  console.log(`Password error: ${pwResult.error.issues[0].message}`);
}

// Message object for different error types
const AgeSchema = z
  .number({
    required_error: "Age is required",
    invalid_type_error: "Age must be a number",
  })
  .int({ message: "Age must be a whole number" })
  .min(0, { message: "Age cannot be negative" })
  .max(150, { message: "Please enter a valid age" });

console.log("\nAge validation examples:");
console.log(`undefined: ${AgeSchema.safeParse(undefined).error?.issues[0].message}`);
console.log(`"25": ${AgeSchema.safeParse("25").error?.issues[0].message}`);
console.log(`25.5: ${AgeSchema.safeParse(25.5).error?.issues[0].message}`);
console.log(`-5: ${AgeSchema.safeParse(-5).error?.issues[0].message}`);

// ============================================================
// SECTION 4: Error Formatting
// ============================================================

/**
 * Format errors for API responses.
 */

console.log("\n--- Error Formatting ---");

// .flatten() - Groups errors by field
const FormSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8),
});

const formResult = FormSchema.safeParse({
  username: "ab",
  email: "invalid",
  password: "short",
});

if (!formResult.success) {
  const flattened = formResult.error.flatten();
  console.log("Flattened errors:");
  console.log(`  Field errors: ${JSON.stringify(flattened.fieldErrors)}`);
  console.log(`  Form errors: ${JSON.stringify(flattened.formErrors)}`);
}

// .format() - Nested structure matching input
console.log("\nFormatted errors:");
if (!formResult.success) {
  const formatted = formResult.error.format();
  console.log(`  username: ${formatted.username?._errors}`);
  console.log(`  email: ${formatted.email?._errors}`);
  console.log(`  password: ${formatted.password?._errors}`);
}

// ============================================================
// SECTION 5: Custom Error Formatter
// ============================================================

/**
 * Create custom error formatting for your API.
 */

console.log("\n--- Custom Error Formatter ---");

interface ApiError {
  field: string;
  message: string;
  code: string;
}

function formatZodError(error: ZodError): ApiError[] {
  return error.issues.map((issue) => ({
    field: issue.path.join(".") || "_root",
    message: issue.message,
    code: issue.code,
  }));
}

const apiResult = UserSchema.safeParse({
  name: "",
  email: "bad",
  age: "not-a-number",
});

if (!apiResult.success) {
  const apiErrors = formatZodError(apiResult.error);
  console.log("API-formatted errors:");
  apiErrors.forEach((e) => console.log(`  ${e.field}: ${e.message} (${e.code})`));
}

// ============================================================
// SECTION 6: Error Maps
// ============================================================

/**
 * Error maps let you customize error messages globally.
 */

console.log("\n--- Error Maps ---");

// Custom error map for a schema
const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  // Handle specific codes
  switch (issue.code) {
    case z.ZodIssueCode.invalid_type:
      if (issue.expected === "string") {
        return { message: "Please enter text" };
      }
      if (issue.expected === "number") {
        return { message: "Please enter a number" };
      }
      break;

    case z.ZodIssueCode.too_small:
      if (issue.type === "string") {
        return { message: `Must be at least ${issue.minimum} characters` };
      }
      if (issue.type === "number") {
        return { message: `Must be at least ${issue.minimum}` };
      }
      break;

    case z.ZodIssueCode.too_big:
      if (issue.type === "string") {
        return { message: `Must be at most ${issue.maximum} characters` };
      }
      break;

    case z.ZodIssueCode.invalid_string:
      if (issue.validation === "email") {
        return { message: "Please enter a valid email address" };
      }
      break;
  }

  // Default to Zod's message
  return { message: ctx.defaultError };
};

// Apply error map to a schema
const CustomSchema = z
  .object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    score: z.number().min(0).max(100),
  })
  .setErrorMap(customErrorMap);

const customResult = CustomSchema.safeParse({
  name: "A",
  email: "bad",
  score: "not-number",
});

if (!customResult.success) {
  console.log("Custom error messages:");
  customResult.error.issues.forEach((i) => console.log(`  ${i.path}: ${i.message}`));
}

// ============================================================
// SECTION 7: Nested Object Errors
// ============================================================

/**
 * Errors in nested objects include full paths.
 */

console.log("\n--- Nested Object Errors ---");

const OrderSchema = z.object({
  id: z.string().uuid(),
  customer: z.object({
    name: z.string().min(1),
    address: z.object({
      street: z.string().min(1),
      city: z.string().min(1),
      zip: z.string().regex(/^\d{5}$/, "Invalid ZIP code"),
    }),
  }),
  items: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number().positive(),
    })
  ),
});

const orderResult = OrderSchema.safeParse({
  id: "not-a-uuid",
  customer: {
    name: "",
    address: {
      street: "",
      city: "NYC",
      zip: "invalid",
    },
  },
  items: [{ productId: "123", quantity: -1 }],
});

if (!orderResult.success) {
  console.log("Nested errors with paths:");
  orderResult.error.issues.forEach((issue) => {
    console.log(`  ${issue.path.join(".")}: ${issue.message}`);
  });
}

// ============================================================
// SECTION 8: Try/Catch with parse()
// ============================================================

/**
 * parse() throws ZodError on failure.
 */

console.log("\n--- Try/Catch with parse() ---");

try {
  const data = z.string().email().parse("not-an-email");
} catch (error) {
  if (error instanceof ZodError) {
    console.log("Caught ZodError:");
    console.log(`  Message: ${error.issues[0].message}`);
    console.log(`  Is ZodError: true`);
  }
}

// ============================================================
// SECTION 9: Practical Example - API Validation Response
// ============================================================

console.log("\n--- Practical Example: API Validation ---");

// Schema
const CreateUserSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(/^[a-z0-9_]+$/, "Username can only contain lowercase letters, numbers, and underscores"),

  email: z
    .string({ required_error: "Email is required" })
    .email("Please enter a valid email address"),

  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be at least 8 characters"),

  profile: z
    .object({
      firstName: z.string().min(1, "First name is required"),
      lastName: z.string().min(1, "Last name is required"),
      bio: z.string().max(500, "Bio must be at most 500 characters").optional(),
    })
    .optional(),
});

// Simulate API validation
function validateRequest<T>(schema: z.ZodSchema<T>, data: unknown) {
  const result = schema.safeParse(data);

  if (result.success) {
    return {
      success: true as const,
      data: result.data,
    };
  }

  // Format errors for API response
  const errors = result.error.issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message,
  }));

  return {
    success: false as const,
    errors,
  };
}

// Test with invalid data
const invalidInput = {
  username: "AB",
  email: "not-valid",
  password: "short",
  profile: {
    firstName: "",
    lastName: "Doe",
  },
};

const apiResponse = validateRequest(CreateUserSchema, invalidInput);

console.log("API Response:");
console.log(JSON.stringify(apiResponse, null, 2));

// Test with valid data
const validInput = {
  username: "john_doe",
  email: "john@example.com",
  password: "securepassword123",
  profile: {
    firstName: "John",
    lastName: "Doe",
  },
};

const validResponse = validateRequest(CreateUserSchema, validInput);
console.log("\nValid response success:", validResponse.success);

// ============================================================
// KEY TAKEAWAYS
// ============================================================

console.log("\n========================================");
console.log("KEY TAKEAWAYS");
console.log("========================================");
console.log("1. ZodError.issues contains all validation errors");
console.log("2. Each issue has path, code, and message");
console.log("3. Custom messages: z.string().min(3, 'Custom message')");
console.log("4. .flatten() groups errors by field");
console.log("5. .format() creates nested error structure");
console.log("6. Error maps customize messages globally");
console.log("7. Nested paths: 'customer.address.zip'");
console.log("8. Use safeParse() for non-throwing validation");

console.log("\n Lesson 15 Complete! Run: bun lessons/backend/16-zod-advanced.ts");
