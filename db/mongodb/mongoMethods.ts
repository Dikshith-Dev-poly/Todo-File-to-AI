import type { dbMethod } from "../../types/dbMethodTypes.js";





const mongoMethods: dbMethod = {
    get: () => {
        console.log("Get todo");
    }
}

export default mongoMethods;