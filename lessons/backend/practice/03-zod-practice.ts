/**
 * ============================================================
 * PRACTICE: Zod Validation (Module 2.3)
 * ============================================================
 *
 * Build schemas and validate data with Zod!
 *
 * Instructions:
 * 1. Complete each TODO to create validation schemas
 * 2. Run: bun lessons/backend/practice/03-zod-practice.ts
 * 3. Check if all tests pass!
 */

import { z } from "zod";

console.log("========================================");
console.log("PRACTICE: ZOD VALIDATION");
console.log("========================================\n");

// ============================================================
// PROBLEM 1: User Registration Schema
// ============================================================

/**
 * Create a schema for user registration with:
 * - username: 3-20 chars, lowercase alphanumeric and underscores only
 * - email: valid email address
 * - password: min 8 chars, at least one uppercase, one lowercase, one number
 * - confirmPassword: must match password
 * - age: optional, must be 13+ if provided
 * - newsletter: boolean, defaults to false
 */

// TODO: Implement UserRegistrationSchema
const UserRegistrationSchema = z.object({
  // Your implementation here
  username: z.string(),
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
  age: z.number().optional(),
  newsletter: z.boolean().optional(),
});

// ============================================================
// PROBLEM 2: Product Schema with Transformations
// ============================================================

/**
 * Create a product schema that:
 * - id: UUID string
 * - name: string, trimmed, 1-100 chars
 * - price: positive number, max 2 decimal places
 * - sku: string, transformed to uppercase
 * - tags: array of strings (accept comma-separated string too)
 * - createdAt: coerce string to Date
 */

// TODO: Implement ProductSchema
const ProductSchema = z.object({
  // Your implementation here
  id: z.string(),
  name: z.string(),
  price: z.number(),
  sku: z.string(),
  tags: z.array(z.string()),
  createdAt: z.date(),
});

// ============================================================
// PROBLEM 3: API Request Schema with Query Params
// ============================================================

/**
 * Create a schema for list API query parameters:
 * - page: coerce to positive integer, default 1
 * - limit: coerce to integer 1-100, default 20
 * - sortBy: enum of 'createdAt' | 'name' | 'price', default 'createdAt'
 * - order: enum of 'asc' | 'desc', default 'desc'
 * - search: optional string, min 2 chars if provided
 * - minPrice: optional, coerce to positive number
 * - maxPrice: optional, coerce to positive number
 * - Validate that minPrice <= maxPrice if both provided
 */

// TODO: Implement ListQuerySchema
const ListQuerySchema = z.object({
  // Your implementation here
  page: z.number().default(1),
  limit: z.number().default(20),
  sortBy: z.string().default("createdAt"),
  order: z.string().default("desc"),
  search: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
});

// ============================================================
// PROBLEM 4: Discriminated Union - Payment Methods
// ============================================================

/**
 * Create a discriminated union for payment methods:
 * 
 * Credit Card:
 * - type: 'credit_card'
 * - cardNumber: 16 digits
 * - expiryMonth: 1-12
 * - expiryYear: current year or later
 * - cvv: 3-4 digits
 * 
 * PayPal:
 * - type: 'paypal'
 * - email: valid email
 * 
 * Bank Transfer:
 * - type: 'bank_transfer'
 * - accountNumber: 8-12 digits
 * - routingNumber: 9 digits
 */

// TODO: Implement PaymentMethodSchema
const PaymentMethodSchema = z.object({
  // Your implementation here (should be discriminatedUnion)
  type: z.string(),
});

// ============================================================
// PROBLEM 5: Nested Object with Partial Updates
// ============================================================

/**
 * Create schemas for a blog post:
 * 
 * Full Post Schema:
 * - id: number
 * - title: 5-200 chars
 * - content: min 100 chars
 * - author: { id: number, name: string, email: email }
 * - tags: array of 1-5 strings
 * - status: 'draft' | 'published' | 'archived'
 * - publishedAt: optional Date
 * 
 * Then create:
 * - CreatePostSchema: everything except id and publishedAt
 * - UpdatePostSchema: partial version for PATCH updates
 * - PublicPostSchema: omit author.email
 */

// TODO: Implement PostSchema
const PostSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  author: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string(),
  }),
  tags: z.array(z.string()),
  status: z.string(),
  publishedAt: z.date().optional(),
});

// TODO: Derive CreatePostSchema from PostSchema
const CreatePostSchema = PostSchema;

// TODO: Derive UpdatePostSchema from PostSchema
const UpdatePostSchema = PostSchema;

// ============================================================
// PROBLEM 6: Custom Error Messages
// ============================================================

/**
 * Create a contact form schema with custom error messages:
 * - name: required, 2-50 chars
 *   - Errors: "Name is required", "Name must be at least 2 characters"
 * - email: required, valid email
 *   - Errors: "Email is required", "Please enter a valid email address"
 * - subject: required, 5-100 chars
 * - message: required, 20-1000 chars
 * - phone: optional, valid phone format (10 digits)
 */

// TODO: Implement ContactFormSchema with custom error messages
const ContactFormSchema = z.object({
  name: z.string(),
  email: z.string(),
  subject: z.string(),
  message: z.string(),
  phone: z.string().optional(),
});

// ============================================================
// PROBLEM 7: Async Validation
// ============================================================

/**
 * Create a schema that validates:
 * - username: 3-20 chars, must be unique (use checkUsername function)
 * - email: valid email, must be unique (use checkEmail function)
 */

// Simulated database check
const existingUsers = ["admin", "user123", "john_doe"];
const existingEmails = ["admin@example.com", "user@example.com"];

async function checkUsername(username: string): Promise<boolean> {
  await Bun.sleep(10);
  return !existingUsers.includes(username.toLowerCase());
}

async function checkEmail(email: string): Promise<boolean> {
  await Bun.sleep(10);
  return !existingEmails.includes(email.toLowerCase());
}

// TODO: Implement UniqueUserSchema with async validation
const UniqueUserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
});

// ============================================================
// PROBLEM 8: Recursive Schema
// ============================================================

/**
 * Create a schema for a comment tree:
 * - id: number
 * - text: 1-500 chars
 * - author: string
 * - createdAt: Date
 * - replies: array of comments (recursive)
 */

// TODO: Implement CommentSchema (recursive)
interface Comment {
  id: number;
  text: string;
  author: string;
  createdAt: Date;
  replies: Comment[];
}

const CommentSchema: z.ZodType<Comment> = z.object({
  id: z.number(),
  text: z.string(),
  author: z.string(),
  createdAt: z.date(),
  replies: z.array(z.lazy(() => CommentSchema)),
});

// ============================================================
// TESTS
// ============================================================

console.log("Running tests...\n");

let passed = 0;
let failed = 0;

// Test 1: User Registration
const validRegistration = {
  username: "john_doe",
  email: "john@example.com",
  password: "SecurePass123",
  confirmPassword: "SecurePass123",
  age: 25,
  newsletter: true,
};

const regResult = UserRegistrationSchema.safeParse(validRegistration);
if (regResult.success) {
  console.log("✅ Problem 1: Valid registration passes");
  passed++;
} else {
  console.log("❌ Problem 1: Valid registration should pass");
  failed++;
}

// Test password mismatch
const mismatchReg = { ...validRegistration, confirmPassword: "different" };
const mismatchResult = UserRegistrationSchema.safeParse(mismatchReg);
if (!mismatchResult.success) {
  console.log("✅ Problem 1: Password mismatch caught");
  passed++;
} else {
  console.log("❌ Problem 1: Should catch password mismatch");
  failed++;
}

// Test 2: Product Schema with transformations
const productInput = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  name: "  Test Product  ",
  price: 29.99,
  sku: "abc-123",
  tags: "electronics,gadget",
  createdAt: "2024-01-15T00:00:00Z",
};

const productResult = ProductSchema.safeParse(productInput);
if (productResult.success) {
  const product = productResult.data;
  if (
    product.name === "Test Product" &&
    product.sku === "ABC-123" &&
    Array.isArray(product.tags) &&
    product.createdAt instanceof Date
  ) {
    console.log("✅ Problem 2: Product transformations work");
    passed++;
  } else {
    console.log("❌ Problem 2: Product transformations incomplete");
    failed++;
  }
} else {
  console.log("❌ Problem 2: Product validation failed");
  failed++;
}

// Test 3: List Query Schema
const queryInput = {
  page: "2",
  limit: "50",
  sortBy: "price",
  order: "asc",
  search: "test",
  minPrice: "10",
  maxPrice: "100",
};

const queryResult = ListQuerySchema.safeParse(queryInput);
if (queryResult.success) {
  const query = queryResult.data;
  if (
    typeof query.page === "number" &&
    query.page === 2 &&
    typeof query.minPrice === "number"
  ) {
    console.log("✅ Problem 3: Query coercion works");
    passed++;
  } else {
    console.log("❌ Problem 3: Query coercion incomplete");
    failed++;
  }
} else {
  console.log("❌ Problem 3: Query validation failed");
  failed++;
}

// Test 4: Discriminated Union
const creditCardPayment = {
  type: "credit_card",
  cardNumber: "1234567890123456",
  expiryMonth: 12,
  expiryYear: 2025,
  cvv: "123",
};

const paymentResult = PaymentMethodSchema.safeParse(creditCardPayment);
if (paymentResult.success) {
  console.log("✅ Problem 4: Payment method validation works");
  passed++;
} else {
  console.log("❌ Problem 4: Payment validation failed");
  failed++;
}

// Test 5: Nested Schema
const postInput = {
  id: 1,
  title: "Test Post Title",
  content: "This is test content that needs to be at least 100 characters long. Adding more text here to meet the minimum requirement for the content field validation.",
  author: { id: 1, name: "Author", email: "author@example.com" },
  tags: ["test", "example"],
  status: "published",
};

const postResult = PostSchema.safeParse(postInput);
if (postResult.success) {
  console.log("✅ Problem 5: Post schema works");
  passed++;
} else {
  console.log("❌ Problem 5: Post validation failed");
  failed++;
}

// Test CreatePostSchema (should not require id)
const createPostInput = {
  title: "New Post",
  content: "This is test content that needs to be at least 100 characters long. Adding more text here to meet the minimum requirement for the content field validation.",
  author: { id: 1, name: "Author", email: "author@example.com" },
  tags: ["test"],
  status: "draft",
};

const createResult = CreatePostSchema.safeParse(createPostInput);
if (createResult.success) {
  console.log("✅ Problem 5: CreatePostSchema works");
  passed++;
} else {
  console.log("❌ Problem 5: CreatePostSchema should not require id");
  failed++;
}

// Test 6: Custom error messages
const invalidContact = { name: "A", email: "bad", subject: "Hi", message: "Short" };
const contactResult = ContactFormSchema.safeParse(invalidContact);
if (!contactResult.success) {
  const hasCustomMessages = contactResult.error.issues.some(
    (i) => i.message.includes("at least") || i.message.includes("required")
  );
  if (hasCustomMessages) {
    console.log("✅ Problem 6: Custom error messages work");
    passed++;
  } else {
    console.log("❌ Problem 6: Add custom error messages");
    failed++;
  }
} else {
  console.log("❌ Problem 6: Validation should fail");
  failed++;
}

// Test 7: Async validation
const uniqueUserInput = { username: "new_user", email: "new@example.com" };
const asyncResult = await UniqueUserSchema.safeParseAsync(uniqueUserInput);
if (asyncResult.success) {
  console.log("✅ Problem 7: Async validation works for unique user");
  passed++;
} else {
  console.log("❌ Problem 7: Async validation failed");
  failed++;
}

const duplicateUserInput = { username: "admin", email: "admin@example.com" };
const duplicateResult = await UniqueUserSchema.safeParseAsync(duplicateUserInput);
if (!duplicateResult.success) {
  console.log("✅ Problem 7: Async validation catches duplicates");
  passed++;
} else {
  console.log("❌ Problem 7: Should catch duplicate username/email");
  failed++;
}

// Test 8: Recursive schema
const nestedComment = {
  id: 1,
  text: "Parent comment",
  author: "Alice",
  createdAt: new Date(),
  replies: [
    {
      id: 2,
      text: "Child comment",
      author: "Bob",
      createdAt: new Date(),
      replies: [
        {
          id: 3,
          text: "Grandchild comment",
          author: "Charlie",
          createdAt: new Date(),
          replies: [],
        },
      ],
    },
  ],
};

const commentResult = CommentSchema.safeParse(nestedComment);
if (commentResult.success) {
  console.log("✅ Problem 8: Recursive schema works");
  passed++;
} else {
  console.log("❌ Problem 8: Recursive schema failed");
  failed++;
}

// Results
console.log(`\n${passed}/${passed + failed} tests passed`);
if (failed === 0) {
  console.log("\n🎉 All Zod practice problems complete!");
}
