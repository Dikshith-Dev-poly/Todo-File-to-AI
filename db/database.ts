import env from "../config/env.js";
import mongoDBConnect from "./mongodb/MongoDBConnect.js";
import mongoMethods from "./mongodb/mongoMethods.js";
import drizzleMethods from "./drizzle/drizzleMethods.js";


const database = env.DATABASE;


async function db() {
    if (database === 'mongodb') {
        await mongoDBConnect();
        return mongoMethods;
    } else if (database === "postgresql") {
        return drizzleMethods;
    } else {
        throw new Error("Unknown Database");
    }
}

export default db;

