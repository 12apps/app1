var socket = io();

var source = $("#chat-template").html();
var template = Handlebars.compile(source);

var messages = [];

var userName;

function addMessage(message) {
  $("#output").append(template(message));
  var objDiv = document.getElementById("chat");
  objDiv.scrollTop = objDiv.scrollHeight;
}

function sendChatMessage() {
  var messageBody = $("#chatBoxMessage").val();
  socket.emit('chat message', { author: userName, body: messageBody });
  $("#chatBoxMessage").val("");
}

$("#chatButton").on("click", sendChatMessage);

socket.on('chat message', function(response){
  addMessage(response);
});

socket.on('userName', function(name){
  userName = name;
  console.log(userName);
});

Handlebars.registerHelper('format', function(date) {
  return moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a");
});
