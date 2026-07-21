import env from "../config/env.js";
import drizzleMethods from "./drizzle/drizzleMethods.js";
import mongoMethods from "./mongodb/mongoMethods.js";

const database = env.DATABASE;



function getDbMethods() {
    if (database === "mongodb") {
        return mongoMethods;
    } else if (database === "postgresql") {
        return drizzleMethods;
    } else {
        return mongoMethods;
    }

}

export default getDbMethods;