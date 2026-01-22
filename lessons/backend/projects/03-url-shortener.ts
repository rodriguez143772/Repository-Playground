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
// Types and Schemas
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
// Helper Functions
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

// POST /shorten - Create a short URL
app.post("/shorten", zValidator("json", CreateUrlSchema), async (c) => {
  const { url, customCode, expiresIn } = c.req.valid("json");

  // Determine short code
  let shortCode: string;
  if (customCode) {
    const available = await isCodeAvailable(customCode);
    if (!available) {
      return c.json({ error: "Short code already in use" }, 409);
    }
    shortCode = customCode;
  } else {
    // Generate unique code
    do {
      shortCode = generateShortCode();
    } while (!(await isCodeAvailable(shortCode)));
  }

  // Calculate expiration
  const expiresAt = expiresIn
    ? new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000)
    : undefined;

  const newUrl: NewProjectUrl = {
    id: crypto.randomUUID(),
    shortCode,
    originalUrl: url,
    expiresAt,
    clicks: 0,
  };

  const [created] = await db.insert(projectUrls).values(newUrl).returning();

  return c.json(dbUrlToApi(created), 201);
});

// GET /:code - Redirect to original URL
app.get("/:code", async (c) => {
  const code = c.req.param("code");

  // Skip API routes
  if (code === "api") {
    return c.notFound();
  }

  const [url] = await db
    .select()
    .from(projectUrls)
    .where(eq(projectUrls.shortCode, code));

  if (!url) {
    return c.json({ error: "URL not found" }, 404);
  }

  if (isExpired(url)) {
    return c.json({ error: "URL has expired" }, 410);
  }

  // Increment click count and update last click
  await db
    .update(projectUrls)
    .set({
      clicks: url.clicks + 1,
      lastClickAt: new Date(),
    })
    .where(eq(projectUrls.id, url.id));

  return c.redirect(url.originalUrl, 302);
});

// GET /api/urls - List all URLs
app.get("/api/urls", zValidator("query", ListUrlsQuerySchema), async (c) => {
  const { includeExpired, sortBy } = c.req.valid("query");

  let query = db.select().from(projectUrls);

  // Apply sorting
  if (sortBy === "clicks") {
    query = query.orderBy(desc(projectUrls.clicks)) as typeof query;
  } else if (sortBy === "expires") {
    query = query.orderBy(asc(projectUrls.expiresAt)) as typeof query;
  } else {
    query = query.orderBy(desc(projectUrls.createdAt)) as typeof query;
  }

  let urls = await query;

  // Filter expired if needed
  if (!includeExpired) {
    urls = urls.filter((u) => !isExpired(u));
  }

  return c.json(urls.map(dbUrlToApi));
});

// GET /api/urls/:code - Get URL info
app.get("/api/urls/:code", async (c) => {
  const code = c.req.param("code");

  const [url] = await db
    .select()
    .from(projectUrls)
    .where(eq(projectUrls.shortCode, code));

  if (!url) {
    return c.json({ error: "URL not found" }, 404);
  }

  return c.json(dbUrlToApi(url));
});

// GET /api/urls/:code/stats - Get detailed statistics
app.get("/api/urls/:code/stats", async (c) => {
  const code = c.req.param("code");

  const [url] = await db
    .select()
    .from(projectUrls)
    .where(eq(projectUrls.shortCode, code));

  if (!url) {
    return c.json({ error: "URL not found" }, 404);
  }

  return c.json({
    shortCode: url.shortCode,
    originalUrl: url.originalUrl,
    clicks: url.clicks,
    createdAt: url.createdAt.toISOString(),
    expiresAt: url.expiresAt?.toISOString(),
    lastClickAt: url.lastClickAt?.toISOString(),
    isExpired: isExpired(url),
  });
});

// PATCH /api/urls/:code - Update URL (extend expiration)
app.patch(
  "/api/urls/:code",
  zValidator("json", UpdateUrlSchema),
  async (c) => {
    const code = c.req.param("code");
    const { expiresIn } = c.req.valid("json");

    const [url] = await db
      .select()
      .from(projectUrls)
      .where(eq(projectUrls.shortCode, code));

    if (!url) {
      return c.json({ error: "URL not found" }, 404);
    }

    const updateData: Partial<NewProjectUrl> = {};
    if (expiresIn) {
      updateData.expiresAt = new Date(
        Date.now() + expiresIn * 24 * 60 * 60 * 1000
      );
    }

    const [updated] = await db
      .update(projectUrls)
      .set(updateData)
      .where(eq(projectUrls.id, url.id))
      .returning();

    return c.json(dbUrlToApi(updated));
  }
);

// DELETE /api/urls/:code - Delete URL
app.delete("/api/urls/:code", async (c) => {
  const code = c.req.param("code");

  const [deleted] = await db
    .delete(projectUrls)
    .where(eq(projectUrls.shortCode, code))
    .returning();

  if (!deleted) {
    return c.json({ error: "URL not found" }, 404);
  }

  return c.body(null, 204);
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
