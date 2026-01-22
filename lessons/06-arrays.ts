/**
 * ============================================================
 * LESSON 6: Arrays
 * ============================================================
 * 
 * Arrays are like a train with numbered cars - each car (element)
 * has a position (index), and you can add, remove, or rearrange cars.
 * 
 * Think of arrays as:
 * - A shopping list (items in order)
 * - A playlist (songs in sequence)
 * - A row of lockers (numbered storage)
 * 
 * Key concept: Arrays are ZERO-INDEXED!
 * First element is at index 0, second at index 1, etc.
 */

// ============================================================
// SECTION 1: Creating Arrays
// ============================================================

console.log("========================================");
console.log("CREATING ARRAYS");
console.log("========================================\n");

// Array literal (most common)
const fruits: string[] = ["apple", "banana", "orange"];
console.log("Fruits:", fruits);

// Empty array with type annotation
const numbers: number[] = [];
console.log("Empty array:", numbers);

// Array with mixed types (usually avoid this)
const mixed: (string | number)[] = ["hello", 42, "world", 100];
console.log("Mixed array:", mixed);

// Using Array constructor (less common)
const zeros: number[] = new Array(5).fill(0);
console.log("Filled with zeros:", zeros);

// Array.from - create array from iterable
const range = Array.from({ length: 5 }, (_, i) => i + 1);
console.log("Range 1-5:", range);

// Generic array syntax
const names: Array<string> = ["Alice", "Bob", "Charlie"];
console.log("Names:", names);

// ============================================================
// SECTION 2: Accessing Elements
// ============================================================

console.log("\n========================================");
console.log("ACCESSING ELEMENTS");
console.log("========================================\n");

const colors: string[] = ["red", "green", "blue", "yellow"];

// By index (0-based!)
console.log("First color (index 0):", colors[0]);
console.log("Third color (index 2):", colors[2]);

// Last element
console.log("Last color:", colors[colors.length - 1]);

// Using .at() method (supports negative indices!)
console.log("Using .at(-1):", colors.at(-1));  // Last element
console.log("Using .at(-2):", colors.at(-2));  // Second to last

// Accessing out of bounds returns undefined
console.log("Index 100:", colors[100]);  // undefined

// ============================================================
// SECTION 3: Modifying Arrays
// ============================================================

console.log("\n========================================");
console.log("MODIFYING ARRAYS");
console.log("========================================\n");

const items: string[] = ["a", "b", "c"];
console.log("Original:", items);

// Change an element
items[1] = "B";
console.log("After items[1] = 'B':", items);

// push - Add to end
items.push("d");
console.log("After push('d'):", items);

// pop - Remove from end
const popped = items.pop();
console.log(`After pop(): ${items} (removed: ${popped})`);

// unshift - Add to beginning
items.unshift("start");
console.log("After unshift('start'):", items);

// shift - Remove from beginning
const shifted = items.shift();
console.log(`After shift(): ${items} (removed: ${shifted})`);

// splice - Add/remove at specific position
// splice(startIndex, deleteCount, ...itemsToAdd)
const letters: string[] = ["a", "b", "c", "d", "e"];
console.log("\nOriginal letters:", letters);

letters.splice(2, 1);  // Remove 1 element at index 2
console.log("After splice(2, 1):", letters);

letters.splice(2, 0, "X", "Y");  // Insert at index 2
console.log("After splice(2, 0, 'X', 'Y'):", letters);

// ============================================================
// SECTION 4: Array Length
// ============================================================

console.log("\n========================================");
console.log("ARRAY LENGTH");
console.log("========================================\n");

const data: number[] = [10, 20, 30, 40, 50];

console.log("Array:", data);
console.log("Length:", data.length);

// Truncate by setting length
data.length = 3;
console.log("After length = 3:", data);

// Check if empty
const emptyArr: number[] = [];
console.log("Is empty?", emptyArr.length === 0);

// ============================================================
// SECTION 5: Searching Arrays
// ============================================================

console.log("\n========================================");
console.log("SEARCHING ARRAYS");
console.log("========================================\n");

const scores: number[] = [85, 90, 78, 92, 88, 90];
console.log("Scores:", scores);

// indexOf - Find first occurrence
console.log("indexOf(90):", scores.indexOf(90));  // 1
console.log("indexOf(100):", scores.indexOf(100));  // -1 (not found)

// lastIndexOf - Find last occurrence
console.log("lastIndexOf(90):", scores.lastIndexOf(90));  // 5

// includes - Check if exists
console.log("includes(92):", scores.includes(92));  // true
console.log("includes(50):", scores.includes(50));  // false

// find - Find first element matching condition
const firstHigh = scores.find(s => s >= 90);
console.log("First score >= 90:", firstHigh);

// findIndex - Find index of first match
const firstHighIndex = scores.findIndex(s => s >= 90);
console.log("Index of first score >= 90:", firstHighIndex);

// some - At least one matches?
const hasLowScore = scores.some(s => s < 80);
console.log("Has score < 80?", hasLowScore);

// every - All match?
const allPassing = scores.every(s => s >= 70);
console.log("All scores >= 70?", allPassing);

// ============================================================
// SECTION 6: Transforming Arrays
// ============================================================

console.log("\n========================================");
console.log("TRANSFORMING ARRAYS");
console.log("========================================\n");

const nums: number[] = [1, 2, 3, 4, 5];
console.log("Original:", nums);

// map - Transform each element
const doubled = nums.map(n => n * 2);
console.log("Doubled:", doubled);

// filter - Keep elements matching condition
const evens = nums.filter(n => n % 2 === 0);
console.log("Evens only:", evens);

// reduce - Combine into single value
const sum = nums.reduce((acc, n) => acc + n, 0);
console.log("Sum:", sum);

// Chaining transformations
const result = nums
  .filter(n => n > 2)     // [3, 4, 5]
  .map(n => n * 10)       // [30, 40, 50]
  .reduce((a, b) => a + b, 0);  // 120
console.log("Filter > 2, multiply by 10, sum:", result);

// ============================================================
// SECTION 7: Sorting and Reversing
// ============================================================

console.log("\n========================================");
console.log("SORTING AND REVERSING");
console.log("========================================\n");

// sort - Sorts IN PLACE (modifies original!)
const unsorted = [3, 1, 4, 1, 5, 9, 2, 6];
console.log("Before sort:", [...unsorted]);
unsorted.sort((a, b) => a - b);  // Numeric ascending
console.log("After sort:", unsorted);

// Descending order
unsorted.sort((a, b) => b - a);
console.log("Descending:", unsorted);

// Sort strings
const words = ["banana", "Apple", "cherry"];
words.sort();  // Case-sensitive (uppercase first)
console.log("Sorted strings:", words);

words.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
console.log("Case-insensitive:", words);

// reverse - Reverses IN PLACE
const forward = [1, 2, 3, 4, 5];
console.log("Before reverse:", [...forward]);
forward.reverse();
console.log("After reverse:", forward);

// Non-mutating alternatives
const original = [3, 1, 2];
const sortedCopy = [...original].sort((a, b) => a - b);
console.log("Original unchanged:", original);
console.log("Sorted copy:", sortedCopy);

// ============================================================
// SECTION 8: Combining Arrays
// ============================================================

console.log("\n========================================");
console.log("COMBINING ARRAYS");
console.log("========================================\n");

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// concat - Create new combined array
const combined = arr1.concat(arr2);
console.log("concat:", combined);

// Spread operator (preferred modern way)
const spread = [...arr1, ...arr2];
console.log("spread:", spread);

// With additional elements
const withMiddle = [...arr1, "middle", ...arr2];
console.log("With middle:", withMiddle);

// join - Convert to string
const parts = ["Hello", "World", "!"];
console.log("join(' '):", parts.join(" "));
console.log("join('-'):", parts.join("-"));

// ============================================================
// SECTION 9: Extracting Parts (Slicing)
// ============================================================

console.log("\n========================================");
console.log("SLICING ARRAYS");
console.log("========================================\n");

const alphabet = ["a", "b", "c", "d", "e", "f"];
console.log("Original:", alphabet);

// slice(start, end) - Creates a new array
// start is inclusive, end is exclusive
console.log("slice(1, 4):", alphabet.slice(1, 4));  // ['b', 'c', 'd']
console.log("slice(2):", alphabet.slice(2));  // ['c', 'd', 'e', 'f']
console.log("slice(-2):", alphabet.slice(-2));  // ['e', 'f']

// Original unchanged
console.log("Original after slice:", alphabet);

// ============================================================
// SECTION 10: Flattening Arrays
// ============================================================

console.log("\n========================================");
console.log("FLATTENING ARRAYS");
console.log("========================================\n");

const nested = [[1, 2], [3, 4], [5, 6]];
console.log("Nested:", nested);

// flat - Flatten by depth
const flat1 = nested.flat();
console.log("Flattened:", flat1);

const deepNested = [1, [2, [3, [4, [5]]]]];
console.log("Deep nested:", deepNested);
console.log("flat(1):", deepNested.flat(1));
console.log("flat(2):", deepNested.flat(2));
console.log("flat(Infinity):", deepNested.flat(Infinity));

// flatMap - Map then flatten
const sentences = ["Hello World", "TypeScript Rocks"];
const allWords = sentences.flatMap(s => s.split(" "));
console.log("flatMap split:", allWords);

// ============================================================
// SECTION 11: TypeScript Array Types
// ============================================================

console.log("\n========================================");
console.log("TYPESCRIPT ARRAY TYPES");
console.log("========================================\n");

// Type annotation
const stringArray: string[] = ["a", "b", "c"];
const numberArray: number[] = [1, 2, 3];

// Generic syntax
const genericArray: Array<boolean> = [true, false, true];

// Tuple - Fixed length, specific types at each position
const tuple: [string, number, boolean] = ["Alice", 30, true];
console.log("Tuple:", tuple);
console.log("Tuple[0] (string):", tuple[0]);
console.log("Tuple[1] (number):", tuple[1]);

// Readonly arrays
const readonlyNums: readonly number[] = [1, 2, 3];
// readonlyNums.push(4);  // Error! Cannot modify

// Type inference with const assertion
const literalArray = ["a", "b", "c"] as const;
// literalArray is now readonly ["a", "b", "c"]

// ============================================================
// SECTION 12: Common Array Patterns
// ============================================================

console.log("\n========================================");
console.log("COMMON PATTERNS");
console.log("========================================\n");

// Remove duplicates
const withDupes = [1, 2, 2, 3, 3, 3, 4];
const unique = [...new Set(withDupes)];
console.log("Unique:", unique);

// Group by property
interface Person { name: string; age: number; }
const people: Person[] = [
  { name: "Alice", age: 30 },
  { name: "Bob", age: 25 },
  { name: "Charlie", age: 30 }
];

const groupedByAge = people.reduce((groups, person) => {
  const key = person.age;
  if (!groups[key]) groups[key] = [];
  groups[key].push(person);
  return groups;
}, {} as Record<number, Person[]>);

console.log("Grouped by age:", groupedByAge);

// Partition into two arrays
const numbers2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const [evenNums, oddNums] = numbers2.reduce(
  ([evens, odds], num) => {
    (num % 2 === 0 ? evens : odds).push(num);
    return [evens, odds];
  },
  [[], []] as [number[], number[]]
);
console.log("Evens:", evenNums);
console.log("Odds:", oddNums);

// ============================================================
// KEY TAKEAWAYS
// ============================================================

/**
 * Creating:
 * - Literal: const arr = [1, 2, 3]
 * - With type: const arr: number[] = []
 * 
 * Accessing:
 * - By index: arr[0]
 * - Last: arr[arr.length - 1] or arr.at(-1)
 * 
 * Modifying:
 * - push/pop: End operations
 * - shift/unshift: Beginning operations
 * - splice: Any position
 * 
 * Searching:
 * - indexOf, includes, find, findIndex, some, every
 * 
 * Transforming:
 * - map: Transform each element
 * - filter: Keep matching elements
 * - reduce: Combine into single value
 * 
 * Mutating vs Non-mutating:
 * - Mutating: push, pop, sort, reverse, splice
 * - Non-mutating: map, filter, slice, concat
 * - Use spread [...arr] to copy before mutating
 * 
 * Now try the practice problems!
 * Run: bun lessons/practice/06-arrays-practice.ts
 */

console.log("\n✅ Lesson 6 Complete! Now try the practice problems.");
