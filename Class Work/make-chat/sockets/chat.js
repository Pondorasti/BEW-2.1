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
    channels[channel].push({ sender, message })
    io.to(channel).emit("new message", { sender, message, channel })
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

  // Get Channels
  socket.on("get channels", () => {
    console.log(channels)
    io.emit("get channels", Object.keys(channels))
  })

  // Change Channel
  socket.on("user changed channel", (channel) => {
    socket.join(channel)
    console.log(channels[channel])
    socket.emit("user changed channel", { channel, messages: channels[channel] })
  })
}
