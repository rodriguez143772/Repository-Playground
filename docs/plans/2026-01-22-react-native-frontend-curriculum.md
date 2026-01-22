# React Native Frontend Curriculum Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a comprehensive React Native curriculum that teaches React fundamentals, React Native components, Expo with expo-router, TanStack React Query for data fetching, and NativeWind for styling. The curriculum culminates in connecting to existing Hono backend APIs (Task Manager, URL Shortener).

**Architecture:** Three-phase approach - first teach React fundamentals (can run in browser), then React Native core concepts, then Expo ecosystem with real API integration. Each phase builds on the previous, with practice files and projects at each stage.

**Tech Stack:**
- React 18+ (fundamentals)
- React Native (mobile components)
- Expo SDK 54+ with expo-router (file-based routing)
- TanStack React Query v5 (server state management)
- NativeWind v4 (Tailwind CSS for React Native)
- Zod (client-side validation, shared with backend)
- TypeScript (type safety throughout)

**Prerequisites:**
- Phase 1: TypeScript Fundamentals (complete)
- Phase 2: Backend Development (complete) - provides APIs to consume
- Docker running with PostgreSQL for backend APIs

---

## Directory Structure

```
lessons/react-native/
├── README.md
│
├── Module 4.1: React Core (01-10)
│   ├── 01-jsx-basics.tsx
│   ├── 02-components-props.tsx
│   ├── 03-state-usestate.tsx
│   ├── 04-event-handling.tsx
│   ├── 05-conditional-rendering.tsx
│   ├── 06-lists-keys.tsx
│   ├── 07-forms-controlled.tsx
│   ├── 08-useeffect-lifecycle.tsx
│   ├── 09-useref-dom.tsx
│   └── 10-custom-hooks.tsx
│
├── Module 5.1: React Native Basics (11-18)
│   ├── 11-core-components.tsx
│   ├── 12-stylesheet-flexbox.tsx
│   ├── 13-scrollview-flatlist.tsx
│   ├── 14-touchables-pressable.tsx
│   ├── 15-images-icons.tsx
│   ├── 16-text-input.tsx
│   ├── 17-platform-specific.tsx
│   └── 18-safe-area.tsx
│
├── Module 5.2: Expo & Navigation (19-26)
│   ├── 19-expo-setup.tsx
│   ├── 20-expo-router-basics.tsx
│   ├── 21-stack-navigation.tsx
│   ├── 22-tab-navigation.tsx
│   ├── 23-drawer-navigation.tsx
│   ├── 24-route-params.tsx
│   ├── 25-nested-navigation.tsx
│   └── 26-deep-linking.tsx
│
├── Module 5.3: NativeWind Styling (27-31)
│   ├── 27-nativewind-setup.tsx
│   ├── 28-utility-classes.tsx
│   ├── 29-responsive-design.tsx
│   ├── 30-dark-mode.tsx
│   └── 31-custom-theme.tsx
│
├── Module 6.1: TanStack React Query (32-38)
│   ├── 32-query-setup.tsx
│   ├── 33-usequery-basics.tsx
│   ├── 34-usemutation.tsx
│   ├── 35-cache-invalidation.tsx
│   ├── 36-pagination-infinite.tsx
│   ├── 37-optimistic-updates.tsx
│   └── 38-error-retry.tsx
│
├── Module 6.2: API Integration (39-42)
│   ├── 39-api-client-setup.tsx
│   ├── 40-zod-response-validation.tsx
│   ├── 41-authentication-flow.tsx
│   └── 42-offline-support.tsx
│
├── practice/
│   ├── 01-react-core-practice.tsx
│   ├── 02-react-native-practice.tsx
│   ├── 03-navigation-practice.tsx
│   ├── 04-styling-practice.tsx
│   ├── 05-query-practice.tsx
│   └── 06-integration-practice.tsx
│
├── projects/
│   ├── 01-counter-app/                  # React fundamentals
│   ├── 02-todo-list-local/              # Local state, no API
│   ├── 03-notes-app/                    # Navigation + local storage
│   ├── 04-task-manager/                 # Connect to backend Task API
│   ├── 05-url-shortener-mobile/         # Connect to backend URL API
│   └── 06-dashboard-app/                # Combined APIs + charts
│
└── starter/
    └── expo-app/                        # Starter Expo project for lessons
```

---

## Task 1: Create Directory Structure and README

**Files:**
- Create: `lessons/react-native/README.md`
- Create: `lessons/react-native/practice/` (directory)
- Create: `lessons/react-native/projects/` (directory)
- Create: `lessons/react-native/starter/` (directory)

**Step 1: Create directories**

```bash
mkdir -p lessons/react-native/practice
mkdir -p lessons/react-native/projects
mkdir -p lessons/react-native/starter
```

**Step 2: Write README.md**

```markdown
# Phase 4-6: React & React Native Curriculum

Learn to build mobile applications with React Native and Expo, connecting to the backend APIs you built in Phase 2.

## Prerequisites

- Phase 1: TypeScript Fundamentals (complete)
- Phase 2: Backend Development (complete)
- Docker Desktop with PostgreSQL running
- Node.js 18+ installed
- Expo Go app on your phone (optional, for device testing)

## Quick Start

### 1. Start Backend Services

```bash
cd lessons/backend
docker compose up -d
bun lessons/backend/projects/01-rest-api.ts  # Start Task Manager API
```

### 2. Set Up Mobile App

```bash
cd lessons/react-native/starter/expo-app
bun install
bun expo start
```

## Module Overview

### Module 4.1: React Core (Lessons 01-10)
Foundation React concepts that work everywhere - browser and mobile.

| # | Topic | Description |
|---|-------|-------------|
| 01 | JSX Basics | Syntax, expressions, fragments |
| 02 | Components & Props | Function components, prop passing |
| 03 | State & useState | Local state management |
| 04 | Event Handling | onClick, onChange, forms |
| 05 | Conditional Rendering | Ternary, &&, switch patterns |
| 06 | Lists & Keys | Mapping arrays, key prop |
| 07 | Forms | Controlled components |
| 08 | useEffect | Side effects, cleanup, dependencies |
| 09 | useRef | DOM access, mutable values |
| 10 | Custom Hooks | Extracting reusable logic |

### Module 5.1: React Native Basics (Lessons 11-18)
Mobile-specific components and patterns.

| # | Topic | Description |
|---|-------|-------------|
| 11 | Core Components | View, Text, Image basics |
| 12 | StyleSheet & Flexbox | Mobile styling patterns |
| 13 | ScrollView & FlatList | Scrolling and lists |
| 14 | Touchables & Pressable | Touch interactions |
| 15 | Images & Icons | Loading images, icon libraries |
| 16 | TextInput | Mobile text input handling |
| 17 | Platform Specific | iOS vs Android differences |
| 18 | Safe Area | Handling notches and edges |

### Module 5.2: Expo & Navigation (Lessons 19-26)
Expo ecosystem and file-based routing.

| # | Topic | Description |
|---|-------|-------------|
| 19 | Expo Setup | Project creation, configuration |
| 20 | expo-router Basics | File-based routing fundamentals |
| 21 | Stack Navigation | Screen stacks, headers |
| 22 | Tab Navigation | Bottom tabs, badges |
| 23 | Drawer Navigation | Side menu navigation |
| 24 | Route Parameters | Dynamic routes, params |
| 25 | Nested Navigation | Combining navigators |
| 26 | Deep Linking | URL schemes, universal links |

### Module 5.3: NativeWind Styling (Lessons 27-31)
Tailwind CSS for React Native.

| # | Topic | Description |
|---|-------|-------------|
| 27 | NativeWind Setup | Configuration, babel |
| 28 | Utility Classes | Common patterns |
| 29 | Responsive Design | Breakpoints, scaling |
| 30 | Dark Mode | Color schemes, system preference |
| 31 | Custom Theme | Extending default theme |

### Module 6.1: TanStack React Query (Lessons 32-38)
Server state management.

| # | Topic | Description |
|---|-------|-------------|
| 32 | Query Setup | Provider, client config |
| 33 | useQuery Basics | Fetching data |
| 34 | useMutation | Creating/updating data |
| 35 | Cache Invalidation | Keeping data fresh |
| 36 | Pagination | Infinite scroll |
| 37 | Optimistic Updates | Instant UI feedback |
| 38 | Error & Retry | Error handling, retry logic |

### Module 6.2: API Integration (Lessons 39-42)
Connecting to real backends.

| # | Topic | Description |
|---|-------|-------------|
| 39 | API Client Setup | Fetch wrapper, base URL |
| 40 | Zod Validation | Response validation |
| 41 | Authentication | Token storage, refresh |
| 42 | Offline Support | Caching, persistence |

## Practice Files

| # | Focus | Skills Practiced |
|---|-------|------------------|
| 01 | React Core | Components, state, effects |
| 02 | React Native | Views, styles, lists |
| 03 | Navigation | Routes, params, tabs |
| 04 | Styling | NativeWind, themes |
| 05 | Data Fetching | Queries, mutations |
| 06 | Integration | Full app patterns |

## Projects

| # | Project | APIs Used | Skills |
|---|---------|-----------|--------|
| 01 | Counter App | None | React basics |
| 02 | Todo List (Local) | None | State, lists, forms |
| 03 | Notes App | Local Storage | Navigation, storage |
| 04 | Task Manager | Task API | Full CRUD, queries |
| 05 | URL Shortener | URL API | Forms, stats |
| 06 | Dashboard | Both APIs | Charts, multi-source |

## Running Lessons

```bash
# For React core lessons (01-10), use the browser
cd lessons/react-native/starter/expo-app
bun expo start --web

# For mobile lessons (11+), use Expo Go or simulator
bun expo start
```

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI library |
| React Native | Mobile framework |
| Expo SDK 54 | Development platform |
| expo-router | File-based navigation |
| TanStack Query v5 | Server state |
| NativeWind v4 | Tailwind styling |
| Zod | Validation |

## Estimated Time

- Module 4.1 (React): 1 week
- Module 5.1-5.3 (React Native + Expo + NativeWind): 2 weeks
- Module 6.1-6.2 (Data Fetching): 1 week
- Projects: 1-2 weeks

**Total: 5-6 weeks**
```

**Step 3: Commit**

```bash
git add lessons/react-native/
git commit -m "feat(react-native): add curriculum directory structure and README"
```

---

## Task 2: Create Expo Starter Project

**Files:**
- Create: `lessons/react-native/starter/expo-app/` (full Expo project)

**Step 1: Initialize Expo project**

```bash
cd lessons/react-native/starter
bunx create-expo-app@latest expo-app --template tabs
cd expo-app
```

**Step 2: Install required dependencies**

```bash
bun add @tanstack/react-query zod
bun add nativewind tailwindcss
bun add -d tailwindcss
```

**Step 3: Configure NativeWind**

Create `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Create `global.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Step 4: Update babel.config.js**

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};
```

**Step 5: Create nativewind-env.d.ts**

```typescript
/// <reference types="nativewind/types" />
```

**Step 6: Update metro.config.js**

```javascript
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: "./global.css" });
```

**Step 7: Create .env.example**

```
API_BASE_URL=http://localhost:3000
```

**Step 8: Create API configuration file**

Create `lib/api.ts`:
```typescript
import { z } from "zod";

export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";

export async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }

  return response.json();
}
```

**Step 9: Verify setup**

```bash
bun expo start
```

**Step 10: Commit**

```bash
git add lessons/react-native/starter/expo-app/
git commit -m "feat(react-native): add Expo starter project with NativeWind and TanStack Query"
```

---

## Task 3: Create React Core Lessons (01-05)

**Files:**
- Create: `lessons/react-native/01-jsx-basics.tsx`
- Create: `lessons/react-native/02-components-props.tsx`
- Create: `lessons/react-native/03-state-usestate.tsx`
- Create: `lessons/react-native/04-event-handling.tsx`
- Create: `lessons/react-native/05-conditional-rendering.tsx`

**Step 1: Write 01-jsx-basics.tsx**

```typescript
/**
 * ============================================================
 * LESSON 1: JSX Basics
 * ============================================================
 *
 * JSX is a syntax extension that lets you write HTML-like code
 * in JavaScript. It's the foundation of React components.
 *
 * ANALOGY: If JavaScript is the engine of a car, JSX is the
 * dashboard - it's how you interact with the engine, presenting
 * information in a familiar, visual way.
 *
 * KEY CONCEPTS:
 * - JSX looks like HTML but compiles to JavaScript
 * - Expressions go in curly braces {}
 * - All tags must be closed
 * - className instead of class
 */

import React from "react";
import { View, Text } from "react-native";

console.log("========================================");
console.log("LESSON 1: JSX BASICS");
console.log("========================================\n");

// ============================================================
// SECTION 1: Basic JSX Syntax
// ============================================================

/**
 * JSX elements look like HTML but are JavaScript:
 *
 * HTML:       <div class="container">Hello</div>
 * JSX:        <View className="container"><Text>Hello</Text></View>
 *
 * Under the hood, JSX compiles to:
 * React.createElement("View", { className: "container" },
 *   React.createElement("Text", null, "Hello")
 * )
 */

// Basic component - returns JSX
function HelloWorld() {
  return (
    <View>
      <Text>Hello, World!</Text>
    </View>
  );
}

// ============================================================
// SECTION 2: Embedding Expressions
// ============================================================

/**
 * Curly braces {} let you embed any JavaScript expression:
 * - Variables
 * - Function calls
 * - Math operations
 * - Ternary operators
 */

function Greeting() {
  const name = "Alice";
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good morning" : "Good afternoon";

  return (
    <View>
      <Text>{greeting}, {name}!</Text>
      <Text>Current hour: {currentHour}</Text>
      <Text>2 + 2 = {2 + 2}</Text>
      <Text>Uppercase: {name.toUpperCase()}</Text>
    </View>
  );
}

// ============================================================
// SECTION 3: JSX Rules
// ============================================================

/**
 * RULE 1: Single Root Element
 * Every component must return ONE element (use fragments for multiple)
 */

// Wrong: multiple elements at root
// function Bad() {
//   return (
//     <Text>First</Text>
//     <Text>Second</Text>  // Error!
//   );
// }

// Correct: wrap in View or Fragment
function Good() {
  return (
    <>
      <Text>First</Text>
      <Text>Second</Text>
    </>
  );
}

/**
 * RULE 2: All Tags Must Close
 * Self-closing tags need the slash
 */

function ImageExample() {
  // HTML: <img src="photo.jpg">
  // JSX: <Image source={require('./photo.jpg')} />  (note the />)
  return <View />;  // Self-closing is required
}

/**
 * RULE 3: camelCase for Attributes
 * onclick -> onPress
 * class -> className (or style in RN)
 * tabindex -> tabIndex
 */

function ButtonExample() {
  return (
    <View style={{ padding: 10 }}>
      <Text onPress={() => console.log("Pressed!")}>Press Me</Text>
    </View>
  );
}

// ============================================================
// SECTION 4: Fragments
// ============================================================

/**
 * Fragments let you group elements without adding extra nodes:
 * <></> is shorthand for <React.Fragment>
 */

function FragmentExample() {
  return (
    <>
      <Text>No wrapper View needed!</Text>
      <Text>These are siblings</Text>
    </>
  );
}

// With key (needed in loops)
function KeyedFragment() {
  const items = ["a", "b", "c"];
  return (
    <>
      {items.map((item) => (
        <React.Fragment key={item}>
          <Text>{item}</Text>
        </React.Fragment>
      ))}
    </>
  );
}

// ============================================================
// SECTION 5: Comments in JSX
// ============================================================

function CommentsExample() {
  return (
    <View>
      {/* This is a JSX comment */}
      <Text>
        Visible text
        {/* Comments inside JSX use curly braces */}
      </Text>
    </View>
  );
}

// ============================================================
// SECTION 6: Styling Preview
// ============================================================

/**
 * In React Native, styling uses the style prop with objects:
 */

function StyledComponent() {
  return (
    <View style={{ padding: 20, backgroundColor: "#f0f0f0" }}>
      <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333" }}>
        Styled Text
      </Text>
    </View>
  );
}

// ============================================================
// EXERCISES
// ============================================================

console.log("--- Exercises ---\n");

console.log(`
EXERCISE 1: Create a ProfileCard component
- Display a name, age, and location
- Use expressions to calculate birth year from age
- Style with at least 3 style properties

EXERCISE 2: Create a TimeDisplay component
- Show current time using new Date()
- Format as "HH:MM:SS"
- Update every second (we'll learn this in useEffect)

EXERCISE 3: Create a MathQuiz component
- Display a random math problem
- Show the answer using expressions
- Example: "What is 5 + 3? Answer: 8"
`);

// Export for testing
export { HelloWorld, Greeting, Good, FragmentExample, StyledComponent };
```

**Step 2: Write 02-components-props.tsx**

```typescript
/**
 * ============================================================
 * LESSON 2: Components and Props
 * ============================================================
 *
 * Components are the building blocks of React applications.
 * Props are how you pass data from parent to child components.
 *
 * ANALOGY: Components are like LEGO bricks - each has a specific
 * shape (props it accepts) and can be combined to build anything.
 * Props are like the instructions telling which brick goes where.
 *
 * KEY CONCEPTS:
 * - Function components are just functions returning JSX
 * - Props are read-only (immutable)
 * - TypeScript interfaces define prop shapes
 * - Default props and optional props
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";

console.log("========================================");
console.log("LESSON 2: COMPONENTS AND PROPS");
console.log("========================================\n");

// ============================================================
// SECTION 1: Basic Components
// ============================================================

/**
 * A component is just a function that returns JSX.
 * By convention, component names are PascalCase.
 */

// Simplest component - no props
function Logo() {
  return <Text style={styles.logo}>MyApp</Text>;
}

// Component with props (untyped - avoid in TypeScript)
function GreetingBad(props: any) {
  return <Text>Hello, {props.name}!</Text>;
}

// ============================================================
// SECTION 2: TypeScript Props
// ============================================================

/**
 * Always define prop types with interfaces or types.
 * This gives you autocomplete and catches errors early.
 */

// Define the shape of props
interface WelcomeProps {
  name: string;
  age: number;
}

// Use the interface
function Welcome({ name, age }: WelcomeProps) {
  return (
    <View>
      <Text>Welcome, {name}!</Text>
      <Text>You are {age} years old.</Text>
    </View>
  );
}

// ============================================================
// SECTION 3: Optional and Default Props
// ============================================================

interface ButtonProps {
  title: string;
  color?: string;      // Optional (may be undefined)
  size?: "sm" | "md" | "lg";  // Optional with specific values
}

// Default values using destructuring
function Button({ title, color = "blue", size = "md" }: ButtonProps) {
  const fontSize = size === "sm" ? 12 : size === "lg" ? 20 : 16;

  return (
    <View style={[styles.button, { backgroundColor: color }]}>
      <Text style={{ fontSize, color: "white" }}>{title}</Text>
    </View>
  );
}

// ============================================================
// SECTION 4: Children Prop
// ============================================================

/**
 * The special "children" prop contains nested elements:
 * <Card>
 *   <Text>This becomes children</Text>
 * </Card>
 */

interface CardProps {
  title: string;
  children: React.ReactNode;  // Can be any renderable content
}

function Card({ title, children }: CardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.cardContent}>{children}</View>
    </View>
  );
}

// Usage:
function CardExample() {
  return (
    <Card title="User Profile">
      <Text>Name: Alice</Text>
      <Text>Email: alice@example.com</Text>
    </Card>
  );
}

// ============================================================
// SECTION 5: Passing Props Down (Prop Drilling)
// ============================================================

interface UserData {
  name: string;
  email: string;
  avatar: string;
}

interface UserProfileProps {
  user: UserData;
}

// Parent passes user to child
function UserProfile({ user }: UserProfileProps) {
  return (
    <View>
      <UserAvatar avatar={user.avatar} name={user.name} />
      <UserDetails name={user.name} email={user.email} />
    </View>
  );
}

function UserAvatar({ avatar, name }: { avatar: string; name: string }) {
  return (
    <View style={styles.avatar}>
      <Text>{name[0]}</Text>
    </View>
  );
}

function UserDetails({ name, email }: { name: string; email: string }) {
  return (
    <View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
    </View>
  );
}

// ============================================================
// SECTION 6: Spread Props
// ============================================================

/**
 * Spread operator passes all props at once.
 * Useful for wrapper components.
 */

interface TextInputProps {
  value: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  style?: object;
}

function StyledInput(props: TextInputProps) {
  // Spread all props to inner component
  return (
    <View style={styles.inputContainer}>
      {/* <TextInput {...props} style={[styles.input, props.style]} /> */}
      <Text>Input placeholder: {props.placeholder}</Text>
    </View>
  );
}

// ============================================================
// SECTION 7: Component Composition
// ============================================================

/**
 * Build complex UIs by composing simple components.
 * Each component does ONE thing well.
 */

interface ProductProps {
  name: string;
  price: number;
  inStock: boolean;
}

function Product({ name, price, inStock }: ProductProps) {
  return (
    <Card title={name}>
      <Price amount={price} />
      <StockStatus available={inStock} />
    </Card>
  );
}

function Price({ amount }: { amount: number }) {
  return <Text style={styles.price}>${amount.toFixed(2)}</Text>;
}

function StockStatus({ available }: { available: boolean }) {
  return (
    <Text style={available ? styles.inStock : styles.outOfStock}>
      {available ? "In Stock" : "Out of Stock"}
    </Text>
  );
}

// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({
  logo: {
    fontSize: 24,
    fontWeight: "bold",
  },
  button: {
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  cardContent: {
    gap: 8,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  inputContainer: {
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 12,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2ecc71",
  },
  inStock: {
    color: "#27ae60",
  },
  outOfStock: {
    color: "#e74c3c",
  },
});

// ============================================================
// EXERCISES
// ============================================================

console.log("--- Exercises ---\n");

console.log(`
EXERCISE 1: Create a Badge component
- Props: text (string), variant ("success" | "warning" | "error")
- Style differently based on variant

EXERCISE 2: Create a UserCard component composition
- Avatar component (initials or image)
- Name component
- Email component
- All wrapped in a Card

EXERCISE 3: Create a ProductList component
- Accepts array of products as prop
- Maps over products rendering Product component
- Handle empty array case
`);

export { Logo, Welcome, Button, Card, Product, Price, StockStatus };
```

**Step 3: Write 03-state-usestate.tsx**

Content outline:
- What is state and why we need it
- useState hook basics
- Updating state (immutability)
- State vs props
- Multiple state variables
- State with objects and arrays
- Lifting state up

**Step 4: Write 04-event-handling.tsx**

Content outline:
- Event handler functions
- onPress in React Native
- Passing arguments to handlers
- Event object
- Preventing default behavior
- Common events (press, long press, text change)

**Step 5: Write 05-conditional-rendering.tsx**

Content outline:
- Ternary operator rendering
- && short-circuit rendering
- if/else with early return
- Switch statements
- Rendering null
- Conditional styles

**Step 6: Commit**

```bash
git add lessons/react-native/01-jsx-basics.tsx
git add lessons/react-native/02-components-props.tsx
git add lessons/react-native/03-state-usestate.tsx
git add lessons/react-native/04-event-handling.tsx
git add lessons/react-native/05-conditional-rendering.tsx
git commit -m "feat(react-native): add React core lessons 01-05"
```

---

## Task 4: Create React Core Lessons (06-10)

**Files:**
- Create: `lessons/react-native/06-lists-keys.tsx`
- Create: `lessons/react-native/07-forms-controlled.tsx`
- Create: `lessons/react-native/08-useeffect-lifecycle.tsx`
- Create: `lessons/react-native/09-useref-dom.tsx`
- Create: `lessons/react-native/10-custom-hooks.tsx`

**Step 1: Write 06-lists-keys.tsx**

Content outline:
- Mapping arrays to elements
- The key prop and why it matters
- Keys must be unique and stable
- Using index as key (when acceptable)
- FlatList preview for large lists
- Filtering and sorting before render

**Step 2: Write 07-forms-controlled.tsx**

Content outline:
- Controlled vs uncontrolled inputs
- TextInput with value and onChangeText
- Form state management
- Multiple inputs in one form
- Validation patterns
- Form submission

**Step 3: Write 08-useeffect-lifecycle.tsx**

Content outline:
- Side effects explained
- useEffect syntax
- Dependency array
- Cleanup functions
- Common patterns (fetch, timers, subscriptions)
- useEffect vs event handlers

**Step 4: Write 09-useref-dom.tsx**

Content outline:
- What refs are for
- useRef hook
- Accessing native components
- Storing mutable values
- Focus management
- Measuring layout

**Step 5: Write 10-custom-hooks.tsx**

Content outline:
- Why create custom hooks
- Naming convention (use prefix)
- Extracting logic from components
- Sharing stateful logic
- Common custom hooks (useToggle, useForm, useFetch)
- Rules of hooks

**Step 6: Commit**

```bash
git add lessons/react-native/06-lists-keys.tsx
git add lessons/react-native/07-forms-controlled.tsx
git add lessons/react-native/08-useeffect-lifecycle.tsx
git add lessons/react-native/09-useref-dom.tsx
git add lessons/react-native/10-custom-hooks.tsx
git commit -m "feat(react-native): add React core lessons 06-10"
```

---

## Task 5: Create React Native Basics Lessons (11-14)

**Files:**
- Create: `lessons/react-native/11-core-components.tsx`
- Create: `lessons/react-native/12-stylesheet-flexbox.tsx`
- Create: `lessons/react-native/13-scrollview-flatlist.tsx`
- Create: `lessons/react-native/14-touchables-pressable.tsx`

**Step 1: Write 11-core-components.tsx**

```typescript
/**
 * ============================================================
 * LESSON 11: React Native Core Components
 * ============================================================
 *
 * React Native provides platform-native components that render
 * to iOS and Android views. Unlike web React which renders to
 * HTML elements, React Native renders to native UI components.
 *
 * ANALOGY: If HTML is like building with LEGO bricks that only
 * work on one platform, React Native components are like universal
 * LEGO adapters - you write once, they transform into the right
 * brick for each platform.
 *
 * KEY DIFFERENCES FROM WEB:
 * - <View> instead of <div>
 * - <Text> instead of <p>, <span>, <h1>
 * - <Image> instead of <img>
 * - No CSS - use StyleSheet
 * - All text must be inside <Text>
 */

import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";

console.log("========================================");
console.log("LESSON 11: CORE COMPONENTS");
console.log("========================================\n");

// ============================================================
// SECTION 1: View - The Container
// ============================================================

/**
 * View is the most fundamental component.
 * It's like a <div> but:
 * - Uses flexbox by default (column direction)
 * - No scrolling by default
 * - Can't have text directly inside
 */

function ViewExample() {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text>Box 1</Text>
      </View>
      <View style={styles.box}>
        <Text>Box 2</Text>
      </View>
    </View>
  );
}

// ============================================================
// SECTION 2: Text - All Text Content
// ============================================================

/**
 * ALL text must be wrapped in <Text>.
 * This is required - you can't put text directly in View.
 *
 * Text components can be nested for styling portions.
 */

function TextExample() {
  return (
    <View>
      <Text style={styles.title}>Main Title</Text>
      <Text style={styles.paragraph}>
        This is a paragraph with{" "}
        <Text style={styles.bold}>bold text</Text> and{" "}
        <Text style={styles.italic}>italic text</Text> inside.
      </Text>
      <Text numberOfLines={2} ellipsizeMode="tail">
        This is a very long text that will be truncated after two lines
        if it exceeds the available space. The ellipsizeMode determines
        where the ... appears.
      </Text>
    </View>
  );
}

// ============================================================
// SECTION 3: Image - Displaying Images
// ============================================================

/**
 * Image sources can be:
 * - Local: require('./path/to/image.png')
 * - Remote: { uri: 'https://...' }
 *
 * Important: Remote images MUST have explicit dimensions.
 */

function ImageExample() {
  return (
    <View>
      {/* Local image */}
      {/* <Image source={require('./assets/logo.png')} style={styles.localImage} /> */}

      {/* Remote image - dimensions required! */}
      <Image
        source={{ uri: "https://via.placeholder.com/150" }}
        style={styles.remoteImage}
      />

      {/* Image with resize mode */}
      <Image
        source={{ uri: "https://via.placeholder.com/300x200" }}
        style={styles.resizedImage}
        resizeMode="cover"  // cover, contain, stretch, center
      />
    </View>
  );
}

// ============================================================
// SECTION 4: Common Component Patterns
// ============================================================

/**
 * Pattern: Card Component
 * Combine View and Text for reusable UI patterns.
 */

interface CardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

function Card({ title, subtitle, children }: CardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {subtitle && <Text style={styles.cardSubtitle}>{subtitle}</Text>}
      <View style={styles.cardBody}>{children}</View>
    </View>
  );
}

/**
 * Pattern: Avatar Component
 * Image with fallback to initials.
 */

interface AvatarProps {
  uri?: string;
  name: string;
  size?: number;
}

function Avatar({ uri, name, size = 50 }: AvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={[
          styles.avatar,
          { width: size, height: size, borderRadius: size / 2 },
        ]}
      />
    );
  }

  return (
    <View
      style={[
        styles.avatarFallback,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      <Text style={styles.avatarInitials}>{initials}</Text>
    </View>
  );
}

/**
 * Pattern: Badge/Tag Component
 */

interface BadgeProps {
  text: string;
  variant?: "default" | "success" | "warning" | "error";
}

function Badge({ text, variant = "default" }: BadgeProps) {
  const variantStyles = {
    default: { backgroundColor: "#e0e0e0", color: "#333" },
    success: { backgroundColor: "#d4edda", color: "#155724" },
    warning: { backgroundColor: "#fff3cd", color: "#856404" },
    error: { backgroundColor: "#f8d7da", color: "#721c24" },
  };

  const style = variantStyles[variant];

  return (
    <View style={[styles.badge, { backgroundColor: style.backgroundColor }]}>
      <Text style={[styles.badgeText, { color: style.color }]}>{text}</Text>
    </View>
  );
}

// ============================================================
// SECTION 5: Platform Detection
// ============================================================

/**
 * Sometimes you need different behavior per platform.
 * Platform.OS returns 'ios', 'android', or 'web'.
 */

function PlatformExample() {
  return (
    <View>
      <Text>Running on: {Platform.OS}</Text>
      <Text>Version: {Platform.Version}</Text>
      {Platform.OS === "ios" && <Text>iOS specific content</Text>}
      {Platform.OS === "android" && <Text>Android specific content</Text>}
    </View>
  );
}

// ============================================================
// STYLES
// ============================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  box: {
    backgroundColor: "#3498db",
    padding: 20,
    marginVertical: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  bold: {
    fontWeight: "bold",
  },
  italic: {
    fontStyle: "italic",
  },
  localImage: {
    width: 100,
    height: 100,
  },
  remoteImage: {
    width: 150,
    height: 150,
  },
  resizedImage: {
    width: "100%",
    height: 200,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  cardBody: {
    marginTop: 12,
  },
  avatar: {
    backgroundColor: "#ddd",
  },
  avatarFallback: {
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInitials: {
    color: "white",
    fontWeight: "bold",
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "500",
  },
});

// ============================================================
// EXERCISES
// ============================================================

console.log("--- Exercises ---\n");

console.log(`
EXERCISE 1: Create a UserProfileCard
- Avatar (with fallback)
- Name (bold)
- Email (gray, smaller)
- Bio (multiple lines)
- Join date

EXERCISE 2: Create a ProductCard
- Product image (remote)
- Name
- Price (formatted)
- Stock badge (in/out)
- Rating (stars or number)

EXERCISE 3: Create a NotificationItem
- Icon placeholder
- Title
- Message (truncated to 2 lines)
- Timestamp
- Read/unread indicator
`);

export { ViewExample, TextExample, ImageExample, Card, Avatar, Badge };
```

**Step 2: Write 12-stylesheet-flexbox.tsx**

Content outline:
- StyleSheet.create() benefits
- Flexbox basics (direction, justify, align)
- flex property for sizing
- Gap, margin, padding
- Absolute positioning
- Dynamic styles
- Style arrays

**Step 3: Write 13-scrollview-flatlist.tsx**

Content outline:
- ScrollView for small lists
- FlatList for large lists (virtualized)
- renderItem function
- keyExtractor
- ListHeaderComponent, ListFooterComponent
- ListEmptyComponent
- Pull to refresh
- SectionList for grouped data

**Step 4: Write 14-touchables-pressable.tsx**

Content outline:
- TouchableOpacity
- TouchableHighlight
- Pressable (modern approach)
- onPress, onLongPress
- Pressed state styling
- Accessibility considerations
- Feedback types

**Step 5: Commit**

```bash
git add lessons/react-native/11-core-components.tsx
git add lessons/react-native/12-stylesheet-flexbox.tsx
git add lessons/react-native/13-scrollview-flatlist.tsx
git add lessons/react-native/14-touchables-pressable.tsx
git commit -m "feat(react-native): add React Native basics lessons 11-14"
```

---

## Task 6: Create React Native Basics Lessons (15-18)

**Files:**
- Create: `lessons/react-native/15-images-icons.tsx`
- Create: `lessons/react-native/16-text-input.tsx`
- Create: `lessons/react-native/17-platform-specific.tsx`
- Create: `lessons/react-native/18-safe-area.tsx`

**Step 1: Write 15-images-icons.tsx**

Content outline:
- Local vs remote images
- Image caching
- Loading states
- expo-image for advanced use
- Icon libraries (Lucide, vector-icons)
- Custom icon fonts

**Step 2: Write 16-text-input.tsx**

Content outline:
- TextInput props
- Keyboard types
- Auto-capitalize, auto-correct
- Secure text entry
- Multi-line input
- Handling keyboard
- Input accessories

**Step 3: Write 17-platform-specific.tsx**

Content outline:
- Platform.OS detection
- Platform.select()
- Platform-specific extensions (.ios.tsx, .android.tsx)
- Platform-specific styling
- StatusBar differences

**Step 4: Write 18-safe-area.tsx**

Content outline:
- SafeAreaView
- SafeAreaProvider from react-native-safe-area-context
- useSafeAreaInsets hook
- Handling notches
- Edge insets

**Step 5: Commit**

```bash
git add lessons/react-native/15-images-icons.tsx
git add lessons/react-native/16-text-input.tsx
git add lessons/react-native/17-platform-specific.tsx
git add lessons/react-native/18-safe-area.tsx
git commit -m "feat(react-native): add React Native basics lessons 15-18"
```

---

## Task 7: Create Expo & Navigation Lessons (19-22)

**Files:**
- Create: `lessons/react-native/19-expo-setup.tsx`
- Create: `lessons/react-native/20-expo-router-basics.tsx`
- Create: `lessons/react-native/21-stack-navigation.tsx`
- Create: `lessons/react-native/22-tab-navigation.tsx`

**Step 1: Write 19-expo-setup.tsx**

Content outline:
- What is Expo and why use it
- Creating a new project
- Expo CLI commands
- Development client vs Expo Go
- Project structure
- app.json / app.config.ts
- EAS Build overview

**Step 2: Write 20-expo-router-basics.tsx**

Content outline:
- File-based routing concept
- app/ directory structure
- _layout.tsx files
- index.tsx as default route
- Link component
- useRouter hook
- Navigate programmatically

**Step 3: Write 21-stack-navigation.tsx**

Content outline:
- Stack navigator concept
- Stack.Screen configuration
- Header customization
- Screen options
- Transitions
- Modals
- Push vs replace

**Step 4: Write 22-tab-navigation.tsx**

Content outline:
- Bottom tabs setup
- Tab bar styling
- Tab icons
- Tab badges
- Hiding tabs
- Tab press events
- Nested navigation in tabs

**Step 5: Commit**

```bash
git add lessons/react-native/19-expo-setup.tsx
git add lessons/react-native/20-expo-router-basics.tsx
git add lessons/react-native/21-stack-navigation.tsx
git add lessons/react-native/22-tab-navigation.tsx
git commit -m "feat(react-native): add Expo and navigation lessons 19-22"
```

---

## Task 8: Create Expo & Navigation Lessons (23-26)

**Files:**
- Create: `lessons/react-native/23-drawer-navigation.tsx`
- Create: `lessons/react-native/24-route-params.tsx`
- Create: `lessons/react-native/25-nested-navigation.tsx`
- Create: `lessons/react-native/26-deep-linking.tsx`

**Step 1: Write 23-drawer-navigation.tsx**

Content outline:
- Drawer navigator setup
- Custom drawer content
- Drawer styling
- Gestures
- Combining with tabs

**Step 2: Write 24-route-params.tsx**

Content outline:
- Dynamic routes ([id].tsx)
- useLocalSearchParams hook
- useGlobalSearchParams hook
- Passing params with Link
- Passing params programmatically
- Type-safe params

**Step 3: Write 25-nested-navigation.tsx**

Content outline:
- Tabs inside stack
- Stack inside tabs
- When to nest
- Navigation state
- Resetting navigation

**Step 4: Write 26-deep-linking.tsx**

Content outline:
- URL scheme configuration
- Universal links
- Testing deep links
- Handling initial URL
- Dynamic deep links

**Step 5: Commit**

```bash
git add lessons/react-native/23-drawer-navigation.tsx
git add lessons/react-native/24-route-params.tsx
git add lessons/react-native/25-nested-navigation.tsx
git add lessons/react-native/26-deep-linking.tsx
git commit -m "feat(react-native): add navigation lessons 23-26"
```

---

## Task 9: Create NativeWind Lessons (27-31)

**Files:**
- Create: `lessons/react-native/27-nativewind-setup.tsx`
- Create: `lessons/react-native/28-utility-classes.tsx`
- Create: `lessons/react-native/29-responsive-design.tsx`
- Create: `lessons/react-native/30-dark-mode.tsx`
- Create: `lessons/react-native/31-custom-theme.tsx`

**Step 1: Write 27-nativewind-setup.tsx**

Content outline:
- What is NativeWind
- Installation and configuration
- Babel and Metro config
- TypeScript setup
- className prop
- Differences from web Tailwind

**Step 2: Write 28-utility-classes.tsx**

Content outline:
- Spacing (p-, m-, gap-)
- Sizing (w-, h-, flex)
- Colors (bg-, text-)
- Typography
- Borders
- Shadows
- Combining classes

**Step 3: Write 29-responsive-design.tsx**

Content outline:
- Breakpoint prefixes
- Platform prefixes (ios:, android:)
- useWindowDimensions
- Responsive layouts
- Portrait vs landscape

**Step 4: Write 30-dark-mode.tsx**

Content outline:
- dark: prefix
- useColorScheme hook
- System preference detection
- Manual toggle
- Persisting preference
- Color scheme context

**Step 5: Write 31-custom-theme.tsx**

Content outline:
- Extending tailwind.config.js
- Custom colors
- Custom fonts
- Custom spacing
- Design tokens
- Theme variables

**Step 6: Commit**

```bash
git add lessons/react-native/27-nativewind-setup.tsx
git add lessons/react-native/28-utility-classes.tsx
git add lessons/react-native/29-responsive-design.tsx
git add lessons/react-native/30-dark-mode.tsx
git add lessons/react-native/31-custom-theme.tsx
git commit -m "feat(react-native): add NativeWind styling lessons 27-31"
```

---

## Task 10: Create TanStack Query Lessons (32-35)

**Files:**
- Create: `lessons/react-native/32-query-setup.tsx`
- Create: `lessons/react-native/33-usequery-basics.tsx`
- Create: `lessons/react-native/34-usemutation.tsx`
- Create: `lessons/react-native/35-cache-invalidation.tsx`

**Step 1: Write 32-query-setup.tsx**

```typescript
/**
 * ============================================================
 * LESSON 32: TanStack React Query Setup
 * ============================================================
 *
 * TanStack React Query handles server state - data that lives
 * on a remote server. It provides caching, background updates,
 * loading states, and error handling out of the box.
 *
 * ANALOGY: If your app is a restaurant:
 * - Without React Query: You're a waiter who forgets orders,
 *   makes multiple trips to the kitchen, and has no notepad
 * - With React Query: You have a smart notepad that remembers
 *   orders, knows when food is ready, and automatically
 *   checks if anything needs refreshing
 *
 * KEY CONCEPTS:
 * - QueryClient: The brain - manages all queries and cache
 * - QueryClientProvider: Makes client available to components
 * - Query keys: Unique identifiers for cached data
 * - Stale time: How long data is considered "fresh"
 */

import React from "react";
import { View, Text } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

console.log("========================================");
console.log("LESSON 32: TANSTACK REACT QUERY SETUP");
console.log("========================================\n");

// ============================================================
// SECTION 1: Creating the Query Client
// ============================================================

/**
 * QueryClient is the core of React Query.
 * Create it ONCE, outside your components.
 *
 * Default options apply to all queries/mutations.
 */

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data is fresh for 5 minutes
      staleTime: 5 * 60 * 1000,

      // Keep unused data in cache for 30 minutes
      gcTime: 30 * 60 * 1000,  // formerly cacheTime

      // Retry failed requests 3 times
      retry: 3,

      // Don't refetch on window focus (mobile-friendly)
      refetchOnWindowFocus: false,

      // Don't refetch on reconnect by default
      refetchOnReconnect: false,
    },
    mutations: {
      // Retry mutations once on failure
      retry: 1,
    },
  },
});

// ============================================================
// SECTION 2: Provider Setup
// ============================================================

/**
 * Wrap your app with QueryClientProvider.
 * Usually done in your root layout or App component.
 */

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <View>
        <Text>Your app here</Text>
      </View>
    </QueryClientProvider>
  );
}

// Expo Router example (_layout.tsx):
function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <Slot /> */}
      <Text>Root Layout</Text>
    </QueryClientProvider>
  );
}

// ============================================================
// SECTION 3: Understanding Query Keys
// ============================================================

/**
 * Query keys uniquely identify queries in the cache.
 * They're arrays that can contain strings, numbers, and objects.
 *
 * React Query uses these to:
 * - Store data in cache
 * - Know when to refetch
 * - Invalidate related queries
 */

const queryKeyExamples = {
  // Simple key
  allTasks: ["tasks"],

  // Key with ID
  taskById: (id: number) => ["tasks", id],

  // Key with filters
  filteredTasks: (status: string) => ["tasks", { status }],

  // Nested resources
  taskComments: (taskId: number) => ["tasks", taskId, "comments"],
};

// ============================================================
// SECTION 4: Stale Time vs GC Time
// ============================================================

/**
 * STALE TIME:
 * How long data is considered "fresh" after fetching.
 * While fresh, React Query won't refetch automatically.
 *
 * GC TIME (garbage collection time):
 * How long unused data stays in cache after the component unmounts.
 * After this time, data is garbage collected.
 *
 * EXAMPLE TIMELINE:
 * 0:00 - Fetch tasks
 * 0:00 to 5:00 - Data is fresh (staleTime: 5 min)
 * 5:01 - Data becomes stale, will refetch on next use
 * 5:01 - User navigates away (component unmounts)
 * 5:01 to 35:01 - Data in cache (gcTime: 30 min)
 * 35:02 - Data garbage collected
 */

// Different stale times for different data
const queryClientAdvanced = new QueryClient({
  defaultOptions: {
    queries: {
      // Default for most queries
      staleTime: 5 * 60 * 1000,
    },
  },
});

// Override per-query
// useQuery({
//   queryKey: ['user', 'profile'],
//   queryFn: fetchProfile,
//   staleTime: Infinity,  // Never stale (static data)
// });

// useQuery({
//   queryKey: ['stock', 'price'],
//   queryFn: fetchStockPrice,
//   staleTime: 1000,  // Stale after 1 second (frequently changing)
// });

// ============================================================
// SECTION 5: Complete Setup Example
// ============================================================

/**
 * Complete setup for an Expo app with React Query.
 */

// lib/queryClient.ts
export const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        retry: (failureCount, error: any) => {
          // Don't retry on 404s
          if (error?.status === 404) return false;
          // Retry up to 3 times for other errors
          return failureCount < 3;
        },
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: 1,
        onError: (error) => {
          console.error("Mutation error:", error);
        },
      },
    },
  });

// app/_layout.tsx
// import { createQueryClient } from '../lib/queryClient';
//
// const queryClient = createQueryClient();
//
// export default function RootLayout() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <Stack />
//     </QueryClientProvider>
//   );
// }

// ============================================================
// SECTION 6: DevTools (for development)
// ============================================================

/**
 * React Query DevTools help debug queries.
 * For React Native, use @tanstack/react-query-devtools
 * or the React Native Debugger.
 */

// Optional: React Native specific devtools
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
//
// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <YourApp />
//       {__DEV__ && <ReactQueryDevtools />}
//     </QueryClientProvider>
//   );
// }

// ============================================================
// EXERCISES
// ============================================================

console.log("--- Exercises ---\n");

console.log(`
EXERCISE 1: Configure QueryClient for a news app
- Fresh data for 2 minutes
- Cache data for 1 hour
- Retry 2 times
- Refetch on reconnect (news should be fresh)

EXERCISE 2: Design query keys for an e-commerce app
- All products
- Product by ID
- Products by category
- Product reviews
- User cart
- User orders

EXERCISE 3: Set up React Query in the Expo starter
- Create lib/queryClient.ts
- Configure in app/_layout.tsx
- Verify setup by logging in useEffect
`);

export { queryClient, createQueryClient };
```

**Step 2: Write 33-usequery-basics.tsx**

Content outline:
- useQuery hook syntax
- queryKey and queryFn
- Loading, error, success states
- Dependent queries
- Parallel queries
- Select option for transforming data
- Enabled option

**Step 3: Write 34-usemutation.tsx**

Content outline:
- useMutation hook
- mutate vs mutateAsync
- onSuccess, onError, onSettled
- Variables
- Optimistic updates preview
- Loading states for buttons

**Step 4: Write 35-cache-invalidation.tsx**

Content outline:
- Why invalidation matters
- queryClient.invalidateQueries
- Invalidation patterns
- Automatic invalidation after mutation
- Partial cache updates
- setQueryData

**Step 5: Commit**

```bash
git add lessons/react-native/32-query-setup.tsx
git add lessons/react-native/33-usequery-basics.tsx
git add lessons/react-native/34-usemutation.tsx
git add lessons/react-native/35-cache-invalidation.tsx
git commit -m "feat(react-native): add TanStack Query lessons 32-35"
```

---

## Task 11: Create TanStack Query Lessons (36-38)

**Files:**
- Create: `lessons/react-native/36-pagination-infinite.tsx`
- Create: `lessons/react-native/37-optimistic-updates.tsx`
- Create: `lessons/react-native/38-error-retry.tsx`

**Step 1: Write 36-pagination-infinite.tsx**

Content outline:
- useInfiniteQuery hook
- getNextPageParam
- fetchNextPage
- hasNextPage, isFetchingNextPage
- FlatList integration
- onEndReached for infinite scroll

**Step 2: Write 37-optimistic-updates.tsx**

Content outline:
- What are optimistic updates
- onMutate for optimistic update
- Rollback on error
- Context for rollback data
- When to use optimistic updates
- Example: like button

**Step 3: Write 38-error-retry.tsx**

Content outline:
- Error handling patterns
- isError, error properties
- Custom error components
- Retry button
- Automatic retry configuration
- Network status handling

**Step 4: Commit**

```bash
git add lessons/react-native/36-pagination-infinite.tsx
git add lessons/react-native/37-optimistic-updates.tsx
git add lessons/react-native/38-error-retry.tsx
git commit -m "feat(react-native): add TanStack Query lessons 36-38"
```

---

## Task 12: Create API Integration Lessons (39-42)

**Files:**
- Create: `lessons/react-native/39-api-client-setup.tsx`
- Create: `lessons/react-native/40-zod-response-validation.tsx`
- Create: `lessons/react-native/41-authentication-flow.tsx`
- Create: `lessons/react-native/42-offline-support.tsx`

**Step 1: Write 39-api-client-setup.tsx**

Content outline:
- Fetch wrapper function
- Base URL configuration
- Headers setup
- Error handling
- Request/response interceptors pattern
- Type-safe API functions

**Step 2: Write 40-zod-response-validation.tsx**

Content outline:
- Why validate API responses
- Shared schemas with backend
- Validating in queryFn
- Handling validation errors
- SafeParse vs parse
- Runtime type safety

**Step 3: Write 41-authentication-flow.tsx**

Content outline:
- Token storage (expo-secure-store)
- Auth context
- Login/logout flow
- Token refresh
- Protected routes
- Auth-aware API client

**Step 4: Write 42-offline-support.tsx**

Content outline:
- Persist cache (AsyncStorage)
- @tanstack/query-async-storage-persister
- Network status detection
- Offline-first patterns
- Queue mutations for offline
- Sync when online

**Step 5: Commit**

```bash
git add lessons/react-native/39-api-client-setup.tsx
git add lessons/react-native/40-zod-response-validation.tsx
git add lessons/react-native/41-authentication-flow.tsx
git add lessons/react-native/42-offline-support.tsx
git commit -m "feat(react-native): add API integration lessons 39-42"
```

---

## Task 13: Create Practice Files

**Files:**
- Create: `lessons/react-native/practice/01-react-core-practice.tsx`
- Create: `lessons/react-native/practice/02-react-native-practice.tsx`
- Create: `lessons/react-native/practice/03-navigation-practice.tsx`
- Create: `lessons/react-native/practice/04-styling-practice.tsx`
- Create: `lessons/react-native/practice/05-query-practice.tsx`
- Create: `lessons/react-native/practice/06-integration-practice.tsx`

**Step 1: Write 01-react-core-practice.tsx**

Practice exercises:
1. Create a temperature converter component (Celsius/Fahrenheit)
2. Build a character counter with max length warning
3. Create a filterable list with search
4. Build a multi-step form wizard
5. Create a custom useLocalStorage hook

**Step 2: Write 02-react-native-practice.tsx**

Practice exercises:
1. Build a user profile card with avatar, name, stats
2. Create a product grid with FlatList (2 columns)
3. Build a swipeable delete list item
4. Create a custom loading skeleton
5. Build a pull-to-refresh list

**Step 3: Write 03-navigation-practice.tsx**

Practice exercises:
1. Create a tab navigator with 3 tabs and icons
2. Build a stack with modal presentation
3. Create nested navigation (tabs > stack > details)
4. Implement deep linking for /product/:id
5. Build a drawer with custom content

**Step 4: Write 04-styling-practice.tsx**

Practice exercises:
1. Create a button component with variants using NativeWind
2. Build a card with dark mode support
3. Create a responsive layout (1 column mobile, 2 desktop)
4. Build a form with validation styling
5. Create a theme switcher

**Step 5: Write 05-query-practice.tsx**

Practice exercises:
1. Fetch and display a list of posts
2. Implement create, update, delete mutations
3. Build infinite scroll pagination
4. Add optimistic updates to a like button
5. Handle offline/online transitions

**Step 6: Write 06-integration-practice.tsx**

Practice exercises:
1. Connect to the Task Manager API (list tasks)
2. Create a new task with validation
3. Update task status with optimistic updates
4. Filter and search tasks
5. Full CRUD with error handling

**Step 7: Commit**

```bash
git add lessons/react-native/practice/
git commit -m "feat(react-native): add practice files for all modules"
```

---

## Task 14: Create Project 01 - Counter App

**Files:**
- Create: `lessons/react-native/projects/01-counter-app/`

**Step 1: Create project structure**

```
01-counter-app/
├── README.md
├── app/
│   ├── _layout.tsx
│   └── index.tsx
├── components/
│   ├── Counter.tsx
│   └── Button.tsx
└── package.json (reference to starter)
```

**Step 2: Write project README and starter code**

Project requirements:
- Increment/decrement buttons
- Display current count
- Reset button
- Count history (last 5 values)
- Persist count with AsyncStorage
- NativeWind styling

**Step 3: Commit**

```bash
git add lessons/react-native/projects/01-counter-app/
git commit -m "feat(react-native): add project 01 - Counter App"
```

---

## Task 15: Create Project 02 - Todo List (Local)

**Files:**
- Create: `lessons/react-native/projects/02-todo-list-local/`

**Step 1: Create project structure**

Project requirements:
- Add, complete, delete todos
- Filter by status (all, active, completed)
- Persist with AsyncStorage
- Swipe to delete
- Empty state
- NativeWind styling

**Step 2: Commit**

```bash
git add lessons/react-native/projects/02-todo-list-local/
git commit -m "feat(react-native): add project 02 - Todo List (Local)"
```

---

## Task 16: Create Project 03 - Notes App

**Files:**
- Create: `lessons/react-native/projects/03-notes-app/`

**Step 1: Create project structure**

Project requirements:
- List of notes with title preview
- Create/edit note screen (stack navigation)
- Delete notes
- Search notes
- Tabs for notes and favorites
- AsyncStorage persistence
- Dark mode support

**Step 2: Commit**

```bash
git add lessons/react-native/projects/03-notes-app/
git commit -m "feat(react-native): add project 03 - Notes App"
```

---

## Task 17: Create Project 04 - Task Manager (API Connected)

**Files:**
- Create: `lessons/react-native/projects/04-task-manager/`

**Step 1: Create project structure**

This is the main integration project connecting to the backend Task Manager API from Phase 2.

```
04-task-manager/
├── README.md
├── app/
│   ├── _layout.tsx
│   ├── index.tsx (task list)
│   ├── task/
│   │   ├── [id].tsx (task details)
│   │   └── new.tsx (create task)
│   └── (tabs)/
│       ├── _layout.tsx
│       ├── index.tsx (all tasks)
│       ├── todo.tsx
│       ├── in-progress.tsx
│       └── done.tsx
├── components/
│   ├── TaskCard.tsx
│   ├── TaskForm.tsx
│   ├── StatusBadge.tsx
│   ├── PriorityPicker.tsx
│   └── EmptyState.tsx
├── lib/
│   ├── api.ts
│   ├── queryClient.ts
│   └── schemas.ts (shared Zod schemas)
├── hooks/
│   ├── useTasks.ts
│   ├── useTask.ts
│   ├── useCreateTask.ts
│   ├── useUpdateTask.ts
│   └── useDeleteTask.ts
└── types/
    └── task.ts
```

**Step 2: Write README.md**

```markdown
# Project 04: Task Manager

Connect to the backend Task Manager API built in Phase 2.

## Prerequisites

1. Backend running:
```bash
cd lessons/backend
docker compose up -d
bun lessons/backend/projects/01-rest-api.ts
```

2. API available at http://localhost:3000

## Features

- [ ] List all tasks with pagination
- [ ] Filter tasks by status (tabs)
- [ ] Search tasks
- [ ] View task details
- [ ] Create new task
- [ ] Update task
- [ ] Update task status (quick action)
- [ ] Delete task with confirmation
- [ ] Pull to refresh
- [ ] Loading and error states
- [ ] Empty states

## API Endpoints Used

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /tasks | List tasks (with filters) |
| GET | /tasks/:id | Get single task |
| POST | /tasks | Create task |
| PUT | /tasks/:id | Update task |
| PATCH | /tasks/:id/status | Update status |
| DELETE | /tasks/:id | Delete task |
| GET | /tasks/stats | Get statistics |

## Skills Practiced

- TanStack React Query (useQuery, useMutation)
- Zod validation (shared with backend)
- expo-router navigation
- NativeWind styling
- Optimistic updates
- Error handling
- TypeScript
```

**Step 3: Write starter code files**

Create initial implementations for:
- lib/api.ts (configured for Task API)
- lib/schemas.ts (Task Zod schemas)
- hooks/useTasks.ts
- components/TaskCard.tsx

**Step 4: Commit**

```bash
git add lessons/react-native/projects/04-task-manager/
git commit -m "feat(react-native): add project 04 - Task Manager (API Connected)"
```

---

## Task 18: Create Project 05 - URL Shortener Mobile

**Files:**
- Create: `lessons/react-native/projects/05-url-shortener-mobile/`

**Step 1: Create project structure**

Connects to the URL Shortener API from Phase 2.

Features:
- Create short URLs
- List all URLs with stats
- Copy short URL to clipboard
- Share short URL
- View click statistics
- Delete URLs
- Custom short codes

**Step 2: Commit**

```bash
git add lessons/react-native/projects/05-url-shortener-mobile/
git commit -m "feat(react-native): add project 05 - URL Shortener Mobile"
```

---

## Task 19: Create Project 06 - Dashboard App

**Files:**
- Create: `lessons/react-native/projects/06-dashboard-app/`

**Step 1: Create project structure**

Combined dashboard using both APIs:
- Task statistics (pie chart)
- URL click statistics (bar chart)
- Recent tasks
- Top URLs by clicks
- Quick actions
- Pull to refresh all data

Uses @shopify/react-native-skia or similar for charts.

**Step 2: Commit**

```bash
git add lessons/react-native/projects/06-dashboard-app/
git commit -m "feat(react-native): add project 06 - Dashboard App"
```

---

## Task 20: Update Curriculum Documentation

**Files:**
- Modify: `CURRICULUM.md`

**Step 1: Update Phase 4-6 sections**

Update CURRICULUM.md to reflect:
- Phase 4: React Fundamentals (Lessons 01-10) - new
- Phase 5: React Native & Expo (Lessons 11-31) - detailed
- Phase 6: Data Fetching & State (Lessons 32-42) - detailed
- Updated project list
- Updated time estimates
- Prerequisites updated

**Step 2: Update progress tracking**

Mark Phase 4-6 as "In Progress" or "Planned" with the new structure.

**Step 3: Commit**

```bash
git add CURRICULUM.md
git commit -m "docs: update curriculum for React Native frontend phase"
```

---

## Summary

| Task | Description | Files Created/Modified |
|------|-------------|----------------------|
| 1 | Directory structure & README | README.md, directories |
| 2 | Expo starter project | starter/expo-app/* |
| 3 | React Core lessons 01-05 | 01-05.tsx |
| 4 | React Core lessons 06-10 | 06-10.tsx |
| 5 | React Native lessons 11-14 | 11-14.tsx |
| 6 | React Native lessons 15-18 | 15-18.tsx |
| 7 | Expo/Navigation lessons 19-22 | 19-22.tsx |
| 8 | Expo/Navigation lessons 23-26 | 23-26.tsx |
| 9 | NativeWind lessons 27-31 | 27-31.tsx |
| 10 | TanStack Query lessons 32-35 | 32-35.tsx |
| 11 | TanStack Query lessons 36-38 | 36-38.tsx |
| 12 | API Integration lessons 39-42 | 39-42.tsx |
| 13 | Practice files | practice/01-06.tsx |
| 14 | Project 01 - Counter | 01-counter-app/* |
| 15 | Project 02 - Todo Local | 02-todo-list-local/* |
| 16 | Project 03 - Notes | 03-notes-app/* |
| 17 | Project 04 - Task Manager | 04-task-manager/* |
| 18 | Project 05 - URL Shortener | 05-url-shortener-mobile/* |
| 19 | Project 06 - Dashboard | 06-dashboard-app/* |
| 20 | Update CURRICULUM.md | CURRICULUM.md |

**Total: 20 tasks, 42 lessons, 6 practice files, 6 projects**

---

## Post-Implementation Verification

After completing all tasks:

1. **Verify Expo starter works:**
```bash
cd lessons/react-native/starter/expo-app
bun install
bun expo start
```

2. **Run each lesson file** to verify no syntax errors

3. **Test API integration:**
```bash
# Start backend
cd lessons/backend && docker compose up -d
bun lessons/backend/projects/01-rest-api.ts

# Test from mobile app
cd lessons/react-native/starter/expo-app
bun expo start
```

4. **Verify NativeWind styling** renders correctly

5. **Test on both platforms:**
   - iOS Simulator (Mac only)
   - Android Emulator
   - Expo Go on physical device

6. **Complete at least one project** end-to-end to verify the curriculum flow

---

## Dependencies to Install

```bash
# In lessons/react-native/starter/expo-app

# Core
bun add react react-native
bun add expo

# Navigation
bun add expo-router
bun add @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs

# Data Fetching
bun add @tanstack/react-query
bun add zod

# Styling
bun add nativewind
bun add -d tailwindcss

# Utilities
bun add expo-secure-store
bun add @react-native-async-storage/async-storage
bun add expo-clipboard
bun add expo-sharing

# Icons
bun add lucide-react-native
bun add react-native-svg

# DevTools
bun add -d @tanstack/react-query-devtools
```

---

## Notes for Implementation

1. **Lesson Style:** Follow the same teaching style as TypeScript and Backend lessons - analogies, sections, exercises, real-world examples

2. **Code Examples:** All code should be runnable. Use console.log for non-visual lessons, actual components for UI lessons

3. **Progressive Complexity:** Each lesson builds on the previous. Reference earlier lessons when using concepts

4. **API Integration:** Projects 04-06 require the backend to be running. Include clear instructions for setup

5. **Cross-Platform:** Test examples on both iOS and Android. Note any platform differences

6. **TypeScript:** All code should be fully typed. Use interfaces for props, Zod for API responses

7. **Best Practices:** Teach React Query patterns, proper state management, and component composition throughout
