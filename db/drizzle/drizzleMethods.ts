import type { dbMethod } from "../../types/dbMethodTypes.js";





const drizzleMethods: dbMethod = {
    get: () => {
        console.log("Get todo");
    }
}

export default drizzleMethods;