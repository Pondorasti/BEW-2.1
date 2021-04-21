// Server Setup
const express = require("express")
const app = express()
const server = require("http").Server(app)

// SocketIO
const io = require("socket.io")(server)
io.on("connection", (socket) => {
  require("./sockets/chat")(io, socket)
  console.log("🔌 New user connected!")
})

// Handlerbars
const exphbs = require("express-handlebars")
app.engine("handlebars", exphbs())
app.set("view engine", "handlebars")

// Static/Public Files
app.use("/public", express.static("public"))

// Routes
app.get("/", (req, res) => {
  res.render("index.handlebars")
})

// Start listening
server.listen(3000, () => {
  console.log("Server is up and running on port 3000.")
})
