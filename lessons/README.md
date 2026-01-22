# TypeScript Learning Curriculum

Welcome to the TypeScript Learning Curriculum! This course is designed for individuals who may not be familiar with JavaScript, so we'll cover JavaScript fundamentals alongside TypeScript concepts.

## How to Use This Curriculum

Each lesson follows an interactive structure:
1. **Concept Introduction** - Learn the topic with real-world analogies
2. **Examples** - See the concept in action with runnable code
3. **Practice Problems** - Test your understanding with hands-on exercises

## Running Lessons

To run any lesson file:
```bash
bun lessons/01-variables-and-types.ts
```

To check your practice solutions:
```bash
bun lessons/practice/01-variables-practice.ts
```

## Curriculum Overview

### Part 1: JavaScript Fundamentals with TypeScript Types

| # | Lesson | Description | Run Command |
|---|--------|-------------|-------------|
| 1 | [Variables and Data Types](./01-variables-and-types.ts) | The building blocks: let, const, primitives | `bun lessons/01-variables-and-types.ts` |
| 2 | [Operators and Expressions](./02-operators-and-expressions.ts) | Math, comparisons, logical operators | `bun lessons/02-operators-and-expressions.ts` |
| 3 | [Control Flow](./03-control-flow.ts) | if/else, switch, making decisions | `bun lessons/03-control-flow.ts` |
| 4 | [Loops](./04-loops.ts) | for, while, array methods | `bun lessons/04-loops.ts` |
| 5 | [Functions](./05-functions.ts) | Declarations, arrows, callbacks, closures | `bun lessons/05-functions.ts` |
| 6 | [Arrays](./06-arrays.ts) | Creating, modifying, searching, transforming | `bun lessons/06-arrays.ts` |
| 7 | [Objects](./07-objects.ts) | Properties, methods, destructuring | `bun lessons/07-objects.ts` |

### Part 2: TypeScript Essentials

| # | Lesson | Description | Run Command |
|---|--------|-------------|-------------|
| 8 | [Interfaces](./08-interfaces.ts) | Defining object shapes and contracts | `bun lessons/08-interfaces.ts` |
| 9 | [Union and Literal Types](./09-union-and-literal-types.ts) | Flexible and specific types | `bun lessons/09-union-and-literal-types.ts` |
| 10 | [Classes](./10-classes.ts) | OOP, inheritance, access modifiers | `bun lessons/10-classes.ts` |
| 11 | [Generics](./11-generics.ts) | Reusable, type-safe code | `bun lessons/11-generics.ts` |
| 12 | [Utility Types](./12-utility-types.ts) | Built-in type transformations | `bun lessons/12-utility-types.ts` |

## Practice Problems

Each lesson has a corresponding practice file in the `practice/` folder:

```bash
# Example: After completing lesson 1, run:
bun lessons/practice/01-variables-practice.ts
```

Practice files include:
- Multiple problems of increasing difficulty
- Automated tests to check your solutions
- Hints and expected outputs

## Suggested Learning Path

1. **Start with Part 1** - Even if you know some JavaScript, it's worth reviewing the TypeScript type annotations
2. **Run every example** - Type along, don't just read
3. **Complete practice problems** - Don't move on until tests pass
4. **Experiment** - Modify examples to see what happens
5. **Build something** - After completing the curriculum, build a small project

## Tips for Success

- Run each example to see it in action
- Complete all practice problems before moving on
- Don't just read the code - type it out yourself!
- Experiment by modifying the examples
- Use the TypeScript error messages as learning opportunities
- When stuck, re-read the analogies - they often clarify concepts

## Projects

After completing lessons, put your skills to the test with real-world projects in the `projects/` folder!

Projects are staggered by lesson - each project uses cumulative knowledge:

| After Lesson | Project | Description |
|--------------|---------|-------------|
| 1 | Unit Converter | Convert between units using variables |
| 2 | Tip Calculator | Calculate tips and split bills |
| 3 | Grade Calculator | Convert scores to letter grades |
| 4 | Number Game | Guess a random number with hints |
| 5 | Password Generator | Generate secure random passwords |
| 6 | Todo List | Manage a list of tasks |
| 7 | Contact Book | Store and search contacts |
| 8 | Blog System | Posts, comments, and users |
| 9 | Order Management | Process orders with state machines |
| 10 | Bank Account | Full OOP banking system |
| 11 | Data Structures | Generic Stack, Queue, LinkedList |
| 12 | API Client | Type-safe HTTP client |

```bash
# Run a project
bun lessons/projects/05-password-generator.ts
```

## Quick Reference

### Running Files
```bash
bun lessons/<filename>.ts           # Run a lesson
bun lessons/practice/<filename>.ts  # Run practice problems
bun lessons/projects/<filename>.ts  # Run a project
```

### Getting Help
- Hover over types in your editor to see TypeScript's inference
- Use `console.log(typeof variable)` to check types at runtime
- Read the error messages carefully - TypeScript errors are helpful!

---

## Phase 2: Backend Fundamentals

Ready for the next phase? Learn backend development with Bun, Hono, and Zod!

**[Continue to Backend Fundamentals →](./backend/README.md)**

### Prerequisites
- Complete Phase 1 (TypeScript Fundamentals) above
- Install backend dependencies: `bun add hono @hono/zod-validator @hono/swagger-ui zod`

### What You'll Learn
- **Bun Runtime** - Fast JavaScript runtime and package manager
- **Hono Framework** - Lightweight web framework for APIs
- **Zod Validation** - Type-safe schema validation

```bash
# Start backend lessons
bun lessons/backend/01-bun-basics.ts
```
