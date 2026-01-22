/**
 * ============================================================
 * PRACTICE: Arrays
 * ============================================================
 * 
 * Instructions:
 * 1. Implement each function
 * 2. Run: bun lessons/practice/06-arrays-practice.ts
 * 3. Check if all tests pass!
 */

// ============================================================
// PROBLEM 1: Get First and Last
// ============================================================
/**
 * Return an array containing the first and last elements.
 * Return empty array if input is empty.
 */

function getFirstAndLast<T>(arr: T[]): T[] {
  // TODO: Implement
  return [];
}

// ============================================================
// PROBLEM 2: Double All Numbers
// ============================================================
/**
 * Double every number in the array using map.
 */

function doubleAll(numbers: number[]): number[] {
  // TODO: Use map
  return [];
}

// ============================================================
// PROBLEM 3: Filter Long Strings
// ============================================================
/**
 * Keep only strings that are longer than the given length.
 */

function filterLongStrings(strings: string[], minLength: number): string[] {
  // TODO: Use filter
  return [];
}

// ============================================================
// PROBLEM 4: Calculate Product
// ============================================================
/**
 * Calculate the product of all numbers using reduce.
 * Return 1 for empty array.
 */

function calculateProduct(numbers: number[]): number {
  // TODO: Use reduce
  return 0;
}

// ============================================================
// PROBLEM 5: Find Index
// ============================================================
/**
 * Find the index of the first number greater than the target.
 * Return -1 if not found.
 */

function findFirstGreater(numbers: number[], target: number): number {
  // TODO: Use findIndex
  return -1;
}

// ============================================================
// PROBLEM 6: Remove Duplicates
// ============================================================
/**
 * Return a new array with all duplicates removed.
 */

function removeDuplicates<T>(arr: T[]): T[] {
  // TODO: Remove duplicates
  return [];
}

// ============================================================
// PROBLEM 7: Flatten Nested Array
// ============================================================
/**
 * Flatten a 2D array into a 1D array.
 * [[1,2], [3,4], [5,6]] → [1,2,3,4,5,6]
 */

function flatten<T>(nested: T[][]): T[] {
  // TODO: Flatten the array
  return [];
}

// ============================================================
// PROBLEM 8: Chunk Array
// ============================================================
/**
 * Split an array into chunks of the specified size.
 * [1,2,3,4,5] with size 2 → [[1,2], [3,4], [5]]
 */

function chunkArray<T>(arr: T[], size: number): T[][] {
  // TODO: Split into chunks
  return [];
}

// ============================================================
// PROBLEM 9: Count Occurrences
// ============================================================
/**
 * Count how many times each element appears.
 * Return an object with element as key and count as value.
 */

function countOccurrences<T extends string | number>(arr: T[]): Record<T, number> {
  // TODO: Use reduce to count
  return {} as Record<T, number>;
}

// ============================================================
// PROBLEM 10: Rotate Array
// ============================================================
/**
 * Rotate array to the right by n positions.
 * [1,2,3,4,5] rotated by 2 → [4,5,1,2,3]
 */

function rotateRight<T>(arr: T[], positions: number): T[] {
  // TODO: Rotate the array
  return [];
}

// ============================================================
// PROBLEM 11: Interleave Arrays
// ============================================================
/**
 * Merge two arrays by alternating elements.
 * [1,2,3] + [a,b,c] → [1,a,2,b,3,c]
 * If arrays have different lengths, append remaining elements.
 */

function interleave<T>(arr1: T[], arr2: T[]): T[] {
  // TODO: Interleave the arrays
  return [];
}

// ============================================================
// PROBLEM 12: Group By Property
// ============================================================
/**
 * Group objects by a property value.
 * Input: [{name: "A", type: "x"}, {name: "B", type: "y"}, {name: "C", type: "x"}]
 * Property: "type"
 * Output: { x: [{name: "A"...}, {name: "C"...}], y: [{name: "B"...}] }
 */

function groupBy<T extends Record<string, any>>(
  arr: T[],
  property: keyof T
): Record<string, T[]> {
  // TODO: Group by property
  return {};
}

// ============================================================
// TEST YOUR ANSWERS
// ============================================================

console.log("========================================");
console.log("TESTING YOUR ANSWERS");
console.log("========================================\n");

// Problem 1
console.log("--- Problem 1: Get First and Last ---");
const fl1 = getFirstAndLast([1, 2, 3, 4, 5]);
const fl2 = getFirstAndLast([]);
if (JSON.stringify(fl1) === JSON.stringify([1, 5]) && JSON.stringify(fl2) === JSON.stringify([])) {
  console.log("✅ Problem 1 PASSED!\n");
} else {
  console.log(`❌ getFirstAndLast([1,2,3,4,5])=[${fl1}] (expected [1,5])\n`);
}

// Problem 2
console.log("--- Problem 2: Double All ---");
const d = doubleAll([1, 2, 3]);
if (JSON.stringify(d) === JSON.stringify([2, 4, 6])) {
  console.log("✅ Problem 2 PASSED!\n");
} else {
  console.log(`❌ doubleAll([1,2,3])=[${d}] (expected [2,4,6])\n`);
}

// Problem 3
console.log("--- Problem 3: Filter Long Strings ---");
const ls = filterLongStrings(["a", "ab", "abc", "abcd"], 2);
if (JSON.stringify(ls) === JSON.stringify(["abc", "abcd"])) {
  console.log("✅ Problem 3 PASSED!\n");
} else {
  console.log(`❌ filterLongStrings(["a","ab","abc","abcd"], 2)=[${ls}] (expected ["abc","abcd"])\n`);
}

// Problem 4
console.log("--- Problem 4: Calculate Product ---");
if (calculateProduct([2, 3, 4]) === 24 && calculateProduct([]) === 1) {
  console.log("✅ Problem 4 PASSED!\n");
} else {
  console.log(`❌ calculateProduct([2,3,4])=${calculateProduct([2, 3, 4])} (expected 24)\n`);
}

// Problem 5
console.log("--- Problem 5: Find Index ---");
if (findFirstGreater([1, 5, 10, 15], 8) === 2 && findFirstGreater([1, 2, 3], 10) === -1) {
  console.log("✅ Problem 5 PASSED!\n");
} else {
  console.log(`❌ findFirstGreater([1,5,10,15], 8)=${findFirstGreater([1, 5, 10, 15], 8)} (expected 2)\n`);
}

// Problem 6
console.log("--- Problem 6: Remove Duplicates ---");
const rd = removeDuplicates([1, 2, 2, 3, 3, 3]);
if (JSON.stringify(rd) === JSON.stringify([1, 2, 3])) {
  console.log("✅ Problem 6 PASSED!\n");
} else {
  console.log(`❌ removeDuplicates([1,2,2,3,3,3])=[${rd}] (expected [1,2,3])\n`);
}

// Problem 7
console.log("--- Problem 7: Flatten ---");
const f = flatten([[1, 2], [3, 4], [5, 6]]);
if (JSON.stringify(f) === JSON.stringify([1, 2, 3, 4, 5, 6])) {
  console.log("✅ Problem 7 PASSED!\n");
} else {
  console.log(`❌ flatten([[1,2],[3,4],[5,6]])=[${f}] (expected [1,2,3,4,5,6])\n`);
}

// Problem 8
console.log("--- Problem 8: Chunk Array ---");
const c = chunkArray([1, 2, 3, 4, 5], 2);
if (JSON.stringify(c) === JSON.stringify([[1, 2], [3, 4], [5]])) {
  console.log("✅ Problem 8 PASSED!\n");
} else {
  console.log(`❌ chunkArray([1,2,3,4,5], 2)=${JSON.stringify(c)} (expected [[1,2],[3,4],[5]])\n`);
}

// Problem 9
console.log("--- Problem 9: Count Occurrences ---");
const co = countOccurrences(["a", "b", "a", "c", "b", "a"]);
if (co["a"] === 3 && co["b"] === 2 && co["c"] === 1) {
  console.log("✅ Problem 9 PASSED!\n");
} else {
  console.log(`❌ countOccurrences result incorrect: ${JSON.stringify(co)}\n`);
}

// Problem 10
console.log("--- Problem 10: Rotate Array ---");
const r = rotateRight([1, 2, 3, 4, 5], 2);
if (JSON.stringify(r) === JSON.stringify([4, 5, 1, 2, 3])) {
  console.log("✅ Problem 10 PASSED!\n");
} else {
  console.log(`❌ rotateRight([1,2,3,4,5], 2)=[${r}] (expected [4,5,1,2,3])\n`);
}

// Problem 11
console.log("--- Problem 11: Interleave Arrays ---");
const i = interleave([1, 2, 3], ["a", "b", "c"]);
if (JSON.stringify(i) === JSON.stringify([1, "a", 2, "b", 3, "c"])) {
  console.log("✅ Problem 11 PASSED!\n");
} else {
  console.log(`❌ interleave([1,2,3], ["a","b","c"])=${JSON.stringify(i)}\n`);
}

// Problem 12
console.log("--- Problem 12: Group By ---");
const items = [
  { name: "A", type: "x" },
  { name: "B", type: "y" },
  { name: "C", type: "x" }
];
const g = groupBy(items, "type");
if (g["x"]?.length === 2 && g["y"]?.length === 1) {
  console.log("✅ Problem 12 PASSED!\n");
} else {
  console.log(`❌ groupBy result incorrect: ${JSON.stringify(g)}\n`);
}

console.log("========================================");
console.log("Practice complete!");
console.log("========================================");
