# React Native & Expo Curriculum

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Teach React Native and Expo development by building mobile apps that connect to the existing Hono backend APIs.

**Prerequisites:**
- Phase 1: TypeScript Fundamentals (Complete)
- Phase 2: Backend Development - Bun, Hono, Zod, Drizzle, PostgreSQL (Complete)

**Tech Stack:** React Native, Expo (SDK 54+), expo-router, NativeWind/Tailwind, TanStack React Query, Zod

---

## Curriculum Overview

```
REACT NATIVE CURRICULUM ROADMAP
|
+-- Phase A: React Fundamentals (Foundation)
|   +-- Module A.1: React Core Concepts (01-05)
|   +-- Module A.2: Hooks Deep Dive (06-11)
|   +-- Module A.3: Patterns & Best Practices (12-14)
|
+-- Phase B: React Native Basics
|   +-- Module B.1: Core Components (01-05)
|   +-- Module B.2: Styling & Layout (06-09)
|   +-- Module B.3: User Input & Touch (10-13)
|
+-- Phase C: Expo & Navigation
|   +-- Module C.1: Expo Setup & SDK (01-04)
|   +-- Module C.2: expo-router Navigation (05-09)
|   +-- Module C.3: NativeWind Styling (10-13)
|
+-- Phase D: Data & State Management
|   +-- Module D.1: TanStack React Query (01-06)
|   +-- Module D.2: API Integration (07-10)
|   +-- Module D.3: Offline & Caching (11-13)
|
+-- Projects: Mobile Apps for Backend APIs
    +-- Project 1: Task Manager Mobile
    +-- Project 2: URL Shortener Mobile
    +-- Project 3: Blog/Notes Mobile (DB-focused)
```

---

## Phase A: React Fundamentals

**Status:** Planned
**Location:** `lessons/react/`
**Total Lessons:** 14
**Estimated Time:** 2 weeks

> This phase teaches React concepts in isolation before introducing React Native.
> All examples run in a browser environment using Bun.serve() with HTML imports.

### Module A.1: React Core Concepts (Lessons 01-05)

| # | Topic | Description | Key Concepts |
|---|-------|-------------|--------------|
| 01 | JSX & Components | What is React, JSX syntax, functional components | JSX, components, props |
| 02 | Props & Children | Passing data between components | props, children, composition |
| 03 | State & Events | Managing component state | useState, event handlers |
| 04 | Conditional Rendering | Showing/hiding content | ternary, &&, switch patterns |
| 05 | Lists & Keys | Rendering arrays of data | map(), key prop, list updates |

### Module A.2: Hooks Deep Dive (Lessons 06-11)

| # | Topic | Description | Key Concepts |
|---|-------|-------------|--------------|
| 06 | useEffect | Side effects and lifecycle | effects, cleanup, dependencies |
| 07 | useRef | DOM refs and mutable values | refs, focus, intervals |
| 08 | useContext | Sharing state across components | context, providers, consumers |
| 09 | useReducer | Complex state logic | reducers, dispatch, actions |
| 10 | useMemo & useCallback | Performance optimization | memoization, referential equality |
| 11 | Custom Hooks | Extracting reusable logic | custom hooks, composition |

### Module A.3: Patterns & Best Practices (Lessons 12-14)

| # | Topic | Description | Key Concepts |
|---|-------|-------------|--------------|
| 12 | Component Patterns | Common React patterns | container/presentational, compound components |
| 13 | Error Boundaries | Handling errors gracefully | error boundaries, fallbacks |
| 14 | Performance | React performance optimization | React.memo, lazy loading, profiler |

### Practice Files (Phase A)

| # | File | Focus |
|---|------|-------|
| 01 | `practice/01-jsx-components-practice.ts` | JSX syntax, component creation |
| 02 | `practice/02-state-events-practice.ts` | useState, event handlers |
| 03 | `practice/03-hooks-practice.ts` | useEffect, useRef, custom hooks |
| 04 | `practice/04-context-reducer-practice.ts` | useContext, useReducer |

---

## Phase B: React Native Basics

**Status:** Planned
**Location:** `lessons/react-native/`
**Total Lessons:** 13
**Estimated Time:** 2 weeks

> This phase introduces React Native core concepts and components.
> All examples run in Expo Go on a physical device or simulator.

### Module B.1: Core Components (Lessons 01-05)

| # | Topic | Description | Key Concepts |
|---|-------|-------------|--------------|
| 01 | React Native Introduction | What is RN, how it differs from web | native components, bridge |
| 02 | View & Text | Basic building blocks | View, Text, styling basics |
| 03 | Image & ImageBackground | Displaying images | Image, source, resizeMode |
| 04 | ScrollView | Scrollable content | ScrollView, contentContainerStyle |
| 05 | FlatList & SectionList | Efficient lists | FlatList, renderItem, keyExtractor |

### Module B.2: Styling & Layout (Lessons 06-09)

| # | Topic | Description | Key Concepts |
|---|-------|-------------|--------------|
| 06 | StyleSheet API | Creating styles | StyleSheet.create, inline styles |
| 07 | Flexbox Layout | Layout fundamentals | flex, flexDirection, justifyContent, alignItems |
| 08 | Dimensions & Safe Areas | Screen sizing | Dimensions, SafeAreaView, useWindowDimensions |
| 09 | Platform-Specific Styling | iOS vs Android | Platform.select, Platform.OS |

### Module B.3: User Input & Touch (Lessons 10-13)

| # | Topic | Description | Key Concepts |
|---|-------|-------------|--------------|
| 10 | TextInput | Text input handling | TextInput, onChangeText, keyboard types |
| 11 | Pressable & Touchable | Touch interactions | Pressable, Touchable*, onPress |
| 12 | Keyboard Handling | Keyboard management | KeyboardAvoidingView, Keyboard API |
| 13 | Gesture Basics | Basic gestures | Pan, Pinch, basic gesture handling |

### Practice Files (Phase B)

| # | File | Focus |
|---|------|-------|
| 01 | `practice/01-core-components-practice.ts` | View, Text, Image |
| 02 | `practice/02-lists-practice.ts` | FlatList, SectionList |
| 03 | `practice/03-styling-practice.ts` | StyleSheet, Flexbox |
| 04 | `practice/04-input-touch-practice.ts` | TextInput, Pressable |

---

## Phase C: Expo & Navigation

**Status:** Planned
**Location:** `lessons/expo/`
**Total Lessons:** 13
**Estimated Time:** 2 weeks

> This phase covers Expo SDK features and expo-router navigation.

### Module C.1: Expo Setup & SDK (Lessons 01-04)

| # | Topic | Description | Key Concepts |
|---|-------|-------------|--------------|
| 01 | Expo Introduction | What is Expo, project setup | npx create-expo-app, Expo Go |
| 02 | Project Structure | File organization | app/, assets/, app.json |
| 03 | Expo SDK APIs | Common SDK features | expo-constants, expo-device |
| 04 | Development Workflow | Running and debugging | expo start, hot reload, debugging |

### Module C.2: expo-router Navigation (Lessons 05-09)

| # | Topic | Description | Key Concepts |
|---|-------|-------------|--------------|
| 05 | File-Based Routing | Router fundamentals | app/ directory, page files |
| 06 | Stack Navigation | Screen stacks | _layout.tsx, Stack, navigation options |
| 07 | Tab Navigation | Bottom tabs | Tabs, tab icons, badges |
| 08 | Drawer Navigation | Side menu | Drawer, drawer content |
| 09 | Route Parameters | Passing data | useLocalSearchParams, dynamic routes |

### Module C.3: NativeWind Styling (Lessons 10-13)

| # | Topic | Description | Key Concepts |
|---|-------|-------------|--------------|
| 10 | NativeWind Setup | Configuration | tailwind.config.js, babel preset |
| 11 | Utility Classes | Tailwind in RN | className, responsive design |
| 12 | Dark Mode | Theme switching | color schemes, useColorScheme |
| 13 | Custom Components | Building with NativeWind | styled components, variants |

### Practice Files (Phase C)

| # | File | Focus |
|---|------|-------|
| 01 | `practice/01-expo-setup-practice.ts` | Project creation, SDK APIs |
| 02 | `practice/02-navigation-practice.ts` | Stack, tabs, drawer |
| 03 | `practice/03-nativewind-practice.ts` | Styling with Tailwind |

---

## Phase D: Data & State Management

**Status:** Planned
**Location:** `lessons/data-fetching/`
**Total Lessons:** 13
**Estimated Time:** 2 weeks

> This phase teaches TanStack React Query for data fetching and state management.
> Examples connect to the Hono backend APIs built in Phase 2.

### Module D.1: TanStack React Query (Lessons 01-06)

| # | Topic | Description | Key Concepts |
|---|-------|-------------|--------------|
| 01 | React Query Setup | Installation and setup | QueryClient, QueryClientProvider |
| 02 | useQuery Basics | Fetching data | useQuery, queryKey, queryFn |
| 03 | Query States | Loading, error, success | isLoading, isError, data, error |
| 04 | useMutation | Creating/updating data | useMutation, mutate, onSuccess |
| 05 | Query Invalidation | Keeping data fresh | invalidateQueries, refetch |
| 06 | Query Caching | Understanding the cache | staleTime, gcTime, caching strategies |

### Module D.2: API Integration (Lessons 07-10)

| # | Topic | Description | Key Concepts |
|---|-------|-------------|--------------|
| 07 | API Client Setup | Creating a typed client | fetch wrapper, base URL, headers |
| 08 | Zod Integration | Response validation | Zod schemas, type inference |
| 09 | Error Handling | API error handling | error types, toast notifications |
| 10 | Optimistic Updates | Instant UI feedback | onMutate, rollback, optimistic data |

### Module D.3: Offline & Caching (Lessons 11-13)

| # | Topic | Description | Key Concepts |
|---|-------|-------------|--------------|
| 11 | Offline Mode | Handling no network | NetInfo, offline detection |
| 12 | Persistent Cache | Saving query cache | AsyncStorage, cache persistence |
| 13 | Background Sync | Syncing when online | background refetch, retry |

### Practice Files (Phase D)

| # | File | Focus |
|---|------|-------|
| 01 | `practice/01-react-query-practice.ts` | useQuery, useMutation |
| 02 | `practice/02-api-integration-practice.ts` | API client, Zod validation |
| 03 | `practice/03-offline-practice.ts` | Offline mode, caching |

---

## Projects: Mobile Apps for Backend APIs

**Location:** `lessons/projects/mobile/`

These projects build full mobile applications that connect to the backend APIs created in Phase 2.

### Project 1: Task Manager Mobile

**Connects to:** `lessons/backend/projects/01-rest-api.ts` (Task Manager REST API)

**Description:** Build a complete mobile task management app with:
- Task list with pull-to-refresh
- Create, edit, and delete tasks
- Status updates (swipe actions)
- Filter by status and priority
- Search functionality
- Offline support with optimistic updates

**API Endpoints Used:**
```
GET    /tasks           - List tasks (with pagination)
GET    /tasks/:id       - Get single task
POST   /tasks           - Create task
PUT    /tasks/:id       - Update task
PATCH  /tasks/:id/status - Update status
DELETE /tasks/:id       - Delete task
GET    /tasks/stats     - Get statistics
```

**Mobile Features:**
- FlatList with pull-to-refresh
- Swipeable list items (complete/delete)
- Form validation with Zod
- Tab navigation (All, Todo, In Progress, Done)
- Statistics dashboard
- Search bar with debouncing
- Offline mode with queue

**File Structure:**
```
projects/mobile/01-task-manager/
+-- app/
|   +-- _layout.tsx           # Root layout with QueryClient
|   +-- (tabs)/
|   |   +-- _layout.tsx       # Tab navigator
|   |   +-- index.tsx         # All tasks
|   |   +-- todo.tsx          # Todo tasks
|   |   +-- in-progress.tsx   # In progress tasks
|   |   +-- done.tsx          # Done tasks
|   +-- task/
|   |   +-- [id].tsx          # Task detail/edit
|   |   +-- new.tsx           # Create task
|   +-- stats.tsx             # Statistics
+-- components/
|   +-- TaskCard.tsx
|   +-- TaskForm.tsx
|   +-- TaskList.tsx
|   +-- StatusBadge.tsx
|   +-- PriorityPicker.tsx
+-- hooks/
|   +-- useTasks.ts           # React Query hooks
|   +-- useTaskMutations.ts
+-- api/
|   +-- client.ts             # API client
|   +-- tasks.ts              # Task API functions
+-- schemas/
|   +-- task.ts               # Zod schemas (shared with backend)
```

**Skills Practiced:**
- React Query for CRUD operations
- Form handling with validation
- Tab navigation
- List optimization with FlatList
- Offline support

---

### Project 2: URL Shortener Mobile

**Connects to:** `lessons/backend/projects/03-url-shortener.ts` (URL Shortener API)

**Description:** Build a mobile app for creating and managing short URLs:
- Create short URLs with optional custom codes
- View URL list with click statistics
- Share short URLs
- QR code generation
- Link analytics dashboard

**API Endpoints Used:**
```
POST   /shorten              - Create short URL
GET    /api/urls             - List all URLs
GET    /api/urls/:code       - Get URL info
GET    /api/urls/:code/stats - Get statistics
PATCH  /api/urls/:code       - Update URL
DELETE /api/urls/:code       - Delete URL
```

**Mobile Features:**
- URL input with validation
- Custom code input
- Expiration date picker
- Share sheet integration
- QR code generation (expo-barcode-scanner)
- Clipboard copy
- Statistics charts
- Deep linking to open URLs

**File Structure:**
```
projects/mobile/02-url-shortener/
+-- app/
|   +-- _layout.tsx           # Root layout
|   +-- (tabs)/
|   |   +-- _layout.tsx       # Tab navigator
|   |   +-- index.tsx         # Create URL
|   |   +-- urls.tsx          # URL list
|   |   +-- stats.tsx         # Analytics
|   +-- url/
|       +-- [code].tsx        # URL detail
+-- components/
|   +-- UrlCard.tsx
|   +-- UrlForm.tsx
|   +-- QRCode.tsx
|   +-- StatsChart.tsx
|   +-- ShareButton.tsx
+-- hooks/
|   +-- useUrls.ts
|   +-- useUrlMutations.ts
+-- api/
|   +-- client.ts
|   +-- urls.ts
+-- schemas/
|   +-- url.ts
```

**Skills Practiced:**
- Form validation
- Native sharing (expo-sharing)
- QR codes (expo-barcode-scanner or react-native-qrcode-svg)
- Clipboard API
- Data visualization
- Deep linking

---

### Project 3: Blog/Notes Mobile

**Connects to:** New backend project (Blog/Notes API with users and posts)

**Description:** Build a mobile app for reading and writing blog posts/notes:
- User authentication (better-auth)
- Create and edit posts/notes
- Rich text editing
- Image uploads
- Bookmarks and favorites
- Search and filtering
- Markdown preview

**API Endpoints (to be built):**
```
# Auth
POST   /auth/register    - Register user
POST   /auth/login       - Login user
POST   /auth/logout      - Logout user
GET    /auth/me          - Get current user

# Posts
GET    /posts            - List posts
GET    /posts/:id        - Get post
POST   /posts            - Create post
PUT    /posts/:id        - Update post
DELETE /posts/:id        - Delete post
GET    /posts/search     - Search posts

# Bookmarks
GET    /bookmarks        - List bookmarks
POST   /bookmarks/:id    - Add bookmark
DELETE /bookmarks/:id    - Remove bookmark
```

**Mobile Features:**
- Authentication flow
- Secure token storage (expo-secure-store)
- Pull-to-refresh feed
- Create/edit with markdown
- Image picker and upload
- Bookmark management
- Search with filters
- Push notifications (expo-notifications)

**File Structure:**
```
projects/mobile/03-blog-notes/
+-- app/
|   +-- _layout.tsx           # Root layout with auth
|   +-- (auth)/
|   |   +-- login.tsx
|   |   +-- register.tsx
|   +-- (tabs)/
|   |   +-- _layout.tsx       # Tab navigator (requires auth)
|   |   +-- feed.tsx          # Post feed
|   |   +-- bookmarks.tsx     # Bookmarks
|   |   +-- profile.tsx       # User profile
|   +-- post/
|   |   +-- [id].tsx          # Post detail
|   |   +-- new.tsx           # Create post
|   |   +-- edit/[id].tsx     # Edit post
|   +-- search.tsx            # Search
+-- components/
|   +-- PostCard.tsx
|   +-- PostEditor.tsx
|   +-- MarkdownPreview.tsx
|   +-- ImagePicker.tsx
|   +-- BookmarkButton.tsx
|   +-- AuthGuard.tsx
+-- hooks/
|   +-- useAuth.ts
|   +-- usePosts.ts
|   +-- useBookmarks.ts
+-- api/
|   +-- client.ts
|   +-- auth.ts
|   +-- posts.ts
+-- schemas/
|   +-- auth.ts
|   +-- post.ts
+-- context/
|   +-- AuthContext.tsx
```

**Skills Practiced:**
- Authentication flows
- Secure storage
- Protected routes
- Image handling
- Rich text/markdown
- Search implementation
- State management

---

## Backend Project Addition Required

Before implementing Project 3, the backend needs a Blog/Notes API:

### Backend Project: Blog/Notes API

**Location:** `lessons/backend/projects/04-blog-api.ts`

**Features:**
- User registration and login
- JWT authentication
- CRUD for posts
- Author-post relationships
- Bookmarks
- Full-text search

**Database Schema (additions to existing):**
```typescript
// Already exists in schema.ts:
// - users table
// - posts table with authorId foreign key

// New tables needed:
export const bookmarks = pgTable("bookmarks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  postId: integer("post_id").references(() => posts.id).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const bookmarksRelations = relations(bookmarks, ({ one }) => ({
  user: one(users, { fields: [bookmarks.userId], references: [users.id] }),
  post: one(posts, { fields: [bookmarks.postId], references: [posts.id] }),
}));
```

---

## File Structure Summary

```
lessons/
+-- react/                          # Phase A: React Fundamentals
|   +-- 01-jsx-components.ts
|   +-- 02-props-children.ts
|   +-- 03-state-events.ts
|   +-- 04-conditional-rendering.ts
|   +-- 05-lists-keys.ts
|   +-- 06-use-effect.ts
|   +-- 07-use-ref.ts
|   +-- 08-use-context.ts
|   +-- 09-use-reducer.ts
|   +-- 10-use-memo-callback.ts
|   +-- 11-custom-hooks.ts
|   +-- 12-component-patterns.ts
|   +-- 13-error-boundaries.ts
|   +-- 14-performance.ts
|   +-- practice/
|   |   +-- 01-jsx-components-practice.ts
|   |   +-- 02-state-events-practice.ts
|   |   +-- 03-hooks-practice.ts
|   |   +-- 04-context-reducer-practice.ts
|   +-- README.md
|
+-- react-native/                   # Phase B: React Native Basics
|   +-- 01-introduction.ts
|   +-- 02-view-text.ts
|   +-- 03-image.ts
|   +-- 04-scroll-view.ts
|   +-- 05-flat-list.ts
|   +-- 06-stylesheet.ts
|   +-- 07-flexbox.ts
|   +-- 08-dimensions-safe-area.ts
|   +-- 09-platform-specific.ts
|   +-- 10-text-input.ts
|   +-- 11-pressable-touchable.ts
|   +-- 12-keyboard.ts
|   +-- 13-gestures.ts
|   +-- practice/
|   |   +-- 01-core-components-practice.ts
|   |   +-- 02-lists-practice.ts
|   |   +-- 03-styling-practice.ts
|   |   +-- 04-input-touch-practice.ts
|   +-- README.md
|
+-- expo/                           # Phase C: Expo & Navigation
|   +-- 01-expo-introduction.ts
|   +-- 02-project-structure.ts
|   +-- 03-expo-sdk.ts
|   +-- 04-development-workflow.ts
|   +-- 05-file-based-routing.ts
|   +-- 06-stack-navigation.ts
|   +-- 07-tab-navigation.ts
|   +-- 08-drawer-navigation.ts
|   +-- 09-route-parameters.ts
|   +-- 10-nativewind-setup.ts
|   +-- 11-utility-classes.ts
|   +-- 12-dark-mode.ts
|   +-- 13-custom-components.ts
|   +-- practice/
|   |   +-- 01-expo-setup-practice.ts
|   |   +-- 02-navigation-practice.ts
|   |   +-- 03-nativewind-practice.ts
|   +-- README.md
|
+-- data-fetching/                  # Phase D: Data & State
|   +-- 01-react-query-setup.ts
|   +-- 02-use-query-basics.ts
|   +-- 03-query-states.ts
|   +-- 04-use-mutation.ts
|   +-- 05-query-invalidation.ts
|   +-- 06-query-caching.ts
|   +-- 07-api-client-setup.ts
|   +-- 08-zod-integration.ts
|   +-- 09-error-handling.ts
|   +-- 10-optimistic-updates.ts
|   +-- 11-offline-mode.ts
|   +-- 12-persistent-cache.ts
|   +-- 13-background-sync.ts
|   +-- practice/
|   |   +-- 01-react-query-practice.ts
|   |   +-- 02-api-integration-practice.ts
|   |   +-- 03-offline-practice.ts
|   +-- README.md
|
+-- projects/
    +-- mobile/
        +-- 01-task-manager/        # Project 1: Task Manager Mobile
        +-- 02-url-shortener/       # Project 2: URL Shortener Mobile
        +-- 03-blog-notes/          # Project 3: Blog/Notes Mobile
        +-- README.md
```

---

## Dependencies

### Core Dependencies

```json
{
  "dependencies": {
    "expo": "~54.0.0",
    "expo-router": "~4.0.0",
    "react": "18.3.1",
    "react-native": "0.76.0",
    "@tanstack/react-query": "^5.0.0",
    "zod": "^3.23.0",
    "nativewind": "^4.0.0",
    "tailwindcss": "^3.4.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "@types/react": "~18.3.0"
  }
}
```

### Additional Dependencies by Phase

**Phase B (React Native):**
- `react-native-gesture-handler`
- `react-native-reanimated`
- `react-native-safe-area-context`

**Phase C (Expo):**
- `expo-constants`
- `expo-device`
- `expo-status-bar`
- `@react-navigation/native`
- `@react-navigation/native-stack`
- `@react-navigation/bottom-tabs`
- `@react-navigation/drawer`

**Phase D (Data Fetching):**
- `@tanstack/react-query`
- `@react-native-async-storage/async-storage`
- `@react-native-community/netinfo`

**Project Dependencies:**
- `expo-clipboard`
- `expo-sharing`
- `expo-secure-store`
- `expo-image-picker`
- `expo-notifications`
- `react-native-qrcode-svg`
- `lucide-react-native`

---

## Estimated Timeline

| Phase | Topic | Lessons | Practice | Estimated Time |
|-------|-------|---------|----------|----------------|
| A | React Fundamentals | 14 | 4 | 2 weeks |
| B | React Native Basics | 13 | 4 | 2 weeks |
| C | Expo & Navigation | 13 | 3 | 2 weeks |
| D | Data & State | 13 | 3 | 2 weeks |
| - | Project 1: Task Manager | - | - | 1 week |
| - | Project 2: URL Shortener | - | - | 1 week |
| - | Project 3: Blog/Notes | - | - | 1-2 weeks |

**Total: ~11-12 weeks for complete curriculum**

---

## Prerequisites Checklist

Before starting this curriculum:

- [ ] Complete Phase 1: TypeScript Fundamentals
- [ ] Complete Phase 2: Backend Development
- [ ] Backend APIs running locally:
  - [ ] Task Manager API at `http://localhost:3000`
  - [ ] URL Shortener API at `http://localhost:3001`
- [ ] Development environment:
  - [ ] Node.js 20+
  - [ ] Bun installed
  - [ ] Docker Desktop running (for backend databases)
  - [ ] Expo Go app on phone (iOS/Android)
  - [ ] iOS Simulator (Mac) or Android Emulator (optional)

---

## Getting Started

### 1. Start Backend Services

```bash
# Start Docker containers
cd lessons/backend
docker compose up -d

# Start Task Manager API
bun lessons/backend/projects/01-rest-api.ts

# In another terminal, start URL Shortener API
bun lessons/backend/projects/03-url-shortener.ts
```

### 2. Create Expo Project

```bash
# Create new Expo project
npx create-expo-app@latest mobile --template tabs

# Navigate to project
cd mobile

# Install dependencies
bun install
```

### 3. Start Lessons

```bash
# React fundamentals (runs in browser)
bun lessons/react/01-jsx-components.ts

# React Native (runs in Expo Go)
cd mobile
bun expo start
```

---

## Lesson Template

Each lesson should follow this structure:

```typescript
/**
 * ============================================================
 * LESSON X: Topic Name
 * ============================================================
 *
 * Description of what this lesson teaches.
 *
 * ANALOGY: Real-world comparison to help understanding.
 *
 * PREREQUISITES:
 * - Previous lesson completed
 * - Required tools installed
 */

console.log("========================================");
console.log("LESSON X: TOPIC NAME");
console.log("========================================\n");

// ============================================================
// SECTION 1: Concept Introduction
// ============================================================

// ============================================================
// SECTION 2: Basic Examples
// ============================================================

// ============================================================
// SECTION 3: Real-World Usage
// ============================================================

// ============================================================
// SECTION 4: Common Pitfalls
// ============================================================

// ============================================================
// VERIFICATION / EXERCISES
// ============================================================
```

---

## Project Template

Each mobile project should include:

1. **README.md** with:
   - Project description
   - Setup instructions
   - API endpoint documentation
   - Feature checklist
   - Screenshots/wireframes

2. **Pre-built API client** with:
   - Base URL configuration
   - Type-safe fetch wrapper
   - Zod schemas for responses
   - Error handling

3. **Starter code** with:
   - Basic app structure
   - Navigation setup
   - QueryClient configured
   - NativeWind configured

4. **Tests** for:
   - API client functions
   - React Query hooks
   - Key components

---

## Success Criteria

Upon completing this curriculum, learners will be able to:

1. **React Fundamentals:**
   - Create functional components with JSX
   - Manage state with useState and useReducer
   - Handle side effects with useEffect
   - Create custom hooks for reusable logic

2. **React Native:**
   - Build mobile UIs with core components
   - Style apps with StyleSheet and Flexbox
   - Handle user input and gestures
   - Optimize lists with FlatList

3. **Expo & Navigation:**
   - Set up and run Expo projects
   - Implement file-based routing with expo-router
   - Create tab, stack, and drawer navigation
   - Style apps with NativeWind/Tailwind

4. **Data & State:**
   - Fetch and cache data with React Query
   - Handle loading, error, and success states
   - Implement optimistic updates
   - Build offline-capable apps

5. **Full Stack Integration:**
   - Connect mobile apps to REST APIs
   - Validate data with Zod
   - Handle authentication
   - Build production-ready mobile apps

---

## Integration with Existing Curriculum

This curriculum fits into the overall ThinkStream learning path:

```
Phase 1: TypeScript Fundamentals -----> COMPLETE
                |
                v
Phase 2: Backend Development ---------> COMPLETE
(Bun, Hono, Zod, Drizzle, PostgreSQL)
                |
                v
Phase 3: Caching & Background Jobs ---> (Optional, can skip)
(Redis, BullMQ)
                |
                v
+---------------------------------------+
| Phase 4: React Fundamentals           | <-- NEW (Phase A)
| Phase 5: React Native & Expo          | <-- NEW (Phases B, C)
| Phase 6: Data Fetching & State        | <-- NEW (Phase D)
+---------------------------------------+
                |
                v
Phase 7: AI & LLM Integration
                |
                v
Phase 8: Advanced Topics
(Memgraph, Auth, Production)
```

---

## Next Steps

1. **Create React lessons** (Phase A) - Start with JSX fundamentals
2. **Create React Native lessons** (Phase B) - Core components and styling
3. **Create Expo lessons** (Phase C) - Navigation and NativeWind
4. **Create Data Fetching lessons** (Phase D) - React Query and API integration
5. **Build Project 1** - Task Manager Mobile
6. **Build Project 2** - URL Shortener Mobile
7. **Create Backend Project 4** - Blog/Notes API
8. **Build Project 3** - Blog/Notes Mobile

---

## Resources

### Official Documentation
- [React Documentation](https://react.dev)
- [React Native Documentation](https://reactnative.dev)
- [Expo Documentation](https://docs.expo.dev)
- [expo-router Documentation](https://docs.expo.dev/router/introduction)
- [NativeWind Documentation](https://www.nativewind.dev)
- [TanStack React Query](https://tanstack.com/query)

### Community Resources
- [Expo Discord](https://chat.expo.dev)
- [React Native Directory](https://reactnative.directory)
- [NativeWind Discord](https://discord.gg/nativewind)
