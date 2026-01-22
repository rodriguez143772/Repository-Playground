/**
 * ============================================================
 * PRACTICE: Functions
 * ============================================================
 * 
 * Instructions:
 * 1. Implement each function according to the description
 * 2. Run: bun lessons/practice/05-functions-practice.ts
 * 3. Check if all tests pass!
 */

// ============================================================
// PROBLEM 1: Basic Function
// ============================================================
/**
 * Create a function that takes a name and returns a greeting.
 * Example: greet("Alice") should return "Hello, Alice!"
 */

function greet(name: string): string {
  // TODO: Implement
  return "";
}

// ============================================================
// PROBLEM 2: Arrow Function
// ============================================================
/**
 * Create an arrow function that calculates the area of a circle.
 * Formula: area = π × radius²
 * Use Math.PI for π
 */

const circleArea = (radius: number): number => {
  // TODO: Implement
  return 0;
};

// ============================================================
// PROBLEM 3: Optional Parameters
// ============================================================
/**
 * Create a function that formats a price.
 * - If currency symbol is provided, use it
 * - If not, default to "$"
 * 
 * Example: formatPrice(19.99) → "$19.99"
 * Example: formatPrice(19.99, "€") → "€19.99"
 */

function formatPrice(amount: number, currency?: string): string {
  // TODO: Implement with optional parameter
  return "";
}

// ============================================================
// PROBLEM 4: Default Parameters
// ============================================================
/**
 * Create a function that generates a user greeting.
 * - greeting defaults to "Hello"
 * - punctuation defaults to "!"
 * 
 * Example: userGreeting("Alice") → "Hello, Alice!"
 * Example: userGreeting("Bob", "Hi", "?") → "Hi, Bob?"
 */

function userGreeting(name: string, greeting: string = "", punctuation: string = ""): string {
  // TODO: Implement with default parameters
  return "";
}

// ============================================================
// PROBLEM 5: Rest Parameters
// ============================================================
/**
 * Create a function that finds the maximum of any number of arguments.
 * Example: findMax(3, 1, 4, 1, 5) → 5
 */

function findMax(...numbers: number[]): number {
  // TODO: Implement using rest parameters
  return 0;
}

// ============================================================
// PROBLEM 6: Function Type
// ============================================================
/**
 * Define a type for a string transformer function.
 * Then create two functions of that type:
 * 1. toUpperCase - converts string to uppercase
 * 2. addExclamation - adds "!" to the end
 */

// TODO: Define the StringTransformer type
type StringTransformer = (input: string) => string;

// TODO: Implement toUpperCase
const toUpperCase: StringTransformer = (s) => {
  return "";
};

// TODO: Implement addExclamation
const addExclamation: StringTransformer = (s) => {
  return "";
};

// ============================================================
// PROBLEM 7: Higher-Order Function
// ============================================================
/**
 * Create a function that takes a number and returns a function.
 * The returned function should add that number to its argument.
 * 
 * Example:
 * const addFive = createAdder(5);
 * addFive(10) → 15
 */

function createAdder(amount: number): (n: number) => number {
  // TODO: Return a function that adds 'amount' to its argument
  return () => 0;
}

// ============================================================
// PROBLEM 8: Callback Function
// ============================================================
/**
 * Create a function that processes an array of numbers.
 * It should apply a callback function to each number and return
 * a new array with the results.
 * 
 * (This is similar to what Array.map does!)
 */

function processArray(
  numbers: number[],
  callback: (n: number) => number
): number[] {
  // TODO: Apply callback to each element
  return [];
}

// ============================================================
// PROBLEM 9: Closure
// ============================================================
/**
 * Create a function that returns a "toggler" function.
 * The toggler alternates between true and false each time it's called.
 * 
 * Example:
 * const toggle = createToggle();
 * toggle() → true
 * toggle() → false
 * toggle() → true
 */

function createToggle(): () => boolean {
  // TODO: Use closure to track state
  return () => false;
}

// ============================================================
// PROBLEM 10: Recursive Function
// ============================================================
/**
 * Create a recursive function that calculates the sum of digits.
 * Example: sumOfDigits(123) → 1 + 2 + 3 = 6
 * Example: sumOfDigits(9999) → 9 + 9 + 9 + 9 = 36
 */

function sumOfDigits(n: number): number {
  // TODO: Implement recursively
  return 0;
}

// ============================================================
// PROBLEM 11: Compose Functions
// ============================================================
/**
 * Create a function that composes two functions.
 * compose(f, g)(x) should be equivalent to f(g(x))
 * 
 * Example:
 * const addOne = (x: number) => x + 1;
 * const double = (x: number) => x * 2;
 * const addOneThenDouble = compose(double, addOne);
 * addOneThenDouble(5) → 12 (5+1=6, 6*2=12)
 */

function compose<T>(
  f: (x: T) => T,
  g: (x: T) => T
): (x: T) => T {
  // TODO: Return a new function that composes f and g
  return (x) => x;
}

// ============================================================
// PROBLEM 12: Memoization
// ============================================================
/**
 * Create a function that memoizes (caches) the results of another function.
 * If the same input is provided twice, return the cached result.
 * 
 * This is useful for expensive calculations!
 */

function memoize<T, R>(fn: (arg: T) => R): (arg: T) => R {
  // TODO: Implement memoization using closure and a Map
  return fn;
}

// ============================================================
// TEST YOUR ANSWERS
// ============================================================

console.log("========================================");
console.log("TESTING YOUR ANSWERS");
console.log("========================================\n");

// Problem 1
console.log("--- Problem 1: Basic Function ---");
if (greet("Alice") === "Hello, Alice!" && greet("Bob") === "Hello, Bob!") {
  console.log("✅ Problem 1 PASSED!\n");
} else {
  console.log(`❌ greet("Alice")="${greet("Alice")}" (expected "Hello, Alice!")\n`);
}

// Problem 2
console.log("--- Problem 2: Arrow Function ---");
const area = circleArea(5);
const expected = Math.PI * 25;
if (Math.abs(area - expected) < 0.0001) {
  console.log("✅ Problem 2 PASSED!\n");
} else {
  console.log(`❌ circleArea(5)=${area} (expected ~${expected.toFixed(4)})\n`);
}

// Problem 3
console.log("--- Problem 3: Optional Parameters ---");
if (formatPrice(19.99) === "$19.99" && formatPrice(19.99, "€") === "€19.99") {
  console.log("✅ Problem 3 PASSED!\n");
} else {
  console.log(`❌ formatPrice(19.99)="${formatPrice(19.99)}" (expected "$19.99")`);
  console.log(`❌ formatPrice(19.99, "€")="${formatPrice(19.99, "€")}" (expected "€19.99")\n`);
}

// Problem 4
console.log("--- Problem 4: Default Parameters ---");
if (userGreeting("Alice") === "Hello, Alice!" && 
    userGreeting("Bob", "Hi", "?") === "Hi, Bob?") {
  console.log("✅ Problem 4 PASSED!\n");
} else {
  console.log(`❌ userGreeting("Alice")="${userGreeting("Alice")}" (expected "Hello, Alice!")\n`);
}

// Problem 5
console.log("--- Problem 5: Rest Parameters ---");
if (findMax(3, 1, 4, 1, 5) === 5 && findMax(10) === 10 && findMax(-5, -2, -8) === -2) {
  console.log("✅ Problem 5 PASSED!\n");
} else {
  console.log(`❌ findMax(3,1,4,1,5)=${findMax(3, 1, 4, 1, 5)} (expected 5)\n`);
}

// Problem 6
console.log("--- Problem 6: Function Type ---");
if (toUpperCase("hello") === "HELLO" && addExclamation("hi") === "hi!") {
  console.log("✅ Problem 6 PASSED!\n");
} else {
  console.log(`❌ toUpperCase("hello")="${toUpperCase("hello")}" (expected "HELLO")`);
  console.log(`❌ addExclamation("hi")="${addExclamation("hi")}" (expected "hi!")\n`);
}

// Problem 7
console.log("--- Problem 7: Higher-Order Function ---");
const addFive = createAdder(5);
if (addFive(10) === 15 && addFive(0) === 5 && createAdder(100)(1) === 101) {
  console.log("✅ Problem 7 PASSED!\n");
} else {
  console.log(`❌ addFive(10)=${addFive(10)} (expected 15)\n`);
}

// Problem 8
console.log("--- Problem 8: Callback Function ---");
const doubled = processArray([1, 2, 3], n => n * 2);
if (JSON.stringify(doubled) === JSON.stringify([2, 4, 6])) {
  console.log("✅ Problem 8 PASSED!\n");
} else {
  console.log(`❌ processArray([1,2,3], n => n*2)=[${doubled}] (expected [2,4,6])\n`);
}

// Problem 9
console.log("--- Problem 9: Closure ---");
const toggle = createToggle();
const t1 = toggle();
const t2 = toggle();
const t3 = toggle();
if (t1 === true && t2 === false && t3 === true) {
  console.log("✅ Problem 9 PASSED!\n");
} else {
  console.log(`❌ toggle() sequence: ${t1}, ${t2}, ${t3} (expected true, false, true)\n`);
}

// Problem 10
console.log("--- Problem 10: Recursive Function ---");
if (sumOfDigits(123) === 6 && sumOfDigits(9999) === 36 && sumOfDigits(5) === 5) {
  console.log("✅ Problem 10 PASSED!\n");
} else {
  console.log(`❌ sumOfDigits(123)=${sumOfDigits(123)} (expected 6)\n`);
}

// Problem 11
console.log("--- Problem 11: Compose Functions ---");
const addOne = (x: number) => x + 1;
const doubleNum = (x: number) => x * 2;
const addOneThenDouble = compose(doubleNum, addOne);
if (addOneThenDouble(5) === 12) {
  console.log("✅ Problem 11 PASSED!\n");
} else {
  console.log(`❌ compose(double, addOne)(5)=${addOneThenDouble(5)} (expected 12)\n`);
}

// Problem 12
console.log("--- Problem 12: Memoization ---");
let callCount = 0;
const expensiveFn = (n: number): number => {
  callCount++;
  return n * 2;
};
const memoized = memoize(expensiveFn);
memoized(5);
memoized(5);
memoized(5);
if (callCount === 1 && memoized(5) === 10) {
  console.log("✅ Problem 12 PASSED!\n");
} else {
  console.log(`❌ memoize should cache results (callCount=${callCount}, expected 1)\n`);
}

console.log("========================================");
console.log("Practice complete!");
console.log("========================================");
