/**
 * ============================================================
 * LESSON 23: OpenAPI & Swagger Documentation
 * ============================================================
 *
 * Generate API documentation automatically from your code.
 * Building on Lesson 22's integration, we add automatic documentation.
 *
 * ANALOGY: OpenAPI is like a menu at a restaurant:
 * - Lists all available dishes (endpoints)
 * - Describes ingredients (request parameters)
 * - Shows photos (response examples)
 * - Indicates allergens (validation rules)
 *
 * Benefits:
 * - Auto-generated API docs
 * - Interactive testing (Swagger UI)
 * - Client code generation
 * - Validation from schemas
 *
 * Prerequisites:
 * - Lesson 13-16: Zod validation
 * - Lesson 17-21: Drizzle ORM
 * - Lesson 22: Full stack integration
 *
 * Install: bun add @hono/swagger-ui @hono/zod-openapi zod drizzle-zod
 */

import { Hono } from "hono";
import { swaggerUI } from "@hono/swagger-ui";

console.log("========================================");
console.log("LESSON 23: OPENAPI & SWAGGER");
console.log("========================================\n");

// ============================================================
// SECTION 1: What is OpenAPI?
// ============================================================

/**
 * OpenAPI (formerly Swagger) is a specification for describing REST APIs.
 * It's a JSON/YAML document that describes:
 * - Available endpoints
 * - Request/response formats
 * - Authentication methods
 * - Parameters and validations
 */

console.log("--- What is OpenAPI? ---");

const openApiExample = `
{
  "openapi": "3.0.0",
  "info": {
    "title": "My API",
    "version": "1.0.0"
  },
  "paths": {
    "/users": {
      "get": {
        "summary": "List all users",
        "responses": {
          "200": {
            "description": "Successful response"
          }
        }
      }
    }
  }
}
`;
console.log("OpenAPI spec example:");
console.log(openApiExample);

// ============================================================
// SECTION 2: Manual OpenAPI Spec
// ============================================================

/**
 * You can create an OpenAPI spec manually.
 */

console.log("--- Manual OpenAPI Spec ---");

const manualSpec = {
  openapi: "3.0.0",
  info: {
    title: "Todo API",
    description: "A simple Todo API",
    version: "1.0.0",
  },
  servers: [{ url: "http://localhost:3000", description: "Development server" }],
  paths: {
    "/todos": {
      get: {
        summary: "List all todos",
        tags: ["Todos"],
        responses: {
          "200": {
            description: "Successful response",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "number" },
                      title: { type: "string" },
                      completed: { type: "boolean" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Create a todo",
        tags: ["Todos"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["title"],
                properties: {
                  title: { type: "string", minLength: 1 },
                },
              },
            },
          },
        },
        responses: {
          "201": { description: "Todo created" },
          "400": { description: "Invalid input" },
        },
      },
    },
    "/todos/{id}": {
      get: {
        summary: "Get a todo by ID",
        tags: ["Todos"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "number" },
          },
        ],
        responses: {
          "200": { description: "Successful response" },
          "404": { description: "Todo not found" },
        },
      },
    },
  },
};

console.log("Manual spec created with 3 endpoints");

// ============================================================
// SECTION 3: Serving the OpenAPI Spec
// ============================================================

/**
 * Serve the OpenAPI spec as JSON for clients.
 */

console.log("\n--- Serving OpenAPI Spec ---");

const app = new Hono();

// Serve OpenAPI spec
app.get("/openapi.json", (c) => {
  return c.json(manualSpec);
});

// Test
const specRes = await app.request("/openapi.json");
console.log(`GET /openapi.json -> ${specRes.status}`);

// ============================================================
// SECTION 4: Swagger UI
// ============================================================

/**
 * Swagger UI provides an interactive documentation interface.
 */

console.log("\n--- Swagger UI ---");

// Add Swagger UI
app.get(
  "/docs",
  swaggerUI({
    url: "/openapi.json",
  })
);

console.log("Swagger UI available at /docs");
console.log("(In a real server, visit http://localhost:3000/docs)");

// ============================================================
// SECTION 5: API Implementation with Docs
// ============================================================

console.log("\n--- Complete API with Docs ---");

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const todos: Todo[] = [
  { id: 1, title: "Learn OpenAPI", completed: false },
  { id: 2, title: "Build API", completed: false },
];

const apiApp = new Hono();

// OpenAPI spec
const apiSpec = {
  openapi: "3.0.0",
  info: {
    title: "Todo API",
    version: "1.0.0",
    description: "A complete Todo API with OpenAPI documentation",
  },
  paths: {
    "/api/todos": {
      get: {
        operationId: "listTodos",
        summary: "List all todos",
        tags: ["Todos"],
        parameters: [
          {
            name: "completed",
            in: "query",
            schema: { type: "boolean" },
            description: "Filter by completion status",
          },
        ],
        responses: {
          "200": {
            description: "List of todos",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    data: {
                      type: "array",
                      items: { $ref: "#/components/schemas/Todo" },
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        operationId: "createTodo",
        summary: "Create a new todo",
        tags: ["Todos"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateTodo" },
            },
          },
        },
        responses: {
          "201": {
            description: "Todo created",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Todo" },
              },
            },
          },
        },
      },
    },
    "/api/todos/{id}": {
      get: {
        operationId: "getTodo",
        summary: "Get a todo by ID",
        tags: ["Todos"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          "200": {
            description: "Todo found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Todo" },
              },
            },
          },
          "404": {
            description: "Todo not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
              },
            },
          },
        },
      },
      put: {
        operationId: "updateTodo",
        summary: "Update a todo",
        tags: ["Todos"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UpdateTodo" },
            },
          },
        },
        responses: {
          "200": {
            description: "Todo updated",
          },
        },
      },
      delete: {
        operationId: "deleteTodo",
        summary: "Delete a todo",
        tags: ["Todos"],
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" },
          },
        ],
        responses: {
          "204": { description: "Todo deleted" },
        },
      },
    },
  },
  components: {
    schemas: {
      Todo: {
        type: "object",
        properties: {
          id: { type: "integer" },
          title: { type: "string" },
          completed: { type: "boolean" },
        },
        required: ["id", "title", "completed"],
      },
      CreateTodo: {
        type: "object",
        properties: {
          title: { type: "string", minLength: 1, maxLength: 100 },
        },
        required: ["title"],
      },
      UpdateTodo: {
        type: "object",
        properties: {
          title: { type: "string" },
          completed: { type: "boolean" },
        },
      },
      Error: {
        type: "object",
        properties: {
          error: { type: "string" },
          status: { type: "integer" },
        },
      },
    },
  },
};

// Docs endpoints
apiApp.get("/openapi.json", (c) => c.json(apiSpec));
apiApp.get("/docs", swaggerUI({ url: "/openapi.json" }));

// API endpoints
apiApp.get("/api/todos", (c) => {
  const completed = c.req.query("completed");
  let result = todos;

  if (completed === "true") {
    result = todos.filter((t) => t.completed);
  } else if (completed === "false") {
    result = todos.filter((t) => !t.completed);
  }

  return c.json({ data: result });
});

apiApp.post("/api/todos", async (c) => {
  const body = await c.req.json<{ title: string }>();

  const newTodo: Todo = {
    id: todos.length + 1,
    title: body.title,
    completed: false,
  };

  todos.push(newTodo);
  return c.json(newTodo, 201);
});

apiApp.get("/api/todos/:id", (c) => {
  const id = parseInt(c.req.param("id"));
  const todo = todos.find((t) => t.id === id);

  if (!todo) {
    return c.json({ error: "Todo not found", status: 404 }, 404);
  }

  return c.json(todo);
});

// Test the documented API
console.log("Testing documented API:");
const todoListRes = await apiApp.request("/api/todos");
console.log(`GET /api/todos -> ${await todoListRes.text()}`);

// ============================================================
// SECTION 6: Benefits of OpenAPI
// ============================================================

console.log("\n--- Benefits of OpenAPI ---");

const benefits = `
1. DOCUMENTATION
   - Auto-generated, always up-to-date docs
   - Interactive testing with Swagger UI
   
2. CLIENT GENERATION
   - Generate TypeScript/JavaScript clients
   - Generate mobile SDK (Swift, Kotlin)
   - Tools: openapi-generator, orval
   
3. VALIDATION
   - Validate requests against schema
   - Validate responses in tests
   
4. TESTING
   - Generate test cases from spec
   - Contract testing
   
5. COLLABORATION
   - Design-first development
   - Share spec with frontend team
`;
console.log(benefits);

// ============================================================
// SECTION 7: Best Practices
// ============================================================

console.log("--- Best Practices ---");

const bestPractices = `
1. Use consistent naming (camelCase, snake_case)
2. Group endpoints with tags
3. Provide examples for complex schemas
4. Use descriptive operation IDs
5. Document all error responses
6. Include authentication info
7. Version your API (/v1/users)
8. Keep spec in sync with code
`;
console.log(bestPractices);

// ============================================================
// SECTION 8: Using @hono/zod-openapi with Drizzle
// ============================================================

console.log("--- Zod-OpenAPI with Drizzle Integration ---");

const zodOpenApiDrizzleExample = `
// Combining drizzle-zod with @hono/zod-openapi for full-stack docs
// This builds on the pattern from Lesson 22

import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { users } from './db/schema';

// Generate schemas from Drizzle tables
const UserSchema = createSelectSchema(users).omit({ passwordHash: true }).openapi('User');

const CreateUserSchema = createInsertSchema(users, {
  email: z.string().email().openapi({ example: 'user@example.com' }),
  username: z.string().min(3).openapi({ example: 'johndoe' }),
}).omit({ id: true, createdAt: true, updatedAt: true }).openapi('CreateUser');

// Define route with OpenAPI metadata
const createUserRoute = createRoute({
  method: 'post',
  path: '/users',
  tags: ['Users'],
  summary: 'Create a new user',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateUserSchema
        }
      }
    }
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean(),
            data: UserSchema
          })
        }
      },
      description: 'User created successfully'
    },
    422: {
      content: {
        'application/json': {
          schema: z.object({
            success: z.boolean(),
            error: z.object({
              message: z.string(),
              details: z.array(z.object({
                field: z.string(),
                message: z.string()
              }))
            })
          })
        }
      },
      description: 'Validation error'
    }
  }
});

// Type-safe handler with Drizzle
app.openapi(createUserRoute, async (c) => {
  const body = c.req.valid('json');

  const newUser = await db.insert(users)
    .values(body)
    .returning();

  return c.json({ success: true, data: newUser[0] }, 201);
});
`;
console.log(zodOpenApiDrizzleExample);

// ============================================================
// SECTION 9: Full Example with Drizzle + OpenAPI
// ============================================================

console.log("\n--- Full Drizzle + OpenAPI Example ---");

const fullDrizzleOpenApiExample = `
// Complete example: User CRUD API with OpenAPI documentation
// src/routes/users.ts

import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { db } from '../db';
import { users } from '../db/schema';
import { eq } from 'drizzle-orm';

export const usersRouter = new OpenAPIHono();

// Schema definitions from Drizzle tables
const UserResponseSchema = createSelectSchema(users)
  .omit({ passwordHash: true })
  .openapi('UserResponse');

const CreateUserSchema = createInsertSchema(users)
  .omit({ id: true, createdAt: true, updatedAt: true, isActive: true })
  .openapi('CreateUserInput');

const UpdateUserSchema = CreateUserSchema.partial()
  .omit({ passwordHash: true })
  .openapi('UpdateUserInput');

// Error schemas
const ErrorSchema = z.object({
  success: z.literal(false),
  error: z.object({
    message: z.string(),
    code: z.string(),
  })
}).openapi('Error');

const ValidationErrorSchema = z.object({
  success: z.literal(false),
  error: z.object({
    message: z.string(),
    code: z.literal('VALIDATION_ERROR'),
    details: z.array(z.object({
      field: z.string(),
      message: z.string(),
    })),
  })
}).openapi('ValidationError');

// GET /users - List users
const listUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  tags: ['Users'],
  summary: 'List all users',
  description: 'Retrieve a paginated list of users',
  request: {
    query: z.object({
      page: z.coerce.number().int().positive().default(1).openapi({ example: 1 }),
      limit: z.coerce.number().int().min(1).max(100).default(10).openapi({ example: 10 }),
    }),
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: z.object({
            success: z.literal(true),
            data: z.array(UserResponseSchema),
            pagination: z.object({
              page: z.number(),
              limit: z.number(),
              total: z.number(),
            }),
          }),
        },
      },
      description: 'List of users',
    },
  },
});

usersRouter.openapi(listUsersRoute, async (c) => {
  const { page, limit } = c.req.valid('query');
  const offset = (page - 1) * limit;

  const userList = await db.select().from(users).limit(limit).offset(offset);

  return c.json({
    success: true as const,
    data: userList,
    pagination: { page, limit, total: userList.length },
  });
});

// POST /users - Create user
const createUserRoute = createRoute({
  method: 'post',
  path: '/users',
  tags: ['Users'],
  summary: 'Create a new user',
  request: {
    body: {
      content: { 'application/json': { schema: CreateUserSchema } },
    },
  },
  responses: {
    201: {
      content: {
        'application/json': {
          schema: z.object({
            success: z.literal(true),
            data: UserResponseSchema,
          }),
        },
      },
      description: 'User created',
    },
    422: {
      content: { 'application/json': { schema: ValidationErrorSchema } },
      description: 'Validation failed',
    },
  },
});

usersRouter.openapi(createUserRoute, async (c) => {
  const body = c.req.valid('json');

  const newUser = await db.insert(users).values(body).returning();

  return c.json({ success: true as const, data: newUser[0] }, 201);
});

// Export router and register with main app
`;

console.log(fullDrizzleOpenApiExample);

// ============================================================
// KEY TAKEAWAYS
// ============================================================

console.log("\n========================================");
console.log("KEY TAKEAWAYS");
console.log("========================================");
console.log("1. OpenAPI is a standard for API documentation");
console.log("2. Swagger UI provides interactive docs");
console.log("3. Serve spec at /openapi.json");
console.log("4. Use /docs for Swagger UI");
console.log("5. Document all endpoints, params, and responses");
console.log("6. Keep documentation in sync with code");
console.log("7. @hono/zod-openapi auto-generates specs from Zod schemas");
console.log("8. drizzle-zod + zod-openapi = schemas from DB to docs");
console.log("9. Full pipeline: Drizzle -> Zod -> OpenAPI -> Swagger UI");

console.log("\nCongratulations! You've completed the Backend lesson series!");
console.log("\nYou've learned:");
console.log("- Docker & Docker Compose (Lessons 1-2)");
console.log("- Bun runtime & APIs (Lessons 3-7)");
console.log("- Hono web framework (Lessons 8-12)");
console.log("- Zod validation (Lessons 13-16)");
console.log("- Drizzle ORM (Lessons 17-21)");
console.log("- Full stack integration (Lesson 22)");
console.log("- OpenAPI documentation (Lesson 23)");
console.log("\nYou're ready to build production-grade TypeScript APIs!");

console.log("\nLesson 23 Complete!");

export {};
