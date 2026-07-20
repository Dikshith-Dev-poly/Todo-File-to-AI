import env from "../config/env.ts";
import mongoDBConnect from "./mongodb/MongoDBConnect.ts";
import mongoMethods from "./mongodb/mongoMethods.ts";


const database = env.DATABASE;


async function db() {
    if (database === 'mongodb') {
        await mongoDBConnect();
        return mongoMethods;
    } else if (database === "postgresql") {
        return mongoMethods;
    } else {
        throw new Error("Unknown Database");
    }
}

export default db;

