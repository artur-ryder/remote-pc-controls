require('dotenv').config();
const server = require("./server")
const { Server } = require("socket.io")
const robot = require("robotjs");

const io = new Server(server, {
    httpCompression: false,
})
const sensitivity = process.env.SENSITIVITY;

io.on('connection', (socket) => {
    socket.on('move', (coordinates) => {
        console.log(`[SOCKET]: Received ${JSON.stringify(coordinates)}".`)
    
        const mousePositions = robot.getMousePos();
        mousePositions["x"] = mousePositions.x + (coordinates.x * sensitivity);
        mousePositions["y"] = mousePositions.y + (coordinates.y * sensitivity);
        
        robot.moveMouse(...Object.values(mousePositions));
    })

    socket.on('button', (button) => {
        console.log(`[SOCKET]: Received ${button} mouse button.`)
        robot.mouseClick(button)
    })

})

