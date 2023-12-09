const server = require("./server")
const { Server } = require("socket.io")
const robot = require("robotjs");

const io = new Server(server)

const coordinates = {
    up:    { x: 0,   y: -10 },
    right: { x: 10,  y: 0 },
    left:  { x: -10, y: 0 },
    down:  { x: 0,   y: 10 }
};

io.on('connection', (socket) => {
    socket.on('moveTo', (direction) => {

        console.log(`[SOCKET]: Received "move to ${direction}".`)
    
        let mousePositions = robot.getMousePos();
        mousePositions = {
            x: mousePositions.x + coordinates[direction].x,
            y: mousePositions.y + coordinates[direction].y
        }
    
        robot.moveMouse(mousePositions.x, mousePositions.y)
    })

    socket.on('button', (button) => {
        console.log(`[SOCKET]: Received ${button} mouse button.`)
        robot.mouseClick(button)
    })

})

