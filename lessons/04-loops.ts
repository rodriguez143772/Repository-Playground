/**
 * ============================================================
 * LESSON 4: Loops
 * ============================================================
 * 
 * Loops are like a merry-go-round - they keep going round and round
 * until you tell them to stop. They let you repeat code without
 * writing it multiple times.
 * 
 * Imagine you need to count from 1 to 100. Instead of writing
 * console.log(1), console.log(2), ... you use a loop!
 * 
 * Think of loops like:
 * - A chef making 20 identical pancakes
 * - A printer printing 50 copies
 * - A robot checking each item in a warehouse
 */

// ============================================================
// SECTION 1: The for Loop
// ============================================================

/**
 * The 'for' loop is the most controlled loop.
 * It has three parts:
 * 1. Initialization: Where to start (let i = 0)
 * 2. Condition: When to stop (i < 5)
 * 3. Update: How to progress (i++)
 * 
 * Syntax:
 * for (initialization; condition; update) {
 *   // code to repeat
 * }
 */

console.log("========================================");
console.log("FOR LOOPS");
console.log("========================================\n");

// Basic counting loop
console.log("Counting 1 to 5:");
for (let i = 1; i <= 5; i++) {
  console.log(`  Count: ${i}`);
}

// Counting down
console.log("\nCountdown from 5:");
for (let i = 5; i >= 1; i--) {
  console.log(`  ${i}...`);
}
console.log("  Liftoff! 🚀");

// Counting by steps
console.log("\nCounting by 2s:");
for (let i = 0; i <= 10; i += 2) {
  console.log(`  ${i}`);
}

// Using the loop variable
console.log("\nMultiplication table for 7:");
for (let i = 1; i <= 5; i++) {
  console.log(`  7 × ${i} = ${7 * i}`);
}

// ============================================================
// SECTION 2: The while Loop
// ============================================================

/**
 * The 'while' loop keeps going WHILE a condition is true.
 * Good when you don't know exactly how many times to loop.
 * 
 * Think of it like: "While there's still coffee in the pot, pour cups."
 */

console.log("\n========================================");
console.log("WHILE LOOPS");
console.log("========================================\n");

// Basic while loop
let count = 1;
console.log("While loop counting to 5:");
while (count <= 5) {
  console.log(`  Count: ${count}`);
  count++;  // Don't forget to update, or infinite loop!
}

// Real-world example: Simulating dice rolls until we get a 6
console.log("\nRolling dice until we get 6:");
let roll = 0;
let attempts = 0;

while (roll !== 6) {
  roll = Math.floor(Math.random() * 6) + 1;  // Random 1-6
  attempts++;
  console.log(`  Roll ${attempts}: ${roll}`);
}
console.log(`Got 6 after ${attempts} attempts!`);

// ============================================================
// SECTION 3: The do...while Loop
// ============================================================

/**
 * The 'do...while' loop runs at least once, THEN checks the condition.
 * 
 * Think of it like: "Do taste the soup, THEN decide if you want more."
 * The tasting happens before the decision!
 */

console.log("\n========================================");
console.log("DO...WHILE LOOPS");
console.log("========================================\n");

// Always runs at least once
let number = 10;
console.log("Do-while with condition already false:");
do {
  console.log(`  Number is: ${number}`);
  number++;
} while (number < 5);  // Already false, but runs once!

// Menu simulation
console.log("\nSimulated menu selection:");
let choice = 0;
let menuRuns = 0;
do {
  menuRuns++;
  choice = Math.floor(Math.random() * 4);  // Random 0-3
  console.log(`  User selected option: ${choice}`);
} while (choice !== 0 && menuRuns < 5);  // Exit when choice is 0
console.log("Menu exited!");

// ============================================================
// SECTION 4: for...of Loop (Arrays/Iterables)
// ============================================================

/**
 * The 'for...of' loop iterates over VALUES in an array.
 * It's cleaner than a regular for loop when you just need the values.
 * 
 * Think of it like: "For each fruit in the basket, do something."
 */

console.log("\n========================================");
console.log("FOR...OF LOOPS");
console.log("========================================\n");

const fruits: string[] = ["apple", "banana", "orange", "grape"];

console.log("Iterating over fruits:");
for (const fruit of fruits) {
  console.log(`  I have a ${fruit}`);
}

// With numbers
const scores: number[] = [85, 92, 78, 90, 88];
let total = 0;

for (const score of scores) {
  total += score;
}
console.log(`\nTotal of scores: ${total}`);
console.log(`Average: ${total / scores.length}`);

// With strings (iterates over characters!)
console.log("\nIterating over string characters:");
const word = "Hello";
for (const char of word) {
  console.log(`  Letter: ${char}`);
}

// ============================================================
// SECTION 5: for...in Loop (Object Properties)
// ============================================================

/**
 * The 'for...in' loop iterates over KEYS (property names) in an object.
 * Useful for exploring objects.
 * 
 * Note: Don't use for...in with arrays - use for...of instead!
 */

console.log("\n========================================");
console.log("FOR...IN LOOPS");
console.log("========================================\n");

const person = {
  name: "Alice",
  age: 30,
  city: "New York",
  occupation: "Developer"
};

console.log("Person properties:");
for (const key in person) {
  console.log(`  ${key}: ${person[key as keyof typeof person]}`);
}

// ============================================================
// SECTION 6: Array Methods (Functional Looping)
// ============================================================

/**
 * Modern JavaScript has powerful array methods that work like loops.
 * These are often cleaner and more expressive than traditional loops.
 */

console.log("\n========================================");
console.log("ARRAY METHODS (forEach, map, filter)");
console.log("========================================\n");

const numbers: number[] = [1, 2, 3, 4, 5];

// forEach - Do something for each element
console.log("forEach - printing each number:");
numbers.forEach((num, index) => {
  console.log(`  Index ${index}: ${num}`);
});

// map - Transform each element into something new
console.log("\nmap - doubling each number:");
const doubled = numbers.map(num => num * 2);
console.log(`  Original: [${numbers}]`);
console.log(`  Doubled:  [${doubled}]`);

// filter - Keep only elements that pass a test
console.log("\nfilter - keeping even numbers:");
const evens = numbers.filter(num => num % 2 === 0);
console.log(`  Original: [${numbers}]`);
console.log(`  Evens:    [${evens}]`);

// reduce - Combine all elements into one value
console.log("\nreduce - summing all numbers:");
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(`  Sum of [${numbers}] = ${sum}`);

// Chaining methods
console.log("\nChaining: double, filter evens > 5, sum:");
const result = numbers
  .map(n => n * 2)           // [2, 4, 6, 8, 10]
  .filter(n => n > 5)         // [6, 8, 10]
  .reduce((acc, n) => acc + n, 0);  // 24
console.log(`  Result: ${result}`);

// ============================================================
// SECTION 7: break and continue
// ============================================================

/**
 * Sometimes you need to control the loop flow:
 * - break: Exit the loop completely
 * - continue: Skip to the next iteration
 */

console.log("\n========================================");
console.log("BREAK AND CONTINUE");
console.log("========================================\n");

// break - Stop when we find what we're looking for
console.log("break - Finding first even number:");
const nums = [1, 3, 5, 4, 7, 8];
for (const num of nums) {
  console.log(`  Checking ${num}...`);
  if (num % 2 === 0) {
    console.log(`  Found even number: ${num}! Stopping.`);
    break;  // Exit the loop
  }
}

// continue - Skip certain items
console.log("\ncontinue - Skipping negative numbers:");
const mixed = [1, -2, 3, -4, 5, -6];
for (const num of mixed) {
  if (num < 0) {
    console.log(`  Skipping ${num} (negative)`);
    continue;  // Skip to next iteration
  }
  console.log(`  Processing ${num}`);
}

// ============================================================
// SECTION 8: Nested Loops
// ============================================================

/**
 * Loops inside loops! Like a grid - go through each row,
 * and for each row, go through each column.
 */

console.log("\n========================================");
console.log("NESTED LOOPS");
console.log("========================================\n");

// Multiplication table
console.log("Multiplication table (3x3):");
for (let i = 1; i <= 3; i++) {
  let row = "  ";
  for (let j = 1; j <= 3; j++) {
    row += `${i * j}\t`;
  }
  console.log(row);
}

// Grid pattern
console.log("\nGrid pattern:");
for (let row = 0; row < 3; row++) {
  let line = "  ";
  for (let col = 0; col < 5; col++) {
    line += "* ";
  }
  console.log(line);
}

// Breaking out of nested loops (labeled)
console.log("\nBreaking out of nested loops:");
outer: for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    console.log(`  i=${i}, j=${j}`);
    if (i === 2 && j === 2) {
      console.log("  Breaking out of both loops!");
      break outer;  // Breaks the outer loop
    }
  }
}

// ============================================================
// SECTION 9: Common Loop Patterns
// ============================================================

console.log("\n========================================");
console.log("COMMON LOOP PATTERNS");
console.log("========================================\n");

// Pattern 1: Finding maximum
const values = [23, 67, 12, 89, 45];
let max = values[0];
for (const val of values) {
  if (val > max) {
    max = val;
  }
}
console.log(`Maximum of [${values}]: ${max}`);

// Pattern 2: Counting occurrences
const letters = "hello world";
let vowelCount = 0;
for (const char of letters) {
  if ("aeiou".includes(char)) {
    vowelCount++;
  }
}
console.log(`Vowels in "${letters}": ${vowelCount}`);

// Pattern 3: Building a string
const items = ["milk", "bread", "eggs"];
let shoppingList = "Shopping list:\n";
for (let i = 0; i < items.length; i++) {
  shoppingList += `  ${i + 1}. ${items[i]}\n`;
}
console.log(shoppingList);

// Pattern 4: Finding index
const colors = ["red", "green", "blue", "yellow"];
let targetIndex = -1;
for (let i = 0; i < colors.length; i++) {
  if (colors[i] === "blue") {
    targetIndex = i;
    break;
  }
}
console.log(`Index of "blue": ${targetIndex}`);

// Better: use findIndex
const betterIndex = colors.findIndex(c => c === "blue");
console.log(`Using findIndex: ${betterIndex}`);

// ============================================================
// SECTION 10: Avoiding Infinite Loops
// ============================================================

/**
 * An infinite loop runs forever and crashes your program!
 * Always make sure:
 * 1. The condition will eventually be false
 * 2. You're updating the loop variable correctly
 */

console.log("\n========================================");
console.log("AVOIDING INFINITE LOOPS");
console.log("========================================\n");

// BAD (would be infinite - DO NOT RUN):
// while (true) { console.log("Forever!"); }
// for (let i = 0; i >= 0; i++) { } // i only increases!

// GOOD: Always have an exit condition
let safeCounter = 0;
const maxIterations = 5;

while (safeCounter < maxIterations) {
  console.log(`  Safe iteration ${safeCounter + 1}`);
  safeCounter++;  // Don't forget to increment!
}
console.log("Loop completed safely!");

// ============================================================
// KEY TAKEAWAYS
// ============================================================

/**
 * 1. for loop: Best when you know how many iterations
 * 2. while loop: Best when you don't know when to stop
 * 3. do...while: When you need at least one execution
 * 4. for...of: Iterate over array VALUES
 * 5. for...in: Iterate over object KEYS
 * 6. Array methods: forEach, map, filter, reduce
 * 7. break: Exit loop early
 * 8. continue: Skip to next iteration
 * 
 * Tips:
 * - Use const in for...of when you don't modify the variable
 * - Prefer array methods for transformations
 * - Always ensure loops will terminate!
 * 
 * Now try the practice problems!
 * Run: bun lessons/practice/04-loops-practice.ts
 */

console.log("\n✅ Lesson 4 Complete! Now try the practice problems.");
