const express = require("express")
const app = express()
const httpServer = require("http")
const server = httpServer.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html")
})

io.on("connection", (socket) => {
  console.log("a user connected")
})

server.listen(3000, () => {
  console.log("Server listening on port 3000")
})
