/**
 * ============================================================
 * PRACTICE: Interfaces
 * ============================================================
 * 
 * Instructions:
 * 1. Define the required interfaces and implement functions
 * 2. Run: bun lessons/practice/08-interfaces-practice.ts
 * 3. Check if all tests pass!
 */

// ============================================================
// PROBLEM 1: Basic Interface
// ============================================================
/**
 * Define an interface for a Book with:
 * - title (string)
 * - author (string)
 * - year (number)
 * - isbn (string)
 */

// TODO: Define the Book interface
interface Book {
  // Add properties here
}

function createBook(title: string, author: string, year: number, isbn: string): Book {
  // TODO: Return a Book object
  return {} as Book;
}

// ============================================================
// PROBLEM 2: Optional Properties
// ============================================================
/**
 * Define an interface for a Product with:
 * - id (number, required)
 * - name (string, required)
 * - price (number, required)
 * - description (string, optional)
 * - discount (number, optional)
 */

// TODO: Define the Product interface
interface Product {
  // Add properties here
}

function calculateFinalPrice(product: Product): number {
  // TODO: Return price after discount (if discount exists)
  // discount is a percentage (e.g., 10 means 10% off)
  return 0;
}

// ============================================================
// PROBLEM 3: Interface with Methods
// ============================================================
/**
 * Define an interface for a Counter with:
 * - count (number)
 * - increment() - increases count by 1
 * - decrement() - decreases count by 1
 * - reset() - sets count to 0
 * - getCount() - returns current count
 */

// TODO: Define the Counter interface
interface Counter {
  // Add properties and methods here
}

function createCounter(initialValue: number = 0): Counter {
  // TODO: Return a Counter object
  return {} as Counter;
}

// ============================================================
// PROBLEM 4: Extending Interfaces
// ============================================================
/**
 * Define interfaces:
 * - Vehicle with name, year, color
 * - Car extends Vehicle with numDoors, fuelType
 * - ElectricCar extends Car with batteryCapacity, range
 */

// TODO: Define the interfaces
interface Vehicle {
  // Add properties
}

interface Car extends Vehicle {
  // Add Car-specific properties
}

interface ElectricCar extends Car {
  // Add ElectricCar-specific properties
}

function describeElectricCar(car: ElectricCar): string {
  // TODO: Return a description string
  return "";
}

// ============================================================
// PROBLEM 5: Index Signature
// ============================================================
/**
 * Define an interface for a GradeBook that:
 * - Has a className property (string)
 * - Can have any number of student names as keys with number grades as values
 */

// TODO: Define the GradeBook interface
interface GradeBook {
  className: string;
  // Add index signature for student grades
}

function calculateClassAverage(gradeBook: GradeBook): number {
  // TODO: Calculate average of all student grades
  // (Don't include className in the calculation!)
  return 0;
}

// ============================================================
// PROBLEM 6: Function Interface
// ============================================================
/**
 * Define an interface for a Validator function that:
 * - Takes a string value
 * - Returns an object with { isValid: boolean, error?: string }
 */

interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// TODO: Define the Validator interface
interface Validator {
  // Define function signature
}

// TODO: Implement an email validator
const emailValidator: Validator = (value: string): ValidationResult => {
  // Return { isValid: true } if contains @, otherwise { isValid: false, error: "..." }
  return { isValid: false };
};

// ============================================================
// PROBLEM 7: Generic Interface
// ============================================================
/**
 * Define a generic interface for a Cache<T> with:
 * - get(key: string): T | undefined
 * - set(key: string, value: T): void
 * - has(key: string): boolean
 * - delete(key: string): boolean
 * - clear(): void
 */

// TODO: Define the Cache interface
interface Cache<T> {
  // Add methods
}

function createCache<T>(): Cache<T> {
  // TODO: Implement a cache using an object
  return {} as Cache<T>;
}

// ============================================================
// PROBLEM 8: Composing Interfaces
// ============================================================
/**
 * Create interfaces that compose together:
 * - Identifiable: has id (string)
 * - Named: has name (string)  
 * - Described: has description (optional string)
 * - Priced: has price (number)
 * 
 * Then create a MenuItem interface that extends all of them
 * and adds a category property
 */

// TODO: Define the interfaces
interface Identifiable {
  // Add property
}

interface Named {
  // Add property
}

interface Described {
  // Add property
}

interface Priced {
  // Add property
}

interface MenuItem extends Identifiable, Named, Described, Priced {
  // Add category property
}

function formatMenuItem(item: MenuItem): string {
  // TODO: Return formatted string like "Pizza ($12.99) - Delicious cheese pizza"
  return "";
}

// ============================================================
// PROBLEM 9: Readonly Interface
// ============================================================
/**
 * Define a ReadonlyUser interface where all properties are readonly:
 * - id (number)
 * - username (string)
 * - email (string)
 * - createdAt (Date)
 */

// TODO: Define the ReadonlyUser interface
interface ReadonlyUser {
  // Add readonly properties
}

function createReadonlyUser(id: number, username: string, email: string): ReadonlyUser {
  // TODO: Return a readonly user
  return {} as ReadonlyUser;
}

// ============================================================
// PROBLEM 10: Interface for API Response
// ============================================================
/**
 * Define generic interfaces for API responses:
 * - SuccessResponse<T>: { success: true, data: T }
 * - ErrorResponse: { success: false, error: string, code: number }
 * - ApiResponse<T>: Either SuccessResponse<T> or ErrorResponse
 */

// TODO: Define the interfaces
interface SuccessResponse<T> {
  // Add properties
}

interface ErrorResponse {
  // Add properties
}

type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

function handleResponse<T>(response: ApiResponse<T>): T | null {
  // TODO: Return data if success, null if error
  return null;
}

// ============================================================
// TEST YOUR ANSWERS
// ============================================================

console.log("========================================");
console.log("TESTING YOUR ANSWERS");
console.log("========================================\n");

// Problem 1
console.log("--- Problem 1: Basic Interface ---");
const book = createBook("TypeScript Handbook", "Microsoft", 2023, "978-0-123456-78-9");
if (book.title === "TypeScript Handbook" && book.author === "Microsoft") {
  console.log("✅ Problem 1 PASSED!\n");
} else {
  console.log(`❌ Book: ${JSON.stringify(book)}\n`);
}

// Problem 2
console.log("--- Problem 2: Optional Properties ---");
const p1 = { id: 1, name: "Laptop", price: 1000, discount: 10 };
const p2 = { id: 2, name: "Mouse", price: 50 };
if (calculateFinalPrice(p1 as Product) === 900 && calculateFinalPrice(p2 as Product) === 50) {
  console.log("✅ Problem 2 PASSED!\n");
} else {
  console.log(`❌ Prices: ${calculateFinalPrice(p1 as Product)}, ${calculateFinalPrice(p2 as Product)}\n`);
}

// Problem 3
console.log("--- Problem 3: Interface with Methods ---");
const counter = createCounter(5);
counter.increment();
counter.increment();
counter.decrement();
if (counter.getCount() === 6) {
  counter.reset();
  if (counter.getCount() === 0) {
    console.log("✅ Problem 3 PASSED!\n");
  } else {
    console.log(`❌ After reset: ${counter.getCount()}\n`);
  }
} else {
  console.log(`❌ Count: ${counter.getCount()} (expected 6)\n`);
}

// Problem 4
console.log("--- Problem 4: Extending Interfaces ---");
const tesla: ElectricCar = {
  name: "Model 3",
  year: 2023,
  color: "red",
  numDoors: 4,
  fuelType: "electric",
  batteryCapacity: 75,
  range: 300
};
const desc = describeElectricCar(tesla);
if (desc.includes("Model 3") && desc.includes("300")) {
  console.log("✅ Problem 4 PASSED!\n");
} else {
  console.log(`❌ Description: ${desc}\n`);
}

// Problem 5
console.log("--- Problem 5: Index Signature ---");
const grades: GradeBook = {
  className: "Math 101",
  Alice: 95,
  Bob: 87,
  Charlie: 92
};
const avg = calculateClassAverage(grades);
if (Math.abs(avg - 91.33) < 0.1) {
  console.log("✅ Problem 5 PASSED!\n");
} else {
  console.log(`❌ Average: ${avg} (expected ~91.33)\n`);
}

// Problem 6
console.log("--- Problem 6: Function Interface ---");
const validResult = emailValidator("test@example.com");
const invalidResult = emailValidator("invalid-email");
if (validResult.isValid === true && invalidResult.isValid === false && invalidResult.error) {
  console.log("✅ Problem 6 PASSED!\n");
} else {
  console.log(`❌ Validator results incorrect\n`);
}

// Problem 7
console.log("--- Problem 7: Generic Interface ---");
const cache = createCache<number>();
cache.set("a", 1);
cache.set("b", 2);
if (cache.get("a") === 1 && cache.has("b") && !cache.has("c")) {
  cache.delete("a");
  if (!cache.has("a")) {
    console.log("✅ Problem 7 PASSED!\n");
  } else {
    console.log(`❌ Delete failed\n`);
  }
} else {
  console.log(`❌ Cache operations failed\n`);
}

// Problem 8
console.log("--- Problem 8: Composing Interfaces ---");
const menuItem: MenuItem = {
  id: "pizza-1",
  name: "Margherita Pizza",
  description: "Classic Italian pizza",
  price: 12.99,
  category: "main"
};
const formatted = formatMenuItem(menuItem);
if (formatted.includes("Margherita") && formatted.includes("12.99")) {
  console.log("✅ Problem 8 PASSED!\n");
} else {
  console.log(`❌ Formatted: ${formatted}\n`);
}

// Problem 9
console.log("--- Problem 9: Readonly Interface ---");
const roUser = createReadonlyUser(1, "alice", "alice@example.com");
if (roUser.id === 1 && roUser.username === "alice") {
  console.log("✅ Problem 9 PASSED!\n");
} else {
  console.log(`❌ User: ${JSON.stringify(roUser)}\n`);
}

// Problem 10
console.log("--- Problem 10: API Response ---");
const success: ApiResponse<string> = { success: true, data: "Hello" };
const error: ApiResponse<string> = { success: false, error: "Not found", code: 404 };
if (handleResponse(success) === "Hello" && handleResponse(error) === null) {
  console.log("✅ Problem 10 PASSED!\n");
} else {
  console.log(`❌ Response handling failed\n`);
}

console.log("========================================");
console.log("Practice complete!");
console.log("========================================");
