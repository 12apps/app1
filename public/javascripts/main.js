var socket = io();

var source = $("#chat-template").html();
var template = Handlebars.compile(source);

var messages = [];
var userName;

function refresh() {
  $("#output").html(template({ messages: messages }));

  function addMessage(message) {
  $("#output").append(template(message));
}

function sendChatMessage() {
  var msg = $("#chatBoxMessage").val();
  console.log(msg);
  socket.emit('chat message', userName + ": " + msg);
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
