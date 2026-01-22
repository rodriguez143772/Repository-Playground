/**
 * ============================================================
 * LESSON 9: Union and Literal Types
 * ============================================================
 * 
 * Union types are like a multiple-choice question - a value can be
 * ONE of several types. Literal types are even more specific -
 * they restrict a value to exact values.
 * 
 * Think of it like:
 * - Union: "This payment can be by cash OR card OR check"
 * - Literal: "This size can only be 'small', 'medium', or 'large'"
 * 
 * These features make TypeScript incredibly expressive!
 */

// ============================================================
// SECTION 1: Basic Union Types
// ============================================================

console.log("========================================");
console.log("BASIC UNION TYPES");
console.log("========================================\n");

// A variable that can be multiple types
let id: string | number;

id = "abc-123";
console.log("ID as string:", id);

id = 12345;
console.log("ID as number:", id);

// Function with union parameter
function printId(id: string | number): void {
  console.log(`Your ID is: ${id}`);
}

printId("user-001");
printId(42);

// Return type can be union
function getRandomValue(): string | number {
  return Math.random() > 0.5 ? "hello" : 42;
}

console.log("Random value:", getRandomValue());

// ============================================================
// SECTION 2: Narrowing Union Types
// ============================================================

console.log("\n========================================");
console.log("TYPE NARROWING");
console.log("========================================\n");

// TypeScript needs to know which type it is before using type-specific methods
function formatValue(value: string | number): string {
  // Type guard using typeof
  if (typeof value === "string") {
    // TypeScript knows value is string here
    return value.toUpperCase();
  } else {
    // TypeScript knows value is number here
    return value.toFixed(2);
  }
}

console.log(formatValue("hello"));  // "HELLO"
console.log(formatValue(3.14159)); // "3.14"

// Multiple type checks
function processInput(input: string | number | boolean): string {
  if (typeof input === "string") {
    return `String: ${input.length} characters`;
  } else if (typeof input === "number") {
    return `Number: ${input * 2}`;
  } else {
    return `Boolean: ${input ? "yes" : "no"}`;
  }
}

console.log(processInput("hello"));
console.log(processInput(21));
console.log(processInput(true));

// ============================================================
// SECTION 3: Literal Types
// ============================================================

console.log("\n========================================");
console.log("LITERAL TYPES");
console.log("========================================\n");

// String literals
type Direction = "north" | "south" | "east" | "west";

let heading: Direction = "north";
console.log("Heading:", heading);

heading = "east";
console.log("New heading:", heading);

// heading = "up";  // Error! "up" is not assignable to Direction

// Number literals
type DiceRoll = 1 | 2 | 3 | 4 | 5 | 6;

function rollDice(): DiceRoll {
  return Math.ceil(Math.random() * 6) as DiceRoll;
}

console.log("Dice roll:", rollDice());

// Boolean literal (less common but possible)
type Success = true;
const operationSucceeded: Success = true;

// ============================================================
// SECTION 4: Union of Literal Types
// ============================================================

console.log("\n========================================");
console.log("UNION OF LITERALS");
console.log("========================================\n");

// Status codes
type HttpStatus = 200 | 201 | 400 | 401 | 404 | 500;

function getStatusMessage(status: HttpStatus): string {
  switch (status) {
    case 200: return "OK";
    case 201: return "Created";
    case 400: return "Bad Request";
    case 401: return "Unauthorized";
    case 404: return "Not Found";
    case 500: return "Internal Server Error";
  }
}

console.log("Status 200:", getStatusMessage(200));
console.log("Status 404:", getStatusMessage(404));

// Sizes
type Size = "xs" | "s" | "m" | "l" | "xl";

interface Product {
  name: string;
  size: Size;
  price: number;
}

const shirt: Product = {
  name: "T-Shirt",
  size: "m",
  price: 29.99
};

console.log("Product:", shirt);

// ============================================================
// SECTION 5: Discriminated Unions
// ============================================================

console.log("\n========================================");
console.log("DISCRIMINATED UNIONS");
console.log("========================================\n");

// Each type has a common "discriminant" property
type Shape = 
  | { kind: "circle"; radius: number }
  | { kind: "rectangle"; width: number; height: number }
  | { kind: "triangle"; base: number; height: number };

function calculateArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rectangle":
      return shape.width * shape.height;
    case "triangle":
      return (shape.base * shape.height) / 2;
  }
}

const circle: Shape = { kind: "circle", radius: 5 };
const rect: Shape = { kind: "rectangle", width: 10, height: 5 };
const tri: Shape = { kind: "triangle", base: 8, height: 6 };

console.log("Circle area:", calculateArea(circle).toFixed(2));
console.log("Rectangle area:", calculateArea(rect));
console.log("Triangle area:", calculateArea(tri));

// Real-world example: API responses
type ApiResult<T> = 
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: string };

function handleResult<T>(result: ApiResult<T>): string {
  switch (result.status) {
    case "loading":
      return "Loading...";
    case "success":
      return `Got data: ${JSON.stringify(result.data)}`;
    case "error":
      return `Error: ${result.error}`;
  }
}

console.log(handleResult({ status: "loading" }));
console.log(handleResult({ status: "success", data: { name: "Alice" } }));
console.log(handleResult({ status: "error", error: "Not found" }));

// ============================================================
// SECTION 6: Exhaustiveness Checking
// ============================================================

console.log("\n========================================");
console.log("EXHAUSTIVENESS CHECKING");
console.log("========================================\n");

type TrafficLight = "red" | "yellow" | "green";

function getAction(light: TrafficLight): string {
  switch (light) {
    case "red":
      return "Stop";
    case "yellow":
      return "Caution";
    case "green":
      return "Go";
    default:
      // This ensures we handle all cases
      const _exhaustiveCheck: never = light;
      return _exhaustiveCheck;
  }
}

// If we add a new color to TrafficLight but forget to handle it,
// TypeScript will give us an error!

console.log("Red light:", getAction("red"));
console.log("Green light:", getAction("green"));

// ============================================================
// SECTION 7: Type Aliases for Complex Unions
// ============================================================

console.log("\n========================================");
console.log("TYPE ALIASES");
console.log("========================================\n");

// Simple alias
type StringOrNumber = string | number;

// Complex alias
type Primitive = string | number | boolean | null | undefined;

// Combining types
type PrimitiveArray = Primitive[];

const values: PrimitiveArray = [1, "hello", true, null];
console.log("Primitive array:", values);

// Alias for object shapes
type User = {
  id: number;
  name: string;
  email: string;
};

type AdminUser = User & {
  permissions: string[];
};

const admin: AdminUser = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
  permissions: ["read", "write", "delete"]
};

console.log("Admin:", admin);

// ============================================================
// SECTION 8: Nullable Types
// ============================================================

console.log("\n========================================");
console.log("NULLABLE TYPES");
console.log("========================================\n");

// Explicitly allowing null
type MaybeString = string | null;

function greet(name: MaybeString): string {
  if (name === null) {
    return "Hello, stranger!";
  }
  return `Hello, ${name}!`;
}

console.log(greet("Alice"));
console.log(greet(null));

// Allowing undefined
type OptionalNumber = number | undefined;

function double(value: OptionalNumber): number {
  if (value === undefined) {
    return 0;
  }
  return value * 2;
}

console.log("double(5):", double(5));
console.log("double(undefined):", double(undefined));

// The difference between optional and nullable
interface Config {
  name: string;
  port?: number;              // Optional (might not exist)
  host: string | null;        // Required but can be null
}

const config: Config = {
  name: "MyApp",
  // port is omitted (optional)
  host: null  // Explicitly set to null
};

console.log("Config:", config);

// ============================================================
// SECTION 9: Template Literal Types
// ============================================================

console.log("\n========================================");
console.log("TEMPLATE LITERAL TYPES");
console.log("========================================\n");

// Combine literal types using template strings
type Color = "red" | "green" | "blue";
type Brightness = "light" | "dark";

type Theme = `${Brightness}-${Color}`;
// Results in: "light-red" | "light-green" | "light-blue" | 
//             "dark-red" | "dark-green" | "dark-blue"

const theme1: Theme = "dark-blue";
const theme2: Theme = "light-green";
// const theme3: Theme = "medium-red";  // Error!

console.log("Theme 1:", theme1);
console.log("Theme 2:", theme2);

// CSS-like units
type CSSUnit = "px" | "em" | "rem" | "%";
type CSSValue = `${number}${CSSUnit}`;

const width: CSSValue = "100px";
const margin: CSSValue = "1.5rem";
const height: CSSValue = "50%";

console.log("CSS values:", width, margin, height);

// Event names
type EventType = "click" | "focus" | "blur";
type EventHandler = `on${Capitalize<EventType>}`;
// Results in: "onClick" | "onFocus" | "onBlur"

// ============================================================
// SECTION 10: Union with Objects
// ============================================================

console.log("\n========================================");
console.log("UNION WITH OBJECTS");
console.log("========================================\n");

// Different payment methods
type CreditCard = {
  type: "credit";
  cardNumber: string;
  expiryDate: string;
  cvv: string;
};

type PayPal = {
  type: "paypal";
  email: string;
};

type BankTransfer = {
  type: "bank";
  accountNumber: string;
  routingNumber: string;
};

type PaymentMethod = CreditCard | PayPal | BankTransfer;

function processPayment(method: PaymentMethod): string {
  switch (method.type) {
    case "credit":
      return `Charging card ending in ${method.cardNumber.slice(-4)}`;
    case "paypal":
      return `Sending PayPal request to ${method.email}`;
    case "bank":
      return `Initiating bank transfer from account ${method.accountNumber}`;
  }
}

const payment1: PaymentMethod = {
  type: "credit",
  cardNumber: "4111111111111234",
  expiryDate: "12/25",
  cvv: "123"
};

const payment2: PaymentMethod = {
  type: "paypal",
  email: "user@example.com"
};

console.log(processPayment(payment1));
console.log(processPayment(payment2));

// ============================================================
// SECTION 11: Type Guards
// ============================================================

console.log("\n========================================");
console.log("TYPE GUARDS");
console.log("========================================\n");

// Custom type guard function
function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isNumber(value: unknown): value is number {
  return typeof value === "number";
}

function processUnknown(value: unknown): string {
  if (isString(value)) {
    return `String of length ${value.length}`;
  }
  if (isNumber(value)) {
    return `Number doubled: ${value * 2}`;
  }
  return "Unknown type";
}

console.log(processUnknown("hello"));
console.log(processUnknown(42));

// Type guard for objects
interface Fish {
  swim: () => void;
}

interface Bird {
  fly: () => void;
}

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

const pet1: Fish = { swim: () => console.log("Swimming!") };
const pet2: Bird = { fly: () => console.log("Flying!") };

function move(pet: Fish | Bird): void {
  if (isFish(pet)) {
    pet.swim();
  } else {
    pet.fly();
  }
}

move(pet1);
move(pet2);

// ============================================================
// KEY TAKEAWAYS
// ============================================================

/**
 * Union Types (|):
 * - Allow a value to be one of several types
 * - Use type guards to narrow the type
 * 
 * Literal Types:
 * - Restrict values to exact strings, numbers, or booleans
 * - Great for enumerating valid options
 * 
 * Discriminated Unions:
 * - Objects with a common "discriminant" property
 * - Perfect for state machines and API responses
 * 
 * Type Guards:
 * - typeof for primitives
 * - "in" operator for object properties
 * - Custom type guard functions
 * 
 * Best Practices:
 * - Use literal types for known sets of values
 * - Use discriminated unions for complex state
 * - Add exhaustiveness checking with never
 * - Create type aliases for reusable unions
 * 
 * Now try the practice problems!
 * Run: bun lessons/practice/09-union-types-practice.ts
 */

console.log("\n✅ Lesson 9 Complete! Now try the practice problems.");
