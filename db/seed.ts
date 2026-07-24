
import env from "../config/env.js"
import seedDrizzle from "./drizzle/seedDrizzle.js";
import seedMongo from "./mongodb/seedMongo.js";

const database = env.DATABASE;


export default async function seed() {
    if (database === "mongodb") {
        await seedMongo();
    } else {
        await seedDrizzle();
    }
}

if (env.NODE_ENV === "development") {
    seed();
}