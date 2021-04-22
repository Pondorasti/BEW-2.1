module.exports = (io, socket, onlineUsers) => {
  // New User
  socket.on("new user", (username) => {
    console.log(`${username} has joined the chat!`)

    onlineUsers[username] = socket.id
    socket["username"] = username

    io.emit("new user", username)
  })

  // New Message
  socket.on("new message", ({ sender, message }) => {
    console.log(`${sender}: ${message}`)
    io.emit("new message", { sender, message })
  })

  // Get online users
  socket.on("get online users", () => {
    io.emit("get online users", onlineUsers)
  })

  // On Disconnect
  socket.on("disconnect", () => {
    const disconnectedUsername = socket.username
    delete onlineUsers[disconnectedUsername]
    io.emit("get online users", onlineUsers)
  })
}
