/**
 * ============================================================
 * PRACTICE: Classes
 * ============================================================
 * 
 * Instructions:
 * 1. Implement each class according to the requirements
 * 2. Run: bun lessons/practice/10-classes-practice.ts
 * 3. Check if all tests pass!
 */

// ============================================================
// PROBLEM 1: Basic Class
// ============================================================
/**
 * Create a Book class with:
 * - Properties: title, author, pages
 * - Method: getSummary() returns "Title by Author (X pages)"
 */

class Book {
  // TODO: Implement the class
  constructor(
    public title: string = "",
    public author: string = "",
    public pages: number = 0
  ) {}

  getSummary(): string {
    // TODO: Return formatted summary
    return "";
  }
}

// ============================================================
// PROBLEM 2: Private Properties
// ============================================================
/**
 * Create a Password class with:
 * - Private property: value (the password string)
 * - Getter: length (returns password length)
 * - Method: isStrong() returns true if length >= 8 and has a number
 * - Method: check(input) returns true if input matches password
 */

class Password {
  // TODO: Implement with private property

  constructor(password: string) {
    // TODO
  }

  get length(): number {
    // TODO
    return 0;
  }

  isStrong(): boolean {
    // TODO: Check length >= 8 and contains number
    return false;
  }

  check(input: string): boolean {
    // TODO: Compare with stored password
    return false;
  }
}

// ============================================================
// PROBLEM 3: Static Methods
// ============================================================
/**
 * Create a StringUtils class with static methods:
 * - reverse(str): Reverse a string
 * - capitalize(str): Capitalize first letter
 * - countVowels(str): Count vowels (a, e, i, o, u)
 */

class StringUtils {
  // TODO: Implement static methods

  static reverse(str: string): string {
    return "";
  }

  static capitalize(str: string): string {
    return "";
  }

  static countVowels(str: string): number {
    return 0;
  }
}

// ============================================================
// PROBLEM 4: Inheritance
// ============================================================
/**
 * Create a Vehicle base class and Car subclass:
 * 
 * Vehicle:
 * - Properties: brand, model, year
 * - Method: getInfo() returns "year brand model"
 * - Method: start() returns "Starting the vehicle"
 * 
 * Car extends Vehicle:
 * - Additional property: numDoors
 * - Override start() to return "Starting the car"
 * - Method: honk() returns "Beep beep!"
 */

class Vehicle {
  constructor(
    public brand: string = "",
    public model: string = "",
    public year: number = 0
  ) {}

  getInfo(): string {
    return "";
  }

  start(): string {
    return "";
  }
}

class Car extends Vehicle {
  constructor(
    brand: string,
    model: string,
    year: number,
    public numDoors: number = 4
  ) {
    super(brand, model, year);
  }

  // TODO: Override start and add honk method
}

// ============================================================
// PROBLEM 5: Abstract Class
// ============================================================
/**
 * Create an abstract Employee class and concrete Manager class:
 * 
 * Employee (abstract):
 * - Properties: name, baseSalary
 * - Abstract method: calculateBonus()
 * - Method: getTotalCompensation() returns baseSalary + bonus
 * 
 * Manager extends Employee:
 * - Additional property: teamSize
 * - calculateBonus() returns baseSalary * 0.1 * (teamSize / 5)
 */

abstract class Employee {
  constructor(
    public name: string,
    public baseSalary: number
  ) {}

  abstract calculateBonus(): number;

  getTotalCompensation(): number {
    // TODO
    return 0;
  }
}

class Manager extends Employee {
  constructor(
    name: string,
    baseSalary: number,
    public teamSize: number
  ) {
    super(name, baseSalary);
  }

  calculateBonus(): number {
    // TODO
    return 0;
  }
}

// ============================================================
// PROBLEM 6: Getters and Setters
// ============================================================
/**
 * Create a Circle class with:
 * - Private property: _radius
 * - Getter/setter: radius (setter validates radius > 0)
 * - Getter: area (computed from radius)
 * - Getter: circumference (computed from radius)
 */

class Circle {
  private _radius: number;

  constructor(radius: number) {
    this._radius = radius;
  }

  // TODO: Add getters and setters
}

// ============================================================
// PROBLEM 7: Generic Class
// ============================================================
/**
 * Create a Queue<T> class with:
 * - Private array: items
 * - Method: enqueue(item) adds to end
 * - Method: dequeue() removes and returns from front (or undefined)
 * - Method: peek() returns front without removing
 * - Method: isEmpty() returns boolean
 * - Getter: size
 */

class Queue<T> {
  private items: T[] = [];

  // TODO: Implement queue methods
}

// ============================================================
// PROBLEM 8: Interface Implementation
// ============================================================
/**
 * Define a Playable interface and implement it in a Song class:
 * 
 * Playable interface:
 * - play(): void
 * - pause(): void
 * - stop(): void
 * - isPlaying: boolean (readonly getter)
 * 
 * Song class:
 * - Properties: title, artist, duration (seconds)
 * - Track playing state internally
 */

interface Playable {
  play(): void;
  pause(): void;
  stop(): void;
  readonly isPlaying: boolean;
}

class Song implements Playable {
  private _isPlaying: boolean = false;

  constructor(
    public title: string,
    public artist: string,
    public duration: number
  ) {}

  // TODO: Implement Playable interface

  get isPlaying(): boolean {
    return false;
  }

  play(): void {}
  pause(): void {}
  stop(): void {}
}

// ============================================================
// PROBLEM 9: Method Chaining
// ============================================================
/**
 * Create a Calculator class that supports method chaining:
 * - Property: result (starts at 0)
 * - Methods: add, subtract, multiply, divide (all return this)
 * - Method: reset() sets result to 0 and returns this
 * - Method: getResult() returns the current result
 */

class Calculator {
  private result: number = 0;

  // TODO: Implement chainable methods
}

// ============================================================
// PROBLEM 10: Singleton Pattern
// ============================================================
/**
 * Create a Logger singleton class:
 * - Private constructor
 * - Static getInstance() method
 * - Private logs array
 * - Method: log(message) adds to logs
 * - Method: getLogs() returns all logs
 * - Method: clear() clears logs
 */

class Logger {
  private static instance: Logger;
  private logs: string[] = [];

  private constructor() {}

  // TODO: Implement singleton pattern
}

// ============================================================
// TEST YOUR ANSWERS
// ============================================================

console.log("========================================");
console.log("TESTING YOUR ANSWERS");
console.log("========================================\n");

// Problem 1
console.log("--- Problem 1: Basic Class ---");
const book = new Book("TypeScript Handbook", "Microsoft", 250);
if (book.getSummary() === "TypeScript Handbook by Microsoft (250 pages)") {
  console.log("✅ Problem 1 PASSED!\n");
} else {
  console.log(`❌ Summary: ${book.getSummary()}\n`);
}

// Problem 2
console.log("--- Problem 2: Private Properties ---");
const pass = new Password("secret123");
if (pass.length === 9 && pass.isStrong() && pass.check("secret123") && !pass.check("wrong")) {
  console.log("✅ Problem 2 PASSED!\n");
} else {
  console.log(`❌ Password tests failed\n`);
}

// Problem 3
console.log("--- Problem 3: Static Methods ---");
if (StringUtils.reverse("hello") === "olleh" &&
    StringUtils.capitalize("hello") === "Hello" &&
    StringUtils.countVowels("hello world") === 3) {
  console.log("✅ Problem 3 PASSED!\n");
} else {
  console.log(`❌ StringUtils tests failed\n`);
}

// Problem 4
console.log("--- Problem 4: Inheritance ---");
const car = new Car("Toyota", "Camry", 2023, 4);
if (car.getInfo().includes("Toyota") && 
    car.start() === "Starting the car" &&
    (car as any).honk?.() === "Beep beep!") {
  console.log("✅ Problem 4 PASSED!\n");
} else {
  console.log(`❌ Car tests failed\n`);
}

// Problem 5
console.log("--- Problem 5: Abstract Class ---");
const manager = new Manager("Alice", 100000, 10);
const expectedBonus = 100000 * 0.1 * (10 / 5);  // 20000
if (manager.calculateBonus() === expectedBonus &&
    manager.getTotalCompensation() === 100000 + expectedBonus) {
  console.log("✅ Problem 5 PASSED!\n");
} else {
  console.log(`❌ Manager bonus: ${manager.calculateBonus()}, expected: ${expectedBonus}\n`);
}

// Problem 6
console.log("--- Problem 6: Getters and Setters ---");
const circle = new Circle(5);
const expectedArea = Math.PI * 25;
if (Math.abs((circle as any).area - expectedArea) < 0.01) {
  console.log("✅ Problem 6 PASSED!\n");
} else {
  console.log(`❌ Circle area: ${(circle as any).area}, expected: ${expectedArea}\n`);
}

// Problem 7
console.log("--- Problem 7: Generic Class ---");
const queue = new Queue<number>();
queue.enqueue(1);
queue.enqueue(2);
queue.enqueue(3);
if (queue.peek() === 1 && queue.dequeue() === 1 && !queue.isEmpty()) {
  console.log("✅ Problem 7 PASSED!\n");
} else {
  console.log(`❌ Queue tests failed\n`);
}

// Problem 8
console.log("--- Problem 8: Interface Implementation ---");
const song = new Song("Test Song", "Artist", 180);
song.play();
if (song.isPlaying) {
  song.stop();
  if (!song.isPlaying) {
    console.log("✅ Problem 8 PASSED!\n");
  } else {
    console.log(`❌ Song should not be playing after stop\n`);
  }
} else {
  console.log(`❌ Song should be playing after play()\n`);
}

// Problem 9
console.log("--- Problem 9: Method Chaining ---");
const calc = new Calculator();
const result = calc.add(10).multiply(2).subtract(5).divide(3).getResult();
if (Math.abs(result - 5) < 0.01) {
  console.log("✅ Problem 9 PASSED!\n");
} else {
  console.log(`❌ Calculator result: ${result}, expected: 5\n`);
}

// Problem 10
console.log("--- Problem 10: Singleton Pattern ---");
const logger1 = Logger.getInstance();
const logger2 = Logger.getInstance();
logger1.log("Test message");
if (logger1 === logger2 && logger2.getLogs().length === 1) {
  console.log("✅ Problem 10 PASSED!\n");
} else {
  console.log(`❌ Singleton pattern failed\n`);
}

console.log("========================================");
console.log("Practice complete!");
console.log("========================================");
