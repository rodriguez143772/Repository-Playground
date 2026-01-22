/**
 * ============================================================
 * LESSON 5: Functions
 * ============================================================
 * 
 * Functions are like recipes - they have a name, take ingredients
 * (parameters), follow steps (code), and produce a result (return value).
 * 
 * Just like a recipe for "Chocolate Cake" can be used many times
 * to make many cakes, a function can be called multiple times
 * to perform the same task with different inputs.
 * 
 * Why functions?
 * - Reusability: Write once, use many times
 * - Organization: Break complex tasks into smaller pieces
 * - Abstraction: Hide complexity behind a simple name
 */

// ============================================================
// SECTION 1: Function Declarations
// ============================================================

/**
 * The most common way to create a function.
 * Syntax: function name(parameters): returnType { ... }
 */

console.log("========================================");
console.log("FUNCTION DECLARATIONS");
console.log("========================================\n");

// Basic function with no parameters
function sayHello(): void {
  console.log("Hello, World!");
}

// Call the function
sayHello();

// Function with parameters
function greet(name: string): void {
  console.log(`Hello, ${name}!`);
}

greet("Alice");
greet("Bob");

// Function with return value
function add(a: number, b: number): number {
  return a + b;
}

const sum = add(5, 3);
console.log(`5 + 3 = ${sum}`);

// ============================================================
// SECTION 2: Function Expressions
// ============================================================

/**
 * Functions can also be stored in variables.
 * Like putting a recipe card in a labeled folder.
 */

console.log("\n========================================");
console.log("FUNCTION EXPRESSIONS");
console.log("========================================\n");

// Named function expression
const multiply = function(a: number, b: number): number {
  return a * b;
};

console.log(`4 × 5 = ${multiply(4, 5)}`);

// Anonymous function (no name)
const divide = function(a: number, b: number): number {
  return a / b;
};

console.log(`20 ÷ 4 = ${divide(20, 4)}`);

// ============================================================
// SECTION 3: Arrow Functions
// ============================================================

/**
 * Arrow functions are a shorter syntax for function expressions.
 * They use => (fat arrow) instead of the function keyword.
 * 
 * Think of => as "goes to" or "produces":
 * (inputs) => output
 */

console.log("\n========================================");
console.log("ARROW FUNCTIONS");
console.log("========================================\n");

// Standard arrow function
const subtract = (a: number, b: number): number => {
  return a - b;
};

console.log(`10 - 3 = ${subtract(10, 3)}`);

// Concise arrow function (single expression - implicit return)
const square = (x: number): number => x * x;

console.log(`5² = ${square(5)}`);

// Even shorter with single parameter (no parentheses needed)
const double = (n: number): number => n * 2;

console.log(`Double of 7 = ${double(7)}`);

// Arrow function with no parameters
const getRandomNumber = (): number => Math.random();

console.log(`Random: ${getRandomNumber()}`);

// ============================================================
// SECTION 4: Parameters and Arguments
// ============================================================

/**
 * Parameters: Variables in the function definition (placeholders)
 * Arguments: Actual values passed when calling the function
 * 
 * Like a form with blank fields (parameters) vs.
 * a filled-out form (arguments)
 */

console.log("\n========================================");
console.log("PARAMETERS AND ARGUMENTS");
console.log("========================================\n");

// Required parameters
function createUser(name: string, age: number): string {
  return `User: ${name}, Age: ${age}`;
}

console.log(createUser("Alice", 25));

// Optional parameters (use ?)
function greetUser(name: string, title?: string): string {
  if (title) {
    return `Hello, ${title} ${name}!`;
  }
  return `Hello, ${name}!`;
}

console.log(greetUser("Smith", "Dr."));
console.log(greetUser("John"));

// Default parameters
function greetWithDefault(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}!`;
}

console.log(greetWithDefault("Alice"));
console.log(greetWithDefault("Alice", "Hi"));

// Rest parameters (...) - Variable number of arguments
function sumAll(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}

console.log(`Sum of 1,2,3: ${sumAll(1, 2, 3)}`);
console.log(`Sum of 1,2,3,4,5: ${sumAll(1, 2, 3, 4, 5)}`);

// ============================================================
// SECTION 5: Return Values
// ============================================================

/**
 * Functions can return values using the 'return' statement.
 * The return type is specified after the parameters.
 */

console.log("\n========================================");
console.log("RETURN VALUES");
console.log("========================================\n");

// Return a single value
function calculateArea(width: number, height: number): number {
  return width * height;
}

console.log(`Area: ${calculateArea(5, 3)}`);

// Return an object
function createPoint(x: number, y: number): { x: number; y: number } {
  return { x, y };
}

const point = createPoint(10, 20);
console.log(`Point: (${point.x}, ${point.y})`);

// Return an array
function getMinMax(numbers: number[]): [number, number] {
  const min = Math.min(...numbers);
  const max = Math.max(...numbers);
  return [min, max];
}

const [min, max] = getMinMax([5, 2, 9, 1, 7]);
console.log(`Min: ${min}, Max: ${max}`);

// Void return type (no return value)
function logMessage(message: string): void {
  console.log(`[LOG]: ${message}`);
  // No return statement (or return; without a value)
}

logMessage("This is a log message");

// ============================================================
// SECTION 6: Function Types
// ============================================================

/**
 * TypeScript lets you define the type of a function itself.
 * Useful for callbacks and higher-order functions.
 */

console.log("\n========================================");
console.log("FUNCTION TYPES");
console.log("========================================\n");

// Define a function type
type MathOperation = (a: number, b: number) => number;

// Use the type
const addNumbers: MathOperation = (a, b) => a + b;
const multiplyNumbers: MathOperation = (a, b) => a * b;

console.log(`Add: ${addNumbers(3, 4)}`);
console.log(`Multiply: ${multiplyNumbers(3, 4)}`);

// Function as a parameter
function calculate(a: number, b: number, operation: MathOperation): number {
  return operation(a, b);
}

console.log(`Calculate add: ${calculate(10, 5, addNumbers)}`);
console.log(`Calculate multiply: ${calculate(10, 5, multiplyNumbers)}`);

// ============================================================
// SECTION 7: Higher-Order Functions
// ============================================================

/**
 * Higher-order functions either:
 * 1. Take functions as arguments, OR
 * 2. Return functions as results
 * 
 * Like a factory that produces machines (functions)
 */

console.log("\n========================================");
console.log("HIGHER-ORDER FUNCTIONS");
console.log("========================================\n");

// Function that returns a function
function createMultiplier(factor: number): (n: number) => number {
  return (n: number) => n * factor;
}

const triple = createMultiplier(3);
const quadruple = createMultiplier(4);

console.log(`Triple 5: ${triple(5)}`);       // 15
console.log(`Quadruple 5: ${quadruple(5)}`); // 20

// Function that takes a function
function applyOperation(numbers: number[], operation: (n: number) => number): number[] {
  return numbers.map(operation);
}

const nums = [1, 2, 3, 4, 5];
console.log(`Tripled: [${applyOperation(nums, triple)}]`);
console.log(`Squared: [${applyOperation(nums, n => n * n)}]`);

// ============================================================
// SECTION 8: Callbacks
// ============================================================

/**
 * Callbacks are functions passed to other functions to be called later.
 * Like leaving a note saying "call me when you're done!"
 */

console.log("\n========================================");
console.log("CALLBACKS");
console.log("========================================\n");

// Simulating async operation with callback
function fetchData(callback: (data: string) => void): void {
  // Simulating delay
  console.log("Fetching data...");
  const data = "{ name: 'Alice', age: 25 }";
  callback(data);
}

fetchData((data) => {
  console.log(`Received: ${data}`);
});

// Array methods use callbacks
const numbers = [1, 2, 3, 4, 5];

// forEach callback
console.log("\nforEach with callback:");
numbers.forEach((num, index) => {
  console.log(`  Index ${index}: ${num}`);
});

// ============================================================
// SECTION 9: Closures
// ============================================================

/**
 * A closure is a function that "remembers" variables from its
 * outer scope, even after the outer function has finished.
 * 
 * Like a backpack - the function carries its environment with it.
 */

console.log("\n========================================");
console.log("CLOSURES");
console.log("========================================\n");

function createCounter(): () => number {
  let count = 0;  // This variable is "closed over"
  
  return function(): number {
    count++;
    return count;
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log(`Counter 1: ${counter1()}`);  // 1
console.log(`Counter 1: ${counter1()}`);  // 2
console.log(`Counter 1: ${counter1()}`);  // 3
console.log(`Counter 2: ${counter2()}`);  // 1 (separate count!)
console.log(`Counter 2: ${counter2()}`);  // 2

// Practical closure example
function createGreeter(greeting: string): (name: string) => string {
  return (name: string) => `${greeting}, ${name}!`;
}

const sayHi = createGreeter("Hi");
const sayBonjour = createGreeter("Bonjour");

console.log(sayHi("Alice"));
console.log(sayBonjour("Bob"));

// ============================================================
// SECTION 10: Method Shorthand in Objects
// ============================================================

/**
 * When functions are inside objects, they're called methods.
 * There's a shorthand syntax for defining them.
 */

console.log("\n========================================");
console.log("METHODS IN OBJECTS");
console.log("========================================\n");

const calculator = {
  // Method shorthand
  add(a: number, b: number): number {
    return a + b;
  },
  
  subtract(a: number, b: number): number {
    return a - b;
  },
  
  // Arrow function (be careful with 'this')
  multiply: (a: number, b: number): number => a * b
};

console.log(`Add: ${calculator.add(5, 3)}`);
console.log(`Subtract: ${calculator.subtract(5, 3)}`);
console.log(`Multiply: ${calculator.multiply(5, 3)}`);

// ============================================================
// SECTION 11: Recursion
// ============================================================

/**
 * Recursion is when a function calls itself.
 * Like Russian nesting dolls - each doll contains a smaller one.
 * 
 * Every recursive function needs:
 * 1. Base case: When to stop
 * 2. Recursive case: Calling itself with a simpler problem
 */

console.log("\n========================================");
console.log("RECURSION");
console.log("========================================\n");

// Factorial using recursion
function factorialRecursive(n: number): number {
  // Base case
  if (n <= 1) {
    return 1;
  }
  // Recursive case
  return n * factorialRecursive(n - 1);
}

console.log(`5! = ${factorialRecursive(5)}`);  // 120

// Fibonacci sequence
function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log("Fibonacci sequence:");
for (let i = 0; i <= 10; i++) {
  process.stdout.write(`${fibonacci(i)} `);
}
console.log();

// ============================================================
// SECTION 12: Function Overloading
// ============================================================

/**
 * TypeScript allows multiple function signatures.
 * The actual implementation handles all cases.
 */

console.log("\n========================================");
console.log("FUNCTION OVERLOADING");
console.log("========================================\n");

// Overload signatures
function combine(a: string, b: string): string;
function combine(a: number, b: number): number;

// Implementation
function combine(a: string | number, b: string | number): string | number {
  if (typeof a === "string" && typeof b === "string") {
    return a + b;
  }
  if (typeof a === "number" && typeof b === "number") {
    return a + b;
  }
  throw new Error("Types must match");
}

console.log(`Combine strings: ${combine("Hello, ", "World!")}`);
console.log(`Combine numbers: ${combine(10, 20)}`);

// ============================================================
// KEY TAKEAWAYS
// ============================================================

/**
 * 1. Function declarations: function name() { }
 * 2. Function expressions: const fn = function() { }
 * 3. Arrow functions: const fn = () => { }
 * 4. Parameters can be optional (?), have defaults (=), or rest (...)
 * 5. Return types are specified after parameters
 * 6. Higher-order functions take or return functions
 * 7. Closures remember their outer scope
 * 8. Recursion: functions calling themselves
 * 
 * Best Practices:
 * - Use arrow functions for callbacks and short functions
 * - Use function declarations for main functions
 * - Always specify return types for clarity
 * - Keep functions small and focused (single responsibility)
 * 
 * Now try the practice problems!
 * Run: bun lessons/practice/05-functions-practice.ts
 */

console.log("\n✅ Lesson 5 Complete! Now try the practice problems.");
