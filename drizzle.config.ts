import { defineConfig } from "drizzle-kit"
import env from "./config/env.ts"


export default defineConfig({
    schema: "./db/drizzle/TodoSchema.ts",
    out: "./drizzle",
    dialect: "postgresql",
    dbCredentials: {
        url: env.POSTGRESQL_URL
    }
})