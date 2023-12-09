require('dotenv').config();
const server = require("./server")
const { Server } = require("socket.io")
const robot = require("robotjs");

const io = new Server(server)
const sensitivity = process.env.SENSITIVITY;

io.on('connection', (socket) => {
    socket.on('move', (coordinates) => {

        console.log(`[SOCKET]: Received "move to ${JSON.stringify(coordinates)}".`)
    
        let mousePositions = robot.getMousePos();
        mousePositions = {
            x: mousePositions.x + (coordinates.x * sensitivity),
            y: mousePositions.y + (coordinates.y * sensitivity)
        }
    
        robot.moveMouse(mousePositions.x, mousePositions.y)
    })

    socket.on('button', (button) => {
        console.log(`[SOCKET]: Received ${button} mouse button.`)
        robot.mouseClick(button)
    })

})

