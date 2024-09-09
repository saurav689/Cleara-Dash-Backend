const express = require("express")
const app = express();
const { PROTOCOL_CONSTANT } = require("./utils/const")
const connectDB = require("./loaders/db")


//load configuration properties
require("dotenv").config();


let server;
let http;

if (process.env.PROTOCOL === PROTOCOL_CONSTANT.HTTPS) {
    //ssl certificates and create https server protocol
}
else {
    http = require("http");
    server = http.createServer(app);
}



require("./loaders/server")(app);
require("./loaders/swagger")(app);
require("./loaders/logger")(app)

const port = process.env.PORT || 5055
Promise.all([connectDB()]).then(() => {
    server.listen(port, () => {
        console.log(`Server started on port ${process.env.PORT} 🚀`)
    })
}).catch((error) => {
    console.log(error);
    process.exit();
})
