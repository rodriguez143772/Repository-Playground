/**
 * ============================================================
 * LESSON 2: Operators and Expressions
 * ============================================================
 * 
 * Operators are like the verbs of programming - they DO things.
 * Just like in math class where + adds numbers together,
 * programming operators perform actions on your data.
 * 
 * An expression is a combination of values and operators that
 * produces a result - like a recipe that takes ingredients
 * and produces a dish!
 */

// ============================================================
// SECTION 1: Arithmetic Operators
// ============================================================

/**
 * These are your basic math operators.
 * Think of them as a calculator's buttons.
 */

console.log("========================================");
console.log("ARITHMETIC OPERATORS");
console.log("========================================\n");

let a: number = 10;
let b: number = 3;

// Addition (+) - Combines values
let sum = a + b;
console.log(`${a} + ${b} = ${sum}`);  // 13

// Subtraction (-) - Finds the difference
let difference = a - b;
console.log(`${a} - ${b} = ${difference}`);  // 7

// Multiplication (*) - Multiplies values
let product = a * b;
console.log(`${a} * ${b} = ${product}`);  // 30

// Division (/) - Divides values
let quotient = a / b;
console.log(`${a} / ${b} = ${quotient}`);  // 3.333...

// Modulus (%) - Remainder after division
// Think of it as "what's left over"
let remainder = a % b;
console.log(`${a} % ${b} = ${remainder}`);  // 1 (10 ÷ 3 = 3 remainder 1)

// Exponentiation (**) - Power/exponent
let power = a ** 2;
console.log(`${a} ** 2 = ${power}`);  // 100 (10 squared)

// ============================================================
// SECTION 2: Assignment Operators
// ============================================================

/**
 * Assignment operators are shortcuts for updating variables.
 * Instead of writing x = x + 5, you can write x += 5
 * Think of them as "update in place" commands.
 */

console.log("\n========================================");
console.log("ASSIGNMENT OPERATORS");
console.log("========================================\n");

let score: number = 100;
console.log("Starting score:", score);

// Add and assign (+=)
score += 10;  // Same as: score = score + 10
console.log("After += 10:", score);  // 110

// Subtract and assign (-=)
score -= 25;  // Same as: score = score - 25
console.log("After -= 25:", score);  // 85

// Multiply and assign (*=)
score *= 2;  // Same as: score = score * 2
console.log("After *= 2:", score);  // 170

// Divide and assign (/=)
score /= 10;  // Same as: score = score / 10
console.log("After /= 10:", score);  // 17

// Modulus and assign (%=)
score %= 5;  // Same as: score = score % 5
console.log("After %= 5:", score);  // 2

// ============================================================
// SECTION 3: Increment and Decrement
// ============================================================

/**
 * These are super shortcuts for adding or subtracting 1.
 * Like a tally counter - click to add one!
 */

console.log("\n========================================");
console.log("INCREMENT & DECREMENT");
console.log("========================================\n");

let counter: number = 0;

// Increment (++) - Add 1
counter++;  // Same as: counter = counter + 1
console.log("After counter++:", counter);  // 1

counter++;
console.log("After another counter++:", counter);  // 2

// Decrement (--) - Subtract 1
counter--;  // Same as: counter = counter - 1
console.log("After counter--:", counter);  // 1

// Pre vs Post increment (advanced)
let x = 5;
console.log("\nPre vs Post increment:");
console.log("x is:", x);
console.log("x++ returns:", x++);  // Returns 5, THEN increments
console.log("x is now:", x);       // 6
console.log("++x returns:", ++x);  // Increments first, THEN returns 7

// ============================================================
// SECTION 4: Comparison Operators
// ============================================================

/**
 * Comparison operators ask questions and return true or false.
 * Like asking "Is this bigger than that?" and getting a yes/no answer.
 */

console.log("\n========================================");
console.log("COMPARISON OPERATORS");
console.log("========================================\n");

let num1: number = 10;
let num2: number = 5;
let num3: number = 10;

// Equal to (==) - Checks if values are equal (with type coercion)
console.log(`${num1} == ${num3}:`, num1 == num3);  // true
console.log(`"10" == 10:`, "10" == 10 as any);     // true (type coercion!)

// Strict equal to (===) - Checks value AND type (RECOMMENDED)
console.log(`${num1} === ${num3}:`, num1 === num3);  // true
console.log(`"10" === 10:`, "10" === (10 as any));   // false (different types)

// Not equal (!=)
console.log(`${num1} != ${num2}:`, num1 != num2);  // true

// Strict not equal (!==) - RECOMMENDED
console.log(`${num1} !== ${num2}:`, num1 !== num2);  // true

// Greater than (>)
console.log(`${num1} > ${num2}:`, num1 > num2);  // true

// Less than (<)
console.log(`${num1} < ${num2}:`, num1 < num2);  // false

// Greater than or equal (>=)
console.log(`${num1} >= ${num3}:`, num1 >= num3);  // true

// Less than or equal (<=)
console.log(`${num2} <= ${num1}:`, num2 <= num1);  // true

// ============================================================
// SECTION 5: Logical Operators
// ============================================================

/**
 * Logical operators combine multiple conditions.
 * Think of them as decision gates:
 * - AND (&&): Both must be true
 * - OR (||): At least one must be true
 * - NOT (!): Flips true to false and vice versa
 */

console.log("\n========================================");
console.log("LOGICAL OPERATORS");
console.log("========================================\n");

let isAdult: boolean = true;
let hasLicense: boolean = true;
let isSuspended: boolean = false;

// AND (&&) - Both conditions must be true
// "Can they drive?" - Must be adult AND have license
let canDrive = isAdult && hasLicense;
console.log(`isAdult && hasLicense: ${canDrive}`);  // true

// OR (||) - At least one condition must be true
// "Is there a problem?" - Either no license OR suspended
let hasProblem = !hasLicense || isSuspended;
console.log(`!hasLicense || isSuspended: ${hasProblem}`);  // false

// NOT (!) - Flips the boolean
console.log(`!isAdult: ${!isAdult}`);  // false
console.log(`!isSuspended: ${!isSuspended}`);  // true

// Combining multiple conditions
let canLegallyDrive = isAdult && hasLicense && !isSuspended;
console.log(`Can legally drive: ${canLegallyDrive}`);  // true

// ============================================================
// SECTION 6: String Operators
// ============================================================

/**
 * The + operator has a special meaning for strings:
 * it concatenates (joins) them together.
 */

console.log("\n========================================");
console.log("STRING OPERATORS");
console.log("========================================\n");

let firstName: string = "John";
let lastName: string = "Doe";

// Concatenation with +
let fullName = firstName + " " + lastName;
console.log("Full name:", fullName);

// Concatenation with +=
let greeting = "Hello, ";
greeting += fullName;
greeting += "!";
console.log(greeting);

// Template literals (preferred way)
let message = `Welcome, ${firstName} ${lastName}!`;
console.log(message);

// ============================================================
// SECTION 7: Ternary Operator
// ============================================================

/**
 * The ternary operator is a shortcut for simple if-else.
 * Syntax: condition ? valueIfTrue : valueIfFalse
 * 
 * Think of it like a quick question:
 * "Is it raining? If yes, take umbrella. If no, wear sunglasses."
 */

console.log("\n========================================");
console.log("TERNARY OPERATOR");
console.log("========================================\n");

let age: number = 20;

// Instead of if-else for simple assignments
let status = age >= 18 ? "adult" : "minor";
console.log(`Age ${age}: ${status}`);

let temperature: number = 25;
let weather = temperature > 30 ? "hot" : temperature > 20 ? "warm" : "cold";
console.log(`${temperature}°C is ${weather}`);

let points: number = 85;
let grade = points >= 90 ? "A" : 
            points >= 80 ? "B" : 
            points >= 70 ? "C" : 
            points >= 60 ? "D" : "F";
console.log(`${points} points = Grade ${grade}`);

// ============================================================
// SECTION 8: Nullish Coalescing (??)
// ============================================================

/**
 * The ?? operator provides a default value when something is null or undefined.
 * Different from || which triggers on ANY falsy value (0, "", false).
 * 
 * Think of it as: "Use this value, OR if it's missing, use the backup."
 */

console.log("\n========================================");
console.log("NULLISH COALESCING (??");
console.log("========================================\n");

let userInput: string | null = null;
let defaultValue: string = "Guest";

// ?? only replaces null or undefined
let username = userInput ?? defaultValue;
console.log("Username:", username);  // "Guest"

// Compare with || (logical OR)
let count: number = 0;
let displayCount1 = count || 100;  // 100 (0 is falsy!)
let displayCount2 = count ?? 100;  // 0 (0 is not null/undefined)

console.log("With ||:", displayCount1);  // 100
console.log("With ??:", displayCount2);  // 0

// ============================================================
// SECTION 9: Optional Chaining (?.)
// ============================================================

/**
 * Optional chaining safely accesses properties that might not exist.
 * Instead of crashing, it returns undefined.
 * 
 * Like asking "If you have a wallet, and if it has a card, what's the number?"
 */

console.log("\n========================================");
console.log("OPTIONAL CHAINING (?.);
console.log("========================================\n");

interface User {
  name: string;
  address?: {
    city: string;
    zip?: string;
  };
}

let user1: User = { 
  name: "Alice",
  address: { city: "NYC", zip: "10001" }
};

let user2: User = { name: "Bob" };  // No address!

// Safe access with ?.
console.log("User1 city:", user1.address?.city);  // "NYC"
console.log("User2 city:", user2.address?.city);  // undefined (no crash!)

// Combining with ?? for defaults
let user1Zip = user1.address?.zip ?? "Unknown";
let user2Zip = user2.address?.zip ?? "Unknown";
console.log("User1 zip:", user1Zip);  // "10001"
console.log("User2 zip:", user2Zip);  // "Unknown"

// ============================================================
// SECTION 10: Type Operators
// ============================================================

/**
 * TypeScript has special operators for working with types.
 */

console.log("\n========================================");
console.log("TYPE OPERATORS");
console.log("========================================\n");

// typeof - Returns the type as a string
let someValue: any = "Hello";
console.log("typeof someValue:", typeof someValue);  // "string"

someValue = 42;
console.log("typeof someValue:", typeof someValue);  // "number"

// instanceof - Checks if object is instance of a class
class Animal {}
class Dog extends Animal {}

let pet = new Dog();
console.log("pet instanceof Dog:", pet instanceof Dog);      // true
console.log("pet instanceof Animal:", pet instanceof Animal);  // true

// ============================================================
// OPERATOR PRECEDENCE
// ============================================================

/**
 * Just like in math, some operators have higher priority.
 * Multiplication before addition, etc.
 * When in doubt, use parentheses to be explicit!
 */

console.log("\n========================================");
console.log("OPERATOR PRECEDENCE");
console.log("========================================\n");

// Without parentheses - * happens before +
let result1 = 2 + 3 * 4;
console.log("2 + 3 * 4 =", result1);  // 14

// With parentheses - control the order
let result2 = (2 + 3) * 4;
console.log("(2 + 3) * 4 =", result2);  // 20

// Complex example
let complex = 10 + 5 * 2 - 8 / 4;
console.log("10 + 5 * 2 - 8 / 4 =", complex);  // 10 + 10 - 2 = 18

// ============================================================
// KEY TAKEAWAYS
// ============================================================

/**
 * 1. Arithmetic: + - * / % ** for math
 * 2. Assignment: = += -= *= /= for updating values
 * 3. Comparison: === !== > < >= <= for comparing (prefer ===)
 * 4. Logical: && || ! for combining conditions
 * 5. Ternary: condition ? yes : no for quick if-else
 * 6. Nullish: ?? for default values (null/undefined only)
 * 7. Optional: ?. for safe property access
 * 8. Use parentheses to control precedence!
 * 
 * Now try the practice problems!
 * Run: bun lessons/practice/02-operators-practice.ts
 */

console.log("\n✅ Lesson 2 Complete! Now try the practice problems.");
