/**
 * ============================================================
 * PRACTICE: Drizzle ORM (Module 2.4)
 * ============================================================
 *
 * Practice your Drizzle ORM skills with these exercises!
 *
 * Instructions:
 * 1. Complete each TODO by implementing the function
 * 2. Run: bun lessons/backend/practice/04-drizzle-practice.ts
 * 3. Check if all tests pass!
 *
 * Note: This practice uses an in-memory mock to simulate database operations.
 * In a real application, you would connect to a PostgreSQL database.
 */

import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
  numeric,
  index,
} from "drizzle-orm/pg-core";
import { relations, eq, and, gt, lt, desc, asc, sql } from "drizzle-orm";

console.log("========================================");
console.log("PRACTICE: DRIZZLE ORM");
console.log("========================================\n");

// ============================================================
// PROBLEM 1: Create a Products Table Schema
// ============================================================

/**
 * Define a products table with the following columns:
 * - id: auto-incrementing primary key
 * - name: text, required, max 255 chars
 * - description: text, optional
 * - price: numeric with 10 precision and 2 scale, required
 * - stock: integer, required, default 0
 * - category: text, required
 * - isActive: boolean, required, default true
 * - createdAt: timestamp, required, default now
 * - updatedAt: timestamp, required, default now
 *
 * Add an index on the category column.
 */

// TODO: Implement the products table schema
const products = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    // Add remaining columns here
    name: text("name"), // Fix this: should be varchar with max 255, notNull
    price: numeric("price"), // Fix this: should have precision/scale, notNull
    stock: integer("stock"), // Fix this: should have default 0, notNull
    category: text("category"), // Fix this: should be notNull
    isActive: boolean("is_active"), // Fix this: should have default true, notNull
    createdAt: timestamp("created_at"), // Fix this: should have defaultNow, notNull
    updatedAt: timestamp("updated_at"), // Fix this: should have defaultNow, notNull
    description: text("description"), // This one is optional, so it's fine
  },
  (table) => [
    // TODO: Add an index on category
  ]
);

// ============================================================
// PROBLEM 2: Create an Orders Table Schema
// ============================================================

/**
 * Define an orders table with:
 * - id: auto-incrementing primary key
 * - customerName: varchar(100), required
 * - customerEmail: varchar(255), required
 * - status: text, required, default 'pending'
 *   (possible values: 'pending', 'processing', 'shipped', 'delivered', 'cancelled')
 * - totalAmount: numeric(10,2), required
 * - shippingAddress: text, required
 * - notes: text, optional
 * - createdAt: timestamp, required, default now
 *
 * Add indexes on status and customerEmail.
 */

// TODO: Implement the orders table schema
const orders = pgTable(
  "orders",
  {
    id: serial("id").primaryKey(),
    // Add remaining columns here
    customerName: varchar("customer_name", { length: 100 }),
    customerEmail: varchar("customer_email", { length: 255 }),
    status: text("status"),
    totalAmount: numeric("total_amount"),
    shippingAddress: text("shipping_address"),
    notes: text("notes"),
    createdAt: timestamp("created_at"),
  },
  (table) => [
    // TODO: Add indexes on status and customerEmail
  ]
);

// ============================================================
// PROBLEM 3: Create an Order Items Junction Table
// ============================================================

/**
 * Define an order_items table that links orders to products:
 * - id: auto-incrementing primary key
 * - orderId: integer, required, references orders.id
 * - productId: integer, required, references products.id
 * - quantity: integer, required, default 1
 * - unitPrice: numeric(10,2), required (price at time of order)
 * - createdAt: timestamp, required, default now
 */

// TODO: Implement the orderItems table schema
const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  // Add remaining columns here
  orderId: integer("order_id"),
  productId: integer("product_id"),
  quantity: integer("quantity"),
  unitPrice: numeric("unit_price"),
  createdAt: timestamp("created_at"),
});

// ============================================================
// PROBLEM 4: Define Relations
// ============================================================

/**
 * Define the relations between tables:
 * - An order has many order items
 * - An order item belongs to one order
 * - An order item belongs to one product
 * - A product has many order items
 */

// TODO: Implement ordersRelations
const ordersRelations = relations(orders, ({ many }) => ({
  // Define the relation to orderItems
}));

// TODO: Implement orderItemsRelations
const orderItemsRelations = relations(orderItems, ({ one }) => ({
  // Define relations to order and product
}));

// TODO: Implement productsRelations
const productsRelations = relations(products, ({ many }) => ({
  // Define the relation to orderItems
}));

// ============================================================
// PROBLEM 5: Implement CRUD Operations (Mock)
// ============================================================

/**
 * For testing purposes, we'll use in-memory arrays to simulate database operations.
 * Implement the CRUD functions below.
 */

// Type inference from schemas
type Product = typeof products.$inferSelect;
type NewProduct = typeof products.$inferInsert;
type Order = typeof orders.$inferSelect;
type NewOrder = typeof orders.$inferInsert;
type OrderItem = typeof orderItems.$inferSelect;
type NewOrderItem = typeof orderItems.$inferInsert;

// In-memory mock database
let mockProducts: Product[] = [];
let mockOrders: Order[] = [];
let mockOrderItems: OrderItem[] = [];
let nextProductId = 1;
let nextOrderId = 1;
let nextOrderItemId = 1;

/**
 * Create a new product.
 * Return the created product with id, createdAt, and updatedAt.
 */
function createProduct(data: Omit<NewProduct, "id" | "createdAt" | "updatedAt">): Product {
  // TODO: Implement product creation
  // - Generate id using nextProductId++
  // - Set createdAt and updatedAt to new Date()
  // - Apply defaults for stock (0) and isActive (true) if not provided
  // - Add to mockProducts array
  // - Return the created product

  return {} as Product; // Replace with implementation
}

/**
 * Get all products, optionally filtered by category.
 */
function getProducts(category?: string): Product[] {
  // TODO: Implement getting products
  // - If category is provided, filter by it
  // - Return the filtered (or all) products

  return []; // Replace with implementation
}

/**
 * Get a product by ID.
 * Return null if not found.
 */
function getProductById(id: number): Product | null {
  // TODO: Implement getting a product by ID

  return null; // Replace with implementation
}

/**
 * Update a product by ID.
 * Return the updated product or null if not found.
 */
function updateProduct(
  id: number,
  data: Partial<Omit<NewProduct, "id" | "createdAt">>
): Product | null {
  // TODO: Implement product update
  // - Find the product by id
  // - If not found, return null
  // - Update the fields provided in data
  // - Update the updatedAt timestamp
  // - Return the updated product

  return null; // Replace with implementation
}

/**
 * Delete a product by ID.
 * Return true if deleted, false if not found.
 */
function deleteProduct(id: number): boolean {
  // TODO: Implement product deletion

  return false; // Replace with implementation
}

// ============================================================
// PROBLEM 6: Implement Order Operations
// ============================================================

/**
 * Create a new order with items.
 * This should:
 * 1. Create the order
 * 2. Create order items for each product
 * 3. Calculate the total amount from items
 * Return the order with its items.
 */
function createOrder(
  orderData: Omit<NewOrder, "id" | "createdAt" | "totalAmount">,
  items: Array<{ productId: number; quantity: number }>
): { order: Order; items: OrderItem[] } | null {
  // TODO: Implement order creation with items
  // - Validate that all products exist
  // - Calculate total from product prices * quantities
  // - Create the order
  // - Create order items with unit prices from products
  // - Return the order and items

  return null; // Replace with implementation
}

/**
 * Get an order by ID with its items and product details.
 */
function getOrderWithItems(orderId: number): {
  order: Order;
  items: Array<OrderItem & { product: Product | null }>;
} | null {
  // TODO: Implement getting order with items
  // - Find the order
  // - Find all order items for this order
  // - For each item, attach the product
  // - Return the combined data

  return null; // Replace with implementation
}

/**
 * Update order status.
 */
function updateOrderStatus(
  orderId: number,
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
): Order | null {
  // TODO: Implement order status update

  return null; // Replace with implementation
}

// ============================================================
// PROBLEM 7: Implement Query Operations
// ============================================================

/**
 * Get products with low stock (stock < threshold).
 * Sort by stock ascending.
 */
function getLowStockProducts(threshold: number): Product[] {
  // TODO: Implement low stock query

  return []; // Replace with implementation
}

/**
 * Get orders by status, sorted by creation date (newest first).
 */
function getOrdersByStatus(
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
): Order[] {
  // TODO: Implement orders by status query

  return []; // Replace with implementation
}

/**
 * Get total revenue (sum of all order totals for non-cancelled orders).
 */
function getTotalRevenue(): number {
  // TODO: Implement revenue calculation

  return 0; // Replace with implementation
}

/**
 * Get best-selling products (by total quantity ordered).
 * Return top N products with their total quantities.
 */
function getBestSellingProducts(
  limit: number
): Array<{ product: Product; totalQuantity: number }> {
  // TODO: Implement best-selling products query
  // - Aggregate order items by product
  // - Sum quantities for each product
  // - Sort by total quantity descending
  // - Return top N

  return []; // Replace with implementation
}

// ============================================================
// TESTS
// ============================================================

console.log("Running tests...\n");

let passed = 0;
let failed = 0;

// Reset mock data before each test section
function resetMockData() {
  mockProducts = [];
  mockOrders = [];
  mockOrderItems = [];
  nextProductId = 1;
  nextOrderId = 1;
  nextOrderItemId = 1;
}

// Test 1: Create products
resetMockData();
const product1 = createProduct({
  name: "Laptop",
  description: "High-performance laptop",
  price: "999.99",
  stock: 50,
  category: "Electronics",
  isActive: true,
});

const product2 = createProduct({
  name: "Headphones",
  price: "149.99",
  stock: 100,
  category: "Electronics",
});

const product3 = createProduct({
  name: "Coffee Mug",
  price: "12.99",
  stock: 200,
  category: "Kitchen",
});

if (
  product1.id === 1 &&
  product1.name === "Laptop" &&
  product1.price === "999.99" &&
  product2.id === 2 &&
  product2.stock === 100 &&
  product3.category === "Kitchen"
) {
  console.log("✅ Problem 5: createProduct works");
  passed++;
} else {
  console.log("❌ Problem 5: createProduct failed");
  failed++;
}

// Test 2: Get products by category
const electronics = getProducts("Electronics");
const allProducts = getProducts();

if (electronics.length === 2 && allProducts.length === 3) {
  console.log("✅ Problem 5: getProducts works");
  passed++;
} else {
  console.log("❌ Problem 5: getProducts failed");
  failed++;
}

// Test 3: Get product by ID
const foundProduct = getProductById(1);
const notFoundProduct = getProductById(999);

if (foundProduct?.name === "Laptop" && notFoundProduct === null) {
  console.log("✅ Problem 5: getProductById works");
  passed++;
} else {
  console.log("❌ Problem 5: getProductById failed");
  failed++;
}

// Test 4: Update product
const updatedProduct = updateProduct(1, { name: "Gaming Laptop", stock: 45 });
const notUpdated = updateProduct(999, { name: "Nothing" });

if (
  updatedProduct?.name === "Gaming Laptop" &&
  updatedProduct?.stock === 45 &&
  notUpdated === null
) {
  console.log("✅ Problem 5: updateProduct works");
  passed++;
} else {
  console.log("❌ Problem 5: updateProduct failed");
  failed++;
}

// Test 5: Delete product
const deleted = deleteProduct(3);
const notDeleted = deleteProduct(999);
const remainingProducts = getProducts();

if (deleted === true && notDeleted === false && remainingProducts.length === 2) {
  console.log("✅ Problem 5: deleteProduct works");
  passed++;
} else {
  console.log("❌ Problem 5: deleteProduct failed");
  failed++;
}

// Test 6: Create order with items
const orderResult = createOrder(
  {
    customerName: "John Doe",
    customerEmail: "john@example.com",
    status: "pending",
    shippingAddress: "123 Main St",
    notes: "Gift wrap please",
  },
  [
    { productId: 1, quantity: 2 },
    { productId: 2, quantity: 1 },
  ]
);

if (
  orderResult &&
  orderResult.order.customerName === "John Doe" &&
  orderResult.items.length === 2 &&
  orderResult.order.totalAmount === "2149.97" // 999.99*2 + 149.99
) {
  console.log("✅ Problem 6: createOrder works");
  passed++;
} else {
  console.log("❌ Problem 6: createOrder failed");
  failed++;
}

// Test 7: Get order with items
const orderWithItems = getOrderWithItems(1);

if (
  orderWithItems &&
  orderWithItems.order.id === 1 &&
  orderWithItems.items.length === 2 &&
  orderWithItems.items[0].product !== null
) {
  console.log("✅ Problem 6: getOrderWithItems works");
  passed++;
} else {
  console.log("❌ Problem 6: getOrderWithItems failed");
  failed++;
}

// Test 8: Update order status
const updatedOrder = updateOrderStatus(1, "processing");

if (updatedOrder && updatedOrder.status === "processing") {
  console.log("✅ Problem 6: updateOrderStatus works");
  passed++;
} else {
  console.log("❌ Problem 6: updateOrderStatus failed");
  failed++;
}

// Test 9: Low stock products
updateProduct(1, { stock: 5 }); // Make laptop low stock
const lowStock = getLowStockProducts(10);

if (lowStock.length === 1 && lowStock[0].name === "Gaming Laptop") {
  console.log("✅ Problem 7: getLowStockProducts works");
  passed++;
} else {
  console.log("❌ Problem 7: getLowStockProducts failed");
  failed++;
}

// Test 10: Orders by status
const pendingOrders = getOrdersByStatus("pending");
updateOrderStatus(1, "shipped");
const shippedOrders = getOrdersByStatus("shipped");

if (pendingOrders.length === 0 && shippedOrders.length === 1) {
  console.log("✅ Problem 7: getOrdersByStatus works");
  passed++;
} else {
  console.log("❌ Problem 7: getOrdersByStatus failed");
  failed++;
}

// Test 11: Total revenue
// Create another order for revenue testing
createOrder(
  {
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    status: "delivered",
    shippingAddress: "456 Oak Ave",
  },
  [{ productId: 2, quantity: 3 }]
);
// Cancel one order to test revenue excludes cancelled
updateOrderStatus(1, "cancelled");

const revenue = getTotalRevenue();

if (revenue === 449.97) {
  // Only second order counts: 149.99 * 3
  console.log("✅ Problem 7: getTotalRevenue works");
  passed++;
} else {
  console.log(`❌ Problem 7: getTotalRevenue failed (got ${revenue})`);
  failed++;
}

// Test 12: Best-selling products
const bestSellers = getBestSellingProducts(2);

if (
  bestSellers.length === 2 &&
  bestSellers[0].product.name === "Headphones" && // 4 total: 1 + 3
  bestSellers[0].totalQuantity === 4
) {
  console.log("✅ Problem 7: getBestSellingProducts works");
  passed++;
} else {
  console.log("❌ Problem 7: getBestSellingProducts failed");
  failed++;
}

// Results
console.log(`\n${passed}/${passed + failed} tests passed`);
if (failed === 0) {
  console.log("\n All Drizzle practice problems complete!");
}
