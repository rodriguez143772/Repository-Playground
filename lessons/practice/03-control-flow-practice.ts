/**
 * ============================================================
 * PRACTICE: Control Flow
 * ============================================================
 * 
 * Instructions:
 * 1. Complete each function by implementing the logic described
 * 2. Run: bun lessons/practice/03-control-flow-practice.ts
 * 3. Check if all tests pass!
 */

// ============================================================
// PROBLEM 1: Age Category
// ============================================================
/**
 * Return the age category based on the given age.
 * 
 * - 0-12: "child"
 * - 13-19: "teenager"
 * - 20-64: "adult"
 * - 65+: "senior"
 * - negative: "invalid"
 */

function getAgeCategory(age: number): string {
  // TODO: Implement using if/else if/else
  return "";
}

// ============================================================
// PROBLEM 2: Grade Calculator
// ============================================================
/**
 * Convert a numeric score to a letter grade.
 * 
 * - 90-100: "A"
 * - 80-89: "B"
 * - 70-79: "C"
 * - 60-69: "D"
 * - 0-59: "F"
 * - Below 0 or above 100: "Invalid"
 */

function getLetterGrade(score: number): string {
  // TODO: Implement using if/else if/else
  return "";
}

// ============================================================
// PROBLEM 3: Day Type (Switch)
// ============================================================
/**
 * Return whether a day is a "weekday", "weekend", or "invalid".
 * Use a switch statement!
 * 
 * Days should be lowercase: "monday", "tuesday", etc.
 */

function getDayType(day: string): string {
  // TODO: Implement using switch
  return "";
}

// ============================================================
// PROBLEM 4: Shipping Calculator
// ============================================================
/**
 * Calculate shipping cost based on weight and destination.
 * 
 * - Under 1 kg: $5
 * - 1-5 kg: $10
 * - Over 5 kg: $20
 * 
 * If destination is "international", double the price.
 * If weight is 0 or negative, return -1 (invalid).
 */

function calculateShipping(weight: number, destination: "domestic" | "international"): number {
  // TODO: Implement with guard clauses and if statements
  return 0;
}

// ============================================================
// PROBLEM 5: FizzBuzz
// ============================================================
/**
 * The classic FizzBuzz problem:
 * 
 * - If number is divisible by 3 AND 5: return "FizzBuzz"
 * - If number is divisible by 3 only: return "Fizz"
 * - If number is divisible by 5 only: return "Buzz"
 * - Otherwise: return the number as a string
 * 
 * Hint: Use modulus (%) to check divisibility
 */

function fizzBuzz(num: number): string {
  // TODO: Implement the logic
  return "";
}

// ============================================================
// PROBLEM 6: Password Strength
// ============================================================
/**
 * Check password strength and return a description:
 * 
 * - Less than 6 characters: "weak"
 * - 6-9 characters: "medium"
 * - 10+ characters with at least one number: "strong"
 * - 10+ characters without numbers: "medium"
 * 
 * Hint: To check for numbers, you can use regex: /\d/.test(password)
 */

function getPasswordStrength(password: string): string {
  // TODO: Implement the logic
  return "";
}

// ============================================================
// PROBLEM 7: Temperature Converter (Switch)
// ============================================================
/**
 * Convert temperature between Celsius and Fahrenheit.
 * 
 * - "C" to "F": F = (C × 9/5) + 32
 * - "F" to "C": C = (F - 32) × 5/9
 * - Invalid unit: return NaN
 */

function convertTemperature(temp: number, fromUnit: string): number {
  // TODO: Implement using switch
  return 0;
}

// ============================================================
// PROBLEM 8: Access Level (Combined Logic)
// ============================================================
/**
 * Determine what features a user can access based on their role and status.
 * 
 * Roles: "guest", "user", "admin"
 * 
 * Return an object with these boolean properties:
 * - canView: everyone can view
 * - canEdit: users and admins only (and must be active)
 * - canDelete: admins only (and must be active)
 * - canManageUsers: admins only (and must be active)
 */

interface AccessLevel {
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canManageUsers: boolean;
}

function getAccessLevel(role: "guest" | "user" | "admin", isActive: boolean): AccessLevel {
  // TODO: Implement the logic
  return {
    canView: false,
    canEdit: false,
    canDelete: false,
    canManageUsers: false
  };
}

// ============================================================
// TEST YOUR ANSWERS
// ============================================================

console.log("========================================");
console.log("TESTING YOUR ANSWERS");
console.log("========================================\n");

// Problem 1 Tests
console.log("--- Problem 1: Age Category ---");
const ageTests = [
  { input: 5, expected: "child" },
  { input: 15, expected: "teenager" },
  { input: 30, expected: "adult" },
  { input: 70, expected: "senior" },
  { input: -5, expected: "invalid" }
];

let p1Passed = true;
ageTests.forEach(test => {
  const result = getAgeCategory(test.input);
  if (result !== test.expected) {
    console.log(`❌ getAgeCategory(${test.input}) = "${result}", expected "${test.expected}"`);
    p1Passed = false;
  }
});
if (p1Passed) console.log("✅ Problem 1 PASSED!\n");
else console.log("");

// Problem 2 Tests
console.log("--- Problem 2: Grade Calculator ---");
const gradeTests = [
  { input: 95, expected: "A" },
  { input: 85, expected: "B" },
  { input: 75, expected: "C" },
  { input: 65, expected: "D" },
  { input: 50, expected: "F" },
  { input: -10, expected: "Invalid" },
  { input: 110, expected: "Invalid" }
];

let p2Passed = true;
gradeTests.forEach(test => {
  const result = getLetterGrade(test.input);
  if (result !== test.expected) {
    console.log(`❌ getLetterGrade(${test.input}) = "${result}", expected "${test.expected}"`);
    p2Passed = false;
  }
});
if (p2Passed) console.log("✅ Problem 2 PASSED!\n");
else console.log("");

// Problem 3 Tests
console.log("--- Problem 3: Day Type ---");
const dayTests = [
  { input: "monday", expected: "weekday" },
  { input: "saturday", expected: "weekend" },
  { input: "sunday", expected: "weekend" },
  { input: "notaday", expected: "invalid" }
];

let p3Passed = true;
dayTests.forEach(test => {
  const result = getDayType(test.input);
  if (result !== test.expected) {
    console.log(`❌ getDayType("${test.input}") = "${result}", expected "${test.expected}"`);
    p3Passed = false;
  }
});
if (p3Passed) console.log("✅ Problem 3 PASSED!\n");
else console.log("");

// Problem 4 Tests
console.log("--- Problem 4: Shipping Calculator ---");
const shipTests = [
  { weight: 0.5, dest: "domestic" as const, expected: 5 },
  { weight: 3, dest: "domestic" as const, expected: 10 },
  { weight: 7, dest: "domestic" as const, expected: 20 },
  { weight: 2, dest: "international" as const, expected: 20 },
  { weight: -1, dest: "domestic" as const, expected: -1 }
];

let p4Passed = true;
shipTests.forEach(test => {
  const result = calculateShipping(test.weight, test.dest);
  if (result !== test.expected) {
    console.log(`❌ calculateShipping(${test.weight}, "${test.dest}") = ${result}, expected ${test.expected}`);
    p4Passed = false;
  }
});
if (p4Passed) console.log("✅ Problem 4 PASSED!\n");
else console.log("");

// Problem 5 Tests
console.log("--- Problem 5: FizzBuzz ---");
const fizzTests = [
  { input: 3, expected: "Fizz" },
  { input: 5, expected: "Buzz" },
  { input: 15, expected: "FizzBuzz" },
  { input: 7, expected: "7" }
];

let p5Passed = true;
fizzTests.forEach(test => {
  const result = fizzBuzz(test.input);
  if (result !== test.expected) {
    console.log(`❌ fizzBuzz(${test.input}) = "${result}", expected "${test.expected}"`);
    p5Passed = false;
  }
});
if (p5Passed) console.log("✅ Problem 5 PASSED!\n");
else console.log("");

// Problem 6 Tests
console.log("--- Problem 6: Password Strength ---");
const passTests = [
  { input: "abc", expected: "weak" },
  { input: "password", expected: "medium" },
  { input: "mypassword1", expected: "strong" },
  { input: "longpasswordnonum", expected: "medium" }
];

let p6Passed = true;
passTests.forEach(test => {
  const result = getPasswordStrength(test.input);
  if (result !== test.expected) {
    console.log(`❌ getPasswordStrength("${test.input}") = "${result}", expected "${test.expected}"`);
    p6Passed = false;
  }
});
if (p6Passed) console.log("✅ Problem 6 PASSED!\n");
else console.log("");

// Problem 7 Tests
console.log("--- Problem 7: Temperature Converter ---");
const tempTests = [
  { temp: 0, unit: "C", expected: 32 },
  { temp: 100, unit: "C", expected: 212 },
  { temp: 32, unit: "F", expected: 0 }
];

let p7Passed = true;
tempTests.forEach(test => {
  const result = convertTemperature(test.temp, test.unit);
  if (Math.abs(result - test.expected) > 0.01) {
    console.log(`❌ convertTemperature(${test.temp}, "${test.unit}") = ${result}, expected ${test.expected}`);
    p7Passed = false;
  }
});
if (p7Passed) console.log("✅ Problem 7 PASSED!\n");
else console.log("");

// Problem 8 Tests
console.log("--- Problem 8: Access Level ---");
const guestAccess = getAccessLevel("guest", true);
const userAccess = getAccessLevel("user", true);
const adminAccess = getAccessLevel("admin", true);
const inactiveAdmin = getAccessLevel("admin", false);

let p8Passed = true;

if (!guestAccess.canView || guestAccess.canEdit || guestAccess.canDelete) {
  console.log("❌ Guest access incorrect");
  p8Passed = false;
}

if (!userAccess.canView || !userAccess.canEdit || userAccess.canDelete) {
  console.log("❌ User access incorrect");
  p8Passed = false;
}

if (!adminAccess.canView || !adminAccess.canEdit || !adminAccess.canDelete || !adminAccess.canManageUsers) {
  console.log("❌ Admin access incorrect");
  p8Passed = false;
}

if (inactiveAdmin.canEdit || inactiveAdmin.canDelete) {
  console.log("❌ Inactive admin should not have edit/delete access");
  p8Passed = false;
}

if (p8Passed) console.log("✅ Problem 8 PASSED!\n");
else console.log("");

console.log("========================================");
console.log("Practice complete!");
console.log("========================================");
