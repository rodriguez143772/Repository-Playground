/**
 * ============================================================
 * PROJECT: Generic Data Structures
 * Required Knowledge: Lessons 1-11 (+ Generics)
 * ============================================================
 * 
 * Build classic data structures using generics:
 * - Stack (LIFO)
 * - Queue (FIFO)
 * - LinkedList
 * - Binary Search Tree
 * 
 * This project practices:
 * - Generic classes
 * - Generic constraints
 * - Generic methods
 * - Type parameters
 * - Iterator patterns
 */

// ============================================================
// TODO: Stack (Last In, First Out)
// ============================================================

/**
 * A generic Stack data structure.
 * 
 * Methods:
 * - push(item): Add item to top
 * - pop(): Remove and return top item
 * - peek(): Return top item without removing
 * - isEmpty(): Check if empty
 * - size: Number of items
 * - clear(): Remove all items
 * - toArray(): Convert to array
 */
class Stack<T> {
  private items: T[] = [];
  
  push(item: T): void {
    // TODO: Add to top
  }
  
  pop(): T | undefined {
    // TODO: Remove and return from top
    return undefined;
  }
  
  peek(): T | undefined {
    // TODO: Return top without removing
    return undefined;
  }
  
  isEmpty(): boolean {
    // TODO: Check if empty
    return true;
  }
  
  get size(): number {
    // TODO: Return size
    return 0;
  }
  
  clear(): void {
    // TODO: Remove all items
  }
  
  toArray(): T[] {
    // TODO: Return copy as array (top to bottom)
    return [];
  }
}

// ============================================================
// TODO: Queue (First In, First Out)
// ============================================================

/**
 * A generic Queue data structure.
 * 
 * Methods:
 * - enqueue(item): Add item to back
 * - dequeue(): Remove and return front item
 * - front(): Return front item without removing
 * - isEmpty(): Check if empty
 * - size: Number of items
 * - clear(): Remove all items
 * - toArray(): Convert to array
 */
class Queue<T> {
  private items: T[] = [];
  
  enqueue(item: T): void {
    // TODO: Add to back
  }
  
  dequeue(): T | undefined {
    // TODO: Remove and return from front
    return undefined;
  }
  
  front(): T | undefined {
    // TODO: Return front without removing
    return undefined;
  }
  
  isEmpty(): boolean {
    // TODO: Check if empty
    return true;
  }
  
  get size(): number {
    // TODO: Return size
    return 0;
  }
  
  clear(): void {
    // TODO: Remove all items
  }
  
  toArray(): T[] {
    // TODO: Return copy as array (front to back)
    return [];
  }
}

// ============================================================
// TODO: LinkedList Node
// ============================================================

class ListNode<T> {
  public next: ListNode<T> | null = null;
  
  constructor(public value: T) {}
}

// ============================================================
// TODO: LinkedList
// ============================================================

/**
 * A generic singly LinkedList.
 * 
 * Methods:
 * - append(value): Add to end
 * - prepend(value): Add to beginning
 * - insertAt(index, value): Insert at position
 * - removeAt(index): Remove at position
 * - get(index): Get value at position
 * - find(predicate): Find first matching node
 * - indexOf(value): Find index of value
 * - contains(value): Check if value exists
 * - size: Number of nodes
 * - isEmpty(): Check if empty
 * - toArray(): Convert to array
 */
class LinkedList<T> {
  private head: ListNode<T> | null = null;
  private tail: ListNode<T> | null = null;
  private _size: number = 0;
  
  append(value: T): void {
    // TODO: Add to end
  }
  
  prepend(value: T): void {
    // TODO: Add to beginning
  }
  
  insertAt(index: number, value: T): boolean {
    // TODO: Insert at index, return success
    return false;
  }
  
  removeAt(index: number): T | undefined {
    // TODO: Remove at index, return removed value
    return undefined;
  }
  
  get(index: number): T | undefined {
    // TODO: Get value at index
    return undefined;
  }
  
  find(predicate: (value: T) => boolean): T | undefined {
    // TODO: Find first matching value
    return undefined;
  }
  
  indexOf(value: T): number {
    // TODO: Find index of value, -1 if not found
    return -1;
  }
  
  contains(value: T): boolean {
    // TODO: Check if value exists
    return false;
  }
  
  get size(): number {
    return this._size;
  }
  
  isEmpty(): boolean {
    return this._size === 0;
  }
  
  toArray(): T[] {
    // TODO: Convert to array
    return [];
  }
  
  // Bonus: Make it iterable
  *[Symbol.iterator](): Iterator<T> {
    let current = this.head;
    while (current) {
      yield current.value;
      current = current.next;
    }
  }
}

// ============================================================
// TODO: Binary Search Tree Node
// ============================================================

class TreeNode<T> {
  public left: TreeNode<T> | null = null;
  public right: TreeNode<T> | null = null;
  
  constructor(public value: T) {}
}

// ============================================================
// TODO: Binary Search Tree
// ============================================================

/**
 * A generic Binary Search Tree.
 * Requires T to be comparable.
 * 
 * Methods:
 * - insert(value): Add value
 * - contains(value): Check if exists
 * - remove(value): Remove value
 * - min(): Find minimum value
 * - max(): Find maximum value
 * - inOrder(): Return sorted array
 * - preOrder(): Return pre-order array
 * - postOrder(): Return post-order array
 * - height(): Get tree height
 * - size: Number of nodes
 */
class BinarySearchTree<T> {
  private root: TreeNode<T> | null = null;
  private _size: number = 0;
  private compare: (a: T, b: T) => number;
  
  constructor(compareFn?: (a: T, b: T) => number) {
    // Default comparison for numbers/strings
    this.compare = compareFn || ((a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    });
  }
  
  insert(value: T): void {
    // TODO: Insert value in correct position
  }
  
  contains(value: T): boolean {
    // TODO: Check if value exists
    return false;
  }
  
  remove(value: T): boolean {
    // TODO: Remove value, return success
    return false;
  }
  
  min(): T | undefined {
    // TODO: Find minimum (leftmost) value
    return undefined;
  }
  
  max(): T | undefined {
    // TODO: Find maximum (rightmost) value
    return undefined;
  }
  
  inOrder(): T[] {
    // TODO: Return values in sorted order (left, root, right)
    return [];
  }
  
  preOrder(): T[] {
    // TODO: Return values in pre-order (root, left, right)
    return [];
  }
  
  postOrder(): T[] {
    // TODO: Return values in post-order (left, right, root)
    return [];
  }
  
  height(): number {
    // TODO: Return tree height
    return 0;
  }
  
  get size(): number {
    return this._size;
  }
  
  isEmpty(): boolean {
    return this._size === 0;
  }
}

// ============================================================
// TODO: Priority Queue (Bonus)
// ============================================================

/**
 * A generic Priority Queue using a min-heap.
 * Items with lower priority values are dequeued first.
 */
class PriorityQueue<T> {
  private items: { value: T; priority: number }[] = [];
  
  enqueue(value: T, priority: number): void {
    // TODO: Add with priority, maintain heap property
  }
  
  dequeue(): T | undefined {
    // TODO: Remove and return highest priority (lowest number)
    return undefined;
  }
  
  peek(): T | undefined {
    // TODO: Return highest priority item without removing
    return undefined;
  }
  
  isEmpty(): boolean {
    return this.items.length === 0;
  }
  
  get size(): number {
    return this.items.length;
  }
}

// ============================================================
// DEMO AND DISPLAY
// ============================================================

console.log("========================================");
console.log("GENERIC DATA STRUCTURES");
console.log("========================================\n");

// Stack demo
console.log("--- Stack (LIFO) ---");
const stack = new Stack<number>();
stack.push(1);
stack.push(2);
stack.push(3);
console.log(`Stack: [${stack.toArray().join(", ")}]`);
console.log(`Pop: ${stack.pop()}`);
console.log(`Peek: ${stack.peek()}`);

// Queue demo
console.log("\n--- Queue (FIFO) ---");
const queue = new Queue<string>();
queue.enqueue("first");
queue.enqueue("second");
queue.enqueue("third");
console.log(`Queue: [${queue.toArray().join(", ")}]`);
console.log(`Dequeue: ${queue.dequeue()}`);
console.log(`Front: ${queue.front()}`);

// LinkedList demo
console.log("\n--- LinkedList ---");
const list = new LinkedList<number>();
list.append(1);
list.append(2);
list.append(3);
list.prepend(0);
console.log(`List: [${list.toArray().join(", ")}]`);
console.log(`Get(2): ${list.get(2)}`);
console.log(`Contains(2): ${list.contains(2)}`);

// BST demo
console.log("\n--- Binary Search Tree ---");
const bst = new BinarySearchTree<number>();
[5, 3, 7, 1, 4, 6, 8].forEach(n => bst.insert(n));
console.log(`In-order: [${bst.inOrder().join(", ")}]`);
console.log(`Min: ${bst.min()}, Max: ${bst.max()}`);
console.log(`Height: ${bst.height()}`);

// Priority Queue demo
console.log("\n--- Priority Queue ---");
const pq = new PriorityQueue<string>();
pq.enqueue("Low priority task", 10);
pq.enqueue("High priority task", 1);
pq.enqueue("Medium priority task", 5);
console.log(`Dequeue: ${pq.dequeue()}`);  // Should be high priority

// ============================================================
// TESTS
// ============================================================

console.log("\n========================================");
console.log("TESTING YOUR SOLUTION");
console.log("========================================\n");

let passed = 0;
let failed = 0;

// Stack tests
const testStack = new Stack<number>();
testStack.push(1);
testStack.push(2);
testStack.push(3);
if (testStack.pop() === 3 && testStack.peek() === 2 && testStack.size === 2) {
  console.log("✅ Stack operations work");
  passed++;
} else {
  console.log("❌ Stack operations failed");
  failed++;
}

// Queue tests
const testQueue = new Queue<number>();
testQueue.enqueue(1);
testQueue.enqueue(2);
testQueue.enqueue(3);
if (testQueue.dequeue() === 1 && testQueue.front() === 2 && testQueue.size === 2) {
  console.log("✅ Queue operations work");
  passed++;
} else {
  console.log("❌ Queue operations failed");
  failed++;
}

// LinkedList tests
const testList = new LinkedList<number>();
testList.append(1);
testList.append(2);
testList.append(3);
testList.prepend(0);
if (testList.size === 4 && testList.get(0) === 0 && testList.get(3) === 3) {
  console.log("✅ LinkedList append/prepend work");
  passed++;
} else {
  console.log("❌ LinkedList append/prepend failed");
  failed++;
}

if (testList.contains(2) && testList.indexOf(2) === 2 && !testList.contains(99)) {
  console.log("✅ LinkedList search works");
  passed++;
} else {
  console.log("❌ LinkedList search failed");
  failed++;
}

const testListArr = testList.toArray();
if (JSON.stringify(testListArr) === "[0,1,2,3]") {
  console.log("✅ LinkedList toArray works");
  passed++;
} else {
  console.log(`❌ LinkedList toArray: [${testListArr}]`);
  failed++;
}

// BST tests
const testBst = new BinarySearchTree<number>();
[5, 3, 7, 1, 9].forEach(n => testBst.insert(n));
if (testBst.contains(3) && !testBst.contains(99)) {
  console.log("✅ BST contains works");
  passed++;
} else {
  console.log("❌ BST contains failed");
  failed++;
}

if (testBst.min() === 1 && testBst.max() === 9) {
  console.log("✅ BST min/max work");
  passed++;
} else {
  console.log("❌ BST min/max failed");
  failed++;
}

const inOrderResult = testBst.inOrder();
if (JSON.stringify(inOrderResult) === "[1,3,5,7,9]") {
  console.log("✅ BST inOrder traversal works");
  passed++;
} else {
  console.log(`❌ BST inOrder: [${inOrderResult}]`);
  failed++;
}

// Priority Queue tests
const testPq = new PriorityQueue<string>();
testPq.enqueue("low", 10);
testPq.enqueue("high", 1);
testPq.enqueue("medium", 5);
if (testPq.dequeue() === "high") {
  console.log("✅ PriorityQueue works");
  passed++;
} else {
  console.log("❌ PriorityQueue failed");
  failed++;
}

console.log(`\n${passed}/${passed + failed} tests passed`);
if (failed === 0) {
  console.log("\n🎉 Project complete! You've mastered data structures!");
}
