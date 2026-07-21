import { sql } from "drizzle-orm";
import env from "../config/env.js";
import drizzledb from "./drizzle/drizzleConnect.js";
import mongoDBConnect from "./mongodb/MongoDBConnect.js";

const database = env.DATABASE;


async function dbConnect() {
    if (database === 'mongodb') {
        await mongoDBConnect();
    } else if (database === "postgresql") {
        await drizzledb.execute(sql`SELECT 1`);
    } else {
        throw new Error("Unknown Database");
    }
}

export default dbConnect;

