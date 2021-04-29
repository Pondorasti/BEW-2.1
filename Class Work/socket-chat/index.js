const express = require("express")
const app = express()
const httpServer = require("http")
const server = httpServer.createServer(app)

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>")
})

server.listen(3000, () => {
  console.log("Server listening on port 3000")
})
