/**
 * ============================================================
 * PRACTICE: Variables and Data Types
 * ============================================================
 * 
 * Instructions:
 * 1. Complete each TODO by replacing the underscores or comments
 * 2. Run this file with: bun lessons/practice/01-variables-practice.ts
 * 3. Check if all tests pass!
 */

// ============================================================
// PROBLEM 1: Declare Variables
// ============================================================
/**
 * Create variables for a user profile.
 * Think about which should be `let` and which should be `const`
 */

// TODO: Declare a constant for the user's ID (number) - IDs shouldn't change
const userId = 1001; // Replace with your answer

// TODO: Declare a variable for the user's display name (string)
let displayName = "YourName"; // Replace with your answer

// TODO: Declare a variable for the user's age (number)
let userAge = 0; // Replace with your answer

// TODO: Declare a variable for whether the user is online (boolean)
let isOnline = false; // Replace with your answer

// ============================================================
// PROBLEM 2: Type Annotations
// ============================================================
/**
 * Add explicit type annotations to these variables.
 * Replace 'any' with the correct type.
 */

// TODO: What type should 'bookTitle' be?
let bookTitle: any = "The TypeScript Handbook";

// TODO: What type should 'pageCount' be?
let pageCount: any = 350;

// TODO: What type should 'isAvailable' be?
let isAvailable: any = true;

// TODO: What type should 'publishYear' be?
let publishYear: any = 2023;

// ============================================================
// PROBLEM 3: Template Literals
// ============================================================
/**
 * Use template literals (backticks) to create formatted strings.
 */

const productName: string = "Laptop";
const productPrice: number = 999.99;
const inStock: boolean = true;

// TODO: Create a message using template literals
// Expected output: "The Laptop costs $999.99 and is in stock: true"
let productMessage: string = ""; // Use template literal here

// ============================================================
// PROBLEM 4: Fix the Errors
// ============================================================
/**
 * The following code has type errors. Fix them!
 * Uncomment each line after fixing.
 */

// TODO: Fix this - you can't assign a number to a string variable
// let username: string = 42;

// TODO: Fix this - you can't reassign a const
// const score: number = 100;
// score = 200;

// TODO: Fix this - the type doesn't match the value
// let isActive: boolean = "yes";

// ============================================================
// PROBLEM 5: Type Inference Challenge
// ============================================================
/**
 * TypeScript will infer types for these. 
 * What types do you think they are?
 * Add comments with your predictions, then check with typeof
 */

const mystery1 = "Hello";     // What type? ___________
const mystery2 = 3.14;        // What type? ___________
const mystery3 = false;       // What type? ___________
const mystery4 = null;        // What type? ___________

// ============================================================
// PROBLEM 6: Create Your Own Variables
// ============================================================
/**
 * Create variables to describe your favorite movie:
 */

// TODO: Create a constant for the movie title (string)
// YOUR CODE HERE

// TODO: Create a variable for the movie rating (number, 1-10)
// YOUR CODE HERE

// TODO: Create a variable for whether you'd recommend it (boolean)
// YOUR CODE HERE

// TODO: Create a variable for the release year (number)
// YOUR CODE HERE

// TODO: Create a message about the movie using template literals
// YOUR CODE HERE

// ============================================================
// TEST YOUR ANSWERS
// ============================================================

console.log("========================================");
console.log("TESTING YOUR ANSWERS");
console.log("========================================\n");

// Problem 1 Tests
console.log("--- Problem 1: Variable Declarations ---");
console.log(`User ID: ${userId}`);
console.log(`Display Name: ${displayName}`);
console.log(`Age: ${userAge}`);
console.log(`Is Online: ${isOnline}`);

if (typeof userId === 'number' && typeof displayName === 'string' && 
    typeof userAge === 'number' && typeof isOnline === 'boolean') {
  console.log("✅ Problem 1 PASSED!\n");
} else {
  console.log("❌ Problem 1 FAILED - Check your variable types\n");
}

// Problem 2 Tests
console.log("--- Problem 2: Type Annotations ---");
if (typeof bookTitle === 'string' && typeof pageCount === 'number' && 
    typeof isAvailable === 'boolean' && typeof publishYear === 'number') {
  console.log("✅ Problem 2 PASSED!\n");
} else {
  console.log("❌ Problem 2 FAILED - Check your type annotations\n");
}

// Problem 3 Tests
console.log("--- Problem 3: Template Literals ---");
console.log(`Your message: ${productMessage}`);
const expectedMessage = `The ${productName} costs $${productPrice} and is in stock: ${inStock}`;
if (productMessage === expectedMessage) {
  console.log("✅ Problem 3 PASSED!\n");
} else {
  console.log("❌ Problem 3 FAILED - Your message should be:");
  console.log(`   "${expectedMessage}"\n`);
}

// Problem 5 Tests
console.log("--- Problem 5: Type Inference ---");
console.log(`mystery1 is a: ${typeof mystery1}`);
console.log(`mystery2 is a: ${typeof mystery2}`);
console.log(`mystery3 is a: ${typeof mystery3}`);
console.log(`mystery4 is a: ${typeof mystery4}`);
console.log("(Note: typeof null returns 'object' - this is a JavaScript quirk!)\n");

console.log("========================================");
console.log("Practice complete! Review any failed tests.");
console.log("========================================");
