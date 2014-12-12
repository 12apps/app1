var socket = io();

var source = $("#chat-template").html();
var template = Handlebars.compile(source);

function addMessage(message) {
  $("#output").append(template(message));
}

function sendChatMessage() {
  var msg = $("#chatBoxMessage").val();
  socket.emit('chat message', msg);
  $("#chatBoxMessage").val("");
}

$("#chatButton").on("click", sendChatMessage);

socket.on('chat message', function(response){
  addMessage(response);
});
