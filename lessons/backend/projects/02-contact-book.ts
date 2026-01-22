/**
 * ============================================================
 * PROJECT: Contact Book
 * Required Knowledge: Bun, Hono, Zod, Drizzle
 * ============================================================
 *
 * Build a contact management API with:
 * - CRUD operations for contacts and groups
 * - Database relations (contacts belong to groups)
 * - Filtering and searching
 * - Input validation with Zod
 * - PostgreSQL persistence with Drizzle ORM
 *
 * Setup: Run `bun db:push` before running this project
 * Run: bun lessons/backend/projects/02-contact-book.ts
 */

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { eq, and, or, ilike, desc, count } from "drizzle-orm";
import { db } from "../src/db";
import {
  projectGroups,
  projectContacts,
  type ProjectGroup,
  type NewProjectGroup,
  type ProjectContact,
  type NewProjectContact,
} from "../src/db/schema";

console.log("========================================");
console.log("PROJECT: CONTACT BOOK");
console.log("========================================\n");

// ============================================================
// Zod Schemas for Validation
// ============================================================

// Group schemas
const GroupSchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(50),
  description: z.string().max(200).optional().nullable(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  createdAt: z.string().datetime(),
});

type Group = z.infer<typeof GroupSchema>;

const CreateGroupSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().max(200).optional(),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .optional()
    .default("#6366f1"),
});

const UpdateGroupSchema = z.object({
  name: z.string().min(1).max(50).optional(),
  description: z.string().max(200).optional().nullable(),
  color: z
    .string()
    .regex(/^#[0-9A-Fa-f]{6}$/)
    .optional(),
});

// Contact schemas
const ContactSchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(100),
  email: z.string().email().optional().nullable(),
  phone: z.string().max(20).optional().nullable(),
  notes: z.string().optional().nullable(),
  groupId: z.number().optional().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

type Contact = z.infer<typeof ContactSchema>;

const CreateContactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().optional(),
  phone: z.string().max(20).optional(),
  notes: z.string().optional(),
  groupId: z.number().optional(),
});

const UpdateContactSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  email: z.string().email().optional().nullable(),
  phone: z.string().max(20).optional().nullable(),
  notes: z.string().optional().nullable(),
  groupId: z.number().optional().nullable(),
});

const ListContactsQuerySchema = z.object({
  page: z.coerce.number().default(1),
  limit: z.coerce.number().default(10),
  groupId: z.coerce.number().optional(),
  search: z.string().optional(),
});

// ============================================================
// Helper: Convert DB rows to API response
// ============================================================

function dbGroupToApi(group: ProjectGroup): Group {
  return {
    id: group.id,
    name: group.name,
    description: group.description,
    color: group.color,
    createdAt: group.createdAt.toISOString(),
  };
}

function dbContactToApi(contact: ProjectContact): Contact {
  return {
    id: contact.id,
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    notes: contact.notes,
    groupId: contact.groupId,
    createdAt: contact.createdAt.toISOString(),
    updatedAt: contact.updatedAt.toISOString(),
  };
}

// ============================================================
// Create the API
// ============================================================

const app = new Hono();

// Logging middleware
app.use("*", async (c, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${c.req.method} ${c.req.path} - ${c.res.status} (${ms}ms)`);
});

// ============================================================
// GROUP ROUTES
// ============================================================

// GET /groups - List all groups
app.get("/groups", async (c) => {
  const groups = await db
    .select()
    .from(projectGroups)
    .orderBy(desc(projectGroups.createdAt));

  return c.json(groups.map(dbGroupToApi));
});

// POST /groups - Create a new group
app.post("/groups", zValidator("json", CreateGroupSchema), async (c) => {
  const data = c.req.valid("json");

  const insertData: NewProjectGroup = {
    name: data.name,
    description: data.description,
    color: data.color,
  };

  const [group] = await db.insert(projectGroups).values(insertData).returning();

  return c.json(dbGroupToApi(group), 201);
});

// GET /groups/:id - Get single group with contact count
app.get("/groups/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) {
    return c.json({ error: "Invalid group ID" }, 400);
  }

  const [group] = await db
    .select()
    .from(projectGroups)
    .where(eq(projectGroups.id, id));

  if (!group) {
    return c.json({ error: "Group not found" }, 404);
  }

  // Get contact count for this group
  const [result] = await db
    .select({ count: count() })
    .from(projectContacts)
    .where(eq(projectContacts.groupId, id));

  return c.json({
    ...dbGroupToApi(group),
    contactCount: result?.count ?? 0,
  });
});

// PUT /groups/:id - Update a group
app.put("/groups/:id", zValidator("json", UpdateGroupSchema), async (c) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) {
    return c.json({ error: "Invalid group ID" }, 400);
  }

  const data = c.req.valid("json");

  // Check if group exists
  const [existing] = await db
    .select()
    .from(projectGroups)
    .where(eq(projectGroups.id, id));

  if (!existing) {
    return c.json({ error: "Group not found" }, 404);
  }

  const updateData: Partial<NewProjectGroup> = {};
  if (data.name !== undefined) updateData.name = data.name;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.color !== undefined) updateData.color = data.color;

  const [group] = await db
    .update(projectGroups)
    .set(updateData)
    .where(eq(projectGroups.id, id))
    .returning();

  return c.json(dbGroupToApi(group));
});

// DELETE /groups/:id - Delete a group (only if no contacts)
app.delete("/groups/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) {
    return c.json({ error: "Invalid group ID" }, 400);
  }

  // Check if group has contacts
  const [result] = await db
    .select({ count: count() })
    .from(projectContacts)
    .where(eq(projectContacts.groupId, id));

  if (result && result.count > 0) {
    return c.json(
      { error: "Cannot delete group with contacts. Move or delete contacts first." },
      409
    );
  }

  const [deleted] = await db
    .delete(projectGroups)
    .where(eq(projectGroups.id, id))
    .returning();

  if (!deleted) {
    return c.json({ error: "Group not found" }, 404);
  }

  return c.body(null, 204);
});

// ============================================================
// CONTACT ROUTES
// ============================================================

// GET /contacts - List contacts with filtering and pagination
app.get("/contacts", zValidator("query", ListContactsQuerySchema), async (c) => {
  const { page, limit, groupId, search } = c.req.valid("query");
  const offset = (page - 1) * limit;

  // Build conditions
  const conditions = [];
  if (groupId !== undefined) {
    conditions.push(eq(projectContacts.groupId, groupId));
  }
  if (search) {
    conditions.push(
      or(
        ilike(projectContacts.name, `%${search}%`),
        ilike(projectContacts.email, `%${search}%`)
      )
    );
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const contacts = await db
    .select()
    .from(projectContacts)
    .where(whereClause)
    .orderBy(desc(projectContacts.createdAt))
    .limit(limit)
    .offset(offset);

  return c.json({
    data: contacts.map(dbContactToApi),
    page,
    limit,
  });
});

// POST /contacts - Create a new contact
app.post("/contacts", zValidator("json", CreateContactSchema), async (c) => {
  const data = c.req.valid("json");

  // If groupId provided, verify group exists
  if (data.groupId) {
    const [group] = await db
      .select()
      .from(projectGroups)
      .where(eq(projectGroups.id, data.groupId));

    if (!group) {
      return c.json({ error: "Group not found" }, 400);
    }
  }

  const insertData: NewProjectContact = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    notes: data.notes,
    groupId: data.groupId,
  };

  const [contact] = await db.insert(projectContacts).values(insertData).returning();

  return c.json(dbContactToApi(contact), 201);
});

// GET /contacts/:id - Get single contact with group info
app.get("/contacts/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) {
    return c.json({ error: "Invalid contact ID" }, 400);
  }

  const [contact] = await db
    .select()
    .from(projectContacts)
    .where(eq(projectContacts.id, id));

  if (!contact) {
    return c.json({ error: "Contact not found" }, 404);
  }

  // Get group info if contact has a group
  let group: ProjectGroup | null = null;
  if (contact.groupId) {
    const [groupResult] = await db
      .select()
      .from(projectGroups)
      .where(eq(projectGroups.id, contact.groupId));
    group = groupResult || null;
  }

  return c.json({
    ...dbContactToApi(contact),
    group: group ? dbGroupToApi(group) : null,
  });
});

// PUT /contacts/:id - Update a contact
app.put("/contacts/:id", zValidator("json", UpdateContactSchema), async (c) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) {
    return c.json({ error: "Invalid contact ID" }, 400);
  }

  const data = c.req.valid("json");

  // Check if contact exists
  const [existing] = await db
    .select()
    .from(projectContacts)
    .where(eq(projectContacts.id, id));

  if (!existing) {
    return c.json({ error: "Contact not found" }, 404);
  }

  // If groupId provided, verify group exists
  if (data.groupId !== undefined && data.groupId !== null) {
    const [group] = await db
      .select()
      .from(projectGroups)
      .where(eq(projectGroups.id, data.groupId));

    if (!group) {
      return c.json({ error: "Group not found" }, 400);
    }
  }

  const updateData: Partial<NewProjectContact> = {
    updatedAt: new Date(),
  };

  if (data.name !== undefined) updateData.name = data.name;
  if (data.email !== undefined) updateData.email = data.email;
  if (data.phone !== undefined) updateData.phone = data.phone;
  if (data.notes !== undefined) updateData.notes = data.notes;
  if (data.groupId !== undefined) updateData.groupId = data.groupId;

  const [contact] = await db
    .update(projectContacts)
    .set(updateData)
    .where(eq(projectContacts.id, id))
    .returning();

  return c.json(dbContactToApi(contact));
});

// DELETE /contacts/:id - Delete a contact
app.delete("/contacts/:id", async (c) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) {
    return c.json({ error: "Invalid contact ID" }, 400);
  }

  const [deleted] = await db
    .delete(projectContacts)
    .where(eq(projectContacts.id, id))
    .returning();

  if (!deleted) {
    return c.json({ error: "Contact not found" }, 404);
  }

  return c.body(null, 204);
});

// Error handler
app.onError((err, c) => {
  console.error("Error:", err);
  return c.json({ error: "Internal server error" }, 500);
});

// 404 handler
app.notFound((c) => {
  return c.json({ error: "Not found" }, 404);
});

// ============================================================
// TESTS
// ============================================================

console.log("Running tests...\n");

let passed = 0;
let failed = 0;

// Helper to reset data in database
async function resetData() {
  await db.delete(projectContacts);
  await db.delete(projectGroups);
}

// ============================================================
// GROUP TESTS
// ============================================================

// Test: Create group
await resetData();
const createGroupRes = await app.request("/groups", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Family", description: "Family members", color: "#22c55e" }),
});

if (createGroupRes.status === 201) {
  const group = (await createGroupRes.json()) as Group;
  if (group.id && group.name === "Family" && group.color === "#22c55e") {
    console.log("  POST /groups works");
    passed++;
  } else {
    console.log("X POST /groups wrong response");
    failed++;
  }
} else {
  console.log("X POST /groups failed");
  failed++;
}

// Test: Create group validation
await resetData();
const invalidGroupRes = await app.request("/groups", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({}),
});

if (invalidGroupRes.status === 400) {
  console.log("  POST /groups validates input");
  passed++;
} else {
  console.log("X POST /groups should validate required fields");
  failed++;
}

// Test: List groups
await resetData();
await db.insert(projectGroups).values([
  { name: "Work", color: "#3b82f6" },
  { name: "Friends", color: "#f59e0b" },
]);

const listGroupsRes = await app.request("/groups");
if (listGroupsRes.status === 200) {
  const groups = (await listGroupsRes.json()) as Group[];
  if (Array.isArray(groups) && groups.length === 2) {
    console.log("  GET /groups works");
    passed++;
  } else {
    console.log("X GET /groups wrong count");
    failed++;
  }
} else {
  console.log("X GET /groups failed");
  failed++;
}

// Test: Get group with contact count
await resetData();
const [testGroup] = await db.insert(projectGroups).values({ name: "Test Group" }).returning();
await db.insert(projectContacts).values([
  { name: "John", groupId: testGroup.id },
  { name: "Jane", groupId: testGroup.id },
]);

const getGroupRes = await app.request(`/groups/${testGroup.id}`);
if (getGroupRes.status === 200) {
  const group = (await getGroupRes.json()) as Group & { contactCount: number };
  if (group.id === testGroup.id && group.contactCount === 2) {
    console.log("  GET /groups/:id works with contact count");
    passed++;
  } else {
    console.log("X GET /groups/:id wrong data or count");
    failed++;
  }
} else {
  console.log("X GET /groups/:id failed");
  failed++;
}

// Test: Get non-existent group
const notFoundGroupRes = await app.request("/groups/999999");
if (notFoundGroupRes.status === 404) {
  console.log("  GET /groups/:id returns 404 for missing");
  passed++;
} else {
  console.log("X GET /groups/:id should return 404");
  failed++;
}

// Test: Update group
await resetData();
const [updateGroup] = await db.insert(projectGroups).values({ name: "Old Name" }).returning();

const updateGroupRes = await app.request(`/groups/${updateGroup.id}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "New Name", color: "#ef4444" }),
});

if (updateGroupRes.status === 200) {
  const group = (await updateGroupRes.json()) as Group;
  if (group.name === "New Name" && group.color === "#ef4444") {
    console.log("  PUT /groups/:id works");
    passed++;
  } else {
    console.log("X PUT /groups/:id didn't update");
    failed++;
  }
} else {
  console.log("X PUT /groups/:id failed");
  failed++;
}

// Test: Delete empty group
await resetData();
const [deleteGroup] = await db.insert(projectGroups).values({ name: "To Delete" }).returning();

const deleteGroupRes = await app.request(`/groups/${deleteGroup.id}`, { method: "DELETE" });
if (deleteGroupRes.status === 204) {
  const checkGroupRes = await app.request(`/groups/${deleteGroup.id}`);
  if (checkGroupRes.status === 404) {
    console.log("  DELETE /groups/:id works");
    passed++;
  } else {
    console.log("X DELETE /groups/:id didn't delete");
    failed++;
  }
} else {
  console.log("X DELETE /groups/:id failed");
  failed++;
}

// Test: Cannot delete group with contacts
await resetData();
const [groupWithContacts] = await db.insert(projectGroups).values({ name: "Has Contacts" }).returning();
await db.insert(projectContacts).values({ name: "Someone", groupId: groupWithContacts.id });

const deleteWithContactsRes = await app.request(`/groups/${groupWithContacts.id}`, { method: "DELETE" });
if (deleteWithContactsRes.status === 409) {
  console.log("  DELETE /groups/:id prevents deleting group with contacts");
  passed++;
} else {
  console.log("X DELETE /groups/:id should prevent deleting group with contacts");
  failed++;
}

// ============================================================
// CONTACT TESTS
// ============================================================

// Test: Create contact
await resetData();
const createContactRes = await app.request("/contacts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "John Doe",
    email: "john@example.com",
    phone: "555-1234",
    notes: "A friend",
  }),
});

if (createContactRes.status === 201) {
  const contact = (await createContactRes.json()) as Contact;
  if (contact.id && contact.name === "John Doe" && contact.email === "john@example.com") {
    console.log("  POST /contacts works");
    passed++;
  } else {
    console.log("X POST /contacts wrong response");
    failed++;
  }
} else {
  console.log("X POST /contacts failed");
  failed++;
}

// Test: Create contact with group
await resetData();
const [contactGroup] = await db.insert(projectGroups).values({ name: "Colleagues" }).returning();

const createWithGroupRes = await app.request("/contacts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Jane Smith", groupId: contactGroup.id }),
});

if (createWithGroupRes.status === 201) {
  const contact = (await createWithGroupRes.json()) as Contact;
  if (contact.groupId === contactGroup.id) {
    console.log("  POST /contacts with group works");
    passed++;
  } else {
    console.log("X POST /contacts group not assigned");
    failed++;
  }
} else {
  console.log("X POST /contacts with group failed");
  failed++;
}

// Test: Create contact with invalid group
await resetData();
const invalidGroupContactRes = await app.request("/contacts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Test", groupId: 999999 }),
});

if (invalidGroupContactRes.status === 400) {
  console.log("  POST /contacts validates group exists");
  passed++;
} else {
  console.log("X POST /contacts should validate group exists");
  failed++;
}

// Test: Create contact validation
await resetData();
const invalidContactRes = await app.request("/contacts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({}),
});

if (invalidContactRes.status === 400) {
  console.log("  POST /contacts validates input");
  passed++;
} else {
  console.log("X POST /contacts should validate required fields");
  failed++;
}

// Test: List contacts
await resetData();
await db.insert(projectContacts).values([
  { name: "Alice" },
  { name: "Bob" },
  { name: "Charlie" },
]);

const listContactsRes = await app.request("/contacts");
if (listContactsRes.status === 200) {
  const data = (await listContactsRes.json()) as { data: Contact[] };
  if (Array.isArray(data.data) && data.data.length === 3) {
    console.log("  GET /contacts works");
    passed++;
  } else {
    console.log("X GET /contacts wrong count");
    failed++;
  }
} else {
  console.log("X GET /contacts failed");
  failed++;
}

// Test: Filter contacts by group
await resetData();
const [filterGroup] = await db.insert(projectGroups).values({ name: "Filter Group" }).returning();
await db.insert(projectContacts).values([
  { name: "In Group", groupId: filterGroup.id },
  { name: "Not In Group" },
]);

const filterByGroupRes = await app.request(`/contacts?groupId=${filterGroup.id}`);
if (filterByGroupRes.status === 200) {
  const data = (await filterByGroupRes.json()) as { data: Contact[] };
  if (data.data.length === 1 && data.data[0].name === "In Group") {
    console.log("  GET /contacts?groupId filter works");
    passed++;
  } else {
    console.log("X GET /contacts?groupId filter failed");
    failed++;
  }
} else {
  console.log("X GET /contacts?groupId request failed");
  failed++;
}

// Test: Search contacts
await resetData();
await db.insert(projectContacts).values([
  { name: "John Doe", email: "john@example.com" },
  { name: "Jane Smith", email: "jane@test.com" },
  { name: "Bob Johnson" },
]);

const searchRes = await app.request("/contacts?search=john");
if (searchRes.status === 200) {
  const data = (await searchRes.json()) as { data: Contact[] };
  // Should find "John Doe" (name) and "Bob Johnson" (name contains john)
  if (data.data.length === 2) {
    console.log("  GET /contacts?search works");
    passed++;
  } else {
    console.log("X GET /contacts?search wrong results");
    failed++;
  }
} else {
  console.log("X GET /contacts?search failed");
  failed++;
}

// Test: Get single contact with group info
await resetData();
const [infoGroup] = await db.insert(projectGroups).values({ name: "Info Group", color: "#8b5cf6" }).returning();
const [infoContact] = await db.insert(projectContacts).values({ name: "Info Contact", groupId: infoGroup.id }).returning();

const getContactRes = await app.request(`/contacts/${infoContact.id}`);
if (getContactRes.status === 200) {
  const contact = (await getContactRes.json()) as Contact & { group: Group };
  if (contact.id === infoContact.id && contact.group && contact.group.name === "Info Group") {
    console.log("  GET /contacts/:id works with group info");
    passed++;
  } else {
    console.log("X GET /contacts/:id missing group info");
    failed++;
  }
} else {
  console.log("X GET /contacts/:id failed");
  failed++;
}

// Test: Get non-existent contact
const notFoundContactRes = await app.request("/contacts/999999");
if (notFoundContactRes.status === 404) {
  console.log("  GET /contacts/:id returns 404 for missing");
  passed++;
} else {
  console.log("X GET /contacts/:id should return 404");
  failed++;
}

// Test: Update contact
await resetData();
const [updateContact] = await db.insert(projectContacts).values({ name: "Old Name", email: "old@test.com" }).returning();

const updateContactRes = await app.request(`/contacts/${updateContact.id}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "New Name", phone: "555-9999" }),
});

if (updateContactRes.status === 200) {
  const contact = (await updateContactRes.json()) as Contact;
  if (contact.name === "New Name" && contact.phone === "555-9999") {
    console.log("  PUT /contacts/:id works");
    passed++;
  } else {
    console.log("X PUT /contacts/:id didn't update");
    failed++;
  }
} else {
  console.log("X PUT /contacts/:id failed");
  failed++;
}

// Test: Update contact group
await resetData();
const [newGroup] = await db.insert(projectGroups).values({ name: "New Group" }).returning();
const [moveContact] = await db.insert(projectContacts).values({ name: "Move Me" }).returning();

const moveContactRes = await app.request(`/contacts/${moveContact.id}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ groupId: newGroup.id }),
});

if (moveContactRes.status === 200) {
  const contact = (await moveContactRes.json()) as Contact;
  if (contact.groupId === newGroup.id) {
    console.log("  PUT /contacts/:id can change group");
    passed++;
  } else {
    console.log("X PUT /contacts/:id group not changed");
    failed++;
  }
} else {
  console.log("X PUT /contacts/:id change group failed");
  failed++;
}

// Test: Delete contact
await resetData();
const [deleteContact] = await db.insert(projectContacts).values({ name: "To Delete" }).returning();

const deleteContactRes = await app.request(`/contacts/${deleteContact.id}`, { method: "DELETE" });
if (deleteContactRes.status === 204) {
  const checkContactRes = await app.request(`/contacts/${deleteContact.id}`);
  if (checkContactRes.status === 404) {
    console.log("  DELETE /contacts/:id works");
    passed++;
  } else {
    console.log("X DELETE /contacts/:id didn't delete");
    failed++;
  }
} else {
  console.log("X DELETE /contacts/:id failed");
  failed++;
}

// Test: 404 for unknown route
const unknownRes = await app.request("/unknown");
if (unknownRes.status === 404) {
  console.log("  404 handler works");
  passed++;
} else {
  console.log("X 404 handler missing");
  failed++;
}

// Results
console.log(`\n${passed}/${passed + failed} tests passed`);
if (failed === 0) {
  console.log("\nProject complete! You've built a Contact Book API with PostgreSQL!");
}
