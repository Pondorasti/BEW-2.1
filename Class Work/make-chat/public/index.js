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
      $(".username-form").remove()
      $(".main-container").css("display", "flex")
    }
  })

  socket.on("get online users", (onlineUsers) => {
    console.log(onlineUsers)
    $(".users-online").empty()
    for (username in onlineUsers) {
      $(".users-online").append(`<div class="user-online">${username}</div>`)
    }
  })

  // Send Messages
  $("#send-chat-btn").click(() => {
    const message = $("#chat-input").val()
    if (message.length > 0) {
      socket.emit("new message", { sender: currentUsername, message })
    }

    $("#chat-input").val("")
  })

  socket.on("new message", ({ sender, message }) => {
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

  // Change channel
  socket.on("user changed channel", ({ channel, messages }) => {
    // Remove Current Channel
    $(".channel-current").addClass("channel")
    $(".channel-current").removeClass("channel-current")

    // Update new Current Channel
    $(`.channel:contains('${channel}')`).addClass("channel-current")
    $(".channel-current").removeClass("channel")

    // Refresh Messages
    $(".message-container").empty()
    messages.forEach((message) => {
      $(".message-container").append(`
          <div class="message">
            <p class="message-user">${sender}: </p>
            <p class="message-text">${message}</p>
          </div>
        `)
    })
  })
})
