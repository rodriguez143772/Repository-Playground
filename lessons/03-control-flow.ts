/**
 * ============================================================
 * LESSON 3: Control Flow
 * ============================================================
 * 
 * Control flow is like being a traffic director for your code.
 * Instead of code running straight from top to bottom,
 * you can create intersections where the code "decides"
 * which path to take based on conditions.
 * 
 * Think of it like a "Choose Your Own Adventure" book -
 * different choices lead to different outcomes!
 */

// ============================================================
// SECTION 1: The if Statement
// ============================================================

/**
 * The 'if' statement is the most basic decision maker.
 * Like asking "Is it raining?" - if yes, take an umbrella.
 * 
 * Syntax:
 * if (condition) {
 *   // code runs if condition is true
 * }
 */

console.log("========================================");
console.log("IF STATEMENTS");
console.log("========================================\n");

let temperature: number = 35;

// Simple if - only runs if condition is true
if (temperature > 30) {
  console.log("It's hot outside! ☀️");
}

// Another example
let hasPermission: boolean = true;

if (hasPermission) {
  console.log("Access granted!");
}

// ============================================================
// SECTION 2: if...else
// ============================================================

/**
 * What if you want to do something when the condition is FALSE?
 * That's where 'else' comes in.
 * 
 * Like: "If it's raining, take umbrella. Otherwise, wear sunglasses."
 */

console.log("\n--- if...else ---");

let age: number = 16;

if (age >= 18) {
  console.log("You can vote!");
} else {
  console.log("You're not old enough to vote yet.");
}

// With different types
let username: string | null = null;

if (username) {
  console.log(`Welcome, ${username}!`);
} else {
  console.log("Welcome, Guest!");
}

// ============================================================
// SECTION 3: if...else if...else (Chaining)
// ============================================================

/**
 * Sometimes you have multiple conditions to check.
 * Like grading: A, B, C, D, or F - each has different criteria.
 * 
 * Think of it as a series of checkpoints.
 */

console.log("\n--- if...else if...else ---");

let score: number = 85;

if (score >= 90) {
  console.log("Grade: A - Excellent!");
} else if (score >= 80) {
  console.log("Grade: B - Good job!");
} else if (score >= 70) {
  console.log("Grade: C - Satisfactory");
} else if (score >= 60) {
  console.log("Grade: D - Needs improvement");
} else {
  console.log("Grade: F - Please see instructor");
}

// Real-world example: HTTP status codes
let statusCode: number = 404;

if (statusCode >= 200 && statusCode < 300) {
  console.log("Success!");
} else if (statusCode >= 400 && statusCode < 500) {
  console.log("Client error - check your request");
} else if (statusCode >= 500) {
  console.log("Server error - try again later");
} else {
  console.log("Unknown status");
}

// ============================================================
// SECTION 4: Nested if Statements
// ============================================================

/**
 * You can put if statements inside other if statements.
 * Like: "If you have a car, and if it has gas, you can drive."
 * 
 * Be careful not to nest too deeply - it gets confusing!
 */

console.log("\n--- Nested if ---");

let hasCar: boolean = true;
let hasGas: boolean = true;
let hasLicense: boolean = true;

if (hasCar) {
  console.log("You have a car!");
  
  if (hasGas) {
    console.log("It has gas!");
    
    if (hasLicense) {
      console.log("You can legally drive! 🚗");
    } else {
      console.log("But you need a license first.");
    }
  } else {
    console.log("But you need to fill up the tank.");
  }
} else {
  console.log("You need a car first.");
}

// Better approach: Combine conditions
console.log("\n--- Better: Combined conditions ---");

if (hasCar && hasGas && hasLicense) {
  console.log("You're ready to drive! 🚗");
} else if (!hasCar) {
  console.log("Get a car first.");
} else if (!hasGas) {
  console.log("Fill up the tank.");
} else {
  console.log("Get your license.");
}

// ============================================================
// SECTION 5: The switch Statement
// ============================================================

/**
 * When you're comparing one value against many possibilities,
 * 'switch' is cleaner than many if-else statements.
 * 
 * Think of it like a vending machine - you press a button (input)
 * and get a specific item (output).
 */

console.log("\n========================================");
console.log("SWITCH STATEMENTS");
console.log("========================================\n");

let dayNumber: number = 3;
let dayName: string;

switch (dayNumber) {
  case 0:
    dayName = "Sunday";
    break;
  case 1:
    dayName = "Monday";
    break;
  case 2:
    dayName = "Tuesday";
    break;
  case 3:
    dayName = "Wednesday";
    break;
  case 4:
    dayName = "Thursday";
    break;
  case 5:
    dayName = "Friday";
    break;
  case 6:
    dayName = "Saturday";
    break;
  default:
    dayName = "Invalid day";
}

console.log(`Day ${dayNumber} is ${dayName}`);

// ============================================================
// SECTION 6: Switch with Multiple Cases
// ============================================================

/**
 * Multiple cases can share the same code.
 * Like grouping: "Is it a weekday or weekend?"
 */

console.log("\n--- Multiple cases ---");

let day: string = "Saturday";

switch (day) {
  case "Monday":
  case "Tuesday":
  case "Wednesday":
  case "Thursday":
  case "Friday":
    console.log("It's a weekday - time to work!");
    break;
  case "Saturday":
  case "Sunday":
    console.log("It's the weekend - time to relax!");
    break;
  default:
    console.log("That's not a valid day.");
}

// ============================================================
// SECTION 7: Switch with Strings
// ============================================================

/**
 * Switch works great with strings too!
 */

console.log("\n--- String switch ---");

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";
let method: HttpMethod = "POST";

switch (method) {
  case "GET":
    console.log("Fetching data...");
    break;
  case "POST":
    console.log("Creating new record...");
    break;
  case "PUT":
    console.log("Updating record...");
    break;
  case "DELETE":
    console.log("Deleting record...");
    break;
}

// ============================================================
// SECTION 8: Truthy and Falsy Values
// ============================================================

/**
 * In JavaScript/TypeScript, values can be "truthy" or "falsy"
 * when used in conditions.
 * 
 * Falsy values (treated as false):
 * - false
 * - 0
 * - "" (empty string)
 * - null
 * - undefined
 * - NaN
 * 
 * Everything else is truthy!
 */

console.log("\n========================================");
console.log("TRUTHY AND FALSY");
console.log("========================================\n");

// Falsy values
let falsyValues: any[] = [false, 0, "", null, undefined, NaN];

console.log("Falsy values:");
falsyValues.forEach((value, index) => {
  if (value) {
    console.log(`  ${index}: ${value} is truthy`);
  } else {
    console.log(`  ${index}: ${String(value)} is falsy`);
  }
});

// Truthy values
console.log("\nTruthy values:");
let truthyValues: any[] = [true, 1, "hello", [], {}, -1, "0"];

truthyValues.forEach((value, index) => {
  if (value) {
    console.log(`  ${index}: ${JSON.stringify(value)} is truthy`);
  }
});

// Practical example
console.log("\n--- Practical truthy check ---");

let userInput: string = "";

if (userInput) {
  console.log(`You entered: ${userInput}`);
} else {
  console.log("No input provided");
}

// ============================================================
// SECTION 9: Guard Clauses (Early Returns)
// ============================================================

/**
 * Guard clauses check for invalid conditions first and exit early.
 * This makes code more readable than deeply nested if-else.
 * 
 * Think of it like a bouncer - check IDs at the door,
 * don't let problems get inside.
 */

console.log("\n========================================");
console.log("GUARD CLAUSES");
console.log("========================================\n");

function processOrder(quantity: number, inStock: number, userLoggedIn: boolean): string {
  // Guard clauses - check for problems first
  if (!userLoggedIn) {
    return "Error: Please log in first";
  }
  
  if (quantity <= 0) {
    return "Error: Quantity must be positive";
  }
  
  if (quantity > inStock) {
    return "Error: Not enough stock";
  }
  
  // Main logic - only reached if all checks pass
  return `Success: Processing order for ${quantity} items`;
}

console.log(processOrder(5, 10, false));  // Not logged in
console.log(processOrder(-1, 10, true));  // Invalid quantity
console.log(processOrder(15, 10, true));  // Not enough stock
console.log(processOrder(5, 10, true));   // Success!

// ============================================================
// SECTION 10: Type Guards
// ============================================================

/**
 * TypeScript has special patterns for narrowing types.
 * These help TypeScript understand what type a value is
 * inside a conditional block.
 */

console.log("\n========================================");
console.log("TYPE GUARDS");
console.log("========================================\n");

// typeof guard
function processValue(value: string | number): string {
  if (typeof value === "string") {
    // TypeScript knows value is a string here
    return value.toUpperCase();
  } else {
    // TypeScript knows value is a number here
    return (value * 2).toString();
  }
}

console.log(processValue("hello"));  // "HELLO"
console.log(processValue(21));       // "42"

// Truthiness narrowing
function printLength(value: string | null): void {
  if (value) {
    // TypeScript knows value is string (not null)
    console.log(`Length: ${value.length}`);
  } else {
    console.log("No value provided");
  }
}

printLength("Hello");  // Length: 5
printLength(null);     // No value provided

// 'in' operator for objects
interface Dog {
  bark(): void;
}

interface Cat {
  meow(): void;
}

function makeSound(animal: Dog | Cat): void {
  if ("bark" in animal) {
    animal.bark();
  } else {
    animal.meow();
  }
}

// ============================================================
// INTERACTIVE EXAMPLES
// ============================================================

console.log("\n========================================");
console.log("INTERACTIVE EXAMPLES");
console.log("========================================\n");

// Example 1: Login validator
function validateLogin(email: string, password: string): string {
  if (!email) {
    return "Email is required";
  }
  
  if (!email.includes("@")) {
    return "Invalid email format";
  }
  
  if (!password) {
    return "Password is required";
  }
  
  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }
  
  return "Login successful!";
}

console.log("Login tests:");
console.log(validateLogin("", "password123"));
console.log(validateLogin("invalid-email", "password123"));
console.log(validateLogin("user@example.com", "short"));
console.log(validateLogin("user@example.com", "validpassword"));

// Example 2: Traffic light
console.log("\n--- Traffic Light ---");

type TrafficLight = "red" | "yellow" | "green";
let light: TrafficLight = "yellow";

switch (light) {
  case "red":
    console.log("🔴 STOP!");
    break;
  case "yellow":
    console.log("🟡 CAUTION - Prepare to stop");
    break;
  case "green":
    console.log("🟢 GO!");
    break;
}

// ============================================================
// KEY TAKEAWAYS
// ============================================================

/**
 * 1. if/else - Basic decision making
 * 2. if/else if/else - Multiple conditions
 * 3. switch - Compare one value against many options
 * 4. Truthy/Falsy - Know what values are considered false
 * 5. Guard clauses - Check for errors early, return early
 * 6. Type guards - Help TypeScript narrow types
 * 
 * Tips:
 * - Always use === instead of == for comparisons
 * - Don't forget 'break' in switch statements!
 * - Use guard clauses to avoid deep nesting
 * - TypeScript helps catch missing cases in switch
 * 
 * Now try the practice problems!
 * Run: bun lessons/practice/03-control-flow-practice.ts
 */

console.log("\n✅ Lesson 3 Complete! Now try the practice problems.");
