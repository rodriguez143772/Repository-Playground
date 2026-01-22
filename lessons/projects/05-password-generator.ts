/**
 * ============================================================
 * PROJECT: Password Generator
 * Required Knowledge: Lessons 1-5 (+ Functions)
 * ============================================================
 * 
 * Build a secure password generator that:
 * - Creates random passwords of specified length
 * - Includes configurable character sets
 * - Calculates password strength
 * - Generates multiple passwords at once
 * 
 * This project practices:
 * - Function declarations and expressions
 * - Arrow functions
 * - Parameters and return values
 * - Higher-order functions
 */

// ============================================================
// CHARACTER SETS
// ============================================================

const LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMBERS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";

// ============================================================
// TODO: Helper Functions
// ============================================================

/**
 * Get a random character from a string.
 * @param chars - String of possible characters
 * @returns A single random character
 */
function getRandomChar(chars: string): string {
  // TODO: Return a random character from the string
  return "";
}

/**
 * Shuffle an array randomly (Fisher-Yates algorithm).
 * @param array - Array to shuffle
 * @returns Shuffled array
 */
function shuffleArray<T>(array: T[]): T[] {
  // TODO: Implement shuffle
  // Hint: Loop from end to start, swap with random earlier index
  return array;
}

// ============================================================
// TODO: Core Password Functions
// ============================================================

/**
 * Generate a random password.
 * @param length - Desired password length
 * @param options - Character options to include
 * @returns Generated password string
 */
function generatePassword(
  length: number,
  options: {
    lowercase?: boolean;
    uppercase?: boolean;
    numbers?: boolean;
    symbols?: boolean;
  } = {}
): string {
  // TODO: Implement password generation
  // 1. Build character pool based on options (default all true)
  // 2. Ensure at least one character from each enabled set
  // 3. Fill remaining length with random characters
  // 4. Shuffle and return
  
  return "";
}

/**
 * Generate multiple passwords.
 * @param count - Number of passwords to generate
 * @param length - Length of each password
 * @param options - Character options
 * @returns Array of passwords
 */
function generateMultiple(
  count: number,
  length: number,
  options?: {
    lowercase?: boolean;
    uppercase?: boolean;
    numbers?: boolean;
    symbols?: boolean;
  }
): string[] {
  // TODO: Generate multiple passwords
  return [];
}

// ============================================================
// TODO: Password Strength Calculator
// ============================================================

/**
 * Calculate password strength score (0-100).
 * 
 * Scoring:
 * - Length: +5 points per character (max 40)
 * - Has lowercase: +15 points
 * - Has uppercase: +15 points
 * - Has numbers: +15 points
 * - Has symbols: +15 points
 */
function calculateStrength(password: string): number {
  // TODO: Calculate and return strength score
  return 0;
}

/**
 * Get strength label based on score.
 * @param score - Strength score (0-100)
 * @returns Label: "Weak", "Fair", "Good", "Strong", "Very Strong"
 */
function getStrengthLabel(score: number): string {
  // TODO: Return appropriate label
  // 0-20: Weak, 21-40: Fair, 41-60: Good, 61-80: Strong, 81-100: Very Strong
  return "";
}

// ============================================================
// TODO: Password Validation
// ============================================================

/**
 * Check if password meets requirements.
 * @param password - Password to validate
 * @param requirements - Requirements to check
 * @returns Object with isValid and messages
 */
function validatePassword(
  password: string,
  requirements: {
    minLength?: number;
    requireLowercase?: boolean;
    requireUppercase?: boolean;
    requireNumbers?: boolean;
    requireSymbols?: boolean;
  } = {}
): { isValid: boolean; messages: string[] } {
  // TODO: Validate password against requirements
  // Return { isValid: true/false, messages: ["array of issues"] }
  return { isValid: true, messages: [] };
}

// ============================================================
// TODO: Memorable Password Generator
// ============================================================

const WORDS = ["apple", "banana", "cherry", "dragon", "eagle", "forest", 
               "guitar", "hammer", "island", "jungle", "knight", "lemon",
               "mountain", "ninja", "ocean", "piano", "queen", "river",
               "sunset", "tiger", "umbrella", "violin", "wizard", "zebra"];

/**
 * Generate a memorable password using words.
 * Format: Word1-Number-Word2-Symbol
 * Example: "Tiger42-Ocean!"
 */
function generateMemorablePassword(): string {
  // TODO: Generate memorable password
  return "";
}

// ============================================================
// DEMO AND TESTING
// ============================================================

console.log("========================================");
console.log("PASSWORD GENERATOR");
console.log("========================================\n");

// Generate sample passwords
console.log("--- Generated Passwords ---");
const password1 = generatePassword(12);
const password2 = generatePassword(16, { lowercase: true, uppercase: true, numbers: true });
const password3 = generatePassword(8, { numbers: true, symbols: true });

console.log(`Default (12):     ${password1}`);
console.log(`No symbols (16):  ${password2}`);
console.log(`Numbers+Symbols:  ${password3}`);

console.log("\n--- Password Strength ---");
[password1, password2, password3, "abc123", "P@ssw0rd!2024"].forEach(pw => {
  const score = calculateStrength(pw);
  const label = getStrengthLabel(score);
  console.log(`"${pw.substring(0, 10)}..." - Score: ${score}, ${label}`);
});

console.log("\n--- Multiple Passwords ---");
const batch = generateMultiple(5, 10);
batch.forEach((pw, i) => console.log(`  ${i + 1}. ${pw}`));

console.log("\n--- Memorable Password ---");
console.log(`Memorable: ${generateMemorablePassword()}`);

console.log("\n--- Validation ---");
const testValidation = validatePassword("abc", { minLength: 8, requireUppercase: true });
console.log(`Validate "abc": ${testValidation.isValid ? "Valid" : "Invalid"}`);
testValidation.messages.forEach(msg => console.log(`  - ${msg}`));

// ============================================================
// TESTS
// ============================================================

console.log("\n========================================");
console.log("TESTING YOUR SOLUTION");
console.log("========================================\n");

let passed = 0;
let failed = 0;

// Test getRandomChar
const randomChar = getRandomChar(LOWERCASE);
if (randomChar.length === 1 && LOWERCASE.includes(randomChar)) {
  console.log("✅ getRandomChar works");
  passed++;
} else {
  console.log("❌ getRandomChar should return single character from string");
  failed++;
}

// Test shuffleArray
const shuffled = shuffleArray([1, 2, 3, 4, 5]);
if (shuffled.length === 5 && shuffled.sort().join() === "1,2,3,4,5") {
  console.log("✅ shuffleArray preserves elements");
  passed++;
} else {
  console.log("❌ shuffleArray should keep all elements");
  failed++;
}

// Test generatePassword length
const gen1 = generatePassword(12);
if (gen1.length === 12) {
  console.log("✅ generatePassword correct length");
  passed++;
} else {
  console.log(`❌ Password length: ${gen1.length}, expected 12`);
  failed++;
}

// Test generatePassword character sets
const gen2 = generatePassword(20, { lowercase: true, uppercase: true, numbers: true, symbols: true });
const hasLower = /[a-z]/.test(gen2);
const hasUpper = /[A-Z]/.test(gen2);
const hasNum = /[0-9]/.test(gen2);
const hasSym = /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(gen2);
if (hasLower && hasUpper && hasNum && hasSym) {
  console.log("✅ generatePassword includes all character types");
  passed++;
} else {
  console.log("❌ Password should include all character types");
  failed++;
}

// Test generateMultiple
const batch2 = generateMultiple(3, 8);
if (batch2.length === 3 && batch2.every(p => p.length === 8)) {
  console.log("✅ generateMultiple works");
  passed++;
} else {
  console.log("❌ generateMultiple should return correct count and length");
  failed++;
}

// Test calculateStrength
const weakScore = calculateStrength("abc");
const strongScore = calculateStrength("MyP@ssw0rd!2024");
if (weakScore < strongScore && strongScore >= 60) {
  console.log("✅ calculateStrength differentiates weak/strong");
  passed++;
} else {
  console.log(`❌ Strength: weak=${weakScore}, strong=${strongScore}`);
  failed++;
}

// Test getStrengthLabel
if (getStrengthLabel(10) === "Weak" && getStrengthLabel(90) === "Very Strong") {
  console.log("✅ getStrengthLabel returns correct labels");
  passed++;
} else {
  console.log("❌ getStrengthLabel labels incorrect");
  failed++;
}

// Test validatePassword
const validation = validatePassword("short", { minLength: 10, requireUppercase: true });
if (!validation.isValid && validation.messages.length >= 2) {
  console.log("✅ validatePassword catches issues");
  passed++;
} else {
  console.log("❌ validatePassword should catch length and uppercase issues");
  failed++;
}

// Test memorablePassword
const memorable = generateMemorablePassword();
if (memorable.length > 8 && /[0-9]/.test(memorable)) {
  console.log("✅ generateMemorablePassword works");
  passed++;
} else {
  console.log("❌ Memorable password should have words and numbers");
  failed++;
}

console.log(`\n${passed}/${passed + failed} tests passed`);
if (failed === 0) {
  console.log("\n🎉 Project complete! Your passwords are uncrackable!");
}
