module.exports = (io, socket) => {
  // New User
  socket.on("new user", (username) => {
    console.log(`${username} has joined the chat!`)
    io.emit("new user", username)
  })

  // New Message
  socket.on("new message", ({ sender, message }) => {
    console.log(`${sender}: ${message}`)
    io.emit("new message", { sender, message })
  })
}
