module.exports = (io, socket, onlineUsers, channels) => {
  // New User
  socket.on("new user", (username) => {
    console.log(`${username} has joined the chat!`)

    onlineUsers[username] = socket.id
    socket["username"] = username

    io.emit("new user", username)
  })

  // New Message
  socket.on("new message", ({ sender, message, channel }) => {
    console.log(channel)
    console.log(channels[channel])
    channels[channel].push({ sender, message })
    io.to(channel).emit("new message", { sender, message })
  })

  // Get online users
  socket.on("get online users", () => {
    io.emit("get online users", onlineUsers)
  })

  // Disconnect
  socket.on("disconnect", () => {
    const disconnectedUsername = socket.username
    delete onlineUsers[disconnectedUsername]
    io.emit("get online users", onlineUsers)
  })

  // New Channel
  socket.on("new channel", (newChannel) => {
    channels[newChannel] = []
    socket.join(newChannel)

    io.emit("new channel", newChannel)

    socket.emit("user changed channel", { channel: newChannel, messages: channels[newChannel] })
  })
}
