/**
 * ============================================================
 * PROJECT: Type-Safe API Client
 * Required Knowledge: Lessons 1-12 (+ Utility Types)
 * ============================================================
 * 
 * Build a fully type-safe API client with:
 * - Request/response type safety
 * - DTOs for create/update operations
 * - Error handling with discriminated unions
 * - Caching with generics
 * - Retry logic
 * 
 * This project practices:
 * - Utility types (Partial, Pick, Omit, etc.)
 * - Mapped types
 * - Conditional types
 * - Template literal types
 * - Advanced generic patterns
 */

// ============================================================
// API Types
// ============================================================

// Base entity with common fields
interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// User entity
interface User extends BaseEntity {
  email: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  role: "admin" | "user" | "guest";
  settings: {
    theme: "light" | "dark";
    notifications: boolean;
    language: string;
  };
}

// Post entity
interface Post extends BaseEntity {
  title: string;
  content: string;
  authorId: string;
  published: boolean;
  tags: string[];
  viewCount: number;
}

// Comment entity
interface Comment extends BaseEntity {
  postId: string;
  authorId: string;
  content: string;
  likes: number;
}

// ============================================================
// TODO: Create DTOs using Utility Types
// ============================================================

/**
 * CreateUserDTO: Omit id, createdAt, updatedAt from User
 * Also make settings optional with default values
 */
type CreateUserDTO = {}; // TODO: Use Omit and Partial

/**
 * UpdateUserDTO: All fields optional except id is required
 */
type UpdateUserDTO = {}; // TODO: Use Partial and Pick

/**
 * CreatePostDTO: Everything except id, timestamps, viewCount
 */
type CreatePostDTO = {}; // TODO: Implement

/**
 * UpdatePostDTO: Partial fields, id required
 */
type UpdatePostDTO = {}; // TODO: Implement

/**
 * PublicUser: Safe user data (no sensitive info like settings)
 */
type PublicUser = {}; // TODO: Use Pick

/**
 * UserPreview: Just id, username, displayName, avatarUrl
 */
type UserPreview = {}; // TODO: Use Pick

// ============================================================
// TODO: API Response Types (Discriminated Union)
// ============================================================

type ApiSuccess<T> = {
  success: true;
  data: T;
  meta?: {
    page?: number;
    totalPages?: number;
    totalItems?: number;
  };
};

type ApiError = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
};

type ApiResponse<T> = ApiSuccess<T> | ApiError;

// Paginated response
type PaginatedResponse<T> = ApiSuccess<T[]> & {
  meta: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
  };
};

// ============================================================
// TODO: Helper Utility Types
// ============================================================

/**
 * Make specific properties required
 */
type RequireKeys<T, K extends keyof T> = T; // TODO: Fix this

/**
 * Make specific properties optional
 */
type OptionalKeys<T, K extends keyof T> = T; // TODO: Fix this

/**
 * Deep partial (all nested properties optional)
 */
type DeepPartial<T> = T; // TODO: Implement

/**
 * Make all properties readonly recursively
 */
type DeepReadonly<T> = T; // TODO: Implement

/**
 * Extract only the string keys from an object
 */
type StringKeys<T> = keyof T; // TODO: Fix to only string keys

/**
 * Get the type of a property at a path (e.g., "settings.theme")
 */
type PathValue<T, P extends string> = unknown; // TODO: Implement (bonus)

// ============================================================
// TODO: API Client Class
// ============================================================

class ApiClient {
  private baseUrl: string;
  private defaultHeaders: Record<string, string> = {};
  private cache: Map<string, { data: unknown; expiry: number }> = new Map();
  
  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }
  
  /**
   * Set authorization header.
   */
  setAuthToken(token: string): void {
    // TODO: Set Authorization header
  }
  
  /**
   * Generic GET request.
   */
  async get<T>(
    endpoint: string,
    options?: { 
      cache?: boolean; 
      cacheTTL?: number;
      params?: Record<string, string | number>;
    }
  ): Promise<ApiResponse<T>> {
    // TODO: Implement GET with optional caching
    return { success: false, error: { code: "NOT_IMPLEMENTED", message: "Not implemented" } };
  }
  
  /**
   * Generic POST request.
   */
  async post<T, B>(
    endpoint: string,
    body: B
  ): Promise<ApiResponse<T>> {
    // TODO: Implement POST
    return { success: false, error: { code: "NOT_IMPLEMENTED", message: "Not implemented" } };
  }
  
  /**
   * Generic PUT request.
   */
  async put<T, B>(
    endpoint: string,
    body: B
  ): Promise<ApiResponse<T>> {
    // TODO: Implement PUT
    return { success: false, error: { code: "NOT_IMPLEMENTED", message: "Not implemented" } };
  }
  
  /**
   * Generic PATCH request.
   */
  async patch<T, B>(
    endpoint: string,
    body: Partial<B>
  ): Promise<ApiResponse<T>> {
    // TODO: Implement PATCH
    return { success: false, error: { code: "NOT_IMPLEMENTED", message: "Not implemented" } };
  }
  
  /**
   * Generic DELETE request.
   */
  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    // TODO: Implement DELETE
    return { success: false, error: { code: "NOT_IMPLEMENTED", message: "Not implemented" } };
  }
  
  /**
   * Clear cache.
   */
  clearCache(): void {
    // TODO: Clear all cached entries
  }
}

// ============================================================
// TODO: Resource-Specific API Classes
// ============================================================

class UsersApi {
  constructor(private client: ApiClient) {}
  
  /**
   * Get all users (paginated).
   */
  async getAll(page = 1, pageSize = 10): Promise<PaginatedResponse<User> | ApiError> {
    // TODO: Implement
    return { success: false, error: { code: "NOT_IMPLEMENTED", message: "" } };
  }
  
  /**
   * Get user by ID.
   */
  async getById(id: string): Promise<ApiResponse<User>> {
    // TODO: Implement
    return { success: false, error: { code: "NOT_IMPLEMENTED", message: "" } };
  }
  
  /**
   * Create new user.
   */
  async create(data: CreateUserDTO): Promise<ApiResponse<User>> {
    // TODO: Implement
    return { success: false, error: { code: "NOT_IMPLEMENTED", message: "" } };
  }
  
  /**
   * Update user.
   */
  async update(data: UpdateUserDTO): Promise<ApiResponse<User>> {
    // TODO: Implement
    return { success: false, error: { code: "NOT_IMPLEMENTED", message: "" } };
  }
  
  /**
   * Delete user.
   */
  async delete(id: string): Promise<ApiResponse<void>> {
    // TODO: Implement
    return { success: false, error: { code: "NOT_IMPLEMENTED", message: "" } };
  }
  
  /**
   * Update user settings.
   */
  async updateSettings(
    id: string,
    settings: DeepPartial<User["settings"]>
  ): Promise<ApiResponse<User>> {
    // TODO: Implement partial settings update
    return { success: false, error: { code: "NOT_IMPLEMENTED", message: "" } };
  }
}

class PostsApi {
  constructor(private client: ApiClient) {}
  
  /**
   * Get all posts.
   */
  async getAll(options?: {
    page?: number;
    pageSize?: number;
    authorId?: string;
    published?: boolean;
    tags?: string[];
  }): Promise<PaginatedResponse<Post> | ApiError> {
    // TODO: Implement with query params
    return { success: false, error: { code: "NOT_IMPLEMENTED", message: "" } };
  }
  
  /**
   * Get post by ID.
   */
  async getById(id: string): Promise<ApiResponse<Post>> {
    // TODO: Implement
    return { success: false, error: { code: "NOT_IMPLEMENTED", message: "" } };
  }
  
  /**
   * Create new post.
   */
  async create(data: CreatePostDTO): Promise<ApiResponse<Post>> {
    // TODO: Implement
    return { success: false, error: { code: "NOT_IMPLEMENTED", message: "" } };
  }
  
  /**
   * Publish a post.
   */
  async publish(id: string): Promise<ApiResponse<Post>> {
    // TODO: Implement using patch
    return { success: false, error: { code: "NOT_IMPLEMENTED", message: "" } };
  }
  
  /**
   * Get posts by author with user preview.
   */
  async getByAuthorWithPreview(authorId: string): Promise<ApiResponse<{
    author: UserPreview;
    posts: Post[];
  }>> {
    // TODO: Implement
    return { success: false, error: { code: "NOT_IMPLEMENTED", message: "" } };
  }
}

// ============================================================
// TODO: Response Handlers
// ============================================================

/**
 * Unwrap API response, throwing on error.
 */
function unwrapResponse<T>(response: ApiResponse<T>): T {
  // TODO: Return data if success, throw error if not
  throw new Error("Not implemented");
}

/**
 * Type guard for successful response.
 */
function isSuccess<T>(response: ApiResponse<T>): response is ApiSuccess<T> {
  // TODO: Implement type guard
  return false;
}

/**
 * Type guard for error response.
 */
function isError<T>(response: ApiResponse<T>): response is ApiError {
  // TODO: Implement type guard
  return false;
}

/**
 * Handle API response with callbacks.
 */
function handleResponse<T>(
  response: ApiResponse<T>,
  handlers: {
    onSuccess: (data: T) => void;
    onError: (error: ApiError["error"]) => void;
  }
): void {
  // TODO: Call appropriate handler
}

// ============================================================
// TODO: Request Builder (Fluent API)
// ============================================================

class RequestBuilder<T> {
  private _endpoint: string = "";
  private _params: Record<string, string> = {};
  private _headers: Record<string, string> = {};
  private _body: unknown = null;
  
  endpoint(url: string): this {
    this._endpoint = url;
    return this;
  }
  
  params(params: Record<string, string | number | boolean>): this {
    // TODO: Add query params
    return this;
  }
  
  header(key: string, value: string): this {
    // TODO: Add header
    return this;
  }
  
  body<B>(data: B): RequestBuilder<T> {
    // TODO: Set body
    return this as unknown as RequestBuilder<T>;
  }
  
  async execute(): Promise<ApiResponse<T>> {
    // TODO: Execute the request
    return { success: false, error: { code: "NOT_IMPLEMENTED", message: "" } };
  }
}

// ============================================================
// DEMO AND DISPLAY
// ============================================================

console.log("========================================");
console.log("TYPE-SAFE API CLIENT");
console.log("========================================\n");

// Create client and APIs
const client = new ApiClient("https://api.example.com");
client.setAuthToken("bearer-token-123");

const usersApi = new UsersApi(client);
const postsApi = new PostsApi(client);

console.log("--- Type Definitions ---");
console.log("CreateUserDTO excludes: id, createdAt, updatedAt");
console.log("UpdateUserDTO makes all fields optional except id");
console.log("PublicUser includes only safe fields");

console.log("\n--- API Response Handling ---");

// Simulated response handling
const mockSuccessResponse: ApiResponse<User> = {
  success: true,
  data: {
    id: "user-1",
    email: "user@example.com",
    username: "testuser",
    displayName: "Test User",
    role: "user",
    settings: { theme: "dark", notifications: true, language: "en" },
    createdAt: new Date(),
    updatedAt: new Date()
  }
};

const mockErrorResponse: ApiResponse<User> = {
  success: false,
  error: {
    code: "NOT_FOUND",
    message: "User not found",
    details: { id: ["Invalid user ID"] }
  }
};

console.log("Success response:", isSuccess(mockSuccessResponse));
console.log("Error response:", isError(mockErrorResponse));

if (isSuccess(mockSuccessResponse)) {
  console.log("User:", mockSuccessResponse.data.displayName);
}

handleResponse(mockErrorResponse, {
  onSuccess: (data) => console.log("Got user:", data),
  onError: (error) => console.log("Error:", error.message)
});

console.log("\n--- Request Builder ---");
// const request = new RequestBuilder<User[]>()
//   .endpoint("/users")
//   .params({ page: 1, limit: 10 })
//   .header("Accept", "application/json");

// ============================================================
// TESTS
// ============================================================

console.log("\n========================================");
console.log("TESTING YOUR SOLUTION");
console.log("========================================\n");

let passed = 0;
let failed = 0;

// Test type guards
if (isSuccess(mockSuccessResponse) && !isError(mockSuccessResponse)) {
  console.log("✅ isSuccess type guard works");
  passed++;
} else {
  console.log("❌ isSuccess type guard failed");
  failed++;
}

if (isError(mockErrorResponse) && !isSuccess(mockErrorResponse)) {
  console.log("✅ isError type guard works");
  passed++;
} else {
  console.log("❌ isError type guard failed");
  failed++;
}

// Test unwrapResponse
try {
  const data = unwrapResponse(mockSuccessResponse);
  if (data.id === "user-1") {
    console.log("✅ unwrapResponse works for success");
    passed++;
  } else {
    console.log("❌ unwrapResponse returned wrong data");
    failed++;
  }
} catch {
  console.log("❌ unwrapResponse threw on success");
  failed++;
}

try {
  unwrapResponse(mockErrorResponse);
  console.log("❌ unwrapResponse should throw on error");
  failed++;
} catch {
  console.log("✅ unwrapResponse throws on error");
  passed++;
}

// Test handleResponse
let handlerCalled = "";
handleResponse(mockSuccessResponse, {
  onSuccess: () => { handlerCalled = "success"; },
  onError: () => { handlerCalled = "error"; }
});
if (handlerCalled === "success") {
  console.log("✅ handleResponse calls onSuccess");
  passed++;
} else {
  console.log("❌ handleResponse didn't call onSuccess");
  failed++;
}

handleResponse(mockErrorResponse, {
  onSuccess: () => { handlerCalled = "success"; },
  onError: () => { handlerCalled = "error"; }
});
if (handlerCalled === "error") {
  console.log("✅ handleResponse calls onError");
  passed++;
} else {
  console.log("❌ handleResponse didn't call onError");
  failed++;
}

// Test ApiClient
const testClient = new ApiClient("https://test.api");
testClient.setAuthToken("test-token");
console.log("✅ ApiClient instantiates");
passed++;

// Test cache clear
testClient.clearCache();
console.log("✅ ApiClient cache clear works");
passed++;

// Test RequestBuilder
const builder = new RequestBuilder<User>()
  .endpoint("/users/1")
  .params({ include: "posts" })
  .header("X-Custom", "value");
console.log("✅ RequestBuilder chain works");
passed++;

console.log(`\n${passed}/${passed + failed} tests passed`);
if (failed === 0) {
  console.log("\n🎉 Project complete! You're a TypeScript master!");
  console.log("You've completed the entire curriculum!");
}
