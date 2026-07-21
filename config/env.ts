import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();



const envSchema = z.object({
    PORT: z.string().default("3000"),
    DATABASE: z.enum(["mongodb", "postgresql"]).default("mongodb"),
    POSTGRESQL_URL: z.url({ protocol: /postgresql/ }),
    MONGODB_URI: z.url({ protocol: /mongodb/ }),
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    LIMIT: z.coerce.number().int().min(1).default(10)
})



const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.log("Missing environment variable");
    console.log(parsedEnv.error);
    process.exit(1);
}

export default parsedEnv.data;