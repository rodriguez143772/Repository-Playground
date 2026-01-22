/**
 * ============================================================
 * LESSON 7: Objects
 * ============================================================
 * 
 * Objects are like filing cabinets - they store related information
 * together using labeled drawers (properties). Unlike arrays which
 * use numbers (indices), objects use names (keys) to organize data.
 * 
 * Think of objects as:
 * - A person's profile (name, age, email, etc.)
 * - A product listing (title, price, description)
 * - A configuration file (settings organized by name)
 * 
 * Objects are THE fundamental data structure in JavaScript/TypeScript!
 */

// ============================================================
// SECTION 1: Creating Objects
// ============================================================

console.log("========================================");
console.log("CREATING OBJECTS");
console.log("========================================\n");

// Object literal (most common)
const person = {
  name: "Alice",
  age: 30,
  city: "New York"
};
console.log("Person:", person);

// Empty object
const empty = {};
console.log("Empty object:", empty);

// Object with type annotation
interface User {
  id: number;
  username: string;
  email: string;
}

const user: User = {
  id: 1,
  username: "alice123",
  email: "alice@example.com"
};
console.log("User:", user);

// Object with methods
const calculator = {
  value: 0,
  add(n: number) {
    this.value += n;
    return this;  // For chaining
  },
  subtract(n: number) {
    this.value -= n;
    return this;
  },
  getResult() {
    return this.value;
  }
};

calculator.add(10).subtract(3).add(5);
console.log("Calculator result:", calculator.getResult());

// ============================================================
// SECTION 2: Accessing Properties
// ============================================================

console.log("\n========================================");
console.log("ACCESSING PROPERTIES");
console.log("========================================\n");

const product = {
  name: "Laptop",
  price: 999.99,
  inStock: true,
  "special-field": "value with dash"  // Keys with special chars need quotes
};

// Dot notation (preferred when possible)
console.log("Name:", product.name);
console.log("Price:", product.price);

// Bracket notation (for dynamic keys or special characters)
console.log("In Stock:", product["inStock"]);
console.log("Special field:", product["special-field"]);

// Dynamic property access
const propertyName = "price";
console.log(`Dynamic access (${propertyName}):`, product[propertyName]);

// Accessing nested properties
const company = {
  name: "TechCorp",
  address: {
    street: "123 Main St",
    city: "San Francisco",
    zip: "94102"
  },
  employees: [
    { name: "Alice", role: "Developer" },
    { name: "Bob", role: "Designer" }
  ]
};

console.log("\nNested access:");
console.log("City:", company.address.city);
console.log("First employee:", company.employees[0].name);

// ============================================================
// SECTION 3: Modifying Objects
// ============================================================

console.log("\n========================================");
console.log("MODIFYING OBJECTS");
console.log("========================================\n");

const profile: Record<string, any> = {
  name: "John",
  age: 25
};
console.log("Original:", profile);

// Add new property
profile.email = "john@example.com";
console.log("After adding email:", profile);

// Update existing property
profile.age = 26;
console.log("After updating age:", profile);

// Delete property
delete profile.email;
console.log("After deleting email:", profile);

// Note: const objects can still have their properties changed!
const constObj = { x: 1 };
constObj.x = 2;  // This works!
// constObj = { x: 3 };  // This fails - can't reassign the variable

// ============================================================
// SECTION 4: Object Methods
// ============================================================

console.log("\n========================================");
console.log("OBJECT METHODS");
console.log("========================================\n");

const sample = { a: 1, b: 2, c: 3 };

// Object.keys() - Get array of keys
const keys = Object.keys(sample);
console.log("Keys:", keys);

// Object.values() - Get array of values
const values = Object.values(sample);
console.log("Values:", values);

// Object.entries() - Get array of [key, value] pairs
const entries = Object.entries(sample);
console.log("Entries:", entries);

// Object.fromEntries() - Create object from entries
const newObj = Object.fromEntries([["x", 10], ["y", 20]]);
console.log("From entries:", newObj);

// Object.assign() - Copy/merge objects
const target = { a: 1 };
const source = { b: 2 };
const merged = Object.assign({}, target, source);
console.log("Merged:", merged);

// Spread operator (modern way to merge)
const spreadMerged = { ...target, ...source };
console.log("Spread merged:", spreadMerged);

// Object.freeze() - Make object immutable
const frozen = Object.freeze({ x: 1, y: 2 });
// frozen.x = 10;  // Error in strict mode, silent fail otherwise
console.log("Frozen object:", frozen);

// ============================================================
// SECTION 5: Checking Properties
// ============================================================

console.log("\n========================================");
console.log("CHECKING PROPERTIES");
console.log("========================================\n");

const car = {
  brand: "Toyota",
  model: "Camry",
  year: 2022
};

// 'in' operator
console.log("'brand' in car:", "brand" in car);
console.log("'color' in car:", "color" in car);

// hasOwnProperty
console.log("hasOwnProperty('model'):", car.hasOwnProperty("model"));

// Check for undefined (be careful!)
console.log("car.color === undefined:", car.color === undefined);

// Better: Check if property exists
const hasColor = "color" in car;
console.log("Has color property:", hasColor);

// ============================================================
// SECTION 6: Iterating Over Objects
// ============================================================

console.log("\n========================================");
console.log("ITERATING OVER OBJECTS");
console.log("========================================\n");

const scores: Record<string, number> = {
  alice: 95,
  bob: 87,
  charlie: 92
};

// for...in loop
console.log("for...in loop:");
for (const key in scores) {
  console.log(`  ${key}: ${scores[key]}`);
}

// Object.entries() with for...of
console.log("\nObject.entries() with for...of:");
for (const [name, score] of Object.entries(scores)) {
  console.log(`  ${name}: ${score}`);
}

// forEach with Object.entries()
console.log("\nforEach:");
Object.entries(scores).forEach(([name, score]) => {
  console.log(`  ${name}: ${score}`);
});

// ============================================================
// SECTION 7: Destructuring
// ============================================================

console.log("\n========================================");
console.log("DESTRUCTURING");
console.log("========================================\n");

const userProfile = {
  firstName: "Alice",
  lastName: "Smith",
  email: "alice@example.com",
  age: 30
};

// Basic destructuring
const { firstName, lastName } = userProfile;
console.log(`Name: ${firstName} ${lastName}`);

// Renaming during destructuring
const { firstName: fName, lastName: lName } = userProfile;
console.log(`Renamed: ${fName} ${lName}`);

// Default values
const { phone = "N/A" } = userProfile as any;
console.log("Phone:", phone);

// Nested destructuring
const nestedData = {
  user: {
    name: "Bob",
    settings: {
      theme: "dark",
      notifications: true
    }
  }
};

const { user: { settings: { theme } } } = nestedData;
console.log("Theme:", theme);

// Rest pattern (collect remaining properties)
const { email, ...rest } = userProfile;
console.log("Email:", email);
console.log("Rest:", rest);

// ============================================================
// SECTION 8: Shorthand Property Names
// ============================================================

console.log("\n========================================");
console.log("SHORTHAND SYNTAX");
console.log("========================================\n");

const userName = "alice";
const userAge = 25;
const userCity = "NYC";

// Longhand
const userLong = {
  userName: userName,
  userAge: userAge,
  userCity: userCity
};

// Shorthand (when variable name matches property name)
const userShort = { userName, userAge, userCity };
console.log("Shorthand object:", userShort);

// Computed property names
const prop = "dynamicKey";
const dynamicObj = {
  [prop]: "dynamic value",
  [`prefix_${prop}`]: "prefixed"
};
console.log("Dynamic keys:", dynamicObj);

// ============================================================
// SECTION 9: Object Spreading and Cloning
// ============================================================

console.log("\n========================================");
console.log("SPREADING AND CLONING");
console.log("========================================\n");

const original = { a: 1, b: 2 };

// Shallow copy
const shallowCopy = { ...original };
shallowCopy.a = 100;
console.log("Original:", original);
console.log("Shallow copy:", shallowCopy);

// Merging with override
const defaults = { theme: "light", fontSize: 14, language: "en" };
const userSettings = { theme: "dark" };
const finalSettings = { ...defaults, ...userSettings };
console.log("Final settings:", finalSettings);

// Deep copy (for nested objects)
const deepOriginal = {
  name: "Test",
  nested: { value: 1 }
};

// Shallow copy issue
const shallowNested = { ...deepOriginal };
shallowNested.nested.value = 999;
console.log("Original nested value:", deepOriginal.nested.value);  // Also 999!

// Deep copy solution
const deepCopy = JSON.parse(JSON.stringify(deepOriginal));
// Or use structuredClone (modern browsers/Node)
// const deepCopy = structuredClone(deepOriginal);

// ============================================================
// SECTION 10: Optional Chaining
// ============================================================

console.log("\n========================================");
console.log("OPTIONAL CHAINING");
console.log("========================================\n");

interface ComplexUser {
  name: string;
  address?: {
    street: string;
    city?: string;
  };
  getFullName?: () => string;
}

const user1: ComplexUser = { name: "Alice" };
const user2: ComplexUser = {
  name: "Bob",
  address: { street: "123 Main St", city: "NYC" }
};

// Without optional chaining (old way)
const city1 = user1.address !== undefined ? user1.address.city : undefined;

// With optional chaining
const city2 = user1.address?.city;
console.log("User1 city:", city2);  // undefined

const city3 = user2.address?.city;
console.log("User2 city:", city3);  // "NYC"

// Optional method call
const fullName = user1.getFullName?.();
console.log("Full name:", fullName);  // undefined (no crash!)

// With nullish coalescing
const displayCity = user1.address?.city ?? "Unknown";
console.log("Display city:", displayCity);

// ============================================================
// SECTION 11: TypeScript Object Types
// ============================================================

console.log("\n========================================");
console.log("TYPESCRIPT OBJECT TYPES");
console.log("========================================\n");

// Type alias
type Point = {
  x: number;
  y: number;
};

const point: Point = { x: 10, y: 20 };
console.log("Point:", point);

// Interface (can be extended)
interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {
  breed: string;
}

const dog: Dog = { name: "Buddy", age: 3, breed: "Labrador" };
console.log("Dog:", dog);

// Readonly properties
interface ReadonlyUser {
  readonly id: number;
  name: string;
}

const roUser: ReadonlyUser = { id: 1, name: "Alice" };
// roUser.id = 2;  // Error!
roUser.name = "Bob";  // OK

// Index signatures
interface StringMap {
  [key: string]: string;
}

const headers: StringMap = {
  "Content-Type": "application/json",
  "Authorization": "Bearer token123"
};
console.log("Headers:", headers);

// ============================================================
// SECTION 12: Common Object Patterns
// ============================================================

console.log("\n========================================");
console.log("COMMON PATTERNS");
console.log("========================================\n");

// Factory function
function createUser(name: string, age: number) {
  return {
    name,
    age,
    greet() {
      return `Hello, I'm ${this.name}`;
    }
  };
}

const newUser = createUser("Charlie", 28);
console.log("Factory result:", newUser.greet());

// Object mapping/transformation
const rawData = { first_name: "Alice", last_name: "Smith", user_age: 30 };

const transformed = {
  firstName: rawData.first_name,
  lastName: rawData.last_name,
  age: rawData.user_age
};
console.log("Transformed:", transformed);

// Pick specific properties
function pick<T, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
  const result = {} as Pick<T, K>;
  keys.forEach(key => {
    result[key] = obj[key];
  });
  return result;
}

const fullUser = { id: 1, name: "Alice", email: "alice@example.com", age: 30 };
const publicInfo = pick(fullUser, ["name", "age"]);
console.log("Picked:", publicInfo);

// ============================================================
// KEY TAKEAWAYS
// ============================================================

/**
 * Creating Objects:
 * - Literal: const obj = { key: value }
 * - With interface: const obj: MyInterface = { ... }
 * 
 * Accessing:
 * - Dot notation: obj.property
 * - Bracket notation: obj["property"]
 * 
 * Methods:
 * - Object.keys(), Object.values(), Object.entries()
 * - Object.assign(), spread operator { ...obj }
 * - Object.freeze(), Object.seal()
 * 
 * Destructuring:
 * - const { prop1, prop2 } = obj
 * - With rename: const { prop: newName } = obj
 * - With defaults: const { prop = default } = obj
 * 
 * TypeScript:
 * - Use interfaces or type aliases
 * - Optional properties: prop?: type
 * - Readonly: readonly prop: type
 * - Index signatures: [key: string]: type
 * 
 * Now try the practice problems!
 * Run: bun lessons/practice/07-objects-practice.ts
 */

console.log("\n✅ Lesson 7 Complete! Now try the practice problems.");
