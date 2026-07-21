
import env from "../config/env.js"
import seedMongo from "./mongodb/seedMongo.js";

const database = env.DATABASE;


async function seed() {
    if (database === "mongodb") {
        await seedMongo();
    } else {
        console.log("Add postgresql");
    }
}
seed();