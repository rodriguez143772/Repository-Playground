/**
 * ============================================================
 * LESSON 23: OpenAPI & Swagger Documentation
 * ============================================================
 *
 * Generate API documentation automatically from your code.
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
 * Install: bun add @hono/swagger-ui @hono/zod-openapi zod
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
// SECTION 8: Using @hono/zod-openapi (Preview)
// ============================================================

console.log("--- Zod-OpenAPI Integration (Preview) ---");

const zodOpenApiExample = `
// In the Zod lessons, we'll see how to generate OpenAPI from Zod schemas:

import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi';

const TodoSchema = z.object({
  id: z.number(),
  title: z.string(),
  completed: z.boolean()
});

const route = createRoute({
  method: 'get',
  path: '/todos/{id}',
  request: {
    params: z.object({
      id: z.number()
    })
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: TodoSchema
        }
      },
      description: 'Todo found'
    }
  }
});

app.openapi(route, (c) => {
  // Type-safe handler!
  const { id } = c.req.valid('param');
  return c.json({ id, title: 'Example', completed: false });
});
`;
console.log(zodOpenApiExample);

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
console.log("7. Zod-OpenAPI auto-generates specs from schemas");

console.log("\n✅ Lesson 23 Complete!");
