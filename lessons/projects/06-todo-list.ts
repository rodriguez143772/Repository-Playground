/**
 * ============================================================
 * PROJECT: Todo List Manager
 * Required Knowledge: Lessons 1-6 (+ Arrays)
 * ============================================================
 * 
 * Build a todo list application that:
 * - Adds, removes, and updates todos
 * - Filters by status (complete/incomplete)
 * - Sorts by different criteria
 * - Provides statistics
 * 
 * This project practices:
 * - Array methods (push, filter, map, find, sort, reduce)
 * - Array manipulation
 * - Complex filtering logic
 */

// ============================================================
// TODO INTERFACE (Simple object structure)
// ============================================================

// Each todo is an object with these properties:
// - id: number
// - title: string
// - completed: boolean
// - priority: "low" | "medium" | "high"
// - createdAt: Date
// - dueDate?: Date

// ============================================================
// INITIAL DATA
// ============================================================

let todos: {
  id: number;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: Date;
  dueDate?: Date;
}[] = [
  { id: 1, title: "Learn TypeScript basics", completed: true, priority: "high", createdAt: new Date("2024-01-01") },
  { id: 2, title: "Build a project", completed: false, priority: "high", createdAt: new Date("2024-01-02"), dueDate: new Date("2024-02-01") },
  { id: 3, title: "Review arrays lesson", completed: true, priority: "medium", createdAt: new Date("2024-01-03") },
  { id: 4, title: "Practice functions", completed: false, priority: "medium", createdAt: new Date("2024-01-04"), dueDate: new Date("2024-01-15") },
  { id: 5, title: "Take a break", completed: false, priority: "low", createdAt: new Date("2024-01-05") },
];

let nextId = 6;

// ============================================================
// TODO: CRUD Operations
// ============================================================

/**
 * Add a new todo item.
 */
function addTodo(
  title: string,
  priority: "low" | "medium" | "high" = "medium",
  dueDate?: Date
): typeof todos[0] {
  // TODO: Create and add new todo, return it
  return todos[0];
}

/**
 * Get a todo by ID.
 */
function getTodoById(id: number): typeof todos[0] | undefined {
  // TODO: Find and return todo with matching ID
  return undefined;
}

/**
 * Update a todo's properties.
 */
function updateTodo(
  id: number,
  updates: {
    title?: string;
    completed?: boolean;
    priority?: "low" | "medium" | "high";
    dueDate?: Date;
  }
): boolean {
  // TODO: Update the todo, return true if found and updated
  return false;
}

/**
 * Delete a todo by ID.
 */
function deleteTodo(id: number): boolean {
  // TODO: Remove todo from array, return true if found and deleted
  return false;
}

/**
 * Toggle a todo's completed status.
 */
function toggleTodo(id: number): boolean {
  // TODO: Flip the completed status
  return false;
}

// ============================================================
// TODO: Filtering Functions
// ============================================================

/**
 * Get all completed todos.
 */
function getCompletedTodos(): typeof todos {
  // TODO: Return only completed todos
  return [];
}

/**
 * Get all incomplete todos.
 */
function getIncompleteTodos(): typeof todos {
  // TODO: Return only incomplete todos
  return [];
}

/**
 * Get todos by priority.
 */
function getTodosByPriority(priority: "low" | "medium" | "high"): typeof todos {
  // TODO: Return todos matching priority
  return [];
}

/**
 * Get overdue todos (due date passed and not completed).
 */
function getOverdueTodos(): typeof todos {
  // TODO: Return overdue todos
  const now = new Date();
  return [];
}

/**
 * Search todos by title (case-insensitive).
 */
function searchTodos(query: string): typeof todos {
  // TODO: Return todos whose title contains the query
  return [];
}

// ============================================================
// TODO: Sorting Functions
// ============================================================

/**
 * Sort todos by creation date (newest first).
 */
function sortByNewest(): typeof todos {
  // TODO: Return sorted copy (don't mutate original!)
  return [];
}

/**
 * Sort todos by due date (earliest first, no due date last).
 */
function sortByDueDate(): typeof todos {
  // TODO: Return sorted copy
  return [];
}

/**
 * Sort todos by priority (high → medium → low).
 */
function sortByPriority(): typeof todos {
  // TODO: Return sorted copy
  return [];
}

// ============================================================
// TODO: Statistics
// ============================================================

/**
 * Get todo statistics.
 */
function getStats(): {
  total: number;
  completed: number;
  incomplete: number;
  overdue: number;
  byPriority: { low: number; medium: number; high: number };
  completionRate: number;
} {
  // TODO: Calculate all statistics
  return {
    total: 0,
    completed: 0,
    incomplete: 0,
    overdue: 0,
    byPriority: { low: 0, medium: 0, high: 0 },
    completionRate: 0
  };
}

// ============================================================
// TODO: Batch Operations
// ============================================================

/**
 * Mark all todos as completed.
 */
function completeAll(): number {
  // TODO: Mark all as completed, return count of changed
  return 0;
}

/**
 * Delete all completed todos.
 */
function clearCompleted(): number {
  // TODO: Remove completed todos, return count deleted
  return 0;
}

/**
 * Update priority of multiple todos.
 */
function bulkUpdatePriority(
  ids: number[],
  priority: "low" | "medium" | "high"
): number {
  // TODO: Update priority for all matching IDs
  return 0;
}

// ============================================================
// DEMO AND DISPLAY
// ============================================================

console.log("========================================");
console.log("TODO LIST MANAGER");
console.log("========================================\n");

console.log("--- Current Todos ---");
todos.forEach(todo => {
  const status = todo.completed ? "✅" : "⬜";
  const priority = todo.priority === "high" ? "🔴" : todo.priority === "medium" ? "🟡" : "🟢";
  console.log(`${status} ${priority} [${todo.id}] ${todo.title}`);
});

console.log("\n--- Add New Todo ---");
const newTodo = addTodo("Write tests", "high", new Date("2024-02-15"));
console.log(`Added: ${newTodo?.title || "Failed"}`);

console.log("\n--- Statistics ---");
const stats = getStats();
console.log(`Total: ${stats.total}`);
console.log(`Completed: ${stats.completed} (${(stats.completionRate * 100).toFixed(0)}%)`);
console.log(`Incomplete: ${stats.incomplete}`);
console.log(`Overdue: ${stats.overdue}`);
console.log(`By Priority - High: ${stats.byPriority.high}, Medium: ${stats.byPriority.medium}, Low: ${stats.byPriority.low}`);

console.log("\n--- Filtered: High Priority ---");
getTodosByPriority("high").forEach(todo => console.log(`  - ${todo.title}`));

console.log("\n--- Sorted by Priority ---");
sortByPriority().forEach(todo => {
  console.log(`  ${todo.priority.toUpperCase()}: ${todo.title}`);
});

// ============================================================
// TESTS
// ============================================================

console.log("\n========================================");
console.log("TESTING YOUR SOLUTION");
console.log("========================================\n");

// Reset for testing
todos = [
  { id: 1, title: "Task 1", completed: true, priority: "high", createdAt: new Date() },
  { id: 2, title: "Task 2", completed: false, priority: "medium", createdAt: new Date() },
  { id: 3, title: "Task 3", completed: false, priority: "low", createdAt: new Date(), dueDate: new Date("2020-01-01") },
];
nextId = 4;

let passed = 0;
let failed = 0;

// Test addTodo
const added = addTodo("New Task", "high");
if (added && added.title === "New Task" && todos.length === 4) {
  console.log("✅ addTodo works");
  passed++;
} else {
  console.log("❌ addTodo failed");
  failed++;
}

// Test getTodoById
const found = getTodoById(1);
if (found && found.id === 1) {
  console.log("✅ getTodoById works");
  passed++;
} else {
  console.log("❌ getTodoById failed");
  failed++;
}

// Test updateTodo
const updated = updateTodo(1, { title: "Updated Task" });
if (updated && getTodoById(1)?.title === "Updated Task") {
  console.log("✅ updateTodo works");
  passed++;
} else {
  console.log("❌ updateTodo failed");
  failed++;
}

// Test toggleTodo
const beforeToggle = getTodoById(2)?.completed;
toggleTodo(2);
if (getTodoById(2)?.completed !== beforeToggle) {
  console.log("✅ toggleTodo works");
  passed++;
} else {
  console.log("❌ toggleTodo failed");
  failed++;
}

// Test getCompletedTodos
const completed = getCompletedTodos();
if (completed.every(t => t.completed)) {
  console.log("✅ getCompletedTodos works");
  passed++;
} else {
  console.log("❌ getCompletedTodos returns incomplete todos");
  failed++;
}

// Test getTodosByPriority
const highPriority = getTodosByPriority("high");
if (highPriority.every(t => t.priority === "high")) {
  console.log("✅ getTodosByPriority works");
  passed++;
} else {
  console.log("❌ getTodosByPriority failed");
  failed++;
}

// Test searchTodos
const searchResults = searchTodos("task");
if (searchResults.length > 0 && searchResults.every(t => t.title.toLowerCase().includes("task"))) {
  console.log("✅ searchTodos works");
  passed++;
} else {
  console.log("❌ searchTodos failed");
  failed++;
}

// Test sortByPriority
const sorted = sortByPriority();
if (sorted[0]?.priority === "high") {
  console.log("✅ sortByPriority works");
  passed++;
} else {
  console.log("❌ sortByPriority should put high first");
  failed++;
}

// Test getStats
const testStats = getStats();
if (testStats.total === todos.length && typeof testStats.completionRate === "number") {
  console.log("✅ getStats works");
  passed++;
} else {
  console.log("❌ getStats failed");
  failed++;
}

// Test deleteTodo
const deleteResult = deleteTodo(1);
if (deleteResult && !getTodoById(1)) {
  console.log("✅ deleteTodo works");
  passed++;
} else {
  console.log("❌ deleteTodo failed");
  failed++;
}

console.log(`\n${passed}/${passed + failed} tests passed`);
if (failed === 0) {
  console.log("\n🎉 Project complete! You're a productivity master!");
}
