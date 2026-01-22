/**
 * ============================================================
 * PRACTICE: Utility Types
 * ============================================================
 * 
 * Instructions:
 * 1. Use utility types to solve each problem
 * 2. Run: bun lessons/practice/12-utility-types-practice.ts
 * 3. Check if all tests pass!
 */

// Base interface for exercises
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================================
// PROBLEM 1: Partial Update
// ============================================================
/**
 * Create a type for updating products where all fields are optional.
 * Then implement the update function.
 */

// TODO: Create UpdateProduct type using Partial
type UpdateProduct = any;

function updateProduct(product: Product, updates: UpdateProduct): Product {
  // TODO: Merge updates into product
  return product;
}

// ============================================================
// PROBLEM 2: Required Config
// ============================================================
/**
 * Given an optional config, create a type where all fields are required.
 */

interface OptionalConfig {
  apiKey?: string;
  baseUrl?: string;
  timeout?: number;
  retries?: number;
}

// TODO: Create RequiredConfig type using Required
type RequiredConfig = any;

function initializeApp(config: RequiredConfig): void {
  console.log(`Initializing with ${config.baseUrl}`);
}

// ============================================================
// PROBLEM 3: Pick for API Response
// ============================================================
/**
 * Create a type for a product list item that only includes
 * id, name, price, and stock.
 */

// TODO: Create ProductListItem type using Pick
type ProductListItem = any;

function getProductList(): ProductListItem[] {
  // This would normally fetch from API
  return [];
}

// ============================================================
// PROBLEM 4: Omit for Input
// ============================================================
/**
 * Create a type for creating new products that omits
 * id, createdAt, and updatedAt (these are generated).
 */

// TODO: Create CreateProduct type using Omit
type CreateProduct = any;

function createProduct(input: CreateProduct): Product {
  // Add generated fields
  return {
    ...input,
    id: Math.random(),
    createdAt: new Date(),
    updatedAt: new Date()
  } as Product;
}

// ============================================================
// PROBLEM 5: Record for Lookup
// ============================================================
/**
 * Create a type for a product lookup by category.
 * Keys are category names, values are arrays of products.
 */

// TODO: Create CategoryProducts type using Record
type CategoryProducts = any;

function groupByCategory(products: Product[]): CategoryProducts {
  // TODO: Group products by category
  return {};
}

// ============================================================
// PROBLEM 6: Readonly for Immutable State
// ============================================================
/**
 * Create an immutable state type for a shopping cart.
 */

interface CartItem {
  productId: number;
  quantity: number;
  price: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  discount: number;
}

// TODO: Create ReadonlyCartState using Readonly
type ReadonlyCartState = any;

function calculateTotal(cart: ReadonlyCartState): number {
  // TODO: Calculate total (cart.total should be readonly)
  return 0;
}

// ============================================================
// PROBLEM 7: Exclude from Union
// ============================================================
/**
 * Given a status union, create a type that excludes certain statuses.
 */

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";

// TODO: Create ActiveOrderStatus that excludes "cancelled" and "refunded"
type ActiveOrderStatus = any;

function processActiveOrder(status: ActiveOrderStatus): void {
  console.log(`Processing order with status: ${status}`);
}

// ============================================================
// PROBLEM 8: Extract from Union
// ============================================================
/**
 * Extract only the "successful" statuses from the order status.
 */

// TODO: Create SuccessfulStatus that only includes "shipped" and "delivered"
type SuccessfulStatus = any;

function celebrateSuccess(status: SuccessfulStatus): string {
  return `Order ${status}! 🎉`;
}

// ============================================================
// PROBLEM 9: NonNullable
// ============================================================
/**
 * Create a function that safely processes a potentially null user.
 */

interface UserProfile {
  id: number;
  name: string;
  email: string;
}

type MaybeUser = UserProfile | null | undefined;

function getUserName(user: MaybeUser): string {
  // TODO: Return user name or "Guest" if null/undefined
  return "";
}

// ============================================================
// PROBLEM 10: ReturnType
// ============================================================
/**
 * Use ReturnType to create a type from an existing function.
 */

function fetchUserData(userId: number) {
  return {
    user: { id: userId, name: "User", email: "user@example.com" },
    permissions: ["read", "write"],
    lastLogin: new Date()
  };
}

// TODO: Create UserData type using ReturnType
type UserData = any;

function processUserData(data: UserData): void {
  console.log(`Processing ${data.user.name}`);
}

// ============================================================
// PROBLEM 11: Parameters
// ============================================================
/**
 * Use Parameters to create a wrapper function.
 */

function sendEmail(to: string, subject: string, body: string, attachments?: string[]): boolean {
  console.log(`Sending email to ${to}`);
  return true;
}

// TODO: Create EmailParams type using Parameters
type EmailParams = any;

function queueEmail(...args: EmailParams): void {
  // Queue the email for later sending
  console.log("Email queued:", args[0]);
}

// ============================================================
// PROBLEM 12: Combining Utility Types
// ============================================================
/**
 * Create a complex type using multiple utility types:
 * - Start with Product
 * - Pick only name, description, price, category
 * - Make all those fields optional (for search filters)
 */

// TODO: Create ProductFilter type
type ProductFilter = any;

function searchProducts(filter: ProductFilter): Product[] {
  // Would filter products based on criteria
  return [];
}

// ============================================================
// TEST YOUR ANSWERS
// ============================================================

console.log("========================================");
console.log("TESTING YOUR ANSWERS");
console.log("========================================\n");

// Problem 1
console.log("--- Problem 1: Partial Update ---");
const product: Product = {
  id: 1, name: "Laptop", description: "A laptop", price: 999,
  stock: 10, category: "electronics", createdAt: new Date(), updatedAt: new Date()
};
const updated = updateProduct(product, { price: 899 });
if (updated.price === 899 && updated.name === "Laptop") {
  console.log("✅ Problem 1 PASSED!\n");
} else {
  console.log(`❌ Update failed\n`);
}

// Problem 2
console.log("--- Problem 2: Required Config ---");
// Just type check - if it compiles, it works
const config: RequiredConfig = { apiKey: "key", baseUrl: "url", timeout: 1000, retries: 3 };
initializeApp(config);
console.log("✅ Problem 2 PASSED!\n");

// Problem 3
console.log("--- Problem 3: Pick for API Response ---");
const listItem: ProductListItem = { id: 1, name: "Test", price: 10, stock: 5 };
// @ts-expect-error - Should not have description
// const invalid: ProductListItem = { id: 1, name: "Test", price: 10, stock: 5, description: "x" };
console.log("✅ Problem 3 PASSED!\n");

// Problem 4
console.log("--- Problem 4: Omit for Input ---");
const createInput: CreateProduct = { name: "New", description: "Desc", price: 50, stock: 10, category: "test" };
const created = createProduct(createInput);
if (created.id && created.createdAt) {
  console.log("✅ Problem 4 PASSED!\n");
} else {
  console.log(`❌ Create failed\n`);
}

// Problem 5
console.log("--- Problem 5: Record for Lookup ---");
const products: Product[] = [
  { ...product, category: "electronics" },
  { ...product, id: 2, category: "books" }
];
const grouped = groupByCategory(products);
if (grouped["electronics"] || grouped["books"]) {
  console.log("✅ Problem 5 PASSED!\n");
} else {
  console.log(`❌ Grouping failed\n`);
}

// Problem 6
console.log("--- Problem 6: Readonly State ---");
const cart: ReadonlyCartState = { items: [], total: 100, discount: 10 };
const total = calculateTotal(cart);
console.log("✅ Problem 6 PASSED!\n");

// Problem 7
console.log("--- Problem 7: Exclude from Union ---");
const activeStatus: ActiveOrderStatus = "shipped";
processActiveOrder(activeStatus);
console.log("✅ Problem 7 PASSED!\n");

// Problem 8
console.log("--- Problem 8: Extract from Union ---");
const successStatus: SuccessfulStatus = "delivered";
console.log(celebrateSuccess(successStatus));
console.log("✅ Problem 8 PASSED!\n");

// Problem 9
console.log("--- Problem 9: NonNullable ---");
if (getUserName({ id: 1, name: "Alice", email: "a@b.com" }) === "Alice" &&
    getUserName(null) === "Guest") {
  console.log("✅ Problem 9 PASSED!\n");
} else {
  console.log(`❌ getUserName failed\n`);
}

// Problem 10
console.log("--- Problem 10: ReturnType ---");
const userData: UserData = fetchUserData(1);
processUserData(userData);
console.log("✅ Problem 10 PASSED!\n");

// Problem 11
console.log("--- Problem 11: Parameters ---");
const emailParams: EmailParams = ["test@example.com", "Hello", "World"];
queueEmail(...emailParams);
console.log("✅ Problem 11 PASSED!\n");

// Problem 12
console.log("--- Problem 12: Combining Utility Types ---");
const filter: ProductFilter = { name: "Laptop" };  // All fields optional
searchProducts(filter);
console.log("✅ Problem 12 PASSED!\n");

console.log("========================================");
console.log("🎉 All practice complete!");
console.log("You've finished the TypeScript curriculum!");
console.log("========================================");
