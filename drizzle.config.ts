import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "src/schema.ts",
  dbCredentials: {
    url: "postgres://spatial:spatial@localhost:5432/spatial",
  },
});
