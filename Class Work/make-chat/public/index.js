$(document).ready(() => {
  const socket = io.connect()
  let currentUsername

  // Join Chat
  $("#create-user-btn").click((event) => {
    event.preventDefault()
    const username = $("#username-input").val()
    if (username.length > 0) {
      currentUsername = username
      socket.emit("new user", username)
      socket.emit("get online users")
      socket.emit("get channels")
      socket.emit("user changed channel", "General")
      $(".username-form").remove()
      $(".main-container").css("display", "flex")
    }
  })

  socket.on("get online users", (onlineUsers) => {
    $(".users-online").empty()
    for (username in onlineUsers) {
      $(".users-online").append(`<div class="user-online">${username}</div>`)
    }
  })

  // Send Messages
  $("#send-chat-btn").click(() => {
    const channel = $(".channel-current").text()
    const message = $("#chat-input").val()
    if (message.length > 0) {
      socket.emit("new message", { sender: currentUsername, message, channel })
    }

    $("#chat-input").val("")
  })

  // New Message
  socket.on("new message", ({ sender, message, channel }) => {
    const currentChannel = $(".channel-current").text()
    if (currentChannel)
      $(".message-container").append(`
      <div class="message">
        <p class="message-user">${sender}: </p>
        <p class="message-text">${message}</p>
      </div>
    `)
  })

  // Create Channel
  $("#new-channel-btn").click(() => {
    const newChannel = $("#new-channel-input").val()

    if (newChannel.length > 0) {
      socket.emit("new channel", newChannel)
      $("#new-channel-input").val("")
    }
  })

  socket.on("new channel", (newChannel) => {
    $(".channels").append(`<div class="channel">${newChannel}</div>`)
  })

  // Get Channels
  socket.on("get channels", (channels) => {
    $(".channel").remove(".channel")
    $(".channel-current").remove(".channel-current")
    channels.forEach((channel) => {
      $(".channels").append(`<div class="channel">${channel}</div>`)
    })
  })

  // Change Channel
  $(document).on("click", ".channel", (event) => {
    const newChannel = event.target.textContent
    socket.emit("user changed channel", newChannel)
  })

  socket.on("user changed channel", ({ channel, messages }) => {
    // Remove Current Channel
    $(".channel-current").addClass("channel")
    $(".channel-current").removeClass("channel-current")

    // Update new Current Channel
    $(`.channel:contains('${channel}')`).addClass("channel-current")
    $(".channel-current").removeClass("channel")

    // Refresh Messages
    $(".message-container").empty()
    messages.forEach(({ message, sender }) => {
      $(".message-container").append(`
          <div class="message">
            <p class="message-user">${sender}: </p>
            <p class="message-text">${message}</p>
          </div>
        `)
    })
  })
})
