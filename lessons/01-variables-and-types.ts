/**
 * ============================================================
 * LESSON 1: Variables and Data Types
 * ============================================================
 * 
 * Think of variables like labeled boxes where you can store things.
 * Just like you might have a box labeled "Books" for your books,
 * in programming, you create variables with names to store data.
 * 
 * TypeScript adds an extra layer: it's like putting a label on the box
 * that says what TYPE of thing goes inside. A box labeled "Books: Paperbacks Only"
 * won't accept hardcovers!
 */

// ============================================================
// SECTION 1: Declaring Variables
// ============================================================

/**
 * There are three ways to declare variables in JavaScript/TypeScript:
 * 
 * 1. `let` - For values that will change (mutable)
 *    Think of it like a whiteboard - you can erase and rewrite
 * 
 * 2. `const` - For values that won't change (immutable)
 *    Think of it like a permanent marker - once written, it stays
 * 
 * 3. `var` - The old way (avoid using this!)
 *    Has confusing behavior, prefer `let` or `const`
 */

// Using let - the value can change
let playerScore = 0;
console.log("Initial score:", playerScore);

playerScore = 100;  // This is allowed!
console.log("Updated score:", playerScore);

// Using const - the value cannot change
const gameName = "TypeScript Adventure";
console.log("Game:", gameName);

// gameName = "New Name";  // This would cause an error!

// ============================================================
// SECTION 2: Primitive Data Types
// ============================================================

/**
 * Data types are categories of data. Think of them like different
 * types of containers:
 * - A water bottle (number) holds liquids
 * - A bookshelf (string) holds text/words
 * - A light switch (boolean) is either on or off
 */

// STRING - Text data (always in quotes)
// Like a name tag - holds text information
let greeting: string = "Hello, World!";
let userName: string = 'Alice';  // Single quotes work too
let message: string = `Welcome, ${userName}!`;  // Template literal (backticks)

console.log("\n--- Strings ---");
console.log(greeting);
console.log(userName);
console.log(message);

// NUMBER - Numeric data (integers and decimals)
// Like a calculator display - holds numeric values
let age: number = 25;
let price: number = 19.99;
let temperature: number = -5;
let million: number = 1_000_000;  // Underscores for readability

console.log("\n--- Numbers ---");
console.log("Age:", age);
console.log("Price:", price);
console.log("Temperature:", temperature);
console.log("Million:", million);

// BOOLEAN - True or False
// Like a light switch - only two states
let isLoggedIn: boolean = true;
let hasPermission: boolean = false;

console.log("\n--- Booleans ---");
console.log("Is logged in?", isLoggedIn);
console.log("Has permission?", hasPermission);

// UNDEFINED - Variable declared but not assigned
// Like an empty box - exists but contains nothing yet
let futureValue: undefined = undefined;
let notYetAssigned: string | undefined;

console.log("\n--- Undefined ---");
console.log("Future value:", futureValue);
console.log("Not yet assigned:", notYetAssigned);

// NULL - Intentionally empty
// Like a box with a note saying "intentionally empty"
let emptyBox: null = null;

console.log("\n--- Null ---");
console.log("Empty box:", emptyBox);

// ============================================================
// SECTION 3: Type Inference
// ============================================================

/**
 * TypeScript is smart! It can often figure out the type automatically.
 * This is called "type inference" - like how you can tell a book
 * is a cookbook just by looking at it, without needing a label.
 */

// TypeScript infers these types automatically:
let inferredString = "I'm a string";      // TypeScript knows this is string
let inferredNumber = 42;                   // TypeScript knows this is number
let inferredBoolean = true;                // TypeScript knows this is boolean

console.log("\n--- Type Inference ---");
console.log("Inferred string:", inferredString, "- Type:", typeof inferredString);
console.log("Inferred number:", inferredNumber, "- Type:", typeof inferredNumber);
console.log("Inferred boolean:", inferredBoolean, "- Type:", typeof inferredBoolean);

// ============================================================
// SECTION 4: Type Annotations
// ============================================================

/**
 * Sometimes you want to be explicit about types.
 * Type annotations are like putting clear labels on your boxes.
 * 
 * Syntax: let variableName: type = value;
 */

// Explicit type annotations
let explicitName: string = "Bob";
let explicitAge: number = 30;
let explicitActive: boolean = true;

// This is especially useful when the type isn't obvious
let data: string;  // Declare now, assign later
data = "Some data";

console.log("\n--- Explicit Types ---");
console.log("Name:", explicitName);
console.log("Age:", explicitAge);
console.log("Active:", explicitActive);
console.log("Data:", data);

// ============================================================
// SECTION 5: The 'any' Type (Use Sparingly!)
// ============================================================

/**
 * The 'any' type is like a box with no label - anything goes!
 * While flexible, it defeats the purpose of TypeScript's safety.
 * Use it only when absolutely necessary.
 */

let flexible: any = "I'm a string";
flexible = 42;        // Now I'm a number
flexible = true;      // Now I'm a boolean
flexible = [1, 2, 3]; // Now I'm an array

console.log("\n--- Any Type ---");
console.log("Flexible value:", flexible);

// ============================================================
// SECTION 6: Const Assertions
// ============================================================

/**
 * Sometimes you want TypeScript to be extra specific.
 * 'as const' tells TypeScript "this exact value, nothing else!"
 */

const direction = "north" as const;  // Type is literally "north", not just string
const config = {
  debug: true,
  version: "1.0.0"
} as const;  // All properties are readonly

console.log("\n--- Const Assertions ---");
console.log("Direction:", direction);
console.log("Config:", config);

// ============================================================
// INTERACTIVE EXAMPLES - Try modifying these!
// ============================================================

console.log("\n========================================");
console.log("INTERACTIVE EXAMPLES");
console.log("========================================\n");

// Example 1: String concatenation
let firstName = "John";
let lastName = "Doe";
let fullName = firstName + " " + lastName;
console.log("Full name:", fullName);

// Example 2: Template literals (string interpolation)
let item = "coffee";
let itemPrice = 4.50;
let orderMessage = `Your ${item} costs $${itemPrice}`;
console.log(orderMessage);

// Example 3: Number operations
let quantity = 3;
let unitPrice = 10;
let total = quantity * unitPrice;
console.log(`Total for ${quantity} items: $${total}`);

// Example 4: Boolean logic
let hasAccount = true;
let isVerified = true;
let canAccess = hasAccount && isVerified;  // Both must be true
console.log("Can access?", canAccess);

// ============================================================
// KEY TAKEAWAYS
// ============================================================

/**
 * 1. Use `let` for variables that will change
 * 2. Use `const` for variables that won't change
 * 3. TypeScript has these primitive types:
 *    - string: text data
 *    - number: numeric data
 *    - boolean: true/false
 *    - undefined: not yet assigned
 *    - null: intentionally empty
 * 4. TypeScript can infer types automatically
 * 5. You can explicitly annotate types with : type
 * 6. Avoid 'any' unless absolutely necessary
 * 
 * Now go to the practice file to test your knowledge!
 * Run: bun lessons/practice/01-variables-practice.ts
 */

console.log("\n✅ Lesson 1 Complete! Now try the practice problems.");
