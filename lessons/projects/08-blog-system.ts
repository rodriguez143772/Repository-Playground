/**
 * ============================================================
 * PROJECT: Blog System
 * Required Knowledge: Lessons 1-8 (+ Interfaces)
 * ============================================================
 * 
 * Build a blog system with:
 * - Posts, comments, and users
 * - Proper interface definitions
 * - Relationships between entities
 * - Content management features
 * 
 * This project practices:
 * - Interface definitions
 * - Extending interfaces
 * - Optional properties
 * - Readonly properties
 * - Interface composition
 */

// ============================================================
// TODO: Define Interfaces
// ============================================================

/**
 * Define a User interface with:
 * - id: readonly number
 * - username: string
 * - email: string
 * - displayName: string
 * - bio?: optional string
 * - avatarUrl?: optional string
 * - role: "admin" | "author" | "reader"
 * - createdAt: readonly Date
 */
interface User {
  // TODO: Define properties
}

/**
 * Define a Post interface with:
 * - id: readonly number
 * - title: string
 * - slug: string (URL-friendly title)
 * - content: string
 * - excerpt: string (short preview)
 * - authorId: number
 * - status: "draft" | "published" | "archived"
 * - tags: string[]
 * - featuredImage?: optional string
 * - publishedAt?: optional Date
 * - createdAt: readonly Date
 * - updatedAt: Date
 */
interface Post {
  // TODO: Define properties
}

/**
 * Define a Comment interface with:
 * - id: readonly number
 * - postId: number
 * - authorId: number
 * - content: string
 * - parentId?: optional number (for nested replies)
 * - likes: number
 * - createdAt: readonly Date
 * - updatedAt: Date
 */
interface Comment {
  // TODO: Define properties
}

/**
 * Define a PostWithDetails interface that extends Post and adds:
 * - author: User
 * - comments: Comment[]
 * - commentCount: number
 */
interface PostWithDetails extends Post {
  // TODO: Add additional properties
}

// ============================================================
// SAMPLE DATA
// ============================================================

const users: User[] = [
  { id: 1, username: "alice", email: "alice@blog.com", displayName: "Alice Author", role: "author", createdAt: new Date("2024-01-01") } as User,
  { id: 2, username: "bob", email: "bob@blog.com", displayName: "Bob Reader", bio: "Avid reader", role: "reader", createdAt: new Date("2024-01-02") } as User,
  { id: 3, username: "admin", email: "admin@blog.com", displayName: "Site Admin", role: "admin", createdAt: new Date("2024-01-01") } as User,
];

const posts: Post[] = [
  { id: 1, title: "Getting Started with TypeScript", slug: "getting-started-typescript", content: "TypeScript is...", excerpt: "Learn the basics...", authorId: 1, status: "published", tags: ["typescript", "tutorial"], publishedAt: new Date("2024-01-15"), createdAt: new Date("2024-01-10"), updatedAt: new Date("2024-01-15") } as Post,
  { id: 2, title: "Advanced Types", slug: "advanced-types", content: "Let's explore...", excerpt: "Deep dive into...", authorId: 1, status: "draft", tags: ["typescript", "advanced"], createdAt: new Date("2024-01-20"), updatedAt: new Date("2024-01-20") } as Post,
];

const comments: Comment[] = [
  { id: 1, postId: 1, authorId: 2, content: "Great article!", likes: 5, createdAt: new Date("2024-01-16"), updatedAt: new Date("2024-01-16") } as Comment,
  { id: 2, postId: 1, authorId: 3, content: "Very helpful!", likes: 3, createdAt: new Date("2024-01-17"), updatedAt: new Date("2024-01-17") } as Comment,
];

let nextPostId = 3;
let nextCommentId = 3;

// ============================================================
// TODO: User Functions
// ============================================================

/**
 * Get user by ID.
 */
function getUserById(id: number): User | undefined {
  // TODO: Implement
  return undefined;
}

/**
 * Get user by username.
 */
function getUserByUsername(username: string): User | undefined {
  // TODO: Implement
  return undefined;
}

/**
 * Check if user can publish posts.
 */
function canPublish(user: User): boolean {
  // TODO: Only authors and admins can publish
  return false;
}

/**
 * Check if user can moderate (delete any comment).
 */
function canModerate(user: User): boolean {
  // TODO: Only admins can moderate
  return false;
}

// ============================================================
// TODO: Post Functions
// ============================================================

/**
 * Create a URL-friendly slug from a title.
 */
function createSlug(title: string): string {
  // TODO: Convert to lowercase, replace spaces with dashes, remove special chars
  return "";
}

/**
 * Create a new post.
 */
function createPost(data: {
  title: string;
  content: string;
  authorId: number;
  tags?: string[];
  featuredImage?: string;
}): Post {
  // TODO: Create post with auto-generated slug and excerpt
  return {} as Post;
}

/**
 * Get post by slug.
 */
function getPostBySlug(slug: string): Post | undefined {
  // TODO: Implement
  return undefined;
}

/**
 * Get published posts.
 */
function getPublishedPosts(): Post[] {
  // TODO: Return only published posts, newest first
  return [];
}

/**
 * Get posts by author.
 */
function getPostsByAuthor(authorId: number): Post[] {
  // TODO: Implement
  return [];
}

/**
 * Get posts by tag.
 */
function getPostsByTag(tag: string): Post[] {
  // TODO: Return posts that have the specified tag
  return [];
}

/**
 * Publish a post.
 */
function publishPost(postId: number, userId: number): boolean {
  // TODO: Check if user can publish, then update status and publishedAt
  return false;
}

/**
 * Get post with all details (author, comments).
 */
function getPostWithDetails(postId: number): PostWithDetails | undefined {
  // TODO: Return post with author object and comments array
  return undefined;
}

// ============================================================
// TODO: Comment Functions
// ============================================================

/**
 * Add a comment to a post.
 */
function addComment(postId: number, authorId: number, content: string, parentId?: number): Comment {
  // TODO: Create and add comment
  return {} as Comment;
}

/**
 * Get comments for a post.
 */
function getPostComments(postId: number): Comment[] {
  // TODO: Return comments for the post, newest first
  return [];
}

/**
 * Get replies to a comment.
 */
function getCommentReplies(commentId: number): Comment[] {
  // TODO: Return comments where parentId matches
  return [];
}

/**
 * Like a comment.
 */
function likeComment(commentId: number): boolean {
  // TODO: Increment likes count
  return false;
}

/**
 * Delete a comment (checks permissions).
 */
function deleteComment(commentId: number, userId: number): boolean {
  // TODO: Allow deletion if user is author of comment or is admin
  return false;
}

// ============================================================
// TODO: Analytics
// ============================================================

/**
 * Get blog statistics.
 */
function getBlogStats(): {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalComments: number;
  totalLikes: number;
  topAuthors: { userId: number; postCount: number }[];
  popularTags: { tag: string; count: number }[];
} {
  // TODO: Calculate all statistics
  return {
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalComments: 0,
    totalLikes: 0,
    topAuthors: [],
    popularTags: []
  };
}

// ============================================================
// DEMO AND DISPLAY
// ============================================================

console.log("========================================");
console.log("BLOG SYSTEM");
console.log("========================================\n");

console.log("--- Users ---");
users.forEach(user => {
  console.log(`${user.displayName} (@${user.username}) - ${user.role}`);
});

console.log("\n--- Published Posts ---");
getPublishedPosts().forEach(post => {
  const author = getUserById(post.authorId);
  console.log(`"${post.title}" by ${author?.displayName || "Unknown"}`);
  console.log(`   Tags: [${post.tags.join(", ")}]`);
});

console.log("\n--- Create New Post ---");
const newPost = createPost({
  title: "My First Post!",
  content: "This is the content of my first post...",
  authorId: 1,
  tags: ["intro", "first"]
});
posts.push(newPost);
console.log(`Created: "${newPost.title}" (slug: ${newPost.slug})`);

console.log("\n--- Post Details ---");
const details = getPostWithDetails(1);
if (details) {
  console.log(`"${details.title}" by ${details.author?.displayName}`);
  console.log(`Comments (${details.commentCount}):`);
  details.comments?.forEach(c => {
    const author = getUserById(c.authorId);
    console.log(`   - ${author?.displayName}: "${c.content}" (${c.likes} likes)`);
  });
}

console.log("\n--- Statistics ---");
const stats = getBlogStats();
console.log(`Posts: ${stats.totalPosts} (${stats.publishedPosts} published)`);
console.log(`Comments: ${stats.totalComments}`);
console.log(`Total likes: ${stats.totalLikes}`);

// ============================================================
// TESTS
// ============================================================

console.log("\n========================================");
console.log("TESTING YOUR SOLUTION");
console.log("========================================\n");

let passed = 0;
let failed = 0;

// Test getUserById
if (getUserById(1)?.username === "alice") {
  console.log("✅ getUserById works");
  passed++;
} else {
  console.log("❌ getUserById failed");
  failed++;
}

// Test canPublish
if (canPublish(users[0]) === true && canPublish(users[1]) === false) {
  console.log("✅ canPublish works");
  passed++;
} else {
  console.log("❌ canPublish logic incorrect");
  failed++;
}

// Test createSlug
const testSlug = createSlug("Hello World! How Are You?");
if (testSlug === "hello-world-how-are-you" || testSlug.includes("hello") && testSlug.includes("-")) {
  console.log("✅ createSlug works");
  passed++;
} else {
  console.log(`❌ createSlug: got "${testSlug}"`);
  failed++;
}

// Test getPublishedPosts
const published = getPublishedPosts();
if (published.every(p => p.status === "published")) {
  console.log("✅ getPublishedPosts works");
  passed++;
} else {
  console.log("❌ getPublishedPosts returns unpublished");
  failed++;
}

// Test getPostsByTag
const tsTagged = getPostsByTag("typescript");
if (tsTagged.every(p => p.tags.includes("typescript"))) {
  console.log("✅ getPostsByTag works");
  passed++;
} else {
  console.log("❌ getPostsByTag failed");
  failed++;
}

// Test getPostWithDetails
const postDetails = getPostWithDetails(1);
if (postDetails && postDetails.author && postDetails.comments) {
  console.log("✅ getPostWithDetails works");
  passed++;
} else {
  console.log("❌ getPostWithDetails missing author or comments");
  failed++;
}

// Test addComment
const newComment = addComment(1, 2, "New comment!");
comments.push(newComment);
if (newComment.content === "New comment!" && newComment.postId === 1) {
  console.log("✅ addComment works");
  passed++;
} else {
  console.log("❌ addComment failed");
  failed++;
}

// Test likeComment
const beforeLikes = comments[0].likes;
likeComment(1);
if (comments[0].likes === beforeLikes + 1) {
  console.log("✅ likeComment works");
  passed++;
} else {
  console.log("❌ likeComment failed");
  failed++;
}

// Test getBlogStats
const blogStats = getBlogStats();
if (blogStats.totalPosts === posts.length && typeof blogStats.popularTags === "object") {
  console.log("✅ getBlogStats works");
  passed++;
} else {
  console.log("❌ getBlogStats failed");
  failed++;
}

console.log(`\n${passed}/${passed + failed} tests passed`);
if (failed === 0) {
  console.log("\n🎉 Project complete! You're ready to build a real blog!");
}
