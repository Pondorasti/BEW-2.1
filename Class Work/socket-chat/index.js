const express = require("express")
const app = express()
const httpServer = require("http")
const server = httpServer.createServer(app)

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html")
})

server.listen(3000, () => {
  console.log("Server listening on port 3000")
})
