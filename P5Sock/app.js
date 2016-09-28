var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = [];
var messages = [];
app.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/bootstrap/css',function(req,res){
  res.sendFile(__dirname + '/node_modules/bootstrap/dist/css/bootstrap.css');
});
app.get('/P5/js',function(req,res){
  res.sendFile(__dirname + '/node_modules/p5/lib/p5.js');
})
//io.emit('some event', { for: 'everyone' });
io.on('connection',function(socket){
  console.log("Connected");
  socket.pert = {};
  socket.pert.id = socket.id;
  socket.pert.x = (Math.random()*250 )+1;
  socket.pert.y = (Math.random()*250 )+1;
  socket.pert.color = '#'+Math.floor(Math.random()*16777215).toString(16);
  socket.pert.size = (Math.random()*250 )+1;
  users.push(socket.pert);
  socket.emit('Start',socket.pert);
  io.emit('UpdateUsers',users);
  socket.on('update',function(data){
    console.log(socket.id +" moved");
    socket.pert.x = data.x;
    socket.pert.y = data.y;
    var index = users.map(function(e){ return e.id; }).indexOf(socket.id);
    users[index].x = socket.pert.x;
    users[index].y = socket.pert.y;
    io.emit('UpdateUsers',users);
  });
  socket.on('disconnect',function(){
    users.splice(users.indexOf(socket.id),1);
    io.emit('UpdateUsers',users);
  });
});

http.listen(3000,function(){
  console.log("Started on port 3000");
});