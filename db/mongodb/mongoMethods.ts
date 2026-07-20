import type { dbMethod } from "../../types/dbMethodTypes.ts";





const mongoMethods: dbMethod = {
    get: () => {
        console.log("Get todo");
    }
}

export default mongoMethods;