import app from "./app.js";
import env from "./config/env.js"
import dbConnect from "./db/dbConnect.js";


const PORT = env.PORT;


async function init() {
    try {
        await dbConnect();
        app.listen(PORT, () => {
            console.log("Server running on %s", PORT);
        })
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}


init();