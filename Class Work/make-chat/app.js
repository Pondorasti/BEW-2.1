const express = require("express")
const app = express()
const server = require("http").Server(app)

const exphbs = require("express-handlebars")
app.engine("handlebars", exphbs())
app.set("view engine", "handlebars")

app.get("/", (req, res) => {
  res.render("index.handlebars")
})

server.listen(3000, () => {
  console.log("Server is up and running on port 3000.")
})
