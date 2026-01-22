/**
 * ============================================================
 * LESSON 7: Testing with Bun
 * ============================================================
 *
 * Bun has a built-in test runner - no Jest needed!
 *
 * ANALOGY: Testing is like having a quality inspector at a factory.
 * Each test checks that a specific part works correctly. If any
 * test fails, you know exactly which part broke.
 *
 * Run this file with: bun test lessons/backend/07-bun-testing.ts
 *
 * Key features:
 * - Jest-compatible API
 * - Built-in matchers
 * - Async testing
 * - Mocking
 * - Snapshot testing
 */

import { test, expect, describe, beforeEach, afterEach, beforeAll, afterAll, mock, spyOn } from "bun:test";

// ============================================================
// SECTION 1: Basic Tests
// ============================================================

/**
 * The simplest test: a function that should not throw.
 * Use test() or it() - they're identical.
 */

test("basic assertion", () => {
  expect(1 + 1).toBe(2);
});

test("string matching", () => {
  const greeting = "Hello, World!";
  expect(greeting).toBe("Hello, World!");
  expect(greeting).toContain("World");
  expect(greeting).toStartWith("Hello");
  expect(greeting).toEndWith("!");
});

// ============================================================
// SECTION 2: Common Matchers
// ============================================================

/**
 * Matchers are methods that check values.
 * Bun supports most Jest matchers.
 */

describe("Common Matchers", () => {
  test("equality", () => {
    // Primitive equality
    expect(42).toBe(42);
    expect("hello").toBe("hello");

    // Object equality (deep comparison)
    expect({ a: 1 }).toEqual({ a: 1 });
    expect([1, 2, 3]).toEqual([1, 2, 3]);

    // Not equal
    expect(1).not.toBe(2);
  });

  test("truthiness", () => {
    expect(true).toBeTruthy();
    expect(false).toBeFalsy();
    expect(null).toBeNull();
    expect(undefined).toBeUndefined();
    expect("value").toBeDefined();
  });

  test("numbers", () => {
    expect(10).toBeGreaterThan(5);
    expect(5).toBeLessThan(10);
    expect(10).toBeGreaterThanOrEqual(10);
    expect(0.1 + 0.2).toBeCloseTo(0.3); // Floating point comparison
  });

  test("arrays and objects", () => {
    const arr = [1, 2, 3];
    expect(arr).toContain(2);
    expect(arr).toHaveLength(3);

    const obj = { name: "Alice", age: 30 };
    expect(obj).toHaveProperty("name");
    expect(obj).toHaveProperty("age", 30);
    expect(obj).toMatchObject({ name: "Alice" });
  });

  test("types", () => {
    expect(typeof 42).toBe("number");
    expect([]).toBeInstanceOf(Array);
    expect(new Date()).toBeInstanceOf(Date);
  });
});

// ============================================================
// SECTION 3: Async Testing
// ============================================================

/**
 * Testing async code is straightforward.
 * Just use async/await or return a Promise.
 */

describe("Async Testing", () => {
  test("async/await", async () => {
    const result = await Promise.resolve(42);
    expect(result).toBe(42);
  });

  test("promises resolve", async () => {
    await expect(Promise.resolve("success")).resolves.toBe("success");
  });

  test("promises reject", async () => {
    await expect(Promise.reject(new Error("fail"))).rejects.toThrow("fail");
  });

  // Simulating an API call
  async function fetchUser(id: number) {
    await Bun.sleep(10); // Simulate network delay
    if (id <= 0) throw new Error("Invalid ID");
    return { id, name: `User ${id}` };
  }

  test("mock API call", async () => {
    const user = await fetchUser(1);
    expect(user).toEqual({ id: 1, name: "User 1" });
  });

  test("handles errors", async () => {
    await expect(fetchUser(-1)).rejects.toThrow("Invalid ID");
  });
});

// ============================================================
// SECTION 4: Test Organization
// ============================================================

/**
 * Use describe() to group related tests.
 * Use beforeEach/afterEach for setup/teardown.
 */

describe("Calculator", () => {
  class Calculator {
    value: number;

    constructor() {
      this.value = 0;
    }

    add(n: number) {
      this.value += n;
      return this;
    }

    subtract(n: number) {
      this.value -= n;
      return this;
    }

    multiply(n: number) {
      this.value *= n;
      return this;
    }

    reset() {
      this.value = 0;
      return this;
    }
  }

  let calc: Calculator;

  beforeEach(() => {
    calc = new Calculator();
  });

  test("starts at zero", () => {
    expect(calc.value).toBe(0);
  });

  test("adds numbers", () => {
    calc.add(5);
    expect(calc.value).toBe(5);
  });

  test("subtracts numbers", () => {
    calc.add(10).subtract(3);
    expect(calc.value).toBe(7);
  });

  test("chains operations", () => {
    calc.add(10).multiply(2).subtract(5);
    expect(calc.value).toBe(15);
  });
});

// ============================================================
// SECTION 5: Lifecycle Hooks
// ============================================================

/**
 * Hooks run at specific times:
 * - beforeAll: Once before all tests in describe
 * - beforeEach: Before each test
 * - afterEach: After each test
 * - afterAll: Once after all tests in describe
 */

describe("Lifecycle Hooks", () => {
  const events: string[] = [];

  beforeAll(() => {
    events.push("beforeAll");
  });

  beforeEach(() => {
    events.push("beforeEach");
  });

  afterEach(() => {
    events.push("afterEach");
  });

  afterAll(() => {
    events.push("afterAll");
    // events would be: beforeAll, beforeEach, afterEach, beforeEach, afterEach, afterAll
  });

  test("first test", () => {
    expect(events).toContain("beforeAll");
    expect(events).toContain("beforeEach");
  });

  test("second test", () => {
    expect(events.filter((e) => e === "beforeEach")).toHaveLength(2);
  });
});

// ============================================================
// SECTION 6: Mocking Functions
// ============================================================

/**
 * Mock functions let you:
 * - Track function calls
 * - Control return values
 * - Spy on method calls
 */

describe("Mocking", () => {
  test("mock function basics", () => {
    const mockFn = mock(() => "mocked value");

    // Call the mock
    const result = mockFn("arg1", "arg2");

    expect(result).toBe("mocked value");
    expect(mockFn).toHaveBeenCalled();
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith("arg1", "arg2");
  });

  test("mock implementation", () => {
    const mockFn = mock((x: number) => x * 2);

    expect(mockFn(5)).toBe(10);
    expect(mockFn(3)).toBe(6);
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  test("spying on methods", () => {
    const obj = {
      greet(name: string) {
        return `Hello, ${name}!`;
      },
    };

    // Spy on the method
    const spy = spyOn(obj, "greet");

    // Call the original method
    const result = obj.greet("Alice");

    expect(result).toBe("Hello, Alice!");
    expect(spy).toHaveBeenCalledWith("Alice");
  });
});

// ============================================================
// SECTION 7: Testing Exceptions
// ============================================================

/**
 * Test that functions throw expected errors.
 */

describe("Exception Testing", () => {
  function divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error("Division by zero");
    }
    return a / b;
  }

  test("throws on division by zero", () => {
    expect(() => divide(10, 0)).toThrow();
    expect(() => divide(10, 0)).toThrow("Division by zero");
    expect(() => divide(10, 0)).toThrow(/zero/);
  });

  test("does not throw for valid input", () => {
    expect(() => divide(10, 2)).not.toThrow();
    expect(divide(10, 2)).toBe(5);
  });
});

// ============================================================
// SECTION 8: Practical Example - Testing an API Handler
// ============================================================

/**
 * Real-world example: testing a request handler.
 */

describe("API Handler", () => {
  // Simple user service
  interface User {
    id: number;
    name: string;
    email: string;
  }

  const users: User[] = [];

  function createUser(data: { name: string; email: string }): User {
    if (!data.name || !data.email) {
      throw new Error("Name and email are required");
    }
    if (!data.email.includes("@")) {
      throw new Error("Invalid email format");
    }

    const user: User = {
      id: users.length + 1,
      name: data.name,
      email: data.email,
    };
    users.push(user);
    return user;
  }

  function getUser(id: number): User | undefined {
    return users.find((u) => u.id === id);
  }

  beforeEach(() => {
    users.length = 0; // Clear users before each test
  });

  test("creates a user with valid data", () => {
    const user = createUser({ name: "Alice", email: "alice@example.com" });

    expect(user).toMatchObject({
      name: "Alice",
      email: "alice@example.com",
    });
    expect(user.id).toBe(1);
  });

  test("assigns incremental IDs", () => {
    createUser({ name: "Alice", email: "alice@example.com" });
    const bob = createUser({ name: "Bob", email: "bob@example.com" });

    expect(bob.id).toBe(2);
  });

  test("throws for missing name", () => {
    expect(() => createUser({ name: "", email: "test@example.com" })).toThrow(
      "Name and email are required"
    );
  });

  test("throws for invalid email", () => {
    expect(() => createUser({ name: "Test", email: "invalid" })).toThrow("Invalid email format");
  });

  test("retrieves user by ID", () => {
    createUser({ name: "Alice", email: "alice@example.com" });

    const user = getUser(1);
    expect(user?.name).toBe("Alice");
  });

  test("returns undefined for non-existent user", () => {
    expect(getUser(999)).toBeUndefined();
  });
});

// ============================================================
// SECTION 9: Skip and Only
// ============================================================

/**
 * Skip tests temporarily or run only specific tests.
 */

describe("Skip and Only", () => {
  test("this test runs", () => {
    expect(true).toBe(true);
  });

  // Skip a test (uncomment to see)
  // test.skip("this test is skipped", () => {
  //   expect(true).toBe(false); // Would fail, but it's skipped
  // });

  // Run only this test (uncomment to see)
  // test.only("only this test runs", () => {
  //   expect(true).toBe(true);
  // });

  // Todo test (placeholder)
  // test.todo("implement this later");
});

// ============================================================
// KEY TAKEAWAYS
// ============================================================

describe("Key Takeaways", () => {
  test("summary", () => {
    const takeaways = [
      "Run tests with: bun test",
      "Use describe() to group tests",
      "Use expect().toBe() for primitives",
      "Use expect().toEqual() for objects",
      "Use async/await for async tests",
      "Use mock() to create mock functions",
      "Use beforeEach/afterEach for setup/teardown",
    ];

    expect(takeaways).toHaveLength(7);
    console.log("\n✅ Lesson 7 Complete! Run: bun lessons/backend/08-hono-basics.ts");
  });
});
