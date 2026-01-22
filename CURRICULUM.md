# ThinkStream Learning Curriculum

A comprehensive curriculum to master the ThinkStream tech stack, from TypeScript fundamentals to full-stack development.

---

## Curriculum Overview

```
CURRICULUM ROADMAP
│
├── Phase 1: TypeScript Fundamentals (COMPLETE)
│   └── 12 lessons + 12 practice files + 12 projects
│
├── Phase 2: Backend Development (Integrated) (COMPLETE)
│   ├── Module 2.1: Environment Setup (01-02)
│   ├── Module 2.2: Bun Runtime (03-07)
│   ├── Module 2.3: Hono Framework (08-12)
│   ├── Module 2.4: Zod Validation (13-16)
│   ├── Module 2.5: Database with Drizzle (17-21)
│   └── Module 2.6: Full Stack Integration (22-23)
│
├── Phase 3: Caching & Background Jobs
│   ├── Redis
│   └── BullMQ Queues
│
├── Phase 4: React Fundamentals
│   ├── React Core Concepts
│   ├── Hooks Deep Dive
│   └── State Patterns
│
├── Phase 5: React Native & Expo
│   ├── React Native Basics
│   ├── Expo SDK
│   └── expo-router
│
├── Phase 6: Data Fetching & State
│   ├── TanStack React Query
│   ├── Real-time (WebSocket)
│   └── Optimistic Updates
│
├── Phase 7: AI & LLM Integration
│   ├── OpenAI API
│   ├── Streaming Responses
│   └── ElevenLabs Audio
│
└── Phase 8: Advanced Topics
    ├── Graph Databases (Memgraph)
    ├── Authentication (better-auth)
    └── Production Infrastructure
```

---

## Phase 1: TypeScript Fundamentals

**Status:** Complete
**Location:** `lessons/`

### Lessons
| # | Topic | Status |
|---|-------|--------|
| 01 | Variables and Data Types | Complete |
| 02 | Operators and Expressions | Complete |
| 03 | Control Flow | Complete |
| 04 | Loops | Complete |
| 05 | Functions | Complete |
| 06 | Arrays | Complete |
| 07 | Objects | Complete |
| 08 | Interfaces | Complete |
| 09 | Union and Literal Types | Complete |
| 10 | Classes | Complete |
| 11 | Generics | Complete |
| 12 | Utility Types | Complete |

### Projects
| # | Project | Skills |
|---|---------|--------|
| 01 | Unit Converter | Variables, types |
| 02 | Tip Calculator | Operators |
| 03 | Grade Calculator | Control flow |
| 04 | Number Game | Loops |
| 05 | Password Generator | Functions |
| 06 | Todo List | Arrays |
| 07 | Contact Book | Objects |
| 08 | Blog System | Interfaces |
| 09 | Order Management | Union types |
| 10 | Bank Account | Classes |
| 11 | Data Structures | Generics |
| 12 | API Client | Utility types |

---

## Phase 2: Backend Development (Integrated)

**Status:** Complete
**Location:** `lessons/backend/`
**Total Lessons:** 23

### Module 2.1: Environment Setup (Lessons 01-02)
| # | Topic | Description |
|---|-------|-------------|
| 01 | Docker Fundamentals | Containers, images, Docker Desktop setup |
| 02 | Development Environment | docker-compose.yml, PostgreSQL & Redis containers |

### Module 2.2: Bun Runtime (Lessons 03-07)
| # | Topic | Description |
|---|-------|-------------|
| 03 | Bun Basics | Installation, running files, package management |
| 04 | Bun APIs | Bun.serve(), Bun.file(), Bun.$ |
| 05 | HTTP Server | Creating servers, handling requests |
| 06 | File System | Reading, writing, watching files |
| 07 | Testing with Bun | bun:test, assertions, mocking |

### Module 2.3: Hono Framework (Lessons 08-12)
| # | Topic | Description |
|---|-------|-------------|
| 08 | Hono Basics | App creation, routing fundamentals |
| 09 | Route Parameters | Path params, query strings |
| 10 | Middleware | Built-in and custom middleware |
| 11 | Request/Response | Parsing bodies, setting headers |
| 12 | Error Handling | Error middleware, status codes |

### Module 2.4: Zod Validation (Lessons 13-16)
| # | Topic | Description |
|---|-------|-------------|
| 13 | Schema Basics | Primitives, objects, arrays |
| 14 | Transformations | Coercion, transforms, refinements |
| 15 | Error Handling | Custom errors, formatting |
| 16 | Hono Integration | @hono/zod-validator, typed routes |

### Module 2.5: Database with Drizzle (Lessons 17-21)
| # | Topic | Description |
|---|-------|-------------|
| 17 | Drizzle Setup | Configuration, connection, schema definition |
| 18 | CRUD Operations | Select, insert, update, delete |
| 19 | Relations | One-to-many, many-to-many |
| 20 | Migrations | Generate, push, migrate |
| 21 | Drizzle-Zod | Schema to Zod integration |

### Module 2.6: Full Stack Integration (Lessons 22-23)
| # | Topic | Description |
|---|-------|-------------|
| 22 | API Architecture | Layered architecture, service patterns |
| 23 | Complete Backend | Full CRUD API with validation and database |

### Projects
| # | Project | Skills |
|---|---------|--------|
| 01 | Dev Environment | Docker setup, PostgreSQL & Redis containers |
| 02 | REST API | Hono routes, Zod validation |
| 03 | User Management | Drizzle CRUD, relations |
| 04 | Full Stack API | Complete backend with all technologies |

---

## Phase 3: Caching & Background Jobs

**Status:** Planned
**Location:** `lessons/caching/`

> **Prerequisites:** Phase 2 (Backend Development) for Docker containers and database knowledge.

### Module 3.1: Redis
| # | Topic | Description |
|---|-------|-------------|
| 01 | Redis Basics | Data types, commands |
| 02 | Caching Patterns | Cache-aside, write-through |
| 03 | Expiration | TTL, eviction policies |
| 04 | Pub/Sub | Real-time messaging |

### Module 3.2: BullMQ
| # | Topic | Description |
|---|-------|-------------|
| 01 | Queue Basics | Jobs, workers, events |
| 02 | Job Options | Retries, delays, priorities |
| 03 | Patterns | Rate limiting, batch processing |
| 04 | Monitoring | Dashboard, metrics |

### Projects
| # | Project | Skills |
|---|---------|--------|
| 01 | Session Store | Redis caching |
| 02 | Email Queue | BullMQ jobs |
| 03 | Rate Limiter | Redis + Hono middleware |

---

## Phase 4: React Fundamentals

**Status:** Planned
**Location:** `lessons/react/`

### Module 4.1: React Core
| # | Topic | Description |
|---|-------|-------------|
| 01 | JSX & Components | Syntax, props, children |
| 02 | State & Events | useState, event handling |
| 03 | Conditional Rendering | Ternary, &&, switch |
| 04 | Lists & Keys | Mapping, key prop |
| 05 | Forms | Controlled components |

### Module 4.2: Hooks Deep Dive
| # | Topic | Description |
|---|-------|-------------|
| 01 | useEffect | Side effects, cleanup |
| 02 | useRef | DOM refs, mutable values |
| 03 | useContext | Context API, providers |
| 04 | useReducer | Complex state logic |
| 05 | useMemo & useCallback | Performance optimization |
| 06 | Custom Hooks | Extracting logic |

### Projects
| # | Project | Skills |
|---|---------|--------|
| 01 | Todo App | State, lists, forms |
| 02 | Weather Dashboard | API fetching, effects |
| 03 | Theme Switcher | Context, custom hooks |

---

## Phase 5: React Native & Expo

**Status:** Planned
**Location:** `lessons/react-native/`

### Module 5.1: React Native Basics
| # | Topic | Description |
|---|-------|-------------|
| 01 | Core Components | View, Text, Image, ScrollView |
| 02 | Styling | StyleSheet, Flexbox |
| 03 | Lists | FlatList, SectionList |
| 04 | Touch & Gestures | Pressable, touch events |
| 05 | Platform Specific | Platform API, native modules |

### Module 5.2: Expo SDK
| # | Topic | Description |
|---|-------|-------------|
| 01 | Expo Setup | Create, run, build |
| 02 | Expo APIs | Camera, location, notifications |
| 03 | expo-router | File-based routing |
| 04 | Layouts | Stack, tabs, drawer |
| 05 | Deep Linking | URL schemes, universal links |

### Module 5.3: NativeWind
| # | Topic | Description |
|---|-------|-------------|
| 01 | Setup | Configuration, tailwind.config |
| 02 | Styling | Utility classes, responsive |
| 03 | Dark Mode | Color schemes, theming |
| 04 | Animations | Transitions, transforms |

### Projects
| # | Project | Skills |
|---|---------|--------|
| 01 | Notes App | Core components, navigation |
| 02 | Photo Gallery | Camera, FlatList, gestures |
| 03 | Settings Screen | Forms, storage, themes |

---

## Phase 6: Data Fetching & State

**Status:** Planned
**Location:** `lessons/data-fetching/`

### Module 6.1: TanStack React Query
| # | Topic | Description |
|---|-------|-------------|
| 01 | Query Basics | useQuery, query keys |
| 02 | Mutations | useMutation, cache updates |
| 03 | Caching | Stale time, cache time |
| 04 | Pagination | Infinite queries |
| 05 | Optimistic Updates | Rollback, invalidation |

### Module 6.2: Real-time
| # | Topic | Description |
|---|-------|-------------|
| 01 | WebSocket Basics | Connection, messages |
| 02 | Reconnection | Heartbeat, exponential backoff |
| 03 | With React Query | Subscription queries |

### Projects
| # | Project | Skills |
|---|---------|--------|
| 01 | API Client | Full Query setup |
| 02 | Chat App | WebSocket, real-time |
| 03 | Live Dashboard | Subscriptions, updates |

---

## Phase 7: AI & LLM Integration

**Status:** Planned
**Location:** `lessons/ai/`

### Module 7.1: OpenAI API
| # | Topic | Description |
|---|-------|-------------|
| 01 | API Basics | Authentication, models |
| 02 | Chat Completions | Messages, system prompts |
| 03 | Streaming | Server-sent events |
| 04 | Function Calling | Tool use, structured output |
| 05 | Embeddings | Vector search, similarity |

### Module 7.2: ElevenLabs
| # | Topic | Description |
|---|-------|-------------|
| 01 | Text-to-Speech | Voice synthesis |
| 02 | Voice Cloning | Custom voices |
| 03 | Streaming Audio | Real-time TTS |

### Projects
| # | Project | Skills |
|---|---------|--------|
| 01 | AI Chatbot | Completions, streaming |
| 02 | Voice Assistant | TTS, STT integration |
| 03 | RAG System | Embeddings, retrieval |

---

## Phase 8: Advanced Topics

**Status:** Planned
**Location:** `lessons/advanced/`

### Module 8.1: Graph Databases
| # | Topic | Description |
|---|-------|-------------|
| 01 | Graph Concepts | Nodes, edges, properties |
| 02 | Cypher Basics | MATCH, CREATE, MERGE |
| 03 | Memgraph | Setup, queries, MAGE |
| 04 | Knowledge Graphs | Modeling relationships |

### Module 8.2: Authentication
| # | Topic | Description |
|---|-------|-------------|
| 01 | Auth Concepts | Sessions, tokens, OAuth |
| 02 | better-auth | Setup, providers |
| 03 | Mobile Auth | Expo integration, secure storage |
| 04 | Protected Routes | Middleware, guards |

### Module 8.3: Production Infrastructure
| # | Topic | Description |
|---|-------|-------------|
| 01 | CI/CD | GitHub Actions, deployment |
| 02 | Monitoring | Logging, metrics, alerting |
| 03 | Scaling | Load balancing, horizontal scaling |

### Projects
| # | Project | Skills |
|---|---------|--------|
| 01 | Knowledge Graph | Memgraph, visualization |
| 02 | Auth System | Full auth flow |
| 03 | Production Deploy | Complete CI/CD pipeline |

---

## Getting Started

### Prerequisites
1. Complete Phase 1 (TypeScript) before moving to other phases
2. Each phase builds on previous knowledge
3. Complete projects to solidify learning

### How to Use This Curriculum

```bash
# Start with TypeScript fundamentals
bun lessons/01-variables-and-types.ts

# Complete practice problems
bun lessons/practice/01-variables-practice.ts

# Build projects to apply learning
bun lessons/projects/01-unit-converter.ts

# Move to backend development
bun lessons/backend/01-docker-fundamentals.ts
```

### Recommended Schedule

| Phase | Topic | Estimated Time | Prerequisites |
|-------|-------|---------------|---------------|
| 1 | TypeScript | 2-3 weeks | None |
| 2 | Backend Development (Integrated) | 3-4 weeks | Phase 1 |
| 3 | Caching (Redis, BullMQ) | 1 week | Phase 2 |
| 4 | React | 2 weeks | Phase 1 |
| 5 | React Native & Expo | 2 weeks | Phase 4 |
| 6 | Data Fetching (React Query) | 1 week | Phase 4, 5 |
| 7 | AI/LLM (OpenAI, ElevenLabs) | 1-2 weeks | Phase 2 |
| 8 | Advanced (Memgraph, Auth) | 2 weeks | All previous |

**Total: ~15-18 weeks for complete curriculum**

---

## Contributing

To add new lessons:
1. Follow the existing lesson structure
2. Include analogies and real-world examples
3. Add practice problems with tests
4. Create a corresponding project

---

## Progress Tracking

Use this checklist to track your progress:

- [x] Phase 1: TypeScript Fundamentals
- [x] Phase 2: Backend Development (Docker, Bun, Hono, Zod, Drizzle)
- [ ] Phase 3: Caching & Background Jobs (Redis, BullMQ)
- [ ] Phase 4: React Fundamentals
- [ ] Phase 5: React Native & Expo
- [ ] Phase 6: Data Fetching & State (TanStack Query)
- [ ] Phase 7: AI & LLM Integration (OpenAI, ElevenLabs)
- [ ] Phase 8: Advanced Topics (Memgraph, Auth, Production)
