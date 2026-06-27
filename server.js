import app from "./app.js"

const port = process.env.PORT || 3000;

app.listen(port, (err) => {
    if (err) {
        console.log("Error starting server!!", err.message);
        process.exit(1);
    }
    console.log("Server Started on port %s", port);
})