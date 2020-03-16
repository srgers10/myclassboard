
var express = require('express');

var app = express();
var server = app.listen(process.env.PORT || 5000);

app.use(express.static('public'));


console.log("My server is running!")

var socket = require('socket.io');
var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket){
  console.log("new connection: " + socket.id);
  socket.on('stream-in', streamMsg);
  function streamMsg(data){
    socket.broadcast.emit('stream-out', data);
    //console.log(data)
  }
}
