import { defineConfig } from "drizzle-kit"
import env from "./config/env.js"


export default defineConfig({
    schema: "./db/drizzle/TodoSchema.ts",
    out: "./drizzleOut",
    dialect: "postgresql",
    dbCredentials: {
        url: env.POSTGRESQL_URL
    }
})