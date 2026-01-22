/**
 * ============================================================
 * LESSON 10: Classes
 * ============================================================
 * 
 * Classes are blueprints for creating objects. If an interface
 * describes what an object should look like, a class describes
 * what an object should look like AND how it behaves.
 * 
 * Think of classes as:
 * - A cookie cutter (makes many cookies of the same shape)
 * - A car factory (produces many cars of the same model)
 * - A template (filled in to create instances)
 * 
 * TypeScript adds powerful features on top of JavaScript classes:
 * visibility modifiers, abstract classes, and type checking!
 */

// ============================================================
// SECTION 1: Basic Class
// ============================================================

console.log("========================================");
console.log("BASIC CLASS");
console.log("========================================\n");

class Person {
  // Properties
  name: string;
  age: number;

  // Constructor - called when creating new instance
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  // Methods
  greet(): string {
    return `Hello, I'm ${this.name}!`;
  }

  haveBirthday(): void {
    this.age++;
    console.log(`Happy birthday! ${this.name} is now ${this.age}`);
  }
}

// Create instances
const alice = new Person("Alice", 30);
const bob = new Person("Bob", 25);

console.log(alice.greet());
console.log(`${bob.name} is ${bob.age} years old`);
bob.haveBirthday();

// ============================================================
// SECTION 2: Constructor Shorthand
// ============================================================

console.log("\n========================================");
console.log("CONSTRUCTOR SHORTHAND");
console.log("========================================\n");

// TypeScript shorthand: declare and assign in constructor
class Product {
  constructor(
    public name: string,
    public price: number,
    public inStock: boolean = true  // Default value
  ) {}

  getInfo(): string {
    return `${this.name}: $${this.price} (${this.inStock ? "Available" : "Out of stock"})`;
  }
}

const laptop = new Product("Laptop", 999);
const phone = new Product("Phone", 699, false);

console.log(laptop.getInfo());
console.log(phone.getInfo());

// ============================================================
// SECTION 3: Access Modifiers
// ============================================================

console.log("\n========================================");
console.log("ACCESS MODIFIERS");
console.log("========================================\n");

/**
 * TypeScript has three access modifiers:
 * - public: Accessible anywhere (default)
 * - private: Only accessible within the class
 * - protected: Accessible within class and subclasses
 */

class BankAccount {
  public accountNumber: string;      // Anyone can access
  private balance: number;           // Only class can access
  protected accountType: string;     // Class and subclasses

  constructor(accountNumber: string, initialBalance: number) {
    this.accountNumber = accountNumber;
    this.balance = initialBalance;
    this.accountType = "Standard";
  }

  // Public method to access private data
  public getBalance(): number {
    return this.balance;
  }

  public deposit(amount: number): void {
    if (amount > 0) {
      this.balance += amount;
      console.log(`Deposited $${amount}. New balance: $${this.balance}`);
    }
  }

  public withdraw(amount: number): boolean {
    if (amount <= this.balance) {
      this.balance -= amount;
      console.log(`Withdrew $${amount}. New balance: $${this.balance}`);
      return true;
    }
    console.log("Insufficient funds!");
    return false;
  }
}

const account = new BankAccount("12345", 1000);
console.log("Account:", account.accountNumber);
console.log("Balance:", account.getBalance());
// console.log(account.balance);  // Error! private

account.deposit(500);
account.withdraw(200);

// ============================================================
// SECTION 4: Getters and Setters
// ============================================================

console.log("\n========================================");
console.log("GETTERS AND SETTERS");
console.log("========================================\n");

class Temperature {
  private _celsius: number;

  constructor(celsius: number) {
    this._celsius = celsius;
  }

  // Getter - accessed like a property
  get celsius(): number {
    return this._celsius;
  }

  // Setter - validates before setting
  set celsius(value: number) {
    if (value < -273.15) {
      throw new Error("Temperature below absolute zero!");
    }
    this._celsius = value;
  }

  // Computed getter
  get fahrenheit(): number {
    return (this._celsius * 9/5) + 32;
  }

  set fahrenheit(value: number) {
    this._celsius = (value - 32) * 5/9;
  }

  get kelvin(): number {
    return this._celsius + 273.15;
  }
}

const temp = new Temperature(25);
console.log(`${temp.celsius}°C = ${temp.fahrenheit}°F = ${temp.kelvin}K`);

temp.fahrenheit = 100;
console.log(`100°F = ${temp.celsius.toFixed(1)}°C`);

// ============================================================
// SECTION 5: Inheritance
// ============================================================

console.log("\n========================================");
console.log("INHERITANCE");
console.log("========================================\n");

// Base class
class Animal {
  constructor(
    public name: string,
    protected age: number
  ) {}

  speak(): string {
    return "Some sound";
  }

  getInfo(): string {
    return `${this.name}, ${this.age} years old`;
  }
}

// Derived class
class Dog extends Animal {
  constructor(
    name: string,
    age: number,
    public breed: string
  ) {
    super(name, age);  // Call parent constructor
  }

  // Override parent method
  speak(): string {
    return "Woof!";
  }

  // New method
  fetch(): string {
    return `${this.name} fetches the ball!`;
  }
}

class Cat extends Animal {
  constructor(
    name: string,
    age: number,
    public indoor: boolean
  ) {
    super(name, age);
  }

  speak(): string {
    return "Meow!";
  }

  purr(): string {
    return `${this.name} purrs contentedly`;
  }
}

const dog = new Dog("Buddy", 3, "Labrador");
const cat = new Cat("Whiskers", 5, true);

console.log(dog.getInfo());
console.log(`${dog.name} says: ${dog.speak()}`);
console.log(dog.fetch());

console.log(cat.getInfo());
console.log(`${cat.name} says: ${cat.speak()}`);
console.log(cat.purr());

// ============================================================
// SECTION 6: Abstract Classes
// ============================================================

console.log("\n========================================");
console.log("ABSTRACT CLASSES");
console.log("========================================\n");

// Abstract class - cannot be instantiated directly
abstract class Shape {
  constructor(public color: string) {}

  // Abstract method - must be implemented by subclasses
  abstract getArea(): number;
  abstract getPerimeter(): number;

  // Regular method - shared by all subclasses
  describe(): string {
    return `A ${this.color} shape`;
  }
}

class Circle extends Shape {
  constructor(
    color: string,
    public radius: number
  ) {
    super(color);
  }

  getArea(): number {
    return Math.PI * this.radius ** 2;
  }

  getPerimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(
    color: string,
    public width: number,
    public height: number
  ) {
    super(color);
  }

  getArea(): number {
    return this.width * this.height;
  }

  getPerimeter(): number {
    return 2 * (this.width + this.height);
  }
}

// const shape = new Shape("red");  // Error! Cannot instantiate abstract class

const circle = new Circle("blue", 5);
const rectangle = new Rectangle("green", 10, 5);

console.log(`${circle.describe()}: Area = ${circle.getArea().toFixed(2)}`);
console.log(`${rectangle.describe()}: Area = ${rectangle.getArea()}`);

// ============================================================
// SECTION 7: Static Members
// ============================================================

console.log("\n========================================");
console.log("STATIC MEMBERS");
console.log("========================================\n");

class MathUtils {
  // Static property - belongs to class, not instances
  static PI = 3.14159;
  static E = 2.71828;

  // Static method - called on class, not instances
  static add(a: number, b: number): number {
    return a + b;
  }

  static multiply(a: number, b: number): number {
    return a * b;
  }

  static circleArea(radius: number): number {
    return MathUtils.PI * radius * radius;
  }
}

// Access static members without creating an instance
console.log("PI:", MathUtils.PI);
console.log("5 + 3 =", MathUtils.add(5, 3));
console.log("Circle area (r=5):", MathUtils.circleArea(5).toFixed(2));

// Counter example
class Counter {
  private static count = 0;

  constructor() {
    Counter.count++;
  }

  static getCount(): number {
    return Counter.count;
  }
}

new Counter();
new Counter();
new Counter();
console.log("Counters created:", Counter.getCount());

// ============================================================
// SECTION 8: Implementing Interfaces
// ============================================================

console.log("\n========================================");
console.log("IMPLEMENTING INTERFACES");
console.log("========================================\n");

interface Drawable {
  draw(): void;
}

interface Movable {
  x: number;
  y: number;
  moveTo(x: number, y: number): void;
}

// Class implementing multiple interfaces
class Sprite implements Drawable, Movable {
  constructor(
    public x: number,
    public y: number,
    public image: string
  ) {}

  draw(): void {
    console.log(`Drawing ${this.image} at (${this.x}, ${this.y})`);
  }

  moveTo(x: number, y: number): void {
    console.log(`Moving from (${this.x}, ${this.y}) to (${x}, ${y})`);
    this.x = x;
    this.y = y;
  }
}

const player = new Sprite(0, 0, "player.png");
player.draw();
player.moveTo(100, 50);
player.draw();

// ============================================================
// SECTION 9: Readonly and Optional Properties
// ============================================================

console.log("\n========================================");
console.log("READONLY AND OPTIONAL");
console.log("========================================\n");

class User {
  readonly id: string;
  public name: string;
  public email?: string;  // Optional

  constructor(id: string, name: string, email?: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  updateEmail(newEmail: string): void {
    this.email = newEmail;
    // this.id = "new-id";  // Error! Cannot modify readonly
  }
}

const user = new User("user-123", "Alice");
console.log("User:", user.id, user.name, user.email ?? "No email");
user.updateEmail("alice@example.com");
console.log("Updated email:", user.email);

// ============================================================
// SECTION 10: Generic Classes
// ============================================================

console.log("\n========================================");
console.log("GENERIC CLASSES");
console.log("========================================\n");

class Box<T> {
  private contents: T;

  constructor(value: T) {
    this.contents = value;
  }

  getValue(): T {
    return this.contents;
  }

  setValue(value: T): void {
    this.contents = value;
  }
}

const stringBox = new Box<string>("Hello");
console.log("String box:", stringBox.getValue());

const numberBox = new Box<number>(42);
console.log("Number box:", numberBox.getValue());

// Generic stack
class Stack<T> {
  private items: T[] = [];

  push(item: T): void {
    this.items.push(item);
  }

  pop(): T | undefined {
    return this.items.pop();
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  size(): number {
    return this.items.length;
  }
}

const stack = new Stack<number>();
stack.push(1);
stack.push(2);
stack.push(3);
console.log("Stack peek:", stack.peek());
console.log("Stack pop:", stack.pop());
console.log("Stack size:", stack.size());

// ============================================================
// SECTION 11: Method Chaining
// ============================================================

console.log("\n========================================");
console.log("METHOD CHAINING");
console.log("========================================\n");

class QueryBuilder {
  private query: string = "";

  select(fields: string): this {
    this.query += `SELECT ${fields} `;
    return this;
  }

  from(table: string): this {
    this.query += `FROM ${table} `;
    return this;
  }

  where(condition: string): this {
    this.query += `WHERE ${condition} `;
    return this;
  }

  orderBy(field: string, direction: "ASC" | "DESC" = "ASC"): this {
    this.query += `ORDER BY ${field} ${direction} `;
    return this;
  }

  build(): string {
    return this.query.trim();
  }
}

const query = new QueryBuilder()
  .select("name, email")
  .from("users")
  .where("active = true")
  .orderBy("name")
  .build();

console.log("Query:", query);

// ============================================================
// KEY TAKEAWAYS
// ============================================================

/**
 * Class Basics:
 * - Properties and methods
 * - Constructor for initialization
 * - Constructor shorthand with modifiers
 * 
 * Access Modifiers:
 * - public: Accessible everywhere (default)
 * - private: Only within class
 * - protected: Within class and subclasses
 * - readonly: Cannot be changed after init
 * 
 * Getters/Setters:
 * - Computed properties
 * - Validation on set
 * 
 * Inheritance:
 * - extends for subclasses
 * - super() to call parent constructor
 * - Method overriding
 * 
 * Abstract Classes:
 * - Cannot be instantiated
 * - Define abstract methods for subclasses
 * 
 * Static Members:
 * - Belong to class, not instances
 * - Called on class name
 * 
 * Now try the practice problems!
 * Run: bun lessons/practice/10-classes-practice.ts
 */

console.log("\n✅ Lesson 10 Complete! Now try the practice problems.");
