const app = require("./app");



const port = process.env.PORT || 3000;
app.listen(port, (err) => {
    if (err) {
        console.log("Error while starting the server");
        process.exit(1);
    }
    console.log("The server is running on port %s", port);
})