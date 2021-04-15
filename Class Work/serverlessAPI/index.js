const serverless = require("serverless-http")
const express = require("express")

const app = express()

app.get("/", (req, res) => {
  res.send({ message: "Hello world!" })
})

module.exports.handler = serverless(app)
