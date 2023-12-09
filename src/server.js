require('dotenv').config();
const express = require("express");
const { createServer } = require("node:http")
const { join } = require("node:path")

const port = process.env.SERVER_PORT;
const app = express();
const server = createServer(app);

app.get('/', (req, res) => {
    res.sendFile(join(__dirname + "/.." + '/public' + '/index.html'))
})

server.listen(port, () => {
    console.log(`[SERVER]: The Server is listening on port ${port}.`);
})

module.exports = server