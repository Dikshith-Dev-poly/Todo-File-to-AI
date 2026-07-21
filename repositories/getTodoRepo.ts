
import getDbMethods from "../db/dbMethods.js";
import type { todoType } from "../db/mongodb/TodoModel.js";
import type { getOptionsT } from "../services/getTodo.service.js";
import type { getDataT } from "../types/dbMethodTypes.js";

const methods = getDbMethods()

export default async function getTodoRepo(dbQueryOptions: getOptionsT): Promise<getDataT<todoType>> {
    if ("completed" in dbQueryOptions && "priority" in dbQueryOptions) {
        const comp = dbQueryOptions.completed === "true" ? true : false;
        return await methods.getByCompletedAndPriority(dbQueryOptions.limit, dbQueryOptions.skip, comp, (dbQueryOptions.priority || "low"));
    } else if ("completed" in dbQueryOptions) {
        const comp = dbQueryOptions.completed === "true" ? true : false;
        return await methods.getCompleted(dbQueryOptions.limit, dbQueryOptions.skip, comp);
    } else if ("priority" in dbQueryOptions) {
        return await methods.getPriority(dbQueryOptions.limit, dbQueryOptions.skip, (dbQueryOptions.priority || "low"));
    } else {
        return await methods.getAll(dbQueryOptions.limit, dbQueryOptions.skip);
    }
}