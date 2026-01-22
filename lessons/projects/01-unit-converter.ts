/**
 * ============================================================
 * PROJECT: Unit Converter
 * Required Knowledge: Lesson 1 (Variables and Types)
 * ============================================================
 * 
 * Build a unit converter that can convert between different units.
 * This project practices:
 * - Variable declarations (let, const)
 * - Type annotations
 * - Basic arithmetic
 * - String templates
 * 
 * REQUIREMENTS:
 * 1. Convert kilometers to miles
 * 2. Convert Celsius to Fahrenheit
 * 3. Convert kilograms to pounds
 * 4. Format output with proper units
 */

// ============================================================
// CONVERSION CONSTANTS
// ============================================================

// TODO: Define these conversion rate constants
// 1 kilometer = 0.621371 miles
// 1 kilogram = 2.20462 pounds
// Celsius to Fahrenheit: (C × 9/5) + 32

const KM_TO_MILES: number = 0;  // Fix this
const KG_TO_POUNDS: number = 0;  // Fix this

// ============================================================
// CONVERSION FUNCTIONS (as simple expressions for now)
// ============================================================

// TODO: Implement the conversions
// Store your input values here
const distanceInKm: number = 100;
const temperatureInCelsius: number = 25;
const weightInKg: number = 75;

// TODO: Calculate the converted values
const distanceInMiles: number = 0;  // Convert distanceInKm to miles
const temperatureInFahrenheit: number = 0;  // Convert temperatureInCelsius to Fahrenheit
const weightInPounds: number = 0;  // Convert weightInKg to pounds

// TODO: Create formatted output strings using template literals
const distanceOutput: string = "";  // Should be like "100 km = 62.14 miles"
const temperatureOutput: string = "";  // Should be like "25°C = 77°F"
const weightOutput: string = "";  // Should be like "75 kg = 165.35 lbs"

// ============================================================
// BONUS CHALLENGE: Reverse Conversions
// ============================================================

// TODO: Also support converting the other direction
const milesInput: number = 50;
const fahrenheitInput: number = 98.6;
const poundsInput: number = 150;

// Calculate reverse conversions
const milesToKm: number = 0;  // Convert miles to km
const fahrenheitToCelsius: number = 0;  // Convert F to C
const poundsToKg: number = 0;  // Convert pounds to kg

// ============================================================
// DISPLAY RESULTS
// ============================================================

console.log("========================================");
console.log("UNIT CONVERTER");
console.log("========================================\n");

console.log("--- Distance ---");
console.log(distanceOutput);

console.log("\n--- Temperature ---");
console.log(temperatureOutput);

console.log("\n--- Weight ---");
console.log(weightOutput);

console.log("\n--- Bonus: Reverse Conversions ---");
console.log(`${milesInput} miles = ${milesToKm.toFixed(2)} km`);
console.log(`${fahrenheitInput}°F = ${fahrenheitToCelsius.toFixed(2)}°C`);
console.log(`${poundsInput} lbs = ${poundsToKg.toFixed(2)} kg`);

// ============================================================
// TESTS
// ============================================================

console.log("\n========================================");
console.log("TESTING YOUR SOLUTION");
console.log("========================================\n");

let passed = 0;
let failed = 0;

// Test 1: Km to Miles
if (Math.abs(distanceInMiles - 62.1371) < 0.01) {
  console.log("✅ Km to Miles conversion correct");
  passed++;
} else {
  console.log(`❌ Km to Miles: got ${distanceInMiles}, expected ~62.14`);
  failed++;
}

// Test 2: Celsius to Fahrenheit
if (Math.abs(temperatureInFahrenheit - 77) < 0.01) {
  console.log("✅ Celsius to Fahrenheit conversion correct");
  passed++;
} else {
  console.log(`❌ C to F: got ${temperatureInFahrenheit}, expected 77`);
  failed++;
}

// Test 3: Kg to Pounds
if (Math.abs(weightInPounds - 165.3465) < 0.01) {
  console.log("✅ Kg to Pounds conversion correct");
  passed++;
} else {
  console.log(`❌ Kg to Pounds: got ${weightInPounds}, expected ~165.35`);
  failed++;
}

// Test 4: Output format includes units
if (distanceOutput.includes("km") && distanceOutput.includes("miles")) {
  console.log("✅ Distance output format correct");
  passed++;
} else {
  console.log(`❌ Distance output should include 'km' and 'miles'`);
  failed++;
}

// Test 5: Miles to Km (reverse)
if (Math.abs(milesToKm - 80.4672) < 0.01) {
  console.log("✅ Miles to Km conversion correct");
  passed++;
} else {
  console.log(`❌ Miles to Km: got ${milesToKm}, expected ~80.47`);
  failed++;
}

// Test 6: Fahrenheit to Celsius
if (Math.abs(fahrenheitToCelsius - 37) < 0.01) {
  console.log("✅ Fahrenheit to Celsius conversion correct");
  passed++;
} else {
  console.log(`❌ F to C: got ${fahrenheitToCelsius}, expected 37`);
  failed++;
}

console.log(`\n${passed}/${passed + failed} tests passed`);
if (failed === 0) {
  console.log("\n🎉 Project complete! Great job!");
}
