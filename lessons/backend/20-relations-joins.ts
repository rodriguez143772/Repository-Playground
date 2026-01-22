/**
 * ============================================================
 * LESSON 20: Relations and Joins with Drizzle
 * ============================================================
 *
 * Relations define how tables connect to each other.
 * Joins combine data from multiple related tables.
 *
 * ANALOGY: Relations are like family connections:
 * - A parent can have many children (one-to-many)
 * - A person has one passport (one-to-one)
 * - Students take many classes, classes have many students (many-to-many)
 *
 * Drizzle supports two approaches:
 * 1. SQL Joins: Traditional JOIN queries (leftJoin, innerJoin)
 * 2. Query API: Eager loading with relations (like Prisma)
 */

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  varchar,
  primaryKey,
} from "drizzle-orm/pg-core";
import { relations, eq } from "drizzle-orm";

console.log("========================================");
console.log("LESSON 20: RELATIONS AND JOINS");
console.log("========================================\n");

// ============================================================
// SECTION 1: Foreign Keys
// ============================================================

console.log("--- Foreign Keys ---");

/**
 * Foreign keys link rows in one table to rows in another.
 * They enforce referential integrity.
 */

// Users table
const users = pgTable("rel_users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Posts table with foreign key to users
const posts = pgTable("rel_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content"),
  authorId: integer("author_id")
    .notNull()
    .references(() => users.id), // Foreign key!
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Comments with foreign keys to both users and posts
const comments = pgTable("rel_comments", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  postId: integer("post_id")
    .notNull()
    .references(() => posts.id),
  authorId: integer("author_id")
    .notNull()
    .references(() => users.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

console.log(`
Foreign Key Syntax:
  authorId: integer("author_id")
    .notNull()
    .references(() => users.id)

This creates:
  - A column 'author_id' of type INTEGER
  - A foreign key constraint to users.id
  - NOT NULL ensures every post has an author
`);

// ============================================================
// SECTION 2: Foreign Key Options
// ============================================================

console.log("\n--- Foreign Key Options ---");

/**
 * Control what happens when referenced rows are deleted or updated.
 */

const profiles = pgTable("rel_profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, {
      onDelete: "cascade", // Delete profile when user is deleted
      onUpdate: "cascade", // Update userId when user.id changes
    }),
  bio: text("bio"),
  avatarUrl: text("avatar_url"),
});

console.log(`
Foreign Key Options:

.references(() => users.id, {
  onDelete: "cascade",   // When user deleted, delete profile
  onUpdate: "cascade",   // When user.id updated, update userId
})

Options for onDelete/onUpdate:
  "cascade"    - Propagate the change
  "restrict"   - Prevent the change (error)
  "no action"  - Similar to restrict (default)
  "set null"   - Set foreign key to NULL
  "set default"- Set foreign key to default value
`);

// ============================================================
// SECTION 3: Defining Relations (for Query API)
// ============================================================

console.log("\n--- Defining Relations ---");

/**
 * The relations() function defines how tables relate.
 * This enables the powerful Query API for eager loading.
 */

// Define relations for users
const usersRelations = relations(users, ({ one, many }) => ({
  // One-to-one: user has one profile
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.userId],
  }),
  // One-to-many: user has many posts
  posts: many(posts),
  // One-to-many: user has many comments
  comments: many(comments),
}));

// Define relations for posts
const postsRelations = relations(posts, ({ one, many }) => ({
  // Many-to-one: post belongs to one author
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  // One-to-many: post has many comments
  comments: many(comments),
}));

// Define relations for comments
const commentsRelations = relations(comments, ({ one }) => ({
  // Many-to-one: comment belongs to one post
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  // Many-to-one: comment belongs to one author
  author: one(users, {
    fields: [comments.authorId],
    references: [users.id],
  }),
}));

// Define relations for profiles
const profilesRelations = relations(profiles, ({ one }) => ({
  // One-to-one: profile belongs to one user
  user: one(users, {
    fields: [profiles.userId],
    references: [users.id],
  }),
}));

console.log(`
Relations Syntax:

const usersRelations = relations(users, ({ one, many }) => ({
  // One-to-one
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.userId],
  }),

  // One-to-many
  posts: many(posts),
}));

const postsRelations = relations(posts, ({ one, many }) => ({
  // Many-to-one (inverse of one-to-many)
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}));
`);

// ============================================================
// SECTION 4: One-to-Many Relationships
// ============================================================

console.log("\n--- One-to-Many Relationships ---");

/**
 * One-to-many: One parent has many children.
 * Example: One user has many posts.
 */

console.log(`
One-to-Many Example: User -> Posts

Database structure:
  users: id, name, email
  posts: id, title, author_id (FK to users.id)

Relations:
  // User side (the "one")
  posts: many(posts)

  // Post side (the "many")
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  })

Query (eager loading):
  const usersWithPosts = await db.query.users.findMany({
    with: { posts: true }
  });
  // Returns: [{ id, name, posts: [...] }]
`);

// ============================================================
// SECTION 5: Many-to-Many Relationships
// ============================================================

console.log("\n--- Many-to-Many Relationships ---");

/**
 * Many-to-many requires a junction (join) table.
 * Example: Users can have many roles, roles can have many users.
 */

// Roles table
const roles = pgTable("rel_roles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description"),
});

// Junction table for many-to-many
const usersToRoles = pgTable(
  "rel_users_to_roles",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    roleId: integer("role_id")
      .notNull()
      .references(() => roles.id),
    assignedAt: timestamp("assigned_at").notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.roleId] })]
);

// Relations for many-to-many
const rolesRelations = relations(roles, ({ many }) => ({
  usersToRoles: many(usersToRoles),
}));

const usersToRolesRelations = relations(usersToRoles, ({ one }) => ({
  user: one(users, {
    fields: [usersToRoles.userId],
    references: [users.id],
  }),
  role: one(roles, {
    fields: [usersToRoles.roleId],
    references: [roles.id],
  }),
}));

console.log(`
Many-to-Many: Users <-> Roles

Database structure:
  users: id, name
  roles: id, name
  users_to_roles: user_id, role_id (junction table)

Junction table:
  const usersToRoles = pgTable("users_to_roles", {
    userId: integer("user_id").references(() => users.id),
    roleId: integer("role_id").references(() => roles.id),
  }, (table) => [
    primaryKey({ columns: [table.userId, table.roleId] })
  ]);

Query all roles for a user:
  const userWithRoles = await db.query.users.findFirst({
    where: eq(users.id, 1),
    with: {
      usersToRoles: {
        with: { role: true }
      }
    }
  });
`);

// ============================================================
// SECTION 6: SQL Joins (leftJoin, innerJoin)
// ============================================================

console.log("\n--- SQL Joins ---");

/**
 * Traditional SQL joins for combining tables.
 * Use when you need fine-grained control over the query.
 */

async function joinExamples(db: ReturnType<typeof drizzle>) {
  console.log(`
1. LEFT JOIN - All rows from left table, matching from right:

  const results = await db.select({
    userName: users.name,
    postTitle: posts.title,
  })
  .from(users)
  .leftJoin(posts, eq(users.id, posts.authorId));

  // Returns ALL users, with posts if they exist (null if not)

2. INNER JOIN - Only matching rows from both tables:

  const results = await db.select({
    userName: users.name,
    postTitle: posts.title,
  })
  .from(users)
  .innerJoin(posts, eq(users.id, posts.authorId));

  // Returns only users who have posts

3. Multiple Joins:

  const results = await db.select({
    userName: users.name,
    postTitle: posts.title,
    commentContent: comments.content,
  })
  .from(posts)
  .leftJoin(users, eq(posts.authorId, users.id))
  .leftJoin(comments, eq(posts.id, comments.postId));

4. Join with Conditions:

  const results = await db.select()
  .from(users)
  .leftJoin(posts, and(
    eq(users.id, posts.authorId),
    eq(posts.published, true)
  ));
`);
}

// ============================================================
// SECTION 7: Query API (Eager Loading)
// ============================================================

console.log("\n--- Query API (Eager Loading) ---");

/**
 * The Query API provides a cleaner way to fetch related data.
 * Similar to Prisma's include/select.
 */

console.log(`
Query API Setup:

  import * as schema from "./schema";

  const db = drizzle(client, { schema });
  // Now db.query is available!

Basic Queries:

  // Find many
  const allUsers = await db.query.users.findMany();

  // Find first
  const user = await db.query.users.findFirst({
    where: eq(users.id, 1)
  });

With Relations (eager loading):

  // User with all their posts
  const userWithPosts = await db.query.users.findFirst({
    where: eq(users.id, 1),
    with: {
      posts: true
    }
  });
  // Returns: { id, name, posts: [{id, title}, ...] }

  // Nested relations
  const userWithPostsAndComments = await db.query.users.findFirst({
    with: {
      posts: {
        with: {
          comments: true
        }
      }
    }
  });

Selecting specific columns:

  const result = await db.query.users.findFirst({
    columns: {
      id: true,
      name: true,
      // email: false (excluded by default if not specified)
    },
    with: {
      posts: {
        columns: {
          title: true
        }
      }
    }
  });
`);

// ============================================================
// SECTION 8: Filtering Relations
// ============================================================

console.log("\n--- Filtering Relations ---");

console.log(`
Filter related data in queries:

  // Users with only their published posts
  const usersWithPublishedPosts = await db.query.users.findMany({
    with: {
      posts: {
        where: eq(posts.published, true),
        orderBy: desc(posts.createdAt),
        limit: 5,
      }
    }
  });

  // Users who have at least one post (using exists)
  const activeAuthors = await db.query.users.findMany({
    where: exists(
      db.select().from(posts).where(eq(posts.authorId, users.id))
    )
  });
`);

// ============================================================
// SECTION 9: Practical Schema Example
// ============================================================

console.log("\n--- Practical Schema Example ---");

const schemaExample = `
// src/db/schema.ts
import { pgTable, serial, text, integer, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// === TABLES ===

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content"),
  authorId: integer("author_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  postId: integer("post_id").notNull().references(() => posts.id, { onDelete: "cascade" }),
  authorId: integer("author_id").notNull().references(() => users.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// === RELATIONS ===

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
  comments: many(comments),
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
  comments: many(comments),
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id],
  }),
  author: one(users, {
    fields: [comments.authorId],
    references: [users.id],
  }),
}));

// === TYPES ===

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;
`;

console.log(schemaExample);

// ============================================================
// SECTION 10: Running the Examples
// ============================================================

async function main() {
  console.log("\n--- Live Demo ---");

  const connectionString = "postgresql://learn:learn@localhost:5432/learn_db";

  try {
    const client = postgres(connectionString);

    // Create tables
    await client`
      CREATE TABLE IF NOT EXISTS rel_users (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;

    await client`
      CREATE TABLE IF NOT EXISTS rel_posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT,
        author_id INTEGER NOT NULL REFERENCES rel_users(id),
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;

    await client`
      CREATE TABLE IF NOT EXISTS rel_comments (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        post_id INTEGER NOT NULL REFERENCES rel_posts(id),
        author_id INTEGER NOT NULL REFERENCES rel_users(id),
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
      )
    `;

    console.log("Tables created!");

    // Create schema object for Query API
    const schema = {
      users,
      posts,
      comments,
      usersRelations,
      postsRelations,
      commentsRelations,
    };

    const db = drizzle(client, { schema });

    // Insert test data
    const timestamp = Date.now();
    const [user] = await db
      .insert(users)
      .values({
        name: "Demo Author",
        email: `author${timestamp}@example.com`,
      })
      .returning();
    console.log(`Created user: ${user.name} (id: ${user.id})`);

    const [post] = await db
      .insert(posts)
      .values({
        title: "My First Post",
        content: "Hello World!",
        authorId: user.id,
      })
      .returning();
    console.log(`Created post: ${post.title} (id: ${post.id})`);

    await db.insert(comments).values({
      content: "Great post!",
      postId: post.id,
      authorId: user.id,
    });
    console.log("Created comment!");

    // Query with JOIN
    console.log("\n--- LEFT JOIN Example ---");
    const joinResult = await db
      .select({
        userName: users.name,
        postTitle: posts.title,
      })
      .from(users)
      .leftJoin(posts, eq(users.id, posts.authorId))
      .where(eq(users.id, user.id));

    console.log("Join result:", joinResult);

    // Query API with relations
    console.log("\n--- Query API Example ---");
    const userWithPosts = await db.query.users.findFirst({
      where: eq(users.id, user.id),
      with: {
        posts: {
          with: {
            comments: true,
          },
        },
      },
    });

    if (userWithPosts) {
      console.log(`User: ${userWithPosts.name}`);
      console.log(`Posts: ${userWithPosts.posts.length}`);
      if (userWithPosts.posts[0]) {
        console.log(`  - ${userWithPosts.posts[0].title}`);
        console.log(`    Comments: ${userWithPosts.posts[0].comments.length}`);
      }
    }

    // Cleanup
    await db.delete(comments).where(eq(comments.postId, post.id));
    await db.delete(posts).where(eq(posts.id, post.id));
    await db.delete(users).where(eq(users.id, user.id));
    console.log("\nTest data cleaned up!");

    await client.end();
  } catch (error) {
    console.log("Error - make sure Docker is running");
    if (error instanceof Error) {
      console.log(`Error: ${error.message}`);
    }
  }
}

// ============================================================
// KEY TAKEAWAYS
// ============================================================

console.log("\n========================================");
console.log("KEY TAKEAWAYS");
console.log("========================================");
console.log("1. Foreign keys: .references(() => table.column)");
console.log("2. onDelete/onUpdate: cascade, restrict, set null");
console.log("3. relations() defines how tables connect");
console.log("4. one() for one-to-one and many-to-one");
console.log("5. many() for one-to-many");
console.log("6. Junction tables for many-to-many");
console.log("7. leftJoin/innerJoin for SQL-style joins");
console.log("8. Query API: db.query.table.findMany({ with: {...} })");
console.log("9. Eager loading fetches related data in one query");

main().then(() => {
  console.log("\nLesson 20 Complete! Run: bun lessons/backend/21-migrations.ts");
});

export {};
