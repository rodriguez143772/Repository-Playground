/**
 * ============================================================
 * LESSON 8: Interfaces
 * ============================================================
 * 
 * Interfaces are like blueprints or contracts. They describe the 
 * SHAPE of an object - what properties and methods it should have.
 * 
 * Think of interfaces as:
 * - A job description (lists required qualifications)
 * - A plug specification (defines what fits)
 * - A restaurant menu format (title, description, price)
 * 
 * Interfaces don't create anything - they just describe what
 * something should look like!
 */

// ============================================================
// SECTION 1: Basic Interfaces
// ============================================================

console.log("========================================");
console.log("BASIC INTERFACES");
console.log("========================================\n");

// Define an interface
interface Person {
  name: string;
  age: number;
}

// Use the interface
const alice: Person = {
  name: "Alice",
  age: 30
};

console.log("Person:", alice);

// TypeScript enforces the shape!
// This would cause an error:
// const bob: Person = { name: "Bob" };  // Missing 'age'
// const charlie: Person = { name: "Charlie", age: 25, email: "..." };  // Extra property

// Interface for function parameters
function greetPerson(person: Person): string {
  return `Hello, ${person.name}! You are ${person.age} years old.`;
}

console.log(greetPerson(alice));

// ============================================================
// SECTION 2: Optional Properties
// ============================================================

console.log("\n========================================");
console.log("OPTIONAL PROPERTIES");
console.log("========================================\n");

// Use ? to mark properties as optional
interface User {
  id: number;
  username: string;
  email: string;
  phone?: string;      // Optional
  bio?: string;        // Optional
}

const user1: User = {
  id: 1,
  username: "alice",
  email: "alice@example.com"
  // phone and bio are optional, so we can omit them
};

const user2: User = {
  id: 2,
  username: "bob",
  email: "bob@example.com",
  phone: "555-1234",    // Optional but provided
  bio: "Developer"      // Optional but provided
};

console.log("User 1:", user1);
console.log("User 2:", user2);

// When accessing optional properties, they might be undefined
function displayPhone(user: User): string {
  if (user.phone) {
    return `Phone: ${user.phone}`;
  }
  return "No phone provided";
}

console.log(displayPhone(user1));
console.log(displayPhone(user2));

// ============================================================
// SECTION 3: Readonly Properties
// ============================================================

console.log("\n========================================");
console.log("READONLY PROPERTIES");
console.log("========================================\n");

// Use 'readonly' to prevent modification after creation
interface Config {
  readonly apiKey: string;
  readonly baseUrl: string;
  timeout: number;  // Can be modified
}

const config: Config = {
  apiKey: "secret-key-123",
  baseUrl: "https://api.example.com",
  timeout: 5000
};

console.log("Config:", config);

// This works:
config.timeout = 10000;
console.log("Updated timeout:", config.timeout);

// This would cause an error:
// config.apiKey = "new-key";  // Cannot assign to 'apiKey' because it is readonly

// ============================================================
// SECTION 4: Interface Methods
// ============================================================

console.log("\n========================================");
console.log("INTERFACE METHODS");
console.log("========================================\n");

// Interfaces can describe methods too
interface Calculator {
  value: number;
  add(n: number): Calculator;
  subtract(n: number): Calculator;
  multiply(n: number): Calculator;
  getResult(): number;
}

// Implement the interface
const calc: Calculator = {
  value: 0,
  add(n: number): Calculator {
    this.value += n;
    return this;
  },
  subtract(n: number): Calculator {
    this.value -= n;
    return this;
  },
  multiply(n: number): Calculator {
    this.value *= n;
    return this;
  },
  getResult(): number {
    return this.value;
  }
};

const result = calc.add(10).multiply(2).subtract(5).getResult();
console.log("Calculator result:", result);  // (10 * 2) - 5 = 15

// ============================================================
// SECTION 5: Extending Interfaces
// ============================================================

console.log("\n========================================");
console.log("EXTENDING INTERFACES");
console.log("========================================\n");

// Base interface
interface Animal {
  name: string;
  age: number;
}

// Extended interface
interface Dog extends Animal {
  breed: string;
  bark(): string;
}

interface Cat extends Animal {
  color: string;
  meow(): string;
}

const myDog: Dog = {
  name: "Buddy",
  age: 3,
  breed: "Labrador",
  bark() {
    return "Woof!";
  }
};

const myCat: Cat = {
  name: "Whiskers",
  age: 5,
  color: "orange",
  meow() {
    return "Meow!";
  }
};

console.log(`${myDog.name} says: ${myDog.bark()}`);
console.log(`${myCat.name} says: ${myCat.meow()}`);

// Extend multiple interfaces
interface Pet extends Animal {
  owner: string;
}

interface Trainable {
  tricks: string[];
  performTrick(trick: string): string;
}

interface TrainedDog extends Dog, Pet, Trainable {}

const trainedDog: TrainedDog = {
  name: "Rex",
  age: 4,
  breed: "German Shepherd",
  owner: "John",
  tricks: ["sit", "roll over", "fetch"],
  bark() { return "Woof!"; },
  performTrick(trick: string) {
    return `${this.name} performs: ${trick}!`;
  }
};

console.log(trainedDog.performTrick("sit"));

// ============================================================
// SECTION 6: Index Signatures
// ============================================================

console.log("\n========================================");
console.log("INDEX SIGNATURES");
console.log("========================================\n");

// When you don't know all property names ahead of time
interface StringDictionary {
  [key: string]: string;
}

const translations: StringDictionary = {
  hello: "hola",
  goodbye: "adiós",
  thanks: "gracias"
};

console.log("Translations:", translations);
console.log("hello =", translations["hello"]);

// Add new translations dynamically
translations["please"] = "por favor";
console.log("Updated:", translations);

// Mixed: known properties + index signature
interface Theme {
  name: string;
  version: string;
  [customProperty: string]: string;  // Additional custom properties
}

const darkTheme: Theme = {
  name: "Dark Mode",
  version: "1.0",
  primaryColor: "#1a1a1a",
  accentColor: "#00ff00"
};

console.log("Theme:", darkTheme);

// ============================================================
// SECTION 7: Function Interfaces
// ============================================================

console.log("\n========================================");
console.log("FUNCTION INTERFACES");
console.log("========================================\n");

// Interface for a function type
interface MathOperation {
  (a: number, b: number): number;
}

const add: MathOperation = (a, b) => a + b;
const multiply: MathOperation = (a, b) => a * b;

console.log("add(5, 3) =", add(5, 3));
console.log("multiply(5, 3) =", multiply(5, 3));

// Interface with call signature AND properties
interface FormatterFunction {
  (value: string): string;
  prefix: string;
  suffix: string;
}

const formatter = ((value: string) => {
  return `${formatter.prefix}${value}${formatter.suffix}`;
}) as FormatterFunction;

formatter.prefix = "<<";
formatter.suffix = ">>";

console.log("Formatted:", formatter("Hello"));

// ============================================================
// SECTION 8: Interface vs Type Alias
// ============================================================

console.log("\n========================================");
console.log("INTERFACE VS TYPE");
console.log("========================================\n");

// Both can describe object shapes
interface PointInterface {
  x: number;
  y: number;
}

type PointType = {
  x: number;
  y: number;
};

// Both work the same way for objects
const p1: PointInterface = { x: 1, y: 2 };
const p2: PointType = { x: 3, y: 4 };

console.log("Interface point:", p1);
console.log("Type point:", p2);

// Key differences:
// 1. Interfaces can be extended/merged
interface Box {
  width: number;
}
interface Box {
  height: number;  // Declaration merging!
}
const box: Box = { width: 10, height: 20 };
console.log("Merged interface box:", box);

// 2. Types can represent unions and primitives
type StringOrNumber = string | number;
type ID = string;

const id1: StringOrNumber = "abc";
const id2: StringOrNumber = 123;
console.log("Union type values:", id1, id2);

// When to use which:
// - Interface: For objects, especially when you need extension/merging
// - Type: For unions, primitives, tuples, or complex type compositions

// ============================================================
// SECTION 9: Implementing Interfaces in Classes
// ============================================================

console.log("\n========================================");
console.log("IMPLEMENTING IN CLASSES");
console.log("========================================\n");

interface Drawable {
  draw(): void;
  color: string;
}

interface Resizable {
  resize(scale: number): void;
  width: number;
  height: number;
}

// Class implementing multiple interfaces
class Rectangle implements Drawable, Resizable {
  color: string;
  width: number;
  height: number;

  constructor(color: string, width: number, height: number) {
    this.color = color;
    this.width = width;
    this.height = height;
  }

  draw(): void {
    console.log(`Drawing ${this.color} rectangle: ${this.width}x${this.height}`);
  }

  resize(scale: number): void {
    this.width *= scale;
    this.height *= scale;
  }
}

const rect = new Rectangle("blue", 100, 50);
rect.draw();
rect.resize(2);
rect.draw();

// ============================================================
// SECTION 10: Generic Interfaces
// ============================================================

console.log("\n========================================");
console.log("GENERIC INTERFACES");
console.log("========================================\n");

// Interface with type parameter
interface Container<T> {
  value: T;
  getValue(): T;
  setValue(value: T): void;
}

class Box2<T> implements Container<T> {
  constructor(public value: T) {}
  
  getValue(): T {
    return this.value;
  }
  
  setValue(value: T): void {
    this.value = value;
  }
}

const stringBox = new Box2<string>("Hello");
console.log("String box:", stringBox.getValue());

const numberBox = new Box2<number>(42);
console.log("Number box:", numberBox.getValue());

// Generic interface for API responses
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

interface UserData {
  id: number;
  name: string;
}

const userResponse: ApiResponse<UserData> = {
  data: { id: 1, name: "Alice" },
  status: 200,
  message: "Success"
};

console.log("API Response:", userResponse);

// ============================================================
// SECTION 11: Interface Composition Patterns
// ============================================================

console.log("\n========================================");
console.log("COMPOSITION PATTERNS");
console.log("========================================\n");

// Base interfaces for composition
interface Identifiable {
  id: string;
}

interface Timestamped {
  createdAt: Date;
  updatedAt: Date;
}

interface SoftDeletable {
  deletedAt?: Date;
  isDeleted: boolean;
}

// Compose interfaces for specific entities
interface Post extends Identifiable, Timestamped, SoftDeletable {
  title: string;
  content: string;
  author: string;
}

const post: Post = {
  id: "post-123",
  title: "Hello World",
  content: "This is my first post",
  author: "Alice",
  createdAt: new Date(),
  updatedAt: new Date(),
  isDeleted: false
};

console.log("Post:", post);

// ============================================================
// KEY TAKEAWAYS
// ============================================================

/**
 * 1. Interfaces describe the SHAPE of objects
 * 2. Use ? for optional properties
 * 3. Use readonly for immutable properties
 * 4. Interfaces can describe methods
 * 5. Interfaces can extend other interfaces
 * 6. Index signatures allow dynamic properties
 * 7. Interfaces can describe function types
 * 8. Classes can implement interfaces
 * 9. Generic interfaces add flexibility
 * 
 * Interface vs Type:
 * - Interface: Objects, extensible, declaration merging
 * - Type: Unions, primitives, complex compositions
 * 
 * Best Practices:
 * - Prefer interfaces for public APIs
 * - Use meaningful names (not IUser, just User)
 * - Keep interfaces focused and composable
 * 
 * Now try the practice problems!
 * Run: bun lessons/practice/08-interfaces-practice.ts
 */

console.log("\n✅ Lesson 8 Complete! Now try the practice problems.");
