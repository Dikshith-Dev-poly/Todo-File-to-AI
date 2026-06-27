import { connect } from "mongoose";
import sleep from "../utils/sleep.js";



async function connectDB(retries = 5) {
    try {
        await connect(process.env.MONGO_URI);
        console.log("Database connected successfully");
    } catch (err) {
        if (err) {
            if (retries === 0) {
                process.exit(1);
            }
            console.log(`Database connection failed.Retrying in 5 seconds...(${retries} retries left).`);
            await sleep(5000);
            return connectDB(retries - 1);
        }
    }
}


export default connectDB;
