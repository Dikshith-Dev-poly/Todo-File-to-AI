import { drizzle } from "drizzle-orm/node-postgres";
import env from "../../config/env.js";

const drizzledb = drizzle(env.POSTGRESQL_URL);
export default drizzledb;