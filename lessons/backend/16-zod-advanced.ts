/**
 * ============================================================
 * LESSON 16: Advanced Zod Patterns
 * ============================================================
 *
 * Advanced techniques for complex validation scenarios.
 *
 * Key concepts:
 * - Unions and discriminated unions
 * - Recursive schemas
 * - Extending and merging schemas
 * - Branded types
 * - Schema composition patterns
 */

import { z } from "zod";

console.log("========================================");
console.log("LESSON 16: ADVANCED ZOD PATTERNS");
console.log("========================================\n");

// ============================================================
// SECTION 1: Unions
// ============================================================

/**
 * z.union() matches any of multiple schemas.
 */

console.log("--- Unions ---");

// Simple union
const StringOrNumber = z.union([z.string(), z.number()]);
console.log(`"hello" matches: ${StringOrNumber.safeParse("hello").success}`);
console.log(`42 matches: ${StringOrNumber.safeParse(42).success}`);
console.log(`true matches: ${StringOrNumber.safeParse(true).success}`);

// Shorthand with .or()
const BoolOrNull = z.boolean().or(z.null());
console.log(`true matches: ${BoolOrNull.safeParse(true).success}`);
console.log(`null matches: ${BoolOrNull.safeParse(null).success}`);

// Object unions
const ResponseSchema = z.union([
  z.object({ status: z.literal("success"), data: z.any() }),
  z.object({ status: z.literal("error"), message: z.string() }),
]);

console.log(
  `Success response: ${ResponseSchema.safeParse({ status: "success", data: {} }).success}`
);
console.log(
  `Error response: ${ResponseSchema.safeParse({ status: "error", message: "fail" }).success}`
);

// ============================================================
// SECTION 2: Discriminated Unions
// ============================================================

/**
 * z.discriminatedUnion() is more efficient for tagged unions.
 * Uses a common "discriminator" field to determine the type.
 */

console.log("\n--- Discriminated Unions ---");

// API response with different shapes
const ApiResponse = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("user"),
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
  }),
  z.object({
    type: z.literal("post"),
    id: z.number(),
    title: z.string(),
    content: z.string(),
  }),
  z.object({
    type: z.literal("comment"),
    id: z.number(),
    postId: z.number(),
    text: z.string(),
  }),
]);

type ApiResponseType = z.infer<typeof ApiResponse>;

// Parse different response types
const userResponse = ApiResponse.parse({
  type: "user",
  id: 1,
  name: "Alice",
  email: "alice@example.com",
});
console.log(`User response: ${JSON.stringify(userResponse)}`);

const postResponse = ApiResponse.parse({
  type: "post",
  id: 1,
  title: "Hello",
  content: "World",
});
console.log(`Post response: ${JSON.stringify(postResponse)}`);

// Type narrowing works in TypeScript
function handleResponse(response: ApiResponseType) {
  switch (response.type) {
    case "user":
      // TypeScript knows this has name, email
      return `User: ${response.name}`;
    case "post":
      // TypeScript knows this has title, content
      return `Post: ${response.title}`;
    case "comment":
      // TypeScript knows this has text, postId
      return `Comment: ${response.text}`;
  }
}

console.log(handleResponse(userResponse));

// ============================================================
// SECTION 3: Enums and Literals
// ============================================================

/**
 * z.enum() and z.literal() for specific values.
 */

console.log("\n--- Enums and Literals ---");

// String enum
const Status = z.enum(["pending", "active", "completed", "cancelled"]);
type StatusType = z.infer<typeof Status>;
console.log(`"active" is valid: ${Status.safeParse("active").success}`);
console.log(`"invalid" is valid: ${Status.safeParse("invalid").success}`);

// Access enum values
console.log(`Enum values: ${Status.options.join(", ")}`);

// Native enum
enum NativeRole {
  Admin = "ADMIN",
  User = "USER",
  Guest = "GUEST",
}
const RoleSchema = z.nativeEnum(NativeRole);
console.log(`NativeRole.Admin valid: ${RoleSchema.safeParse(NativeRole.Admin).success}`);

// Literal types
const True = z.literal(true);
const FortyTwo = z.literal(42);
const Hello = z.literal("hello");

console.log(`true matches True: ${True.safeParse(true).success}`);
console.log(`42 matches FortyTwo: ${FortyTwo.safeParse(42).success}`);

// ============================================================
// SECTION 4: Records and Maps
// ============================================================

/**
 * z.record() for objects with dynamic keys.
 */

console.log("\n--- Records and Maps ---");

// Record with string keys and number values
const ScoreMap = z.record(z.string(), z.number());
const scores = ScoreMap.parse({
  alice: 100,
  bob: 85,
  charlie: 92,
});
console.log(`Scores: ${JSON.stringify(scores)}`);

// Record with constrained keys
const ValidKeys = z.enum(["setting1", "setting2", "setting3"]);
const Settings = z.record(ValidKeys, z.boolean());
console.log(`Settings valid: ${Settings.safeParse({ setting1: true, setting2: false }).success}`);

// Map type
const MapSchema = z.map(z.string(), z.number());
const map = MapSchema.parse(
  new Map([
    ["a", 1],
    ["b", 2],
  ])
);
console.log(`Map size: ${map.size}`);

// ============================================================
// SECTION 5: Tuples
// ============================================================

/**
 * z.tuple() for fixed-length arrays with specific types.
 */

console.log("\n--- Tuples ---");

// Coordinate tuple
const Coordinate = z.tuple([z.number(), z.number()]);
console.log(`[10, 20] valid: ${Coordinate.safeParse([10, 20]).success}`);
console.log(`[10] valid: ${Coordinate.safeParse([10]).success}`);

// Mixed types
const UserTuple = z.tuple([z.number(), z.string(), z.boolean()]);
type UserTupleType = z.infer<typeof UserTuple>; // [number, string, boolean]
console.log(`[1, "name", true] valid: ${UserTuple.safeParse([1, "name", true]).success}`);

// With rest elements
const ArgsSchema = z.tuple([z.string()]).rest(z.number());
console.log(`["cmd", 1, 2, 3] valid: ${ArgsSchema.safeParse(["cmd", 1, 2, 3]).success}`);

// ============================================================
// SECTION 6: Recursive Schemas
// ============================================================

/**
 * z.lazy() for self-referential schemas.
 */

console.log("\n--- Recursive Schemas ---");

// Tree structure
interface TreeNode {
  name: string;
  children: TreeNode[];
}

const TreeNodeSchema: z.ZodType<TreeNode> = z.object({
  name: z.string(),
  children: z.lazy(() => z.array(TreeNodeSchema)),
});

const tree = TreeNodeSchema.parse({
  name: "root",
  children: [
    { name: "child1", children: [] },
    {
      name: "child2",
      children: [{ name: "grandchild", children: [] }],
    },
  ],
});
console.log(`Tree parsed: ${tree.name} with ${tree.children.length} children`);

// Linked list
interface ListNode {
  value: number;
  next: ListNode | null;
}

const ListNodeSchema: z.ZodType<ListNode> = z.object({
  value: z.number(),
  next: z.lazy(() => ListNodeSchema.nullable()),
});

const list = ListNodeSchema.parse({
  value: 1,
  next: { value: 2, next: { value: 3, next: null } },
});
console.log(`List starts with: ${list.value}`);

// ============================================================
// SECTION 7: Extending and Merging Schemas
// ============================================================

/**
 * Build schemas from other schemas.
 */

console.log("\n--- Extending and Merging ---");

// Base schema
const BaseEntity = z.object({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Extend with additional fields
const UserEntity = BaseEntity.extend({
  name: z.string(),
  email: z.string().email(),
});

type User = z.infer<typeof UserEntity>;
console.log("UserEntity has id, createdAt, updatedAt, name, email");

// Merge two schemas
const PersonInfo = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

const ContactInfo = z.object({
  email: z.string().email(),
  phone: z.string(),
});

const FullContact = PersonInfo.merge(ContactInfo);
type FullContactType = z.infer<typeof FullContact>;
console.log("Merged: firstName, lastName, email, phone");

// Pick and Omit
const PublicUser = UserEntity.pick({ id: true, name: true });
const PrivateUser = UserEntity.omit({ email: true });
console.log("Pick/Omit work like TypeScript utility types");

// ============================================================
// SECTION 8: Partial and Required
// ============================================================

/**
 * Make all fields optional or required.
 */

console.log("\n--- Partial and Required ---");

const CompleteUser = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  age: z.number(),
});

// All optional (for PATCH updates)
const PartialUser = CompleteUser.partial();
console.log(`Empty object valid for partial: ${PartialUser.safeParse({}).success}`);

// All required
const RequiredUser = PartialUser.required();
console.log("Partial and Required toggle optionality");

// Deep partial
const NestedObject = z.object({
  user: z.object({
    name: z.string(),
    address: z.object({
      city: z.string(),
    }),
  }),
});

const DeepPartial = NestedObject.deepPartial();
console.log(`Deep partial valid: ${DeepPartial.safeParse({ user: { address: {} } }).success}`);

// ============================================================
// SECTION 9: Branded Types
// ============================================================

/**
 * Branded types add compile-time type safety.
 */

console.log("\n--- Branded Types ---");

// Create branded types
const UserId = z.string().uuid().brand<"UserId">();
const PostId = z.string().uuid().brand<"PostId">();

type UserIdType = z.infer<typeof UserId>;
type PostIdType = z.infer<typeof PostId>;

// Parse returns branded types
const userId = UserId.parse("550e8400-e29b-41d4-a716-446655440000");
const postId = PostId.parse("550e8400-e29b-41d4-a716-446655440001");

// TypeScript prevents mixing them up
// function getUser(id: UserIdType) { ... }
// getUser(postId); // TypeScript error!

console.log("Branded types prevent mixing up IDs at compile time");

// ============================================================
// SECTION 10: Practical Example - API Schema Design
// ============================================================

console.log("\n--- Practical Example: API Schema Design ---");

// Base schemas
const IdSchema = z.string().uuid().brand<"Id">();
const TimestampSchema = z.string().datetime();

const BaseResource = z.object({
  id: IdSchema,
  createdAt: TimestampSchema,
  updatedAt: TimestampSchema,
});

// User schemas
const UserBase = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  role: z.enum(["admin", "user", "guest"]),
});

const User = BaseResource.merge(UserBase);
const CreateUser = UserBase.omit({ role: true }).extend({
  password: z.string().min(8),
});
const UpdateUser = UserBase.partial();
const PublicUserSchema = User.omit({ role: true });

console.log("User schemas:");
console.log("  - User (full with timestamps)");
console.log("  - CreateUser (input for creation)");
console.log("  - UpdateUser (partial for updates)");
console.log("  - PublicUser (safe for API response)");

// Post schemas with discriminated union for status
const PostStatus = z.discriminatedUnion("status", [
  z.object({
    status: z.literal("draft"),
    content: z.string(),
  }),
  z.object({
    status: z.literal("published"),
    content: z.string(),
    publishedAt: TimestampSchema,
  }),
  z.object({
    status: z.literal("archived"),
    content: z.string(),
    publishedAt: TimestampSchema,
    archivedAt: TimestampSchema,
  }),
]);

const Post = BaseResource.merge(
  z.object({
    title: z.string(),
    authorId: IdSchema,
  })
).and(PostStatus);

console.log("Post schema uses discriminated union for status-specific fields");

// ============================================================
// KEY TAKEAWAYS
// ============================================================

console.log("\n========================================");
console.log("KEY TAKEAWAYS");
console.log("========================================");
console.log("1. z.union() for multiple possible types");
console.log("2. z.discriminatedUnion() for tagged unions (faster)");
console.log("3. z.enum() for string enums, z.nativeEnum() for TS enums");
console.log("4. z.record() for dynamic key objects");
console.log("5. z.lazy() for recursive schemas");
console.log("6. .extend(), .merge(), .pick(), .omit() for composition");
console.log("7. .partial(), .required(), .deepPartial() for optionality");
console.log("8. .brand() for compile-time type safety");

console.log("\n Lesson 16 Complete! Run: bun lessons/backend/17-zod-hono-integration.ts");
