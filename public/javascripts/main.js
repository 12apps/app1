console.log(angular);

var socket = io();

var chatApp = angular.module("chat", []);

chatApp.controller("MainController", function() {
  var controller = this;
  controller.messages = [];
  controller.sendChatMessage = function() {
    var msg = controller.chatBoxMessage;
    controller.messages.push(msg);
    socket.emit('chat message', msg);
  }

  socket.on('chat message', function(msg){
    controller.messages.push(msg);
  });
});
