/**
 * ============================================================
 * PRACTICE: Loops
 * ============================================================
 * 
 * Instructions:
 * 1. Complete each function using the specified loop type
 * 2. Run: bun lessons/practice/04-loops-practice.ts
 * 3. Check if all tests pass!
 */

// ============================================================
// PROBLEM 1: Sum of Numbers (for loop)
// ============================================================
/**
 * Calculate the sum of all numbers from 1 to n (inclusive).
 * Use a for loop.
 * 
 * Example: sumToN(5) should return 1+2+3+4+5 = 15
 */

function sumToN(n: number): number {
  // TODO: Use a for loop to calculate the sum
  return 0;
}

// ============================================================
// PROBLEM 2: Factorial (while loop)
// ============================================================
/**
 * Calculate the factorial of n (n!).
 * factorial(5) = 5 × 4 × 3 × 2 × 1 = 120
 * factorial(0) = 1 (by definition)
 * Use a while loop.
 */

function factorial(n: number): number {
  // TODO: Use a while loop
  return 0;
}

// ============================================================
// PROBLEM 3: Reverse String (for...of)
// ============================================================
/**
 * Reverse a string.
 * Example: "hello" → "olleh"
 * Use a for...of loop.
 */

function reverseString(str: string): string {
  // TODO: Use for...of to build the reversed string
  return "";
}

// ============================================================
// PROBLEM 4: Find First Occurrence (break)
// ============================================================
/**
 * Find the index of the first occurrence of a value in an array.
 * Return -1 if not found.
 * Use a for loop with break.
 */

function findFirst<T>(arr: T[], value: T): number {
  // TODO: Use a for loop with break when found
  return -1;
}

// ============================================================
// PROBLEM 5: Count Positive (for...of with continue)
// ============================================================
/**
 * Count how many positive numbers are in an array.
 * Use for...of and continue to skip non-positive numbers.
 */

function countPositive(numbers: number[]): number {
  // TODO: Use for...of with continue
  return 0;
}

// ============================================================
// PROBLEM 6: Multiply Array (map)
// ============================================================
/**
 * Multiply every number in an array by a given factor.
 * Use the map method.
 */

function multiplyArray(numbers: number[], factor: number): number[] {
  // TODO: Use map
  return [];
}

// ============================================================
// PROBLEM 7: Filter Adults (filter)
// ============================================================
/**
 * Given an array of ages, return only the ages 18 and over.
 * Use the filter method.
 */

function filterAdults(ages: number[]): number[] {
  // TODO: Use filter
  return [];
}

// ============================================================
// PROBLEM 8: Calculate Average (reduce)
// ============================================================
/**
 * Calculate the average of an array of numbers.
 * Use the reduce method.
 * Return 0 for an empty array.
 */

function calculateAverage(numbers: number[]): number {
  // TODO: Use reduce
  return 0;
}

// ============================================================
// PROBLEM 9: FizzBuzz Array (for loop)
// ============================================================
/**
 * Generate an array of FizzBuzz results from 1 to n.
 * - Divisible by 3 and 5: "FizzBuzz"
 * - Divisible by 3 only: "Fizz"
 * - Divisible by 5 only: "Buzz"
 * - Otherwise: the number as string
 */

function fizzBuzzArray(n: number): string[] {
  // TODO: Use a for loop
  return [];
}

// ============================================================
// PROBLEM 10: Nested Loop - Matrix Sum
// ============================================================
/**
 * Calculate the sum of all numbers in a 2D array (matrix).
 * Use nested for...of loops.
 */

function matrixSum(matrix: number[][]): number {
  // TODO: Use nested for...of loops
  return 0;
}

// ============================================================
// PROBLEM 11: Chained Methods
// ============================================================
/**
 * Given an array of numbers:
 * 1. Filter to keep only positive numbers
 * 2. Double each remaining number
 * 3. Sum them all
 * 
 * Use chained array methods.
 */

function processNumbers(numbers: number[]): number {
  // TODO: Chain filter, map, and reduce
  return 0;
}

// ============================================================
// PROBLEM 12: Password Validator (do...while simulation)
// ============================================================
/**
 * Simulate checking passwords from a list until finding a valid one.
 * A valid password has at least 8 characters.
 * Return the first valid password, or "none" if all invalid.
 */

function findValidPassword(passwords: string[]): string {
  // TODO: Use a loop to find the first valid password
  return "none";
}

// ============================================================
// TEST YOUR ANSWERS
// ============================================================

console.log("========================================");
console.log("TESTING YOUR ANSWERS");
console.log("========================================\n");

// Problem 1
console.log("--- Problem 1: Sum of Numbers ---");
if (sumToN(5) === 15 && sumToN(10) === 55 && sumToN(1) === 1) {
  console.log("✅ Problem 1 PASSED!\n");
} else {
  console.log(`❌ sumToN(5)=${sumToN(5)} (expected 15)`);
  console.log(`❌ sumToN(10)=${sumToN(10)} (expected 55)\n`);
}

// Problem 2
console.log("--- Problem 2: Factorial ---");
if (factorial(5) === 120 && factorial(0) === 1 && factorial(3) === 6) {
  console.log("✅ Problem 2 PASSED!\n");
} else {
  console.log(`❌ factorial(5)=${factorial(5)} (expected 120)`);
  console.log(`❌ factorial(0)=${factorial(0)} (expected 1)\n`);
}

// Problem 3
console.log("--- Problem 3: Reverse String ---");
if (reverseString("hello") === "olleh" && reverseString("ab") === "ba") {
  console.log("✅ Problem 3 PASSED!\n");
} else {
  console.log(`❌ reverseString("hello")="${reverseString("hello")}" (expected "olleh")\n`);
}

// Problem 4
console.log("--- Problem 4: Find First ---");
if (findFirst([1, 2, 3, 4], 3) === 2 && findFirst([1, 2, 3], 5) === -1) {
  console.log("✅ Problem 4 PASSED!\n");
} else {
  console.log(`❌ findFirst([1,2,3,4], 3)=${findFirst([1, 2, 3, 4], 3)} (expected 2)\n`);
}

// Problem 5
console.log("--- Problem 5: Count Positive ---");
if (countPositive([1, -2, 3, -4, 5]) === 3 && countPositive([-1, -2]) === 0) {
  console.log("✅ Problem 5 PASSED!\n");
} else {
  console.log(`❌ countPositive([1,-2,3,-4,5])=${countPositive([1, -2, 3, -4, 5])} (expected 3)\n`);
}

// Problem 6
console.log("--- Problem 6: Multiply Array ---");
const mult = multiplyArray([1, 2, 3], 10);
if (JSON.stringify(mult) === JSON.stringify([10, 20, 30])) {
  console.log("✅ Problem 6 PASSED!\n");
} else {
  console.log(`❌ multiplyArray([1,2,3], 10)=[${mult}] (expected [10,20,30])\n`);
}

// Problem 7
console.log("--- Problem 7: Filter Adults ---");
const adults = filterAdults([15, 18, 21, 12, 30]);
if (JSON.stringify(adults) === JSON.stringify([18, 21, 30])) {
  console.log("✅ Problem 7 PASSED!\n");
} else {
  console.log(`❌ filterAdults([15,18,21,12,30])=[${adults}] (expected [18,21,30])\n`);
}

// Problem 8
console.log("--- Problem 8: Calculate Average ---");
if (calculateAverage([10, 20, 30]) === 20 && calculateAverage([]) === 0) {
  console.log("✅ Problem 8 PASSED!\n");
} else {
  console.log(`❌ calculateAverage([10,20,30])=${calculateAverage([10, 20, 30])} (expected 20)\n`);
}

// Problem 9
console.log("--- Problem 9: FizzBuzz Array ---");
const fb = fizzBuzzArray(5);
if (JSON.stringify(fb) === JSON.stringify(["1", "2", "Fizz", "4", "Buzz"])) {
  console.log("✅ Problem 9 PASSED!\n");
} else {
  console.log(`❌ fizzBuzzArray(5)=[${fb}] (expected ["1","2","Fizz","4","Buzz"])\n`);
}

// Problem 10
console.log("--- Problem 10: Matrix Sum ---");
const matrix = [[1, 2], [3, 4], [5, 6]];
if (matrixSum(matrix) === 21) {
  console.log("✅ Problem 10 PASSED!\n");
} else {
  console.log(`❌ matrixSum([[1,2],[3,4],[5,6]])=${matrixSum(matrix)} (expected 21)\n`);
}

// Problem 11
console.log("--- Problem 11: Chained Methods ---");
if (processNumbers([-1, 2, -3, 4, 5]) === 22) {  // positive: [2,4,5], doubled: [4,8,10], sum: 22
  console.log("✅ Problem 11 PASSED!\n");
} else {
  console.log(`❌ processNumbers([-1,2,-3,4,5])=${processNumbers([-1, 2, -3, 4, 5])} (expected 22)\n`);
}

// Problem 12
console.log("--- Problem 12: Password Validator ---");
if (findValidPassword(["ab", "short", "validpassword"]) === "validpassword" &&
    findValidPassword(["a", "b"]) === "none") {
  console.log("✅ Problem 12 PASSED!\n");
} else {
  console.log(`❌ Check findValidPassword results\n`);
}

console.log("========================================");
console.log("Practice complete!");
console.log("========================================");
