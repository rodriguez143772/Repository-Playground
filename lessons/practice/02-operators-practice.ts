/**
 * ============================================================
 * PRACTICE: Operators and Expressions
 * ============================================================
 * 
 * Instructions:
 * 1. Complete each TODO
 * 2. Run: bun lessons/practice/02-operators-practice.ts
 * 3. Check if all tests pass!
 */

// ============================================================
// PROBLEM 1: Arithmetic Operations
// ============================================================
/**
 * Calculate the total cost of a shopping cart.
 */

const itemPrice: number = 25.99;
const quantity: number = 3;
const taxRate: number = 0.08;  // 8% tax

// TODO: Calculate subtotal (price × quantity)
let subtotal: number = 0;

// TODO: Calculate tax amount (subtotal × taxRate)
let taxAmount: number = 0;

// TODO: Calculate total (subtotal + tax)
let total: number = 0;

// ============================================================
// PROBLEM 2: Comparison Operators
// ============================================================
/**
 * Determine eligibility for a senior discount.
 * Seniors are 65 or older.
 */

const customerAge: number = 67;
const seniorAge: number = 65;

// TODO: Is the customer a senior? (use >= comparison)
let isSenior: boolean = false;

// TODO: Is the customer exactly 65? (use === comparison)
let isExactly65: boolean = false;

// TODO: Is the customer NOT a senior? (use < comparison)
let isNotSenior: boolean = false;

// ============================================================
// PROBLEM 3: Logical Operators
// ============================================================
/**
 * Determine if a user can access premium content.
 * Requirements: Must be logged in AND (have subscription OR be admin)
 */

const isLoggedIn: boolean = true;
const hasSubscription: boolean = false;
const isAdmin: boolean = true;

// TODO: Can the user access premium content?
let canAccessPremium: boolean = false;

// TODO: Should we show the login button? (not logged in)
let showLoginButton: boolean = false;

// TODO: Is this a paying customer? (logged in AND has subscription AND not admin)
let isPayingCustomer: boolean = false;

// ============================================================
// PROBLEM 4: Ternary Operator
// ============================================================
/**
 * Create status messages using the ternary operator.
 */

const batteryLevel: number = 15;
const downloadProgress: number = 100;
const userScore: number = 750;

// TODO: Battery status - "Critical" if < 20, otherwise "OK"
let batteryStatus: string = "";

// TODO: Download status - "Complete" if === 100, otherwise "In Progress"
let downloadStatus: string = "";

// TODO: User rank - "Gold" if >= 1000, "Silver" if >= 500, otherwise "Bronze"
let userRank: string = "";

// ============================================================
// PROBLEM 5: Nullish Coalescing
// ============================================================
/**
 * Provide default values for potentially missing data.
 */

const userNickname: string | null = null;
const userBio: string | undefined = undefined;
const userPoints: number | null = 0;  // Note: 0 is a valid value!

// TODO: Display nickname, or "Anonymous" if null
let displayNickname: string = "";

// TODO: Display bio, or "No bio provided" if undefined
let displayBio: string = "";

// TODO: Display points, keeping 0 as valid (don't default to something else!)
let displayPoints: number = -1;  // Should be 0, not -1!

// ============================================================
// PROBLEM 6: Combined Challenge
// ============================================================
/**
 * Calculate a final price with discounts.
 * 
 * Rules:
 * - Base price is $100
 * - Members get 10% off
 * - Seniors (65+) get additional 5% off
 * - If coupon code exists, apply extra $10 off at the end
 */

const basePrice: number = 100;
const isMember: boolean = true;
const customerAge2: number = 70;
const couponCode: string | null = "SAVE10";

// TODO: Calculate member discount (10% if member, 0% otherwise)
let memberDiscount: number = 0;

// TODO: Calculate senior discount (5% if 65+, 0% otherwise)
let seniorDiscount: number = 0;

// TODO: Calculate price after percentage discounts
let priceAfterDiscounts: number = 0;

// TODO: Calculate final price (subtract $10 if coupon exists)
let finalPrice: number = 0;

// ============================================================
// PROBLEM 7: Expression Challenge
// ============================================================
/**
 * Fix these expressions to get the expected results.
 * Add parentheses where needed!
 */

// Expected: 20 (add first, then multiply)
let expr1 = 2 + 3 * 4;  // Currently gives 14

// Expected: 5 (subtract first, then divide)
let expr2 = 20 / 10 - 5;  // Currently gives -3

// Expected: 100 (exponent first, then add)
let expr3 = 2 + 3 ** 2 * 10;  // Currently gives 92

// ============================================================
// TEST YOUR ANSWERS
// ============================================================

console.log("========================================");
console.log("TESTING YOUR ANSWERS");
console.log("========================================\n");

// Problem 1 Tests
console.log("--- Problem 1: Arithmetic ---");
const expectedSubtotal = 77.97;
const expectedTax = 6.2376;
const expectedTotal = 84.2076;

console.log(`Subtotal: $${subtotal.toFixed(2)} (expected: $${expectedSubtotal.toFixed(2)})`);
console.log(`Tax: $${taxAmount.toFixed(2)} (expected: $${expectedTax.toFixed(2)})`);
console.log(`Total: $${total.toFixed(2)} (expected: $${expectedTotal.toFixed(2)})`);

if (Math.abs(subtotal - expectedSubtotal) < 0.01 && 
    Math.abs(taxAmount - expectedTax) < 0.01 && 
    Math.abs(total - expectedTotal) < 0.01) {
  console.log("✅ Problem 1 PASSED!\n");
} else {
  console.log("❌ Problem 1 FAILED\n");
}

// Problem 2 Tests
console.log("--- Problem 2: Comparisons ---");
if (isSenior === true && isExactly65 === false && isNotSenior === false) {
  console.log("✅ Problem 2 PASSED!\n");
} else {
  console.log("❌ Problem 2 FAILED");
  console.log(`isSenior should be true, got: ${isSenior}`);
  console.log(`isExactly65 should be false, got: ${isExactly65}`);
  console.log(`isNotSenior should be false, got: ${isNotSenior}\n`);
}

// Problem 3 Tests
console.log("--- Problem 3: Logical Operators ---");
if (canAccessPremium === true && showLoginButton === false && isPayingCustomer === false) {
  console.log("✅ Problem 3 PASSED!\n");
} else {
  console.log("❌ Problem 3 FAILED");
  console.log(`canAccessPremium should be true, got: ${canAccessPremium}`);
  console.log(`showLoginButton should be false, got: ${showLoginButton}`);
  console.log(`isPayingCustomer should be false, got: ${isPayingCustomer}\n`);
}

// Problem 4 Tests
console.log("--- Problem 4: Ternary Operator ---");
if (batteryStatus === "Critical" && downloadStatus === "Complete" && userRank === "Silver") {
  console.log("✅ Problem 4 PASSED!\n");
} else {
  console.log("❌ Problem 4 FAILED");
  console.log(`batteryStatus should be "Critical", got: "${batteryStatus}"`);
  console.log(`downloadStatus should be "Complete", got: "${downloadStatus}"`);
  console.log(`userRank should be "Silver", got: "${userRank}"\n`);
}

// Problem 5 Tests
console.log("--- Problem 5: Nullish Coalescing ---");
if (displayNickname === "Anonymous" && displayBio === "No bio provided" && displayPoints === 0) {
  console.log("✅ Problem 5 PASSED!\n");
} else {
  console.log("❌ Problem 5 FAILED");
  console.log(`displayNickname should be "Anonymous", got: "${displayNickname}"`);
  console.log(`displayBio should be "No bio provided", got: "${displayBio}"`);
  console.log(`displayPoints should be 0, got: ${displayPoints}\n`);
}

// Problem 6 Tests
console.log("--- Problem 6: Combined Challenge ---");
const expectedFinal = 75.5;  // 100 - 10% - 5% = 85.5, then - $10 = $75.50
if (Math.abs(finalPrice - expectedFinal) < 0.01) {
  console.log("✅ Problem 6 PASSED!\n");
} else {
  console.log("❌ Problem 6 FAILED");
  console.log(`finalPrice should be $${expectedFinal}, got: $${finalPrice}\n`);
}

// Problem 7 Tests
console.log("--- Problem 7: Expression Fix ---");
if (expr1 === 20 && expr2 === 5 && expr3 === 100) {
  console.log("✅ Problem 7 PASSED!\n");
} else {
  console.log("❌ Problem 7 FAILED");
  console.log(`expr1 should be 20, got: ${expr1}`);
  console.log(`expr2 should be 5, got: ${expr2}`);
  console.log(`expr3 should be 100, got: ${expr3}\n`);
}

console.log("========================================");
console.log("Practice complete!");
console.log("========================================");
