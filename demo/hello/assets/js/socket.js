import {Socket} from "phoenix"

let socket = new Socket("/socket", {params: {token: window.userToken}})

socket.connect()

// Now that you are connected, you can join channels with a topic:
let channel = socket.channel("room:lobby", {})  // "room:lobby"に書き換える

// ここから追記
let userInput         = document.querySelector("#user-input")
let chatInput         = document.querySelector("#chat-input")
let messagesContainer = document.querySelector("#messages")

// エンターが押された時の処理
chatInput.addEventListener("keypress", event => {
  if(event.keyCode === 13){
    channel.push("new_msg", {user: userInput.value, chat: chatInput.value})
    chatInput.value = ""
  }
})

// "new_msg"がチャンネルに通知された時の処理
channel.on("new_msg", payload => {
  let messageItem = document.createElement("li")
  messageItem.innerText = `[${Date()}] [${payload.user}] ${payload.chat}`
  messagesContainer.appendChild(messageItem)
})
// ここまで追加

channel.join()
  .receive("ok", resp => { console.log("Joined successfully", resp) })
  .receive("error", resp => { console.log("Unable to join", resp) })

export default socket
