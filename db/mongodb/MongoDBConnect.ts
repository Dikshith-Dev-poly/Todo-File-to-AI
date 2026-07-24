import { connect } from "mongoose"
import env from "../../config/env.js"


const mongoOptions = { serverSelectionTimeoutMS: 1000, bufferCommands: false };

async function mongoDBConnect() {
    try {
        await connect(env.MONGODB_URI, mongoOptions);
    } catch (err: unknown) {
        console.error(err);
        process.exit(1);
    }
}

export default mongoDBConnect;