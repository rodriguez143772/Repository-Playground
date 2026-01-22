# ThinkStream Learning Repository

A comprehensive learning curriculum to master the ThinkStream tech stack, from TypeScript fundamentals to full-stack development with React Native, Expo, Hono, and more.

## Quick Start

```bash
# Install dependencies
bun install

# Run a lesson
bun lessons/01-variables-and-types.ts

# Run a practice file
bun lessons/practice/01-variables-practice.ts

# Run a project
bun lessons/projects/01-unit-converter.ts
```

## Repository Structure

```
Repository_Playground/
├── lessons/                    # Learning content
│   ├── 01-variables-and-types.ts
│   ├── 02-operators-and-expressions.ts
│   ├── ... (12 lessons total)
│   ├── practice/              # Practice problems for each lesson
│   │   ├── 01-variables-practice.ts
│   │   └── ...
│   ├── projects/              # Real-world projects
│   │   ├── 01-unit-converter.ts
│   │   └── ...
│   └── README.md              # Lessons guide
├── CURRICULUM.md              # Full learning roadmap
├── TECH_STACK.md              # Technology documentation
└── README.md                  # This file
```

## Curriculum Overview

### Phase 1: TypeScript Fundamentals ✅ (Complete)

Master TypeScript from the ground up with 12 interactive lessons:

| Lesson | Topic | Key Concepts |
|--------|-------|--------------|
| 01 | Variables & Types | `let`, `const`, primitives, type annotations |
| 02 | Operators | Arithmetic, comparison, logical, ternary |
| 03 | Control Flow | `if/else`, `switch`, type guards |
| 04 | Loops | `for`, `while`, `for...of`, array methods |
| 05 | Functions | Arrow functions, callbacks, closures |
| 06 | Arrays | `map`, `filter`, `reduce`, `find` |
| 07 | Objects | Properties, destructuring, spread |
| 08 | Interfaces | Object shapes, extending, implementing |
| 09 | Union Types | Discriminated unions, type guards |
| 10 | Classes | Inheritance, access modifiers, abstract |
| 11 | Generics | Type parameters, constraints |
| 12 | Utility Types | `Partial`, `Pick`, `Omit`, `Record` |

### Future Phases (Planned)

See [CURRICULUM.md](./CURRICULUM.md) for the complete roadmap:

- **Phase 2:** Backend (Bun, Hono, Zod)
- **Phase 3:** Local Dev Environment (Docker, Containers)
- **Phase 4:** Database (PostgreSQL, Drizzle ORM)
- **Phase 5:** Caching (Redis, BullMQ)
- **Phase 6:** React Fundamentals
- **Phase 7:** React Native & Expo
- **Phase 8:** Data Fetching (TanStack Query)
- **Phase 9:** AI/LLM Integration (OpenAI)
- **Phase 10:** Advanced Topics (Memgraph, Auth)

## How Lessons Work

Each lesson follows an interactive structure:

1. **Concept Introduction** - Real-world analogies to explain concepts
2. **Code Examples** - Runnable code with explanations
3. **Interactive Sections** - Experiment with the code
4. **Key Takeaways** - Summary of what you learned

### Practice Problems

After each lesson, complete the practice file to test your knowledge:

```bash
# Lesson
bun lessons/05-functions.ts

# Then practice
bun lessons/practice/05-functions-practice.ts
```

Practice files include automated tests that verify your solutions.

### Projects

Apply your knowledge with real-world projects that build on cumulative learning:

| After Lesson | Project | Description |
|--------------|---------|-------------|
| 1 | Unit Converter | Convert between units |
| 2 | Tip Calculator | Calculate tips and split bills |
| 3 | Grade Calculator | Convert scores to grades |
| 4 | Number Game | Guess a random number |
| 5 | Password Generator | Generate secure passwords |
| 6 | Todo List | Manage tasks |
| 7 | Contact Book | Store and search contacts |
| 8 | Blog System | Posts, comments, users |
| 9 | Order Management | State machines |
| 10 | Bank Account | OOP banking system |
| 11 | Data Structures | Stack, Queue, LinkedList |
| 12 | API Client | Type-safe HTTP client |

## Tech Stack

This curriculum teaches the full ThinkStream stack:

### Backend
- **Bun** - Fast JavaScript/TypeScript runtime
- **Hono** - Lightweight web framework
- **Zod** - Schema validation
- **PostgreSQL** + **Drizzle ORM** - Database
- **Redis** + **BullMQ** - Caching and queues
- **Memgraph** - Graph database
- **OpenAI** - LLM integration

### Frontend
- **React Native** + **Expo** - Mobile development
- **expo-router** - File-based routing
- **TanStack Query** - Server state
- **NativeWind** - Tailwind for React Native
- **Reanimated** - Animations

See [TECH_STACK.md](./TECH_STACK.md) for complete documentation.

## Contributing

To add new lessons:

1. Follow the existing lesson structure
2. Include analogies and real-world examples
3. Add practice problems with automated tests
4. Create a corresponding project

## License

Private repository for ThinkStream team learning.
