# ThinkStream Tech Stack

This document outlines the complete technology stack used in the ThinkStream application, organized by domain.

---

## Backend Tech Stack (`thinkstream/`)

### Runtime & Package Manager

| Technology | Purpose | Docs |
|------------|---------|------|
| **Bun** | JavaScript/TypeScript runtime (runs TS natively, faster than Node.js) | [bun.sh](https://bun.sh) |

### Framework & API

| Technology | Purpose | Docs |
|------------|---------|------|
| **Hono** | Fast, lightweight web framework for API routes | [hono.dev](https://hono.dev) |
| **Zod** | Schema validation and type-safe parsing | [zod.dev](https://zod.dev) |
| **Zod-to-OpenAPI** | Auto-generate OpenAPI docs from Zod schemas | [github](https://github.com/asteasolutions/zod-to-openapi) |
| **Swagger UI** | API documentation via `@hono/swagger-ui` | [swagger.io](https://swagger.io) |

### Database

| Technology | Purpose | Docs |
|------------|---------|------|
| **PostgreSQL** | Primary relational database | [postgresql.org](https://www.postgresql.org) |
| **Drizzle ORM** | TypeScript ORM for database operations | [orm.drizzle.team](https://orm.drizzle.team) |
| **Drizzle-Zod** | Bridge between Drizzle and Zod schemas | [orm.drizzle.team](https://orm.drizzle.team/docs/zod) |
| **PgBouncer** | Connection pooling for PostgreSQL | [pgbouncer.org](https://www.pgbouncer.org) |

### Caching & Queues

| Technology | Purpose | Docs |
|------------|---------|------|
| **Redis** | Caching layer and session storage | [redis.io](https://redis.io) |
| **BullMQ** | Background job processing and task queues | [bullmq.io](https://bullmq.io) |

### Graph Database

| Technology | Purpose | Docs |
|------------|---------|------|
| **Memgraph** | Graph database for knowledge graph features (Cypher query language) | [memgraph.com](https://memgraph.com) |

### AI/LLM

| Technology | Purpose | Docs |
|------------|---------|------|
| **OpenAI** | LLM integration for AI features | [platform.openai.com](https://platform.openai.com) |
| **ElevenLabs** | Audio/voice synthesis and features | [elevenlabs.io](https://elevenlabs.io) |

### Infrastructure

| Technology | Purpose | Docs |
|------------|---------|------|
| **Docker/Docker Compose** | Local development environment and containerization | [docker.com](https://www.docker.com) |
| **Doppler** | Secrets management | [doppler.com](https://www.doppler.com) |
| **Google Cloud Pub/Sub** | Message queue for email sync and async events | [cloud.google.com](https://cloud.google.com/pubsub) |

### Code Quality

| Technology | Purpose | Docs |
|------------|---------|------|
| **TypeScript** | Type safety across the codebase | [typescriptlang.org](https://www.typescriptlang.org) |
| **Biome** | Fast linting and formatting (replaces ESLint + Prettier) | [biomejs.dev](https://biomejs.dev) |

---

## Frontend Tech Stack (`mobile/`)

### Framework

| Technology | Purpose | Docs |
|------------|---------|------|
| **React Native** | Cross-platform mobile development | [reactnative.dev](https://reactnative.dev) |
| **Expo (SDK 54)** | React Native toolchain and services | [expo.dev](https://expo.dev) |
| **expo-router** | File-based routing for React Native | [expo.dev/router](https://expo.dev/router) |

### State Management & Data Fetching

| Technology | Purpose | Docs |
|------------|---------|------|
| **TanStack React Query** | Server state management and caching | [tanstack.com/query](https://tanstack.com/query) |
| **Zod** | Client-side validation (shared with backend) | [zod.dev](https://zod.dev) |

### Authentication

| Technology | Purpose | Docs |
|------------|---------|------|
| **better-auth** | Authentication library | [better-auth.com](https://www.better-auth.com) |
| **@better-auth/expo** | Expo integration for better-auth | [better-auth.com](https://www.better-auth.com) |

### Navigation

| Technology | Purpose | Docs |
|------------|---------|------|
| **React Navigation** | Navigation library (native-stack, bottom-tabs, drawer) | [reactnavigation.org](https://reactnavigation.org) |

### UI Components & Animation

| Technology | Purpose | Docs |
|------------|---------|------|
| **React Native Reanimated** | Declarative animations | [docs.swmansion.com](https://docs.swmansion.com/react-native-reanimated) |
| **React Native Gesture Handler** | Touch and gesture handling | [docs.swmansion.com](https://docs.swmansion.com/react-native-gesture-handler) |
| **@gorhom/bottom-sheet** | Bottom sheet component | [gorhom.github.io](https://gorhom.github.io/react-native-bottom-sheet) |
| **@shopify/flash-list** | High-performance lists | [shopify.github.io](https://shopify.github.io/flash-list) |
| **@shopify/react-native-skia** | 2D graphics and drawing | [shopify.github.io](https://shopify.github.io/react-native-skia) |
| **Lucide React Native** | Icon library | [lucide.dev](https://lucide.dev) |
| **React Native SVG** | SVG support | [github](https://github.com/software-mansion/react-native-svg) |

### Styling

| Technology | Purpose | Docs |
|------------|---------|------|
| **NativeWind** | Tailwind CSS for React Native | [nativewind.dev](https://www.nativewind.dev) |

### Calendar & Date

| Technology | Purpose | Docs |
|------------|---------|------|
| **@howljs/calendar-kit** | Calendar components | [howljs.github.io](https://howljs.github.io/react-native-calendar-kit) |
| **date-fns** | Date utility library | [date-fns.org](https://date-fns.org) |
| **dayjs** | Lightweight date library | [day.js.org](https://day.js.org) |

### Payments

| Technology | Purpose | Docs |
|------------|---------|------|
| **Stripe** | Payment processing via `@stripe/stripe-react-native` | [stripe.com](https://stripe.com/docs/mobile) |

### Real-time

| Technology | Purpose | Docs |
|------------|---------|------|
| **WebSocket** | Real-time bidirectional communication | [MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) |
| **WebRTC** | Voice/video via `react-native-webrtc` | [webrtc.org](https://webrtc.org) |
| **OpenAI Realtime API** | Real-time AI features | [platform.openai.com](https://platform.openai.com) |

### Code Quality

| Technology | Purpose | Docs |
|------------|---------|------|
| **TypeScript** | Type safety | [typescriptlang.org](https://www.typescriptlang.org) |
| **Biome** | Linting and formatting | [biomejs.dev](https://biomejs.dev) |
| **Jest** | Testing framework | [jestjs.io](https://jestjs.io) |

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              React Native + Expo                         │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │   │
│  │  │ Screens │  │ TanStack│  │NativeWind│  │ Zod    │    │   │
│  │  │ (Router)│  │  Query  │  │ Styling │  │Validation│   │   │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘    │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/WebSocket
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         BACKEND                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    Bun + Hono                            │   │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐    │   │
│  │  │  API    │  │   Zod   │  │ OpenAPI │  │ Auth    │    │   │
│  │  │ Routes  │  │ Schemas │  │  Docs   │  │(better) │    │   │
│  │  └─────────┘  └─────────┘  └─────────┘  └─────────┘    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                              │                                   │
│              ┌───────────────┼───────────────┐                  │
│              ▼               ▼               ▼                  │
│  ┌─────────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │   PostgreSQL    │ │    Redis    │ │  Memgraph   │           │
│  │   + Drizzle     │ │   Cache     │ │ Graph DB    │           │
│  └─────────────────┘ └─────────────┘ └─────────────┘           │
│                              │                                   │
│              ┌───────────────┼───────────────┐                  │
│              ▼               ▼               ▼                  │
│  ┌─────────────────┐ ┌─────────────┐ ┌─────────────┐           │
│  │     BullMQ      │ │   OpenAI    │ │ ElevenLabs  │           │
│  │  Job Queues     │ │     LLM     │ │   Audio     │           │
│  └─────────────────┘ └─────────────┘ └─────────────┘           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      INFRASTRUCTURE                              │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐     │
│  │   Docker    │  │   Doppler   │  │  Google Cloud       │     │
│  │  Compose    │  │   Secrets   │  │  Pub/Sub            │     │
│  └─────────────┘  └─────────────┘  └─────────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
```

---

## Learning Path

To become proficient with this stack, follow this recommended order:

### Phase 1: Foundations (Complete)
- [x] TypeScript Fundamentals (Lessons 1-12)
- [x] TypeScript Projects

### Phase 2: Backend Core
- [ ] Bun Runtime & APIs
- [ ] Hono Framework
- [ ] Zod Validation
- [ ] REST API Design

### Phase 3: Local Development Environment
- [ ] Docker Basics
- [ ] Docker Compose
- [ ] Database Containers (PostgreSQL, Redis, Memgraph)

### Phase 4: Database
- [ ] SQL Fundamentals
- [ ] PostgreSQL
- [ ] Drizzle ORM
- [ ] Database Design Patterns

### Phase 5: Caching & Queues
- [ ] Redis Fundamentals
- [ ] Caching Strategies
- [ ] BullMQ Job Queues

### Phase 6: React Fundamentals
- [ ] React Core Concepts
- [ ] Hooks Deep Dive
- [ ] State Patterns

### Phase 7: React Native & Expo
- [ ] React Native Basics
- [ ] Expo SDK & expo-router
- [ ] NativeWind Styling

### Phase 8: State & Data
- [ ] TanStack React Query
- [ ] Real-time with WebSocket
- [ ] Optimistic Updates

### Phase 9: AI/LLM Integration
- [ ] OpenAI API
- [ ] ElevenLabs Audio
- [ ] Streaming & Function Calling

### Phase 10: Advanced Topics
- [ ] Graph Databases (Memgraph)
- [ ] Authentication (better-auth)
- [ ] Production Infrastructure (CI/CD)

---

## Quick Reference

### Running the Stack Locally

```bash
# Backend
cd thinkstream
bun install
bun dev

# Frontend
cd mobile
bun install
bun expo start
```

### Key Commands

```bash
# Bun
bun run <script>          # Run script from package.json
bun add <package>         # Add dependency
bun test                  # Run tests

# Drizzle
bun drizzle-kit generate  # Generate migrations
bun drizzle-kit push      # Push schema to database
bun drizzle-kit studio    # Open Drizzle Studio

# Expo
bun expo start            # Start dev server
bun expo build            # Create production build
bun expo doctor           # Check for issues
```

---

## Resources

### Official Documentation
- [Bun Docs](https://bun.sh/docs)
- [Hono Docs](https://hono.dev/docs)
- [Drizzle Docs](https://orm.drizzle.team/docs)
- [Expo Docs](https://docs.expo.dev)
- [React Native Docs](https://reactnative.dev/docs)

### Community
- [Bun Discord](https://bun.sh/discord)
- [Expo Discord](https://chat.expo.dev)
- [Drizzle Discord](https://driz.link/discord)
