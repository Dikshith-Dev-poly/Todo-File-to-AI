import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();



const envSchema = z.object({
    PORT: z.string().default("3000"),
    DATABASE: z.enum(["mongodb", "postgresql"]).default("mongodb"),
    POSTGRESQL_URL: z.url({ protocol: /postgresql/ }),
    MONGODB_URI: z.url({ protocol: /mongodb/ }),
    NODE_ENV: z.enum(["development", "production"]).default("development"),
})


// const env = {
//     PORT: process.env.PORT,
//     DATABASE: process.env.DATABASE,
//     POSTGRESQL_URL: process.env.POSTGRESQL_URL,
//     MONGODB_URI: process.env.MONGODB_URI,
//     NODE_ENV: process.env.NODE_ENV
// }

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
    console.log("Missing environment variable");
    console.log(parsedEnv.error);
    process.exit(1);
}

export default parsedEnv.data;