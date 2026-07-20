import type { dbMethod } from "../../types/dbMethodTypes.ts";





const drizzleMethods: dbMethod = {
    get: () => {
        console.log("Get todo");
    }
}

export default drizzleMethods;