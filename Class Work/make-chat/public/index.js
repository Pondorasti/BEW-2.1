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

  // Create channel
  $("#new-channel-btn").click(() => {
    const newChannel = $("#new-channel-input").val()

    if (newChannel.length > 0) {
      socket.emit("new channel", newChannel)
      $("#new-channel-input").val("")
    }
  })
})
