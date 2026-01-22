/**
 * ============================================================
 * PROJECT: URL Shortener
 * Required Knowledge: Bun, Hono, Zod, Drizzle
 * ============================================================
 *
 * Build a URL shortening service with:
 * - Create short URLs
 * - Redirect to original URLs
 * - Track click statistics
 * - Custom short codes
 * - Expiration dates
 * - PostgreSQL persistence with Drizzle ORM
 *
 * Setup: Run `bun db:push` before running this project
 * Run: bun lessons/backend/projects/03-url-shortener.ts
 */

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { eq, desc, asc } from "drizzle-orm";
import { db } from "../src/db";
import { projectUrls, type ProjectUrl, type NewProjectUrl } from "../src/db/schema";

console.log("========================================");
console.log("PROJECT: URL SHORTENER");
console.log("========================================\n");

// ============================================================
// Types and Schemas (provided)
// ============================================================

interface ShortUrl {
  id: string;
  shortCode: string;
  originalUrl: string;
  createdAt: string;
  expiresAt?: string;
  clicks: number;
  lastClickAt?: string;
}

const CreateUrlSchema = z.object({
  url: z.string().url(),
  customCode: z
    .string()
    .min(4)
    .max(20)
    .regex(/^[a-zA-Z0-9]+$/)
    .optional(),
  expiresIn: z.number().min(1).max(365).optional(),
});

const UpdateUrlSchema = z.object({
  expiresIn: z.number().min(1).max(365).optional(),
});

const ListUrlsQuerySchema = z.object({
  includeExpired: z
    .string()
    .transform((v) => v === "true")
    .optional(),
  sortBy: z.enum(["clicks", "created", "expires"]).optional(),
});

// ============================================================
// Helper Functions (provided)
// ============================================================

function generateShortCode(): string {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

async function isCodeAvailable(code: string): Promise<boolean> {
  const [existing] = await db
    .select()
    .from(projectUrls)
    .where(eq(projectUrls.shortCode, code));
  return !existing;
}

function isExpired(url: ProjectUrl): boolean {
  if (!url.expiresAt) return false;
  return new Date(url.expiresAt) < new Date();
}

function dbUrlToApi(url: ProjectUrl): ShortUrl {
  return {
    id: url.id,
    shortCode: url.shortCode,
    originalUrl: url.originalUrl,
    createdAt: url.createdAt.toISOString(),
    expiresAt: url.expiresAt?.toISOString(),
    clicks: url.clicks,
    lastClickAt: url.lastClickAt?.toISOString(),
  };
}

// ============================================================
// Create the API
// ============================================================

const app = new Hono();

// ============================================================
// TODO: Implement API Routes
// ============================================================

// TODO: POST /shorten - Create a short URL
// Body: { url, customCode?, expiresIn? }
// Steps:
// - Get validated data from c.req.valid("json")
// - If customCode provided, check availability with isCodeAvailable()
//   - Return 409 if code already in use
// - Otherwise, generate unique code with generateShortCode()
// - Calculate expiresAt if expiresIn provided (days to milliseconds)
// - Create NewProjectUrl object with crypto.randomUUID() for id
// - Insert into database with db.insert(projectUrls).values().returning()
// - Return created URL with dbUrlToApi() and 201 status
app.post("/shorten", zValidator("json", CreateUrlSchema), async (c) => {
  // Your implementation here
  return c.json({ error: "Not implemented" }, 501);
});

// TODO: GET /:code - Redirect to original URL
// Steps:
// - Get code from c.req.param("code")
// - Skip if code === "api" (return c.notFound())
// - Query database for URL with matching shortCode
// - Return 404 if not found
// - Check if expired with isExpired() - return 410 if expired
// - Increment clicks and update lastClickAt in database
// - Return 302 redirect to originalUrl
app.get("/:code", async (c) => {
  // Your implementation here
  return c.json({ error: "Not implemented" }, 501);
});

// TODO: GET /api/urls - List all URLs
// Query params: { includeExpired?, sortBy? }
// Steps:
// - Get validated query params from c.req.valid("query")
// - Build query with db.select().from(projectUrls)
// - Apply sorting based on sortBy: "clicks" (desc), "expires" (asc), or "created" (desc, default)
// - Execute query
// - Filter out expired URLs unless includeExpired is true
// - Return array mapped through dbUrlToApi()
app.get("/api/urls", zValidator("query", ListUrlsQuerySchema), async (c) => {
  // Your implementation here
  return c.json({ error: "Not implemented" }, 501);
});

// TODO: GET /api/urls/:code - Get URL info
// Steps:
// - Get code from c.req.param("code")
// - Query database for URL with matching shortCode
// - Return 404 if not found
// - Return URL info with dbUrlToApi()
app.get("/api/urls/:code", async (c) => {
  // Your implementation here
  return c.json({ error: "Not implemented" }, 501);
});

// TODO: GET /api/urls/:code/stats - Get detailed statistics
// Steps:
// - Get code from c.req.param("code")
// - Query database for URL with matching shortCode
// - Return 404 if not found
// - Return stats object with: shortCode, originalUrl, clicks, createdAt, expiresAt, lastClickAt, isExpired
app.get("/api/urls/:code/stats", async (c) => {
  // Your implementation here
  return c.json({ error: "Not implemented" }, 501);
});

// TODO: PATCH /api/urls/:code - Update URL (extend expiration)
// Body: { expiresIn? }
// Steps:
// - Get code from c.req.param("code")
// - Get validated body from c.req.valid("json")
// - Query database for existing URL
// - Return 404 if not found
// - Build updateData object with new expiresAt if expiresIn provided
// - Update database with db.update(projectUrls).set().where().returning()
// - Return updated URL with dbUrlToApi()
app.patch(
  "/api/urls/:code",
  zValidator("json", UpdateUrlSchema),
  async (c) => {
    // Your implementation here
    return c.json({ error: "Not implemented" }, 501);
  }
);

// TODO: DELETE /api/urls/:code - Delete URL
// Steps:
// - Get code from c.req.param("code")
// - Delete from database with db.delete(projectUrls).where().returning()
// - Return 404 if nothing was deleted
// - Return 204 No Content on success
app.delete("/api/urls/:code", async (c) => {
  // Your implementation here
  return c.json({ error: "Not implemented" }, 501);
});

// ============================================================
// TESTS
// ============================================================

console.log("Running tests...\n");

let passed = 0;
let failed = 0;

async function resetUrls() {
  await db.delete(projectUrls);
}

// Test: Create short URL
await resetUrls();
const createRes = await app.request("/shorten", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ url: "https://example.com/very/long/path" }),
});

if (createRes.status === 201) {
  const data = (await createRes.json()) as ShortUrl;
  if (
    data.shortCode &&
    data.originalUrl === "https://example.com/very/long/path"
  ) {
    console.log("  POST /shorten works");
    passed++;
  } else {
    console.log("X POST /shorten wrong response");
    failed++;
  }
} else {
  console.log("X POST /shorten failed");
  failed++;
}

// Test: Create with custom code
await resetUrls();
const customRes = await app.request("/shorten", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    url: "https://example.com",
    customCode: "mycode",
  }),
});

if (customRes.status === 201) {
  const data = (await customRes.json()) as ShortUrl;
  if (data.shortCode === "mycode") {
    console.log("  POST /shorten with custom code works");
    passed++;
  } else {
    console.log("X POST /shorten custom code not used");
    failed++;
  }
} else {
  console.log("X POST /shorten with custom code failed");
  failed++;
}

// Test: Duplicate custom code
const dupRes = await app.request("/shorten", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    url: "https://other.com",
    customCode: "mycode",
  }),
});

if (dupRes.status === 409) {
  console.log("  POST /shorten rejects duplicate codes");
  passed++;
} else {
  console.log("X POST /shorten should reject duplicate codes");
  failed++;
}

// Test: Invalid URL
await resetUrls();
const invalidRes = await app.request("/shorten", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ url: "not-a-url" }),
});

if (invalidRes.status === 400) {
  console.log("  POST /shorten validates URL format");
  passed++;
} else {
  console.log("X POST /shorten should validate URL");
  failed++;
}

// Test: Redirect
await resetUrls();
// Create a URL first
const redirectCreateRes = await app.request("/shorten", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ url: "https://redirect-target.com" }),
});

const redirectData = (await redirectCreateRes.json()) as ShortUrl;
const shortCode = redirectData?.shortCode;

if (shortCode) {
  const redirectRes = await app.request(`/${shortCode}`);
  if (redirectRes.status === 302 || redirectRes.status === 301) {
    const location = redirectRes.headers.get("Location");
    if (location === "https://redirect-target.com") {
      console.log("  GET /:code redirects correctly");
      passed++;
    } else {
      console.log("X GET /:code wrong redirect location");
      failed++;
    }
  } else {
    console.log("X GET /:code should redirect");
    failed++;
  }

  // Verify click was counted
  const [urlInfo] = await db
    .select()
    .from(projectUrls)
    .where(eq(projectUrls.shortCode, shortCode));
  if (urlInfo && urlInfo.clicks === 1) {
    console.log("  Click tracking works");
    passed++;
  } else {
    console.log("X Click should be tracked");
    failed++;
  }
} else {
  console.log("X No URL created for redirect test");
  failed++;
  failed++;
}

// Test: Non-existent code
const notFoundRes = await app.request("/nonexistent");
if (notFoundRes.status === 404) {
  console.log("  GET /:code returns 404 for missing");
  passed++;
} else {
  console.log("X GET /:code should return 404");
  failed++;
}

// Test: List URLs
await resetUrls();
await app.request("/shorten", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ url: "https://url1.com" }),
});
await app.request("/shorten", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ url: "https://url2.com" }),
});

const listRes = await app.request("/api/urls");
if (listRes.status === 200) {
  const data = (await listRes.json()) as ShortUrl[];
  if (Array.isArray(data) && data.length === 2) {
    console.log("  GET /api/urls works");
    passed++;
  } else {
    console.log("X GET /api/urls wrong count");
    failed++;
  }
} else {
  console.log("X GET /api/urls failed");
  failed++;
}

// Test: Get URL info
const allUrls = await db.select().from(projectUrls);
const code = allUrls[0]?.shortCode;
if (code) {
  const infoRes = await app.request(`/api/urls/${code}`);
  if (infoRes.status === 200) {
    const data = (await infoRes.json()) as ShortUrl;
    if (data.shortCode === code && data.originalUrl) {
      console.log("  GET /api/urls/:code works");
      passed++;
    } else {
      console.log("X GET /api/urls/:code wrong data");
      failed++;
    }
  } else {
    console.log("X GET /api/urls/:code failed");
    failed++;
  }
} else {
  console.log("X No URL for info test");
  failed++;
}

// Test: Get stats
if (code) {
  const statsRes = await app.request(`/api/urls/${code}/stats`);
  if (statsRes.status === 200) {
    const stats = (await statsRes.json()) as {
      shortCode: string;
      clicks: number;
      isExpired: boolean;
    };
    if (
      stats.shortCode === code &&
      typeof stats.clicks === "number" &&
      typeof stats.isExpired === "boolean"
    ) {
      console.log("  GET /api/urls/:code/stats works");
      passed++;
    } else {
      console.log("X GET /api/urls/:code/stats wrong format");
      failed++;
    }
  } else {
    console.log("X GET /api/urls/:code/stats failed");
    failed++;
  }
} else {
  console.log("X No URL for stats test");
  failed++;
}

// Test: Delete URL
if (code) {
  const deleteRes = await app.request(`/api/urls/${code}`, { method: "DELETE" });
  if (deleteRes.status === 204) {
    const checkRes = await app.request(`/api/urls/${code}`);
    if (checkRes.status === 404) {
      console.log("  DELETE /api/urls/:code works");
      passed++;
    } else {
      console.log("X DELETE didn't remove URL");
      failed++;
    }
  } else {
    console.log("X DELETE /api/urls/:code failed");
    failed++;
  }
} else {
  console.log("X No URL for delete test");
  failed++;
}

// Test: Expiration
await resetUrls();
// Create expired URL directly in database
const expiredUrl: NewProjectUrl = {
  id: crypto.randomUUID(),
  shortCode: "expired",
  originalUrl: "https://expired.com",
  expiresAt: new Date(Date.now() - 86400000), // Yesterday
  clicks: 0,
};
await db.insert(projectUrls).values(expiredUrl);

const expiredRes = await app.request("/expired");
if (expiredRes.status === 410 || expiredRes.status === 404) {
  console.log("  Expired URLs are rejected");
  passed++;
} else {
  console.log("X Expired URLs should be rejected");
  failed++;
}

// Results
console.log(`\n${passed}/${passed + failed} tests passed`);
if (failed === 0) {
  console.log("\nProject complete! You've built a URL shortener with PostgreSQL!");
}
