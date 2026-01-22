import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lessons/backend/src/db/schema.ts",
  out: "./lessons/backend/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "postgresql://learn:learn@localhost:5432/learn_db",
  },
});
