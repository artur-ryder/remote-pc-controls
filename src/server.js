require('dotenv').config();
const express = require("express");
const { createServer } = require("node:http")
const { join } = require("node:path")
const ip = require('ip')

const port = process.env.SERVER_PORT;
const app = express();
const server = createServer(app);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname + "/.." + '/public' + '/index.html'))
})

server.listen(port, () => {
    console.log(`[SERVER]: The server is listening on port ${port}.
    You can access it at:
    >   http://localhost:${port}
    >   http://${ip.address("", "ipv4")}:${port}`);
})

module.exports = server