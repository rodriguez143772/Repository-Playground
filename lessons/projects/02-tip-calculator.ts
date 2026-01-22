/**
 * ============================================================
 * PROJECT: Tip Calculator
 * Required Knowledge: Lessons 1-2 (Variables, Operators)
 * ============================================================
 * 
 * Build a restaurant tip calculator that:
 * - Calculates tip based on percentage
 * - Splits the bill between multiple people
 * - Handles different service quality ratings
 * 
 * This project practices:
 * - Arithmetic operators
 * - Comparison operators
 * - Template literals
 * - Ternary operator
 */

// ============================================================
// BILL INFORMATION
// ============================================================

const billAmount: number = 84.50;
const tipPercentage: number = 18;  // 18%
const numberOfPeople: number = 4;

// ============================================================
// TODO: Calculate Tip and Total
// ============================================================

// TODO: Calculate the tip amount
const tipAmount: number = 0;

// TODO: Calculate the total (bill + tip)
const totalAmount: number = 0;

// TODO: Calculate per-person amounts
const tipPerPerson: number = 0;
const totalPerPerson: number = 0;

// ============================================================
// TODO: Service Quality Ratings
// ============================================================

// Different tip percentages based on service:
// Poor: 10%, Fair: 15%, Good: 18%, Excellent: 20%, Outstanding: 25%

const poorTip: number = 0;      // Calculate for poor service
const fairTip: number = 0;      // Calculate for fair service
const goodTip: number = 0;      // Calculate for good service
const excellentTip: number = 0; // Calculate for excellent service
const outstandingTip: number = 0; // Calculate for outstanding service

// ============================================================
// TODO: Quick Tip Suggestions
// ============================================================

// Round up total to nearest dollar for easy payment
// Hint: Use Math.ceil()
const roundedTotal: number = 0;

// Calculate what tip percentage that rounded total represents
const roundedTipPercentage: number = 0;

// ============================================================
// TODO: Comparison Operations
// ============================================================

// Is the tip more than $15?
const isGenerousTip: boolean = false;

// Is splitting more than 2 ways?
const isGroupDining: boolean = false;

// Would each person pay less than $30?
const isAffordable: boolean = false;

// Quick tip summary using ternary
const tipSummary: string = "";  // "Generous tip!" if > 15%, otherwise "Standard tip"

// ============================================================
// DISPLAY RESULTS
// ============================================================

console.log("========================================");
console.log("TIP CALCULATOR");
console.log("========================================\n");

console.log("--- Bill Summary ---");
console.log(`Bill Amount:     $${billAmount.toFixed(2)}`);
console.log(`Tip (${tipPercentage}%):      $${tipAmount.toFixed(2)}`);
console.log(`Total:           $${totalAmount.toFixed(2)}`);

console.log("\n--- Split Between " + numberOfPeople + " People ---");
console.log(`Tip per person:  $${tipPerPerson.toFixed(2)}`);
console.log(`Total per person: $${totalPerPerson.toFixed(2)}`);

console.log("\n--- Quick Tip Guide for $" + billAmount + " bill ---");
console.log(`Poor (10%):        $${poorTip.toFixed(2)}`);
console.log(`Fair (15%):        $${fairTip.toFixed(2)}`);
console.log(`Good (18%):        $${goodTip.toFixed(2)}`);
console.log(`Excellent (20%):   $${excellentTip.toFixed(2)}`);
console.log(`Outstanding (25%): $${outstandingTip.toFixed(2)}`);

console.log("\n--- Round Up Option ---");
console.log(`Rounded total: $${roundedTotal} (${roundedTipPercentage.toFixed(1)}% tip)`);

console.log("\n--- Analysis ---");
console.log(`Generous tip? ${isGenerousTip}`);
console.log(`Group dining? ${isGroupDining}`);
console.log(`Affordable (<$30/person)? ${isAffordable}`);
console.log(`Summary: ${tipSummary}`);

// ============================================================
// TESTS
// ============================================================

console.log("\n========================================");
console.log("TESTING YOUR SOLUTION");
console.log("========================================\n");

let passed = 0;
let failed = 0;

// Test tip calculation
if (Math.abs(tipAmount - 15.21) < 0.01) {
  console.log("✅ Tip amount correct");
  passed++;
} else {
  console.log(`❌ Tip amount: got ${tipAmount.toFixed(2)}, expected 15.21`);
  failed++;
}

// Test total
if (Math.abs(totalAmount - 99.71) < 0.01) {
  console.log("✅ Total amount correct");
  passed++;
} else {
  console.log(`❌ Total: got ${totalAmount.toFixed(2)}, expected 99.71`);
  failed++;
}

// Test per person
if (Math.abs(totalPerPerson - 24.9275) < 0.01) {
  console.log("✅ Per person amount correct");
  passed++;
} else {
  console.log(`❌ Per person: got ${totalPerPerson.toFixed(2)}, expected 24.93`);
  failed++;
}

// Test service tiers
if (Math.abs(poorTip - 8.45) < 0.01 && Math.abs(excellentTip - 16.90) < 0.01) {
  console.log("✅ Service tier calculations correct");
  passed++;
} else {
  console.log(`❌ Service tiers incorrect`);
  failed++;
}

// Test rounded total
if (roundedTotal === 100) {
  console.log("✅ Rounded total correct");
  passed++;
} else {
  console.log(`❌ Rounded total: got ${roundedTotal}, expected 100`);
  failed++;
}

// Test comparisons
if (isGenerousTip === true && isGroupDining === true && isAffordable === true) {
  console.log("✅ Comparison operations correct");
  passed++;
} else {
  console.log(`❌ Comparisons incorrect`);
  failed++;
}

// Test ternary
if (tipSummary.toLowerCase().includes("generous")) {
  console.log("✅ Tip summary correct");
  passed++;
} else {
  console.log(`❌ Tip summary should indicate generous tip`);
  failed++;
}

console.log(`\n${passed}/${passed + failed} tests passed`);
if (failed === 0) {
  console.log("\n🎉 Project complete! You're a tip calculating pro!");
}
