/**
 * ============================================================
 * PRACTICE: Union and Literal Types
 * ============================================================
 * 
 * Instructions:
 * 1. Define the required types and implement functions
 * 2. Run: bun lessons/practice/09-union-types-practice.ts
 * 3. Check if all tests pass!
 */

// ============================================================
// PROBLEM 1: Basic Union Type
// ============================================================
/**
 * Create a function that accepts either a string or number
 * and returns a string representation.
 * - If string: return it uppercased
 * - If number: return it as a string with 2 decimal places
 */

function stringify(value: string | number): string {
  // TODO: Implement with type narrowing
  return "";
}

// ============================================================
// PROBLEM 2: Literal Type
// ============================================================
/**
 * Define a type for valid log levels: "debug", "info", "warn", "error"
 * Create a function that returns an appropriate emoji for each level.
 */

// TODO: Define LogLevel type
type LogLevel = "debug"; // Add other levels

function getLogEmoji(level: LogLevel): string {
  // TODO: Return emoji for each level
  // debug: 🔍, info: ℹ️, warn: ⚠️, error: ❌
  return "";
}

// ============================================================
// PROBLEM 3: Discriminated Union
// ============================================================
/**
 * Define types for different notification types:
 * - Email: { type: "email", to: string, subject: string }
 * - SMS: { type: "sms", phoneNumber: string, message: string }
 * - Push: { type: "push", title: string, body: string }
 * 
 * Create a function that returns a summary string for each type.
 */

// TODO: Define the notification types and union
type EmailNotification = { type: "email"; to: string; subject: string };
type SMSNotification = { type: "sms"; /* add properties */ };
type PushNotification = { type: "push"; /* add properties */ };

type Notification = EmailNotification; // Add other types

function summarizeNotification(notification: Notification): string {
  // TODO: Return summary for each notification type
  return "";
}

// ============================================================
// PROBLEM 4: Nullable Types
// ============================================================
/**
 * Create a function that safely gets the length of a nullable string.
 * Return 0 if the string is null or undefined.
 */

function safeLength(str: string | null | undefined): number {
  // TODO: Safely return length
  return 0;
}

// ============================================================
// PROBLEM 5: Type Guard Function
// ============================================================
/**
 * Create a type guard that checks if a value is an array of numbers.
 * Then use it in a function that sums arrays or returns 0.
 */

// TODO: Create type guard
function isNumberArray(value: unknown): value is number[] {
  // Check if it's an array and all elements are numbers
  return false;
}

function sumIfArray(value: unknown): number {
  // TODO: Use the type guard to sum the array
  return 0;
}

// ============================================================
// PROBLEM 6: State Machine
// ============================================================
/**
 * Define a discriminated union for a fetch request state:
 * - Idle: { status: "idle" }
 * - Loading: { status: "loading" }
 * - Success: { status: "success", data: T }
 * - Error: { status: "error", message: string }
 */

// TODO: Define FetchState<T> type
type FetchState<T> = 
  | { status: "idle" };
  // Add other states

function renderFetchState<T>(state: FetchState<T>): string {
  // TODO: Return appropriate message for each state
  return "";
}

// ============================================================
// PROBLEM 7: Template Literal Types
// ============================================================
/**
 * Create a type for CSS color values:
 * - Hex colors: "#" followed by 6 characters (simplified)
 * - RGB: "rgb(number, number, number)"
 * - Named colors: "red" | "green" | "blue" | "black" | "white"
 */

type NamedColor = "red" | "green" | "blue" | "black" | "white";
type HexColor = `#${string}`;  // Simplified
type RGBColor = `rgb(${number}, ${number}, ${number})`;

type CSSColor = NamedColor | HexColor | RGBColor;

function isValidColor(color: CSSColor): boolean {
  // This just demonstrates the type works
  return true;
}

// ============================================================
// PROBLEM 8: Exhaustive Switch
// ============================================================
/**
 * Define a type for playing card suits and create a function
 * that returns the symbol for each suit.
 * Make sure the function handles all cases exhaustively!
 */

type Suit = "hearts" | "diamonds" | "clubs" | "spades";

function getSuitSymbol(suit: Suit): string {
  // TODO: Return symbol for each suit
  // ♥, ♦, ♣, ♠
  // Include exhaustiveness check!
  return "";
}

// ============================================================
// PROBLEM 9: Union of Objects
// ============================================================
/**
 * Define types for different animals with unique properties:
 * - Dog: { species: "dog", name: string, breed: string }
 * - Cat: { species: "cat", name: string, indoor: boolean }
 * - Bird: { species: "bird", name: string, canFly: boolean }
 * 
 * Create a function that describes each animal.
 */

// TODO: Define Animal type as a union

type Animal = { species: "dog"; name: string; breed: string }; // Add more

function describeAnimal(animal: Animal): string {
  // TODO: Return description for each animal type
  return "";
}

// ============================================================
// PROBLEM 10: Combining Union and Intersection
// ============================================================
/**
 * Create a base type and extend it with unions:
 * - Base: { id: string, createdAt: Date }
 * - Draft: Base & { status: "draft", content: string }
 * - Published: Base & { status: "published", publishedAt: Date }
 * - Archived: Base & { status: "archived", archivedAt: Date }
 */

type Base = {
  id: string;
  createdAt: Date;
};

// TODO: Define the document states
type Draft = Base & { status: "draft"; /* add properties */ };
type Published = Base; // Fix this
type Archived = Base; // Fix this

type Document = Draft | Published | Archived;

function getDocumentInfo(doc: Document): string {
  // TODO: Return info based on document status
  return "";
}

// ============================================================
// TEST YOUR ANSWERS
// ============================================================

console.log("========================================");
console.log("TESTING YOUR ANSWERS");
console.log("========================================\n");

// Problem 1
console.log("--- Problem 1: Basic Union ---");
if (stringify("hello") === "HELLO" && stringify(3.14159) === "3.14") {
  console.log("✅ Problem 1 PASSED!\n");
} else {
  console.log(`❌ stringify("hello")="${stringify("hello")}", stringify(3.14159)="${stringify(3.14159)}"\n`);
}

// Problem 2
console.log("--- Problem 2: Literal Type ---");
if (getLogEmoji("debug" as LogLevel) === "🔍" && 
    getLogEmoji("error" as LogLevel) === "❌") {
  console.log("✅ Problem 2 PASSED!\n");
} else {
  console.log(`❌ getLogEmoji results incorrect\n`);
}

// Problem 3
console.log("--- Problem 3: Discriminated Union ---");
const emailNotif: Notification = { type: "email", to: "test@example.com", subject: "Hello" };
const summary = summarizeNotification(emailNotif);
if (summary.includes("test@example.com") || summary.includes("Hello")) {
  console.log("✅ Problem 3 PASSED!\n");
} else {
  console.log(`❌ Summary: ${summary}\n`);
}

// Problem 4
console.log("--- Problem 4: Nullable Types ---");
if (safeLength("hello") === 5 && safeLength(null) === 0 && safeLength(undefined) === 0) {
  console.log("✅ Problem 4 PASSED!\n");
} else {
  console.log(`❌ safeLength results incorrect\n`);
}

// Problem 5
console.log("--- Problem 5: Type Guard ---");
if (isNumberArray([1, 2, 3]) === true && 
    isNumberArray(["a", "b"]) === false &&
    sumIfArray([1, 2, 3, 4]) === 10) {
  console.log("✅ Problem 5 PASSED!\n");
} else {
  console.log(`❌ Type guard or sum failed\n`);
}

// Problem 6
console.log("--- Problem 6: State Machine ---");
const loadingState: FetchState<string> = { status: "loading" };
const rendered = renderFetchState(loadingState);
if (rendered.toLowerCase().includes("loading")) {
  console.log("✅ Problem 6 PASSED!\n");
} else {
  console.log(`❌ Rendered: ${rendered}\n`);
}

// Problem 7
console.log("--- Problem 7: Template Literal Types ---");
// Just testing the type works
const c1: CSSColor = "red";
const c2: CSSColor = "#ff0000";
const c3: CSSColor = "rgb(255, 0, 0)";
if (isValidColor(c1) && isValidColor(c2) && isValidColor(c3)) {
  console.log("✅ Problem 7 PASSED!\n");
} else {
  console.log(`❌ Color types failed\n`);
}

// Problem 8
console.log("--- Problem 8: Exhaustive Switch ---");
if (getSuitSymbol("hearts") === "♥" && getSuitSymbol("spades") === "♠") {
  console.log("✅ Problem 8 PASSED!\n");
} else {
  console.log(`❌ getSuitSymbol results incorrect\n`);
}

// Problem 9
console.log("--- Problem 9: Union of Objects ---");
const dog: Animal = { species: "dog", name: "Buddy", breed: "Labrador" };
const desc = describeAnimal(dog);
if (desc.includes("Buddy") || desc.includes("Labrador")) {
  console.log("✅ Problem 9 PASSED!\n");
} else {
  console.log(`❌ Description: ${desc}\n`);
}

// Problem 10
console.log("--- Problem 10: Combining Union and Intersection ---");
const draft: Document = { id: "1", createdAt: new Date(), status: "draft", content: "Hello" } as Draft;
const info = getDocumentInfo(draft);
if (info.includes("draft") || info.includes("Draft")) {
  console.log("✅ Problem 10 PASSED!\n");
} else {
  console.log(`❌ Info: ${info}\n`);
}

console.log("========================================");
console.log("Practice complete!");
console.log("========================================");
