var socket = io();

var source = $("#chat-template").html();
var template = Handlebars.compile(source);

var messages = [];

function refresh() {
  $("#output").html(template({ messages: messages }));
}

refresh();

function sendChatMessage() {
  var msg = $("#chatBoxMessage").val();
  console.log(msg);
  socket.emit('chat message', msg);
  $("#chatBoxMessage").val("");
}

$("#chatButton").on("click", sendChatMessage);

socket.on('chat message', function(response){
  console.log('client message: ', response);
  messages.push(response.msg);
  refresh();
});
